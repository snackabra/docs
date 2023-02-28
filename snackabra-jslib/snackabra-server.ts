/*
   Copyright (C) 2019-2023 Magnusson Institute, All Rights Reserved

   "Snackabra" is a registered trademark

   This program is free software: you can redistribute it and/or
   modify it under the terms of the GNU Affero General Public License
   as published by the Free Software Foundation, either version 3 of
   the License, or (at your option) any later version.

   This program is distributed in the hope that it will be useful, but
   WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
   Affero General Public License for more details.

   You should have received a copy of the GNU Affero General Public
   License along with this program.  If not, see www.gnu.org/licenses/

*/

const DEBUG = true

console.log("STARTING SNACKABRA WORKER")

import {
  arrayBufferToBase64, base64ToArrayBuffer,
  assemblePayload, extractPayload,
  jsonParseWrapper,
  ChannelKeys, SBChannelId,
  SBCrypto
} from 'snackabra';

const sbCrypto = new SBCrypto()

type EnvType = {
  // ChannelServerAPI
  channels: DurableObjectNamespace,

  SERVER_SECRET: string,

  // KV Namespaces
  MESSAGES_NAMESPACE: KVNamespace,
  KEYS_NAMESPACE: KVNamespace,
  LEDGER_NAMESPACE: KVNamespace,
  IMAGES_NAMESPACE: KVNamespace,
  RECOVERY_NAMESPACE: KVNamespace,

  // looks like: '{"key_ops":["encrypt"],"ext":true,"kty":"RSA","n":"6WeMtsPoblahblahU3rmDUgsc","e":"AQAB","alg":"RSA-OAEP-256"}'
  LEDGER_KEY: string,
}

type SessionType = {

}
// TODO: handle errors that are supposed to respond on the socket
// async function handleErrors(request: Request, func: () => Response) {
//   try {
//     return func();
//   } catch (err: any) {
//     if (request.headers.get("Upgrade") == "websocket") {
//       const pair = new WebSocketPair();
//       const [client, server] = Object.values(pair)
//       server.accept()
//       server.send(JSON.stringify({ error: '[handleErrors()] ' + err.message + '\n' + err.stack }))
//       server.close(1011, "Uncaught exception during session setup")
//       return new Response(null, { status: 101, webSocket: client })
//     } else {
//       return returnResult(request, err.stack, 500)
//       //return new Response(err.stack, { status: 500 });
//     }
//   }
// }

// Decorator: replace any function with a jsonify wrapper
// function JsonString(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
//   const operation = descriptor.value
//   descriptor.value = function (...args: any[]) {
//     return JSON.stringify(operation.call(this, ...args))
//   }
// }

const defaultHeaders = {
  "Allow": "GET, POST, OPTIONS",
  "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
  "Access-Control-Allow-Headers": "Content-Type, authorization",
  "Access-Control-Allow-Credentials": "true",
  'Content-Type': 'application/json;',
  // "Access-Control-Allow-Origin": request.headers.get("Origin")
  "Access-Control-Allow-Origin": "*",
}


// Decorator for typical API calls:
// 1. Wrap in try/catch
// 2. Return JSON
// 3. Return 500 if error
function APIResponse(_target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const operation = descriptor.value
  descriptor.value = function (...args: any[]) {
    let responseHeaders = defaultHeaders
    try {
      const returnValue = operation.call(this, ...args)
      if (DEBUG) {
        let debugHeaders = {
          "X-Debug-Function": propertyKey,
          "X-Debug-Args": JSON.stringify(args),
          "X-Debug-Result": JSON.stringify(returnValue)
        }
        Object.assign(responseHeaders, debugHeaders, defaultHeaders)
      }
      let returnStatus = 200
      if ('error' in returnValue) returnStatus = 500
      return new Response(JSON.stringify(returnValue), { status: returnStatus, headers: responseHeaders })
    } catch (e) {
      let err = WrapError(e)
      return new Response(
        JSON.stringify(
          {
            error: "Internal Error",
            target: propertyKey,
            name: err.name,
            message: err.message,
            stack: err.stack
          }),
        { status: 500, headers: responseHeaders })
    }
  }
}

// this helps force an error object to be an error object
function WrapError(e: unknown) {
  if (e instanceof Error) {
    return e;
  } else {
    return new Error(String(e));
  }
}

// Decorator: ready pattern
function Ready(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  if (descriptor.get) {
    // console.log("Checking ready for:")
    // console.log(target.constructor.name)
    let get = descriptor.get
    descriptor.get = function () {
      // console.log("============= Ready checking this:")
      // console.log(this)
      const obj = target.constructor.name
      // TODO: the Ready template can probably be simplified
      const prop = `${obj}ReadyFlag`
      if (prop in this) {
        // console.log(`============= Ready() - checking readyFlag for ${propertyKey}`)
        const rf = "readyFlag" as keyof PropertyDescriptor
        // console.log(this[rf])
        _assert(this[rf], `${propertyKey} getter accessed but object ${obj} not ready (fatal)`)
      }
      const retValue = get.call(this)
      _assert(retValue != null, `${propertyKey} getter accessed in object type ${obj} but returns NULL (fatal)`)
      return retValue
    }
  }
}

class Server {
  private readonly env: EnvType
  private readonly channel: DurableObjectNamespace
  private readonly messages: KVNamespace
  private readonly keys: KVNamespace
  private readonly ledgerKey: string

  constructor(env: EnvType, _ctx: ExecutionContext) {
    this.env = env
    this.channel = env.channels
    this.messages = env.MESSAGES_NAMESPACE
    this.keys = env.KEYS_NAMESPACE
    this.ledgerKey = env.LEDGER_KEY
  }

  handleApiCall(request: Request, env: EnvType, _ctx: ExecutionContext) {
    const { pathname } = new URL(request.url);
    const apiCall = pathname.split('/')[3];
    switch (apiCall) {
      // TODO: make into data structure
      case 'storeRequest':
        return this.handleStoreRequest(request, env)
      case 'storeData':
        return this.handleStoreData(request, env)
      case 'fetchData':
        // psm ... for fuck's sake it's hardcoded to 'p' ... sigh
        return this.handleFetchData(request, env)
      case 'migrateStorage':
        return this.handleMigrateStorage(request, env)
      case 'fetchDataMigration':
        return this.handleFetchDataMigration(request, env)
      case 'getLastMessageTimes':
        return this.handleLastMessageTimes(request, env)
      default:
        return { error: `No such api endpoint '/api/${apiCall}>'`}
    }
  }

  // @APIResponse
  // handleLastMessageTimes(request: Request, env: EnvType) {
  //   request.json().then((r) => {
  //     let _rooms = r as Array<string>
  //     var lastMessageTimes: { [key: string]: string } = {}
  //     for (let i = 0; i < _rooms.length; i++) {
  //       // TODO: this looks super slow and serialized
  //       lastMessageTimes[_rooms[i]] = await lastTimeStamp(_rooms[i], env);
  //     }
  //     return lastMessageTimes
  //   })
  // }

  @APIResponse
  handleLastMessageTimes(request: Request, env: EnvType) {
    return request.json().then((r) => 
      Promise.all((r as Array<string>)
      .map((room) => lastTimeStamp(room, env)))
      .then((results) => results))
  }

  @APIResponse
  handleStoreRequest(request: Request, env: EnvType) {
    // console.log("handleStoreRequest()")
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    const type = searchParams.get('type');
    if (!type) return { error: "ERROR: you need type (note: old client bug)" }
    // console.log(`prefix name: ${genKey(type, name)}`)
    // psm ugh: this never did genKey!  it never returned correct salt/iv
    env.IMAGES_NAMESPACE.list({ 'prefix': genKey(type, name) }).then((list_resp) => {
      let data: { salt?: Uint8Array, iv?: Uint8Array } = {};
      if (list_resp.keys.length > 0) {
        console.log("found object")
        const key = list_resp.keys[0].name;
        const val = await env.IMAGES_NAMESPACE.get(key, { type: "arrayBuffer" }) as unknown as ArrayBuffer;
        data = extractPayload(val);
      } else {
        console.log("did NOT find object")
      }
      // console.log("got blob data:")
      // console.log(data)
      const salt = Object.prototype.hasOwnProperty.call(data, 'salt') ? data.salt : crypto.getRandomValues(new Uint8Array(16));
      const iv = Object.prototype.hasOwnProperty.call(data, 'iv') ? data.iv : crypto.getRandomValues(new Uint8Array(12));
      // subtle not doing this:
      // const salt = data.hasOwnProperty('salt') ? data.salt : crypto.getRandomValues(new Uint8Array(16));
      // const iv = data.hasOwnProperty('iv') ? data.iv : crypto.getRandomValues(new Uint8Array(12));
      return assemblePayload({ iv: iv, salt: salt });
    });
  }

  @APIResponse
  handleStoreData(request: Request, env: EnvType) {
    const { searchParams } = new URL(request.url);
    const image_id = searchParams.get('key')
    // console.log(image_id)
    const type = searchParams.get('type')
    const key = genKey(type, image_id)
    // console.log(key, await IMAGES_NAMESPACE.get(key))
    request.arrayBuffer().then((val) => {
      const data = extractPayload(val);
      // console.log("EXTRACTED DATA IN MAIN: ", Object.keys(data))
      // const storageToken = data.storageToken;
      let verification_token;

      // console.log("storageToken processing:")
      // console.log(data.storageToken)
      const _storage_token = JSON.parse((new TextDecoder).decode(data.storageToken));
      if ('error' in _storage_token) return _storage_token;
      // console.log(_storage_token);
      env.LEDGER_NAMESPACE.get(_storage_token.token_hash).then((_storage_token_hash) => {
        let _ledger_resp = JSON.parse(_storage_token_hash) || {};
        // console.log(_ledger_resp, _storage_token)
        if (!this.verifyStorage(data, image_id, env, _ledger_resp)) {
          return { error: 'Ledger(s) refused storage request - authentication or storage budget issue, or malformed request' }
        }
        env.IMAGES_NAMESPACE.get(key, { type: "arrayBuffer" }).then((sb) => {
          let stored_data = sb as unknown as ArrayBuffer
          if (stored_data == null) {
            // console.log("======== data was new")
            verification_token = crypto.getRandomValues(new Uint16Array(4)).buffer;
            data['verification_token'] = verification_token;
            const assembled_data = assemblePayload(data) as ReadableStream
            // console.log("assembled data")
            // console.log(assembled_data)
            env.IMAGES_NAMESPACE.put(key, assembled_data); // we chose not to wait
            // console.log("Generated and stored verification token:" /*, store_resp */) // wait there is no "store_resp"?
            // console.log(verification_token)
          } else {
            // console.log("======== data was deduplicated")
            const data = extractPayload(stored_data);
            // console.log(data)
            // console.log("found verification token:")
            // console.log(data.verification_token)
            verification_token = data.verification_token;
          }
          // console.log("Extracted data: ", data)
          // TODO - disabling this for now, IMPORTANT to sort out storage token consumption
          //        this code consumes the token to stop double use
          // _ledger_resp.used = true;
          // let _put_resp = await env.LEDGER_NAMESPACE.put(_storage_token.token_hash, JSON.stringify(_ledger_resp));
          // env.RECOVERY_NAMESPACE.put(_storage_token.hashed_room_id + '_' + _storage_token.encrypted_token_id, 'true');
          // env.RECOVERY_NAMESPACE.put(_storage_token.token_hash + '_' + image_id, 'true');
          // env.RECOVERY_NAMESPACE.put(image_id + '_' + _storage_token.token_hash, 'true');
          // await fetch('https://s_socket.privacy.app/api/token/' + new TextDecoder().decode(storageToken) + '/useToken');

          const verification_token_string = new Uint16Array(verification_token).join('')
          // console.log("verification token string:")
          // console.log(verification_token_string)
          return {
            image_id: image_id,
            size: val.byteLength,
            verification_token: verification_token_string,
            // ledger_resp: _put_resp  // TODO: see above
          }
        })
      })
    })
  }
  
  @APIResponse
  handleFetchData(request: Request, env: EnvType) {
      const { searchParams } = new URL(request.url)
      const verification_token = searchParams.get('verification_token')
      let type = searchParams.get('type')
      if (!type) type = 'p' // fix to *default* not enforced
      // const storage_token = searchParams.get('storage_token');
      const id = searchParams.get('id');
      const key = genKey(type, id)
      const stored_data = await env.IMAGES_NAMESPACE.get(key, { type: "arrayBuffer" })
      if (!stored_data) {
        console.log("object not found (error?)")
        // TODO: add capabilities to delay responses
        return returnResult(request, JSON.stringify({ error: 'cannot find object' }), 500)
      } else {
        console.log("Stored data")
        const data = extractPayload(stored_data)
        // const storage_resp = await (await fetch('https://s_socket.privacy.app/api/token/' + storage_token + '/checkUsage')).json();
        // console.log(data.verification_token)
        const stored_verification_token = new Uint16Array(data.verification_token).join('')
        if (verification_token !== stored_verification_token) {
          return returnResult(request, JSON.stringify({ error: 'Verification failed' }), 200);
        }
        const corsHeaders = {
          "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": request.headers.get("Origin")
        }
        return new Response(assemblePayload(data), { status: 200, headers: corsHeaders })
      }
  }
  
  verifyStorage(data, id, env, _ledger_resp) {
    const dataHash = await generateDataHash(data.image);
    if (id.slice(-dataHash.length) !== dataHash) {
      return false;
    }
    // older design ... we think ...
    // const ledger_data = JSON.parse((new TextDecoder()).decode(data.storageToken)) || {};
    // const token_hash = ledger_data.token_hash_buffer;
    if (!_ledger_resp || _ledger_resp.used || _ledger_resp.size !== data.image.byteLength) {
      return false;
    }
    return true;
  }
  
   generateDataHash(data) {
    try {
      const digest = await crypto.subtle.digest('SHA-256', data);
      return encodeURIComponent(arrayBufferToBase64(digest));
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  
  @APIResponse
  handleMigrateStorage(request: Request, env: EnvType) {
    try {
      // console.log("In handleMigrate");
      let data = await request.arrayBuffer();
      let jsonString = new TextDecoder().decode(data);
      let json = JSON.parse(jsonString);
      let targetURL = json['target'];
      // console.log("TargetURL: ", targetURL)
      delete json['target'];
      if (!Object.prototype.hasOwnProperty.call(json, 'SERVER_SECRET') || !(json['SERVER_SECRET'] === env.SERVER_SECRET)) { // yes you just need one '!'
        return returnResult(request, JSON.stringify({ error: "Server verification failed" }), 500)
      }
      delete json['SERVER_SECRET']
      for (let key in json) {
        const key_parts = key.split(".");
        const key_id = key_parts[0];
        let type = key_parts[1];
        if (type !== "p" && type !== "f") {
          type = "p";
        }
        let reqUrl = "https://" + targetURL + "/api/v1/fetchDataMigration?id=" + encodeURIComponent(key_id) + "&verification_token=" + json[key] + "&type=" + type;
        let fetch_req = await fetch(reqUrl);
        if (fetch_req.status === 500 && type !== "f") {
          type = "f";
          reqUrl = "https://" + targetURL + "/api/v1/fetchDataMigration?id=" + encodeURIComponent(key_id) + "&verification_token=" + json[key] + "&type=" + type;
          fetch_req = await fetch(reqUrl);
        }
        let ab = await fetch_req.arrayBuffer();
        const kv_key = genKey(type, key_id)
        env.IMAGES_NAMESPACE.put(kv_key, ab);
      }
      return returnResult(request, JSON.stringify({ success: true }), 200)
    } catch (error) {
      console.log(error)
      return returnResult(request, JSON.stringify({ error: error.message }), 500);
    }
  }
  
  @APIResponse
  handleFetchDataMigration(request: Request, env: EnvType) {
    try {
      const { searchParams } = new URL(request.url);
      const verification_token = searchParams.get('verification_token');
      // const storage_token = searchParams.get('storage_token');
      const id = searchParams.get('id');
      const type = searchParams.get('type')
      const key = genKey(type, id)
      const stored_data = await env.IMAGES_NAMESPACE.get(key, { type: "arrayBuffer" });
      // console.log("Stored data", stored_data)
      if (stored_data == null) {
        return returnResult(request, JSON.stringify({ error: "Could not find data" }), 500);
      }
      const data = extractPayload(stored_data);
      // const storage_resp = await (await fetch('https://s_socket.privacy.app/api/token/' + storage_token + '/checkUsage')).json();
      if (verification_token !== new Uint16Array(data.verification_token).join('')) {
        return returnResult(request, JSON.stringify({ error: 'Verification failed' }), 200);
      }
      const corsHeaders = {
        "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": request.headers.get("Origin")
      }
      return new Response(assemblePayload(data), { status: 200, headers: corsHeaders });
    } catch (error) {
      return returnResult(request, JSON.stringify({ error: error.toString() }), 500)
    }
  }


} /* Class Server */

// global server object - used by both async and sync workers
let server: Server

/**
 * API calls are in one of two forms:
 * 
 * ::
 * 
 *     /api/<api_call>/
 *     /api/room/<id>/<api_call>/
 * 
 * The first form is asynchronous, the latter is synchronous.
 * A 'sync' call means that there's only a single server endpoint
 * that is handling calls. The channel id thus constitutes
 * the point of synchronization.
 * 
 * Currently, api calls are strictly one or the other. That will
 * likely change.
 * 
 * Finally, one api endpoint is special:
 * 
 * ::
 * 
 *     /api/room/<id>/websocket
 * 
 * Which will upgrade protocol to a websocket connection.
 * 
 * Previous design was divided into separate shard and channel
 * servers, but this version is merged. For historical continuity,
 * below we divide them into shard and channel calls.
 * 
 * ::
 * 
 *     Shard API:
 *     /api/storeRequest/
 *     /api/storeData/
 *     /api/fetchData/
 *     /api/migrateStorage/
 *     /api/fetchDataMigration/
 *
 *     Channel API (async):
 *     /api/notifications/       : sign up for notifications (disabled)
 *     /api/getLastMessageTimes/ : queries multiple channels for last message timestamp
 *
 *     Channel API (synchronous)          : [O] means [Owner] only
 *     /api/room/<ID>/websocket           : connect to channel socket (wss protocol)
 *     /api/room/<ID>/oldMessages
 *     /api/room/<ID>/updateRoomCapacity  : [O]
 *     /api/room/<ID>/getRoomCapacity     : [O]
 *     /api/room/<ID>/getPubKeys          : [O]
 *     /api/room/<ID>/getJoinRequests     : [O]
 *     /api/room/<ID>/lockRoom            : [O]
 *     /api/room/<ID>/acceptVisitor       : [O]
 *     /api/room/<ID>/roomLocked
 *     /api/room/<ID>/ownerUnread         : [O]
 *     /api/room/<ID>/motd                : [O]
 *     /api/room/<ID>/ownerKeyRotation    : [O]
 *     /api/room/<ID>/storageRequest
 *     /api/room/<ID>/getAdminData        : [O]
 *     /api/room/<ID>/registerDevice      : (disabled)
 *     /api/room/<ID>/downloadData
 *     /api/room/<ID>/uploadRoom
 *     /api/room/<ID>/authorizeRoom
 *     /api/room/<ID>/postPubKey
 * 
 */
export default {
  async fetch(request: Request, env: EnvType, _ctx: ExecutionContext) {
    try {
      const { method, url } = request
      // it just wants default headers
      if (method === "OPTIONS") return ({})
      let urlObject = new URL(url)
      // this is the set of path elements - as we consume, we 'shift'
      let path = urlObject.pathname.split('/')
      path = path.slice(1) // skip first '/'
      if (path[0] !== 'api') {
        return new Response("This is an API endpoint - you need '<domain>/api/...' format", { status: 500, headers: defaultHeaders });
      }
      path = path.slice(1)
      if (path[0] === 'room') {
        path = path.slice(1);
        // request is for /api/room/<id>/
        const name = path[0]

        // TODO:
        // - check that it's a valid room
        // - check that room exists

        // we direct to specific instance of channel server
        let id = env.channels.idFromName(name);
        let roomObject = env.channels.get(id);
        urlObject.pathname = "/" + path.join("/");
        return roomObject.fetch(urlObject);
      } else {
        // so-called 'asynchronous' call
        if (!server) server = new Server(env, _ctx)
        return server.handleApiCall(request, env, _ctx)
      }
    } catch (e) {
      let errMsg = `Unhandled exception in outermost 'fetch': ${WrapError(e)}`
      console.error(errMsg)
      return new Response(errMsg, { status: 500, headers: defaultHeaders });
    }
  }
}

async function lastTimeStamp(room_id: SBChannelId, env: EnvType) {
  let list_response = await env.MESSAGES_NAMESPACE.list({ "prefix": room_id });
  let message_keys = list_response.keys.map((res) => {
    return res.name
  });
  if (message_keys.length === 0) return '0'
  while (!list_response.list_complete) {
    list_response = await env.MESSAGES_NAMESPACE.list({ "cursor": list_response.cursor })
    message_keys = [...message_keys, list_response.keys];
  }
  return message_keys[message_keys.length - 1].slice(room_id.length);
}

function _assert(val: unknown, msg: string) {
  if (!!val) throw new Error('assertion failed: ' + msg)
}

interface Dictionary<T> {
  [index: string]: T;
}

class ChannelConfig {
  storage: DurableObjectStorage
  #keys?: ChannelKeys
  ledgerKey: CryptoKey
  sessions = []

  #storageKeys: Dictionary<any> = {};

  // 'Ready Pattern'
  ready: Promise<ChannelConfig>
  channelConfigReady: Promise<ChannelConfig>
  #ChannelConfigReadyFlag: boolean = false // must be named <class>ReadyFlag

  // We keep track of the last-seen message's timestamp just so that we can assign monotonically
  // increasing timestamps even if multiple messages arrive simultaneously (see below).
  // lastTimestamp = 0;

  room_id: SBChannelId; // = '';
  
  constructor(room_id: SBChannelId, ledgerKey: CryptoKey, storage: DurableObjectStorage) {
    // TODO: this cannot handle exceptions ... 
    this.storage = storage;
    this.room_id = room_id;
    this.ledgerKey = ledgerKey;
    // this.room_owner = await storage.get('room_owner');
    // this.encryptionKey = await storage.get('encryptionKey');
    /*if (typeof this.room_owner === 'undefined' || typeof this.encryptionKey === 'undefined') {
      const keyFetch_json = await fetch("https://m063.dpn.workers.dev/api/v1/pubKeys?roomId=" + this.room_id)
      this.room_owner = JSON.stringify(keyFetch_json.ownerKey);
      this.encryptionKey = JSON.stringify(keyFetch_json.encryptionKey);
    }*/

    this.ready = new Promise<ChannelConfig>((resolve, reject) => {
      try {

        // default values
        this.#storageKeys = {
          'lastTimestamp': 0,
          'personalRoom': false,
          'room_capacity': 20,
          'visitors': [],
          'ownerUnread': 0,
          'locked': false,
          'join_requests': [],
          'accepted_requests': [],
          'storageLimit': 0,
          'lockedKeys': {},
          'deviceIds': [],
          'claimIat': 0,
          'motd': ''
        };

        storage.get(Object.keys(this.storageKeys)).then((values) => {
          Object.keys(this.#storageKeys).forEach((key) => {
            if (typeof values.get(key) !== 'undefined') this.#storageKeys[key] = values.get(key);
          });

        });


        let getKeys = ['ownerKey', 'guestKey', 'signKey', 'encryptionKey;']
        // TODO: these are promises and need resolution
        this.room_owner = this.getKey('ownerKey');
        this.verified_guest = this.getKey('guestKey');
        this.signKey = this.getKey('signKey');
        this.encryptionKey = this.getKey('encryptionKey');

        /*
        for (let i = 0; i < this.accepted_requests.length; i++) {
          this.lockedKeys[this.accepted_requests[i]] = await storage.get(this.accepted_requests[i]);
        }
        */

        // TODO: remember when all is done we flip the flag
        this.#ChannelConfigReadyFlag = true
      } catch (e) {
        let errMsg = `failed to create ChannelConfig(): ${WrapError(e)}`
        console.error(errMsg)
        // _sb_exception("new Identity()", `failed to create Identity(): ${e}`) // do reject instead
        reject(errMsg)
      }
    })
    this.channelConfigReady = this.ready  
  }

  /** @type {boolean}       */        get readyFlag() { return this.#ChannelConfigReadyFlag; }
  /** @type {number}        */ @Ready get room_capacity() { return this.#storageKeys['room_capacity'] as number }
  /**                       */        set room_capacity(newCapacity: number) { this.#storageKeys['room_capacity'] = newCapacity }

}

// =======================================================================================
// Channel API (synchronous, durable object)
export class ChannelServerAPI implements DurableObject {
  storage: DurableObjectStorage
  env: EnvType
  // sessions = []

  config?: ChannelConfig;

  initializePromise: Promise<boolean> = undefined; // requires strictNullChecks to be false in tsconfig

  // // We keep track of the last-seen message's timestamp just so that we can assign monotonically
  // // increasing timestamps even if multiple messages arrive simultaneously (see below).
  // lastTimestamp = 0;

  room_id: SBChannelId = '';
  verified_guest = '';

  constructor(state: DurableObjectState, env: EnvType) {
    // we actually cannot quite initialize the object until the first fetch(), below
    this.storage = state.storage;
    this.env = env;
  }

  // need the initialize method to restore state of room when the worker is updated

  initialize(room_id: SBChannelId): Promise<boolean> {
    // TODO: this cannot handle exceptions ... 
    return new Promise((resolve, reject) => {
      // let ledgerKeyString = await this.getKey('ledgerKey');
      let ledgerKeyString = this.env.LEDGER_KEY;
      if (ledgerKeyString != null && ledgerKeyString !== "") {
        crypto.subtle.importKey("jwk",
          jsonParseWrapper(ledgerKeyString, 'L217'),
          { name: "RSA-OAEP", hash: 'SHA-256' },
          true, ["encrypt"]).then((ledgerKey) => {
            const storage = this.storage;
            this.config = new ChannelConfig(room_id, ledgerKey, storage);
            resolve(true);
          });
      } else {
        // throw new Error ('cannot find a ledger key')
        console.error("Failed to initialize ChannelServerAPI")
        resolve(false);
        // TODO: throw exception or something
      }
    });
  }

  async fetch(request: Request): Promise<Response> {
    if (!this.initializePromise) {
      this.initializePromise = this.initialize((new URL(request.url)).pathname.split('/')[1]);
    }
    await this.initializePromise;

    // if (this.verified_guest === '') {
    //   this.verified_guest = this.getKey('guestKey');
    // }

    return new Promise((resolve) => {
      let url = new URL(request.url);
      /* ... older code that fetched basic parameters from Privacy.App
        if (this.room_owner === '') {
        this.room_id = url.pathname.split('/')[1];
        const keyFetch_json = await fetch("https://m063.dpn.workers.dev/api/v1/pubKeys?roomId=" + this.room_id)
        this.room_owner = JSON.stringify(keyFetch_json.ownerKey);
        this.encryptionKey = JSON.stringify(keyFetch_json.encryptionKey);
      }*/
      this.room_id = url.pathname.split('/')[1];
      // url.pathname = "/" + url.pathname.split('/').slice(2).join("/");
      let url_pathname = "/" + url.pathname.split('/').slice(2).join("/")
      let new_url = new URL(url.origin + url_pathname)

      if (new_url.pathname === "/websocket") {
        if (request.headers.get("Upgrade") != "websocket") {
          return new Response("expected websocket", { status: 400 });
        }
        // this.room_id = request.url;
        let ip = request.headers.get("CF-Connecting-IP");
        let pair = new WebSocketPair();
        this.handleSession(pair[1], ip).then(() => {
          resolve(new Response(null, { status: 101, webSocket: pair[0] }));
        });
      } else {

        // TODO: these require this.verifyAuthSign(request)
        let ownerCalls = {
          "/acceptVisitor": this.acceptVisitor,
          "/getAdminData": this.handleAdminDataRequest,
          "/getJoinRequests": this.getJoinRequests,
          "/getPubKeys": this.getPubKeys,
          "/getRoomCapacity": this.getRoomCapacity,
          "/lockRoom": this.lockRoom,
          "/motd": this.setMOTD,
          "/ownerKeyRotation": this.ownerKeyRotation,
          "/ownerUnread": this.getOwnerUnreadMessages,
          "/updateRoomCapacity": this.handleRoomCapacityChange,
        }

        let visitorCalls = {
          "/authorizeRoom": this.authorizeRoom,
          "/downloadData": this.downloadAllData,
          "/oldMessages": this.handleOldMessages,
          "/postPubKey": this.postPubKey,
          "/registerDevice": this.registerDevice,
          "/roomlocked": this.isRoomLocked,
          "/storageRequest": this.handleNewStorage,
          "/uploadRoom": this.uploadData
        }

      }
    });
  }

  async handleSession(webSocket: WebSocket, _ip: string) {
    //await this.initialize();
    webSocket.accept()
    // Create our session and add it to the sessions list.
    // We don't send any messages to the client until it has sent us the initial user info
    // message which include the client's pubKey
    let session = { webSocket, blockedMessages: [] }
    this.sessions.push(session)

    let storage = await this.storage.list({ reverse: true, limit: 100, prefix: this.room_id });
    let keys = [...storage.keys()];
    keys.reverse();
    let backlog = {}
    keys.forEach(key => {
      try {
        backlog[key] = jsonParseWrapper(storage.get(key), 'L371');
      } catch (error) {
        webSocket.send(JSON.stringify({ error: '[handleSession()] ' + error.message + '\n' + error.stack }));
      }
    })
    //session.blockedMessages.push(JSON.stringify({...storage}))
    //let backlog = [...storage.values()];
    //backlog.reverse();
    //backlog.forEach(value => {
    //  session.blockedMessages.push(value);
    //});
    session.blockedMessages = [...session.blockedMessages, JSON.stringify(backlog)]
    // Set event handlers to receive messages.
    let receivedUserInfo = false;
    webSocket.addEventListener("message", async msg => {
      try {
        if (session.quit) {
          webSocket.close(1011, "WebSocket broken.");
          return;
        }

        if (!receivedUserInfo) {
          // The first message the client sends is the user info message with their pubKey. Save it
          // into their session object and in the visitor list.
          // webSocket.send(JSON.stringify({error: JSON.stringify(msg)}));
          const data = jsonParseWrapper(msg.data, 'L396');
          if (this.room_owner === null || this.room_owner === "") {
            webSocket.close(4000, "This room does not have an owner, or the owner has not enabled it. You cannot leave messages here.");
          }
          let keys = {
            ownerKey: this.room_owner,
            guestKey: this.verified_guest,
            encryptionKey: this.encryptionKey,
            signKey: this.signKey
          };
          if (data.pem) {
            keys = await this.convertToPem({
              ownerKey: this.room_owner,
              guestKey: this.verified_guest,
              encryptionKey: this.encryptionKey,
              signKey: this.signKey
            });
          }
          if (!data.name) {
            webSocket.close(1000, 'The first message should contain the pubKey')
            return;
          }
          // const isPreviousVisitor = this.visitors.indexOf(data.name) > -1;
          // const isAccepted = this.accepted_requests.indexOf(data.name) > -1;
          let _name;
          try {
            _name = jsonParseWrapper(data.name, 'L412');
          } catch (err) {
            webSocket.close(1000, 'The first message should contain the pubKey in json stringified format')
            return;
          }
          const isPreviousVisitor = this.checkJsonExistence(_name, this.visitors);
          const isAccepted = this.checkJsonExistence(_name, this.accepted_requests);
          if (!isPreviousVisitor && this.visitors.length >= this.config.room_capacity) {
            webSocket.close(4000, 'The room is not accepting any more visitors.');
            return;
          }
          if (!isPreviousVisitor) {
            this.visitors.push(data.name);
            this.storage.put('visitors', JSON.stringify(this.visitors))
          }
          if (this.locked) {
            if (!isAccepted && !isPreviousVisitor) {
              this.join_requests.push(data.name);
              this.storage.put('join_requests', JSON.stringify(this.join_requests));
            } else {
              // const encrypted_key = this.lockedKeys[data.name];
              const encrypted_key = this.lockedKeys[this.getLockedKey(_name)];
              keys['locked_key'] = encrypted_key;
            }

          }
          session.name = data.name;
          webSocket.send(JSON.stringify({ ready: true, keys: keys, motd: this.motd, roomLocked: this.locked }));
          // session.room_id = "" + data.room_id;
          // Deliver all the messages we queued up since the user connected.


          // Note that we've now received the user info message.
          receivedUserInfo = true;

          return;
        } else if (jsonParseWrapper(msg.data, 'L449').ready) {
          if (!session.blockedMessages) {
            return;
          }
          if (this.env.DOCKER_WS) {
            session.blockedMessages.forEach(queued => {
              webSocket.send(queued);
            });
            delete session.blockedMessages;
            return;
          }
          webSocket.send(session.blockedMessages)
          delete session.blockedMessages;
          return;

        }
        this.ownerUnread += 1;
        let ts = Math.max(Date.now(), this.lastTimestamp + 1);
        this.lastTimestamp = ts;
        this.storage.put('lastTimestamp', this.lastTimestamp)
        ts = ts.toString(2);
        while (ts.length < 42) ts = "0" + ts;
        const key = this.room_id + ts;

        let _x = {}
        _x[key] = jsonParseWrapper(msg.data, 'L466');
        this.broadcast(JSON.stringify(_x))
        await this.storage.put(key, msg.data);
        // webSocket.send(JSON.stringify({ error: err.stack }));
        await this.env.MESSAGES_NAMESPACE.put(key, msg.data);
      } catch (error) {
        // Report any exceptions directly back to the client
        let err_msg = '[handleSession()] ' + error.message + '\n' + error.stack + '\n';
        console.log(err_msg);
        try {
          webSocket.send(JSON.stringify({ error: err_msg }));
        } catch {
          console.log("(NOTE - getting error on sending error message back to client)");
        }
      }
    });

    // On "close" and "error" events, remove the WebSocket from the sessions list and broadcast
    // a quit message.
    let closeOrErrorHandler = evt => {
      session.quit = true;
      this.sessions = this.sessions.filter(member => member !== session);
    };
    webSocket.addEventListener("close", closeOrErrorHandler);
    webSocket.addEventListener("error", closeOrErrorHandler);
  }

  // broadcast() broadcasts a message to all clients.
  broadcast(message) {
    if (typeof message !== "string") {
      message = JSON.stringify(message);
    }

    // Iterate over all the sessions sending them messages.
    let quitters = [];
    this.sessions = this.sessions.filter(session => {
      if (session.name) {
        try {
          session.webSocket.send(message);
          if (session.name === this.room_owner) {
            this.ownerUnread -= 1;
          }
          return true;
        } catch (err) {
          session.quit = true;
          quitters.push(session);
          return false;
        }
      } else {
        // This session hasn't sent the initial user info message yet, so we're not sending them
        // messages yet (no secret lurking!). Queue the message to be sent later.
        session.blockedMessages.push(message);
        return true;
      }
    });
    this.storage.put('ownerUnread', this.ownerUnread);
  }

  async handleOldMessages(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const currentMessagesLength = searchParams.get('currentMessagesLength');
      let storage = await this.storage.list({
        reverse: true,
        limit: 100 + currentMessagesLength,
        prefix: this.room_id
      });
      let keys = [...storage.keys()];
      keys = keys.slice(currentMessagesLength);
      keys.reverse();
      let backlog = {}
      keys.forEach(key => {
        try {
          backlog[key] = jsonParseWrapper(storage.get(key), 'L531');
        } catch (error) {
          console.log(error)
        }
      })

      return returnResult(request, JSON.stringify(backlog), 200);
    } catch (error) {
      console.log("Error fetching older messages: ", error)
      return returnResult(request, JSON.stringify({ error: "Could not fetch older messages" }), 500)
    }
  }

  async getKey(type: string) {
    if (this.personalRoom) {
      if (type === 'ledgerKey') {
        return this.env.LEDGER_KEY;
      }
      return await this.storage.get(type);
    }
    if (type === 'ownerKey') {
      let _keys_id = (await this.env.KEYS_NAMESPACE.list({ prefix: this.room_id + '_ownerKey' })).keys.map(key => key.name);
      if (_keys_id.length == 0) {
        return null;
      }
      let keys = _keys_id.map(async key => await this.env.KEYS_NAMESPACE.get(key));
      return await keys[keys.length - 1];
    } else if (type === 'ledgerKey') {
      return await this.env.KEYS_NAMESPACE.get(type);
    }
    return await this.env.KEYS_NAMESPACE.get(this.room_id + '_' + type);
  }

  async postPubKey(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      // const json = await request.json();
      const str = await request.text();
      if (str) {
        const json = await jsonParseWrapper(str, 'L611');
        const keyType = searchParams.get('type');
        if (keyType != null) {
          this.storage.put(keyType, JSON.stringify(json));
          this.initialize();
        }
        return returnResult(request, JSON.stringify({ success: true }), 200);
      } else {
        console.log("ERROR: Received blank body in postPubKey(request) (??)");
        return returnResult(request, JSON.stringify({
          success: false,
          error: '[postPubKey()] Received empty request body (??)\n'
        }), 200);
      }
    } catch (error) {
      console.log("ERROR posting pubKey", error);
      return returnResult(request, JSON.stringify({
        success: false,
        error: '[postPubKey()] ' + error.message + '\n' + error.stack
      }), 200)
    }
  }

  async handleRoomCapacityChange(request: Request) {
    try {
      const { searchParams } = new URL(request.url)
      const newLimit = searchParams.get('capacity')
      this.config.room_capacity = +newLimit
      this.storage.put('room_capacity', this.config.room_capacity)
      return { capacity: newLimit }
    } catch (error) {
      console.log("Could not change room capacity: ", error);
      return returnResult(request, JSON.stringify({ error: "Could not change room capacity" }), 500)
    }
  }

  @APIResponse
  get getRoomCapacity() { return { capacity: this.config.room_capacity } }


  async getOwnerUnreadMessages(request: Request) {
    return returnResult(request, JSON.stringify({ unreadMessages: this.ownerUnread }), 200);
  }

  async getPubKeys(request: Request) {
    return returnResult(request, JSON.stringify({ keys: this.visitors }), 200);
  }

  /**
   * Owner command: accept a visitor to a restricted channel
   */

  async acceptVisitor(request: Request) {
    try {
      let data;
      data = await request.json();
      const ind = this.join_requests.indexOf(data.pubKey);
      if (ind > -1) {
        this.accepted_requests = [...this.accepted_requests, ...this.join_requests.splice(ind, 1)];
        this.lockedKeys[data.pubKey] = data.lockedKey;
        this.storage.put('accepted_requests', JSON.stringify(this.accepted_requests));
        this.storage.put('lockedKeys', this.lockedKeys);
        this.storage.put('join_requests', JSON.stringify(this.join_requests))
        return returnResult(request, JSON.stringify({}), 200);
      }
      return returnResult(request, JSON.stringify({ error: "Could not accept visitor" }), 500)
    } catch (e) {
      console.log("Could not accept visitor: ", e);
      return returnResult(request, JSON.stringify({ error: "Could not accept visitor" }), 500);
    }
  }

  async lockRoom(request: Request) {
    try {
      this.locked = true;
      for (let i = 0; i < this.visitors.length; i++) {
        if (this.accepted_requests.indexOf(this.visitors[i]) < 0 && this.join_requests.indexOf(this.visitors[i]) < 0) {
          this.join_requests.push(this.visitors[i]);
        }
      }
      this.storage.put('join_requests', JSON.stringify(this.join_requests));
      this.storage.put('locked', this.locked)
      return returnResult(request, JSON.stringify({ locked: this.locked }), 200);
    } catch (error) {
      console.log("Could not lock room: ", error);
      return returnResult(request, JSON.stringify({ error: "Could not restrict room" }), 500)
    }
  }

  async getJoinRequests(request: Request) {
    try {
      return returnResult(request, JSON.stringify({ join_requests: this.join_requests }), 200);
    } catch (error) {
      return returnResult(request, JSON.stringify({ error: 'Could not get join requests' }), 500);
    }
  }

  async isRoomLocked(request: Request) {
    try {
      return returnResult(request, JSON.stringify({ locked: this.locked }), 200);
    } catch (error) {
      console.log(error);
      return returnResult(request, JSON.stringify({ error: 'Could not get restricted status' }), 500);
    }
  }

  async setMOTD(request: Request) {
    try {
      let data;
      data = await request.json();

      this.motd = data.motd;
      this.storage.put('motd', this.motd);
      return returnResult(request, JSON.stringify({ motd: this.motd }), 200);
    } catch (e) {
      console.log("Could not set message of the day: ", e)
      return returnResult(request, JSON.stringify({ error: "Could not set message of the day" }), 200);
    }
  }

  async ownerKeyRotation(request: Request) {
    try {
      let _tries = 3;
      let _timeout = 10000;
      let _success = await this.checkRotation(1);
      if (!_success) {
        while (_tries > 0) {
          _tries -= 1;
          _success = await this.checkRotation(_timeout)
          if (_success) {
            break;
          }
          _timeout *= 2;
        }
        if (!_success) {
          return returnResult(request, JSON.stringify({ success: false }), 200);
        }
      }
      const _updatedKey = await this.getKey('ownerKey');
      // this.broadcast(JSON.stringify({ control: true, ownerKeyChanged: true, ownerKey: _updatedKey }));
      this.room_owner = _updatedKey;

      // Now pushing all accepted requests back to join requests
      this.join_requests = [...this.join_requests, ...this.accepted_requests];
      this.accepted_requests = [];
      this.lockedKeys = [];
      this.storage.put('join_requests', JSON.stringify(this.join_requests))
      this.storage.put('lockedKeys', JSON.stringify(this.lockedKeys))
      this.storage.put('accepted_requests', JSON.stringify(this.accepted_requests));
      return returnResult(request, JSON.stringify({ success: true }), 200);
    } catch (error) {
      console.log("Check for owner key rotation failed: ", error);
      return returnResult(request, JSON.stringify({
        success: false,
        error: '[ownerKeyRotation()] ' + error.message + '\n' + error.stack
      }), 200)
    }
  }

  async checkRotation(_timeout) {
    try {
      await new Promise(resolve => setTimeout(resolve, _timeout));
      /* return new Promise((resolve) => {
        setTimeout(async () => {
          if (await this.getKey('ownerKey') !== this.room_owner) {
            resolve(true);
          }
          resolve(false);
        }, _timeout)
      })*/
      return await this.getKey('ownerKey') !== this.room_owner;
    } catch (error) {
      console.log("Error while checking for owner key rotation: ", error)
      return false;
    }
  }

  async handleNewStorage(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const size = searchParams.get('size');
      const storageLimit = this.storageLimit;
      if (size > storageLimit) {
        return returnResult(request, JSON.stringify({ error: 'Not sufficient storage' }), 200);
      }
      this.storageLimit = storageLimit - size;
      this.storage.put('storageLimit', this.storageLimit);
      const token_buffer = crypto.getRandomValues(new Uint8Array(48)).buffer;
      const token_hash_buffer = await crypto.subtle.digest('SHA-256', token_buffer)
      const token_hash = arrayBufferToBase64(token_hash_buffer);
      const kv_data = { used: false, size: size };
      const kv_resp = await this.env.LEDGER_NAMESPACE.put(token_hash, JSON.stringify(kv_data));
      console.log(this.ledgerKey)
      const encrypted_token_id = arrayBufferToBase64(await crypto.subtle.encrypt({ name: "RSA-OAEP" }, this.ledgerKey, token_buffer));
      const hashed_room_id = arrayBufferToBase64(await crypto.subtle.digest('SHA-256', (new TextEncoder).encode(this.room_id)));
      const token = { token_hash: token_hash, hashed_room_id: hashed_room_id, encrypted_token_id: encrypted_token_id };
      return returnResult(request, JSON.stringify(token), 200);
    } catch (error) {
      return returnResult(request, JSON.stringify({ error: '[handleNewStorage()] ' + error.message + '\n' + error.stack }), 500)
    }
  }

  async handleAdminDataRequest(request: Request) {
    try {
      return returnResult(request, JSON.stringify({
        join_requests: this.join_requests,
        capacity: this.room_capacity
      }), 200);
    } catch (error) {
      return returnResult(request, JSON.stringify({ error: 'Could not get admin data' }), 500);
    }
  }

  async verifyCookie(_request: Request) {
    // in newer SB design we do not use cookies to handle "overlords" (SSO)
    return false;
  }

  async verifyAuthSign(request: Request) {
      const authHeader = request.headers.get('authorization')
      if (!authHeader) return false
      let auth_parts = authHeader.split('.');
      if (new Date().getTime() - parseInt(auth_parts[0]) > 60000) return false;
      let sign = auth_parts[1];
      let ownerKey = await crypto.subtle.importKey("jwk", this.room_owner, {
        name: "ECDH",
        namedCurve: "P-384"
      }, false, ["deriveKey"]);
      let roomSignKey = await crypto.subtle.importKey("jwk", this.signKey, {
        name: "ECDH",
        namedCurve: "P-384"
      }, false, ["deriveKey"]);
      let verificationKey = await crypto.subtle.deriveKey(
        {
          name: "ECDH",
          public: ownerKey
        },
        roomSignKey,
        {
          name: "HMAC",
          hash: "SHA-256",
          length: 256
        },
        false,
        ["verify"]);
      return await crypto.subtle.verify("HMAC", verificationKey, base64ToArrayBuffer(sign), new TextEncoder().encode(auth_parts[0]));
  }

  async verifySign(secretKey, sign, contents) {
    try {
      const _sign = base64ToArrayBuffer(decodeURIComponent(sign));
      const encoder = new TextEncoder();
      const encoded = encoder.encode(contents);
      let verified = await crypto.subtle.verify(
        { name: 'ECDSA', hash: 'SHA-256' },
        secretKey,
        _sign,
        encoded
      );
      return verified;
    } catch (e) {
      return false;
    }
  }

  async sign(secretKey, contents) {
    try {
      const encoder = new TextEncoder();
      const encoded = encoder.encode(contents);
      let sign;
      try {
        sign = await crypto.subtle.sign(
          'HMAC',
          secretKey,
          encoded
        );
        return encodeURIComponent(arrayBufferToBase64(sign));
      } catch (error) {
        // console.log(error);
        return { error: "Failed to sign content" };
      }
    } catch (error) {
      // console.log(error);
      return { error: '[sign() ]' + error.message + '\n' + error.stack };
    }
  }

  async jwtSign(payload, secret, options) {
    console.log("Trying to create sign: ", payload, typeof payload, secret, typeof secret)
    if (payload === null || typeof payload !== 'object')
      throw new Error('payload must be an object')
    if (typeof secret !== 'string')
      throw new Error('secret must be a string')
    const importAlgorithm = { name: 'ECDSA', namedCurve: 'P-256', hash: { name: 'SHA-256' } }

    console.log("PAST THROWS")
    payload.iat = Math.floor(Date.now() / 1000)
    this.claimIat = payload.iat;
    this.storage.put("claimIat", this.claimIat)
    const payloadAsJSON = JSON.stringify(payload)
    const partialToken = `${this.jwtStringify(this._utf8ToUint8Array(JSON.stringify({
      alg: options.algorithm,
      kid: options.keyid
    })))}.${this.jwtStringify(this._utf8ToUint8Array(payloadAsJSON))}`
    let keyFormat = 'raw'
    let keyData
    if (secret.startsWith('-----BEGIN')) {
      keyFormat = 'pkcs8'
      keyData = sbCrypto.str2ab(atob(secret.replace(/-----BEGIN.*?-----/g, '').replace(/-----END.*?-----/g, '').replace(/\s/g, '')))
    } else
      keyData = this._utf8ToUint8Array(secret)
    const key = await crypto.subtle.importKey(keyFormat, keyData, importAlgorithm, false, ['sign'])
    console.log("GOT KEY: ", key);
    const signature = await crypto.subtle.sign(importAlgorithm, key, this._utf8ToUint8Array(partialToken))
    return `${partialToken}.${this.jwtStringify(new Uint8Array(signature))}`
  }

  _utf8ToUint8Array(str) {
    return this.jwtParse(btoa(unescape(encodeURIComponent(str))))
  }

  jwtParse(s) {
    return new Uint8Array(Array.prototype.map.call(atob(s.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '')), c => c.charCodeAt(0)))
  }

  jwtStringify(a) {
    return btoa(String.fromCharCode.apply(0, a)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  }

  addNewlines(str) {
    var result = '';
    while (str.length > 64) {
      result += str.substring(0, 64) + '\n';
      str = str.substring(64);
    }
    result += str
    return result;
  }

  /*
  Export the given key and write it into the "exported-key" space.
  */
  async exportPrivateCryptoKey(key) {
    const exported = await crypto.subtle.exportKey(
      "pkcs8",
      key
    );
    const exportedAsString = sbCrypto.ab2str(exported);
    const exportedAsBase64 = this.addNewlines(btoa(exportedAsString))
    const pemExported = `-----BEGIN PRIVATE KEY-----\n${exportedAsBase64}\n-----END PRIVATE KEY-----`;

    return pemExported
  }

  async exportPublicCryptoKey(key) {
    const exported = await crypto.subtle.exportKey(
      "spki",
      key
    );
    const exportedAsString = sbCrypto.ab2str(exported);
    const exportedAsBase64 = this.addNewlines(btoa(exportedAsString));
    const pemExported = `-----BEGIN PUBLIC KEY-----\n${exportedAsBase64}\n-----END PUBLIC KEY-----`;

    return pemExported;
  }

  async convertToPem(keys) {
    let _keys = {};
    for (let key in keys) {
      try {
        if (keys[key] === null || keys[key] === "") {
          continue;
        }
        const keyType = key.split('_').slice(-1)[0];
        let val = typeof keys[key] === 'object' ? keys[key] : jsonParseWrapper(keys[key], 'L956');
        if (keyType === 'encryptionKey') {
          const cryptoKey = await crypto.subtle.importKey("jwk", val, {
            name: "AES-GCM",
            length: 256
          }, true, ['encrypt', 'decrypt']);
          const exported = await crypto.subtle.exportKey("raw", cryptoKey);
          _keys[key] = btoa(sbCrypto.ab2str(exported));
        } else if (keyType === 'signKey') {
          const cryptoKey = await crypto.subtle.importKey("jwk", val, {
            name: "ECDH",
            namedCurve: "P-384"
          }, true, ['deriveKey']);
          const _pemKey = await this.exportPrivateCryptoKey(cryptoKey);
          _keys[key] = _pemKey;
        } else {
          const cryptoKey = await crypto.subtle.importKey("jwk", val, { name: "ECDH", namedCurve: "P-384" }, true, []);
          const _pemKey = await this.exportPublicCryptoKey(cryptoKey);
          _keys[key] = _pemKey;
        }
      } catch {
        _keys[key] = "ERROR"
      }
    }
    return _keys;
  }

  checkJsonExistence(val, arr) {
    for (let i = 0; i < arr.length; i++) {
      try {
        if (sbCrypto.compareKeys(val, jsonParseWrapper(arr[i], 'L1008')))
          return true;
      } catch (err) {
        continue;
      }
    }
    return false;
  }

  getLockedKey(val) {
    for (let key of Object.keys(this.lockedKeys)) {
      if (sbCrypto.compareKeys(val, jsonParseWrapper(key, 'L1019')))
        return this.lockedKeys[key];
    }
    return { error: "Could not find key" };
  }

  registerDevice(request: Request) {
    console.log("Registering device")
    const { searchParams } = new URL(request.url);
    this.deviceIds = [...new Set(this.deviceIds)];
    let deviceId = searchParams.get("id");
    if (!this.deviceIds.includes(deviceId)) {
      this.deviceIds.push(deviceId);
    }
    console.log(this.deviceIds);
    this.storage.put("deviceIds", JSON.stringify(this.deviceIds));
    return returnResult(request, JSON.stringify({ success: true }), 200);
  }

  async downloadAllData(request: Request) {
    let storage = await this.storage.list();
    let data = {
      roomId: this.room_id,
      ownerKey: this.room_owner,
      encryptionKey: this.encryptionKey,
      guestKey: this.verified_guest,
      signKey: this.signKey
    };
    storage.forEach((value, key, map) => {
      data[key] = value;
    });
    if (!this.verifyCookie(request)) {
      delete data.room_capacity;
      delete data.visitors;
      delete data.ownerUnread;
      delete data.join_requests;
      delete data.accepted_requests;
      delete data.storageLimit;
      delete data.lockedKeys;
      delete data.deviceIds;
      delete data.claimIat;
    }
    let dataBlob = new TextEncoder().encode(JSON.stringify(data));
    const corsHeaders = {
      "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
      "Access-Control-Allow-Headers": "Content-Type, authorization",
      "Access-Control-Allow-Origin": request.headers.get("Origin")
    }
    return new Response(dataBlob, { status: 200, headers: corsHeaders });
  }


  async uploadData(request: Request) {
    let _secret = this.env.SERVER_SECRET;
    let data = await request.arrayBuffer();
    let jsonString = new TextDecoder().decode(data);
    let jsonData = jsonParseWrapper(jsonString, 'L1126');
    let roomInitialized = !(this.room_owner === "" || this.room_owner === null);
    let requestAuthorized = jsonData.hasOwnProperty("SERVER_SECRET") && jsonData["SERVER_SECRET"] === _secret;
    let allowed = (roomInitialized && this.room_owner === jsonData["roomOwner"]) || requestAuthorized

    if (allowed) {
      for (let key in jsonData) {
        await this.storage.put(key, jsonData[key]);
      }
      this.personalRoom = true;
      this.storage.put("personalRoom", true);
      this.initialize(this.room_id)
      return returnResult(request, JSON.stringify({ success: true }), 200);
    } else {
      return returnResult(request, JSON.stringify({
        success: false,
        error: !roomInitialized ? "Server secret did not match" : "Room owner needs to upload the room"
      }), 200);
    }
  }

  async authorizeRoom(request: Request) {
    let _secret = this.env.SERVER_SECRET;
    let jsonData = await request.json();
    let requestAuthorized = jsonData.hasOwnProperty("SERVER_SECRET") && jsonData["SERVER_SECRET"] === _secret;
    if (requestAuthorized) {
      for (let key in jsonData) {
        await this.storage.put("room_owner", jsonData["ownerKey"]);
      }
      this.personalRoom = true;
      this.storage.put("personalRoom", true);
      this.room_owner = jsonData["room_owner"];
      return returnResult(request, JSON.stringify({ success: true }), 200);
    } else {
      return returnResult(request, JSON.stringify({ success: false, error: "Server secret did not match" }, 200));
    }
  }
}

function genKey(type, id) {
  const key = "____" + type + "__" + id + "______"
  // console.log(`genKey(): '${key}'`)
  return key
}


export {
  Server
};

export var SBServer = {
  Server: Server
};
