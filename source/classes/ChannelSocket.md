[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / ChannelSocket

# Class: ChannelSocket

ChannelSocket extends Channel. Has same basic functionality as Channel, but
is synchronous and uses websockets, eg lower latency and higher throughput.

You send by calling channel.send(msg: SBMessage | string), i.e. you can
send a quick string.

You can set your message handler upon creation, or later by using
channel.onMessage = (m: Message) => { ... }.

You don't need to worry about managing resources, like closing it, or
checking if it's open. It will close based on server behavior, eg it's up
to the server to close the connection based on inactivity. The
ChannelSocket will re-open if you try to send against a closed connection.

Messages are delivered as type Message if it could be parsed and decrypted;
it can also be a string (typically if a low-level server message, in which
case it will just be forwarded to the message handler).

It also handles a simple ack/nack mechanism with the server transparently.

Be aware that if ChannelSocket doesn't know how to handle a certain
message, it will generally drop it.

## Hierarchy

- [`Channel`](Channel.md)

  ↳ **`ChannelSocket`**

## Table of contents

### Constructors

- [constructor](ChannelSocket.md#constructor)

### Properties

- [channelReady](ChannelSocket.md#channelready)
- [channelServer](ChannelSocket.md#channelserver)
- [channelSocketReady](ChannelSocket.md#channelsocketready)
- [errorState](ChannelSocket.md#errorstate)
- [isClosed](ChannelSocket.md#isclosed)
- [lastTimestampPrefix](ChannelSocket.md#lasttimestampprefix)
- [locked](ChannelSocket.md#locked)
- [protocol](ChannelSocket.md#protocol)
- [sb384Ready](ChannelSocket.md#sb384ready)
- [sbChannelKeysReady](ChannelSocket.md#sbchannelkeysready)
- [sendQueue](ChannelSocket.md#sendqueue)
- [visitors](ChannelSocket.md#visitors)
- [HIGHEST\_TIMESTAMP](ChannelSocket.md#highest_timestamp)
- [LOWEST\_TIMESTAMP](ChannelSocket.md#lowest_timestamp)
- [ReadyFlag](ChannelSocket.md#readyflag)
- [defaultProtocol](ChannelSocket.md#defaultprotocol)
- [timestampRegex](ChannelSocket.md#timestampregex)

### Accessors

- [ChannelReadyFlag](ChannelSocket.md#channelreadyflag)
- [ChannelSocketReadyFlag](ChannelSocket.md#channelsocketreadyflag)
- [SB384ReadyFlag](ChannelSocket.md#sb384readyflag)
- [SBChannelKeysReadyFlag](ChannelSocket.md#sbchannelkeysreadyflag)
- [api](ChannelSocket.md#api)
- [channelData](ChannelSocket.md#channeldata)
- [channelId](ChannelSocket.md#channelid)
- [enableTrace](ChannelSocket.md#enabletrace)
- [handle](ChannelSocket.md#handle)
- [hash](ChannelSocket.md#hash)
- [hashB32](ChannelSocket.md#hashb32)
- [jwkPrivate](ChannelSocket.md#jwkprivate)
- [jwkPublic](ChannelSocket.md#jwkpublic)
- [owner](ChannelSocket.md#owner)
- [ownerChannelId](ChannelSocket.md#ownerchannelid)
- [private](ChannelSocket.md#private)
- [privateKey](ChannelSocket.md#privatekey)
- [publicKey](ChannelSocket.md#publickey)
- [ready](ChannelSocket.md#ready)
- [signKey](ChannelSocket.md#signkey)
- [status](ChannelSocket.md#status)
- [userId](ChannelSocket.md#userid)
- [userPrivateKey](ChannelSocket.md#userprivatekey)
- [userPrivateKeyDehydrated](ChannelSocket.md#userprivatekeydehydrated)
- [userPublicKey](ChannelSocket.md#userpublickey)
- [ySign](ChannelSocket.md#ysign)

### Methods

- [acceptVisitor](ChannelSocket.md#acceptvisitor)
- [budd](ChannelSocket.md#budd)
- [buildApiBody](ChannelSocket.md#buildapibody)
- [callApi](ChannelSocket.md#callapi)
- [close](ChannelSocket.md#close)
- [create](ChannelSocket.md#create)
- [extractMessage](ChannelSocket.md#extractmessage)
- [extractMessageMap](ChannelSocket.md#extractmessagemap)
- [finalizeMessage](ChannelSocket.md#finalizemessage)
- [getAdminData](ChannelSocket.md#getadmindata)
- [getCapacity](ChannelSocket.md#getcapacity)
- [getChannelKeys](ChannelSocket.md#getchannelkeys)
- [getHistory](ChannelSocket.md#gethistory)
- [getLastMessageTimes](ChannelSocket.md#getlastmessagetimes)
- [getLatestTimestamp](ChannelSocket.md#getlatesttimestamp)
- [getMessageKeys](ChannelSocket.md#getmessagekeys)
- [getMessageMap](ChannelSocket.md#getmessagemap)
- [getMother](ChannelSocket.md#getmother)
- [getPage](ChannelSocket.md#getpage)
- [getPubKeys](ChannelSocket.md#getpubkeys)
- [getRawMessageMap](ChannelSocket.md#getrawmessagemap)
- [getStorageLimit](ChannelSocket.md#getstoragelimit)
- [getStorageToken](ChannelSocket.md#getstoragetoken)
- [isLocked](ChannelSocket.md#islocked)
- [lock](ChannelSocket.md#lock)
- [messageQueueManager](ChannelSocket.md#messagequeuemanager)
- [onMessage](ChannelSocket.md#onmessage)
- [packageMessage](ChannelSocket.md#packagemessage)
- [reset](ChannelSocket.md#reset)
- [send](ChannelSocket.md#send)
- [setPage](ChannelSocket.md#setpage)
- [updateCapacity](ChannelSocket.md#updatecapacity)
- [base4StringToDate](ChannelSocket.md#base4stringtodate)
- [base4StringToTimestamp](ChannelSocket.md#base4stringtotimestamp)
- [base4stringToDate](ChannelSocket.md#base4stringtodate-1)
- [composeMessageKey](ChannelSocket.md#composemessagekey)
- [deComposeMessageKey](ChannelSocket.md#decomposemessagekey)
- [getLexicalExtremes](ChannelSocket.md#getlexicalextremes)
- [messageKeySetToPrefix](ChannelSocket.md#messagekeysettoprefix)
- [timestampLongestPrefix](ChannelSocket.md#timestamplongestprefix)
- [timestampToBase4String](ChannelSocket.md#timestamptobase4string)

## Constructors

### constructor

• **new ChannelSocket**(`handleOrKey`, `onMessage`, `protocol?`): [`ChannelSocket`](ChannelSocket.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `handleOrKey` | `string` \| [`SBChannelHandle`](../interfaces/SBChannelHandle.md) |
| `onMessage` | (`m`: `string` \| [`Message`](../interfaces/Message.md)) => `void` |
| `protocol?` | [`SBProtocol`](../interfaces/SBProtocol.md) |

#### Returns

[`ChannelSocket`](ChannelSocket.md)

#### Overrides

[Channel](Channel.md).[constructor](Channel.md#constructor)

## Properties

### channelReady

• **channelReady**: `Promise`\<[`Channel`](Channel.md)\>

#### Inherited from

[Channel](Channel.md).[channelReady](Channel.md#channelready)

___

### channelServer

• **channelServer**: `string`

#### Inherited from

[Channel](Channel.md).[channelServer](Channel.md#channelserver)

___

### channelSocketReady

• **channelSocketReady**: `Promise`\<[`ChannelSocket`](ChannelSocket.md)\>

___

### errorState

• **errorState**: `boolean` = `false`

#### Inherited from

[Channel](Channel.md).[errorState](Channel.md#errorstate)

___

### isClosed

• **isClosed**: `boolean` = `false`

#### Inherited from

[Channel](Channel.md).[isClosed](Channel.md#isclosed)

___

### lastTimestampPrefix

• **lastTimestampPrefix**: `string`

___

### locked

• `Optional` **locked**: `boolean` = `false`

#### Inherited from

[Channel](Channel.md).[locked](Channel.md#locked)

___

### protocol

• `Optional` **protocol**: [`SBProtocol`](../interfaces/SBProtocol.md) = `Channel.defaultProtocol`

#### Inherited from

[Channel](Channel.md).[protocol](Channel.md#protocol)

___

### sb384Ready

• **sb384Ready**: `Promise`\<[`SB384`](SB384.md)\>

#### Inherited from

[Channel](Channel.md).[sb384Ready](Channel.md#sb384ready)

___

### sbChannelKeysReady

• **sbChannelKeysReady**: `Promise`\<[`SBChannelKeys`](SBChannelKeys.md)\>

#### Inherited from

[Channel](Channel.md).[sbChannelKeysReady](Channel.md#sbchannelkeysready)

___

### sendQueue

• **sendQueue**: [`MessageQueue`](MessageQueue.md)\<`EnqueuedMessage`\>

#### Inherited from

[Channel](Channel.md).[sendQueue](Channel.md#sendqueue)

___

### visitors

• **visitors**: `Map`\<`string`, `string`\>

#### Inherited from

[Channel](Channel.md).[visitors](Channel.md#visitors)

___

### HIGHEST\_TIMESTAMP

▪ `Static` **HIGHEST\_TIMESTAMP**: `string`

Returns the 'lowest' possible timestamp.

#### Inherited from

[Channel](Channel.md).[HIGHEST_TIMESTAMP](Channel.md#highest_timestamp)

___

### LOWEST\_TIMESTAMP

▪ `Static` **LOWEST\_TIMESTAMP**: `string`

Returns the 'lowest' possible timestamp.

#### Inherited from

[Channel](Channel.md).[LOWEST_TIMESTAMP](Channel.md#lowest_timestamp)

___

### ReadyFlag

▪ `Static` **ReadyFlag**: `symbol`

#### Overrides

[Channel](Channel.md).[ReadyFlag](Channel.md#readyflag)

___

### defaultProtocol

▪ `Static` **defaultProtocol**: [`SBProtocol`](../interfaces/SBProtocol.md)

#### Inherited from

[Channel](Channel.md).[defaultProtocol](Channel.md#defaultprotocol)

___

### timestampRegex

▪ `Static` **timestampRegex**: `RegExp`

#### Inherited from

[Channel](Channel.md).[timestampRegex](Channel.md#timestampregex)

## Accessors

### ChannelReadyFlag

• `get` **ChannelReadyFlag**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Channel.ChannelReadyFlag

___

### ChannelSocketReadyFlag

• `get` **ChannelSocketReadyFlag**(): `boolean`

#### Returns

`boolean`

___

### SB384ReadyFlag

• `get` **SB384ReadyFlag**(): `any`

#### Returns

`any`

#### Inherited from

Channel.SB384ReadyFlag

___

### SBChannelKeysReadyFlag

• `get` **SBChannelKeysReadyFlag**(): `any`

#### Returns

`any`

#### Inherited from

Channel.SBChannelKeysReadyFlag

___

### api

• `get` **api**(): `this`

#### Returns

`this`

#### Inherited from

Channel.api

___

### channelData

• `get` **channelData**(): [`SBChannelData`](../interfaces/SBChannelData.md)

#### Returns

[`SBChannelData`](../interfaces/SBChannelData.md)

#### Inherited from

Channel.channelData

___

### channelId

• `get` **channelId**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Inherited from

Channel.channelId

___

### enableTrace

• `set` **enableTrace**(`b`): `void`

Enables debug output

#### Parameters

| Name | Type |
| :------ | :------ |
| `b` | `boolean` |

#### Returns

`void`

___

### handle

• `get` **handle**(): [`SBChannelHandle`](../interfaces/SBChannelHandle.md)

#### Returns

[`SBChannelHandle`](../interfaces/SBChannelHandle.md)

#### Inherited from

Channel.handle

___

### hash

• `get` **hash**(): `string`

Returns a unique identifier for external use, that will be unique
for any class or object that uses SB384 as it's root.

This is deterministic. Typical use case is to translate a user id
into a ChannelId (eg the channel that any user id is inherently
the owner of).

The hash is base62 encoding of the SHA-384 hash of the public key.

#### Returns

`string`

#### Inherited from

Channel.hash

___

### hashB32

• `get` **hashB32**(): `string`

Similar to [SB384.hash](SB384.md#hash), but base32 encoded.

#### Returns

`string`

#### Inherited from

Channel.hashB32

___

### jwkPrivate

• `get` **jwkPrivate**(): `JsonWebKey`

#### Returns

`JsonWebKey`

#### Inherited from

Channel.jwkPrivate

___

### jwkPublic

• `get` **jwkPublic**(): `JsonWebKey`

#### Returns

`JsonWebKey`

#### Inherited from

Channel.jwkPublic

___

### owner

• `get` **owner**(): `undefined` \| `boolean` \| ``""``

#### Returns

`undefined` \| `boolean` \| ``""``

#### Inherited from

Channel.owner

___

### ownerChannelId

• `get` **ownerChannelId**(): `string`

ChannelID that corresponds to this, if it's an owner

#### Returns

`string`

#### Inherited from

Channel.ownerChannelId

___

### private

• `get` **private**(): `boolean`

Returns true if this is a private key, otherwise false.
Will throw an exception if the object is not ready.

#### Returns

`boolean`

#### Inherited from

Channel.private

___

### privateKey

• `get` **privateKey**(): `CryptoKey`

#### Returns

`CryptoKey`

#### Inherited from

Channel.privateKey

___

### publicKey

• `get` **publicKey**(): `CryptoKey`

#### Returns

`CryptoKey`

#### Inherited from

Channel.publicKey

___

### ready

• `get` **ready**(): `Promise`\<[`ChannelSocket`](ChannelSocket.md)\>

#### Returns

`Promise`\<[`ChannelSocket`](ChannelSocket.md)\>

#### Overrides

Channel.ready

___

### signKey

• `get` **signKey**(): `CryptoKey`

#### Returns

`CryptoKey`

#### Inherited from

Channel.signKey

___

### status

• `get` **status**(): ``"CLOSED"`` \| ``"CONNECTING"`` \| ``"OPEN"`` \| ``"CLOSING"``

#### Returns

``"CLOSED"`` \| ``"CONNECTING"`` \| ``"OPEN"`` \| ``"CLOSING"``

___

### userId

• `get` **userId**(): `string`

#### Returns

`string`

#### Inherited from

Channel.userId

___

### userPrivateKey

• `get` **userPrivateKey**(): `string`

Wire format of full info of key (eg private key). Compressed.

#### Returns

`string`

#### Inherited from

Channel.userPrivateKey

___

### userPrivateKeyDehydrated

• `get` **userPrivateKeyDehydrated**(): `string`

Compressed and dehydrated, meaning, 'x' needs to come from another source.
(If lost it can be reconstructed from 'd')

#### Returns

`string`

#### Inherited from

Channel.userPrivateKeyDehydrated

___

### userPublicKey

• `get` **userPublicKey**(): `string`

Wire format of full (decodable) public key

#### Returns

`string`

#### Inherited from

Channel.userPublicKey

___

### ySign

• `get` **ySign**(): ``0`` \| ``1``

#### Returns

``0`` \| ``1``

#### Inherited from

Channel.ySign

## Methods

### acceptVisitor

▸ **acceptVisitor**(`userId`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |

#### Returns

`Promise`\<`any`\>

#### Inherited from

[Channel](Channel.md).[acceptVisitor](Channel.md#acceptvisitor)

___

### budd

▸ **budd**(`options?`): `Promise`\<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

"budd" will spin a channel off an existing one that you own,
or transfer storage budget to an existing channel.

You need to provide one of the following combinations of info:

- nothing: creates new channel with minmal permitted budget
- just storage amount: creates new channel with that amount, returns new channel
- just a target channel: moves a chunk of storage to that channel (see below)
- target channel and storage amount: moves that amount to that channel
- keys and storage amount: creates new channel with those keys and that storage amount

If you want to budd into a channel with specific keys, you'll need to
create a new set of keys (SBChannelKeys) and pass the SBChannelData from that.

It returns a complete SBChannelHandle, which will include the private key

Another way to remember the above: all combinations are valid except
both a target channel and assigning keys.

In terms of 'keys', you can provide a JsonWebKey, or a SBUserPrivateKey,
or a channel handle. JWK is there for backwards compatibility.

Note: if you're specifying the target channel, then the return values will
not include the private key (that return value will be empty).

Note: the owner of the target channel will get a message that you budded
into their channel, which includes the channelId it was budded from.

Note: a negative storage amount is interpreted as 'leave that much behind'.

Any indications that your parameters are wrong will result in a rejected
promise. This includes if you ask for more storage than is there, or if
your negative value is more than the storage budget that's there. 

If the budget and target channels are the same, it will throw.

If you omit budget size, it will use the smallest allowed new channel
storage (currently 32 MB). This will happens regardless of if you are
creating a new channel, or 'depositing'.

If you give the size value of 'Infinity', then all the storage available
on the source channel will be transferred to the target channel
(aka 'plunder').

On the server side, budd is in two steps, first extracting the storage
budget from the mother channel, and then creating or transferring the
storage budget to the target channel.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Object` |
| `options.size?` | `number` |
| `options.targetChannel?` | [`SBChannelHandle`](../interfaces/SBChannelHandle.md) |

#### Returns

`Promise`\<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

#### Inherited from

[Channel](Channel.md).[budd](Channel.md#budd)

___

### buildApiBody

▸ **buildApiBody**(`path`, `apiPayload?`): `Promise`\<[`ChannelApiBody`](../interfaces/ChannelApiBody.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `apiPayload?` | `any` |

#### Returns

`Promise`\<[`ChannelApiBody`](../interfaces/ChannelApiBody.md)\>

#### Inherited from

[Channel](Channel.md).[buildApiBody](Channel.md#buildapibody)

___

### callApi

▸ **callApi**(`path`): `Promise`\<`any`\>

Implements Channel api calls.

Note that the API call details are also embedded in the ChannelMessage,
and signed by the sender, completely separate from HTTP etc auth.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`Promise`\<`any`\>

#### Inherited from

[Channel](Channel.md).[callApi](Channel.md#callapi)

▸ **callApi**(`path`, `apiPayload`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `apiPayload` | `any` |

#### Returns

`Promise`\<`any`\>

#### Inherited from

[Channel](Channel.md).[callApi](Channel.md#callapi)

___

### close

▸ **close**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

[Channel](Channel.md).[close](Channel.md#close)

___

### create

▸ **create**(`storageToken`, `channelServer?`): `Promise`\<[`Channel`](Channel.md)\>

Authorizes/registers this channel on the provided server

#### Parameters

| Name | Type |
| :------ | :------ |
| `storageToken` | [`SBStorageToken`](../interfaces/SBStorageToken.md) |
| `channelServer` | `string` |

#### Returns

`Promise`\<[`Channel`](Channel.md)\>

#### Inherited from

[Channel](Channel.md).[create](Channel.md#create)

___

### extractMessage

▸ **extractMessage**(`msgRaw`): `Promise`\<`undefined` \| [`Message`](../interfaces/Message.md)\>

Takes a 'ChannelMessage' format and presents it as a 'Message'. Does a
variety of things. If there is any issue, will return 'undefined', and you
should probably just ignore that message. Only requirement is you extract
payload before calling this (some callees needs to, or wants to, fill in
things in ChannelMessage)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msgRaw` | `undefined` \| [`ChannelMessage`](../interfaces/ChannelMessage.md) |

#### Returns

`Promise`\<`undefined` \| [`Message`](../interfaces/Message.md)\>

#### Inherited from

[Channel](Channel.md).[extractMessage](Channel.md#extractmessage)

___

### extractMessageMap

▸ **extractMessageMap**(`msgMap`): `Promise`\<`Map`\<`string`, [`Message`](../interfaces/Message.md)\>\>

Applies 'extractMessage()' to a map of messages.

#### Parameters

| Name | Type |
| :------ | :------ |
| `msgMap` | `Map`\<`string`, [`ChannelMessage`](../interfaces/ChannelMessage.md)\> |

#### Returns

`Promise`\<`Map`\<`string`, [`Message`](../interfaces/Message.md)\>\>

#### Inherited from

[Channel](Channel.md).[extractMessageMap](Channel.md#extractmessagemap)

___

### finalizeMessage

▸ **finalizeMessage**(`msg`): `Promise`\<[`ChannelMessage`](../interfaces/ChannelMessage.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | [`ChannelMessage`](../interfaces/ChannelMessage.md) |

#### Returns

`Promise`\<[`ChannelMessage`](../interfaces/ChannelMessage.md)\>

#### Inherited from

[Channel](Channel.md).[finalizeMessage](Channel.md#finalizemessage)

___

### getAdminData

▸ **getAdminData**(): `Promise`\<[`ChannelAdminData`](../interfaces/ChannelAdminData.md)\>

#### Returns

`Promise`\<[`ChannelAdminData`](../interfaces/ChannelAdminData.md)\>

#### Inherited from

[Channel](Channel.md).[getAdminData](Channel.md#getadmindata)

___

### getCapacity

▸ **getCapacity**(): `Promise`\<`any`\>

#### Returns

`Promise`\<`any`\>

#### Inherited from

[Channel](Channel.md).[getCapacity](Channel.md#getcapacity)

___

### getChannelKeys

▸ **getChannelKeys**(): `Promise`\<[`SBChannelData`](../interfaces/SBChannelData.md)\>

#### Returns

`Promise`\<[`SBChannelData`](../interfaces/SBChannelData.md)\>

#### Inherited from

[Channel](Channel.md).[getChannelKeys](Channel.md#getchannelkeys)

___

### getHistory

▸ **getHistory**(): `Promise`\<[`MessageHistoryDirectory`](../interfaces/MessageHistoryDirectory.md)\>

Returns map of message keys from the server corresponding to the request.

#### Returns

`Promise`\<[`MessageHistoryDirectory`](../interfaces/MessageHistoryDirectory.md)\>

#### Inherited from

[Channel](Channel.md).[getHistory](Channel.md#gethistory)

___

### getLastMessageTimes

▸ **getLastMessageTimes**(): `void`

Deprecated. Would take an array of channelIds and get latest time stamp from all of them

#### Returns

`void`

#### Inherited from

[Channel](Channel.md).[getLastMessageTimes](Channel.md#getlastmessagetimes)

___

### getLatestTimestamp

▸ **getLatestTimestamp**(): `Promise`\<`string`\>

Gets the latest known timestamp on the server. Returns it in prefix string format.

#### Returns

`Promise`\<`string`\>

#### Inherited from

[Channel](Channel.md).[getLatestTimestamp](Channel.md#getlatesttimestamp)

___

### getMessageKeys

▸ **getMessageKeys**(`prefix?`): `Promise`\<\{ `historyShard`: [`SBObjectHandle`](../interfaces/SBObjectHandle.md) ; `keys`: `Set`\<`string`\>  }\>

Returns map of message keys from the server corresponding to the request.
Takes a single optional parameter, which is the time stamp prefix for which
a set is requested. If not provided, the default is '0' (which corresponds
to entire history). The return data structure includes the map of message
keys, and the current history shard (which is 'null' if there is none).

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `prefix` | `string` | `'0'` |

#### Returns

`Promise`\<\{ `historyShard`: [`SBObjectHandle`](../interfaces/SBObjectHandle.md) ; `keys`: `Set`\<`string`\>  }\>

#### Inherited from

[Channel](Channel.md).[getMessageKeys](Channel.md#getmessagekeys)

___

### getMessageMap

▸ **getMessageMap**(`messageKeys`): `Promise`\<`Map`\<`string`, [`Message`](../interfaces/Message.md)\>\>

Main function for getting a chunk of messages from the server.

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageKeys` | `Set`\<`string`\> |

#### Returns

`Promise`\<`Map`\<`string`, [`Message`](../interfaces/Message.md)\>\>

#### Inherited from

[Channel](Channel.md).[getMessageMap](Channel.md#getmessagemap)

___

### getMother

▸ **getMother**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

#### Inherited from

[Channel](Channel.md).[getMother](Channel.md#getmother)

___

### getPage

▸ **getPage**(): `Promise`\<`any`\>

Note that 'getPage' can be done without any authentication, in which
case have a look at Snackabra.getPage(). If however the Page is locked,
you need to access it through this ChannelApi entry point.

But conversely, we don't need a prefix or anything else, since
we know the channel. So .. we can just shoot this off.

Note that a 'Page' might be mime-typed, in which case you should
use a regular fetch() call and handle results accordingly. This
function is for 'sb384payloadV3' only.

#### Returns

`Promise`\<`any`\>

#### Inherited from

[Channel](Channel.md).[getPage](Channel.md#getpage)

___

### getPubKeys

▸ **getPubKeys**(): `Promise`\<`Map`\<`string`, `string`\>\>

#### Returns

`Promise`\<`Map`\<`string`, `string`\>\>

#### Inherited from

[Channel](Channel.md).[getPubKeys](Channel.md#getpubkeys)

___

### getRawMessageMap

▸ **getRawMessageMap**(`messageKeys`): `Promise`\<`Map`\<`string`, `ArrayBuffer`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageKeys` | `Set`\<`string`\> |

#### Returns

`Promise`\<`Map`\<`string`, `ArrayBuffer`\>\>

#### Inherited from

[Channel](Channel.md).[getRawMessageMap](Channel.md#getrawmessagemap)

___

### getStorageLimit

▸ **getStorageLimit**(): `Promise`\<`any`\>

#### Returns

`Promise`\<`any`\>

#### Inherited from

[Channel](Channel.md).[getStorageLimit](Channel.md#getstoragelimit)

___

### getStorageToken

▸ **getStorageToken**(`size`): `Promise`\<[`SBStorageToken`](../interfaces/SBStorageToken.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number` |

#### Returns

`Promise`\<[`SBStorageToken`](../interfaces/SBStorageToken.md)\>

#### Inherited from

[Channel](Channel.md).[getStorageToken](Channel.md#getstoragetoken)

___

### isLocked

▸ **isLocked**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

[Channel](Channel.md).[isLocked](Channel.md#islocked)

___

### lock

▸ **lock**(): `Promise`\<\{ `success`: `boolean`  }\>

#### Returns

`Promise`\<\{ `success`: `boolean`  }\>

#### Inherited from

[Channel](Channel.md).[lock](Channel.md#lock)

___

### messageQueueManager

▸ **messageQueueManager**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

[Channel](Channel.md).[messageQueueManager](Channel.md#messagequeuemanager)

___

### onMessage

▸ **onMessage**(`_m`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_m` | `string` \| [`Message`](../interfaces/Message.md) |

#### Returns

`void`

___

### packageMessage

▸ **packageMessage**(`contents`, `options?`): [`ChannelMessage`](../interfaces/ChannelMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `contents` | `any` |
| `options` | [`MessageOptions`](../interfaces/MessageOptions.md) |

#### Returns

[`ChannelMessage`](../interfaces/ChannelMessage.md)

#### Inherited from

[Channel](Channel.md).[packageMessage](Channel.md#packagemessage)

___

### reset

▸ **reset**(): `void`

Reconnects (resets) a ChannelSocket. This will not block (it's
synchronous), and 'ready' will resolve when the socket is ready again.

#### Returns

`void`

___

### send

▸ **send**(`contents`, `options?`): `Promise`\<`string`\>

ChannelSocket.send()

Returns a promise that resolves to "success" when sent,
or an error message if it fails.

#### Parameters

| Name | Type |
| :------ | :------ |
| `contents` | `any` |
| `options?` | [`MessageOptions`](../interfaces/MessageOptions.md) |

#### Returns

`Promise`\<`string`\>

#### Overrides

[Channel](Channel.md).[send](Channel.md#send)

___

### setPage

▸ **setPage**(`options`): `Promise`\<`any`\>

Sets 'page' as the Channel's 'page' response. If type is provided, it will
be used as the 'Content-Type' header in the HTTP request when retrieved;
also, if the type is 'text-like', it will be recoded to UTF-8 before
delivery. Prefix indicates the smallest number of acceptable characters in
the link. Default is 12, shortest is 6.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.page` | `any` |
| `options.prefix?` | `number` |
| `options.type?` | `string` |

#### Returns

`Promise`\<`any`\>

#### Inherited from

[Channel](Channel.md).[setPage](Channel.md#setpage)

___

### updateCapacity

▸ **updateCapacity**(`capacity`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `capacity` | `number` |

#### Returns

`Promise`\<`any`\>

#### Inherited from

[Channel](Channel.md).[updateCapacity](Channel.md#updatecapacity)

___

### base4StringToDate

▸ **base4StringToDate**(`tsStr`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tsStr` | `string` |

#### Returns

`string`

#### Inherited from

[Channel](Channel.md).[base4StringToDate](Channel.md#base4stringtodate)

___

### base4StringToTimestamp

▸ **base4StringToTimestamp**(`tsStr`): `number`

Reverse of timestampToBase4String. Strict about the format
(needs to be `[0-3]{26}`), returns 0 if there's any issue.

#### Parameters

| Name | Type |
| :------ | :------ |
| `tsStr` | `string` |

#### Returns

`number`

#### Inherited from

[Channel](Channel.md).[base4StringToTimestamp](Channel.md#base4stringtotimestamp)

___

### base4stringToDate

▸ **base4stringToDate**(`tsStr`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tsStr` | `string` |

#### Returns

`string`

#### Inherited from

[Channel](Channel.md).[base4stringToDate](Channel.md#base4stringtodate-1)

___

### composeMessageKey

▸ **composeMessageKey**(`channelId`, `timestamp`, `subChannel?`): `string`

Creates a 'message key' from constituent parts.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `channelId` | `string` | `undefined` |
| `timestamp` | `number` | `undefined` |
| `subChannel` | `string` | `'____'` |

#### Returns

`string`

#### Inherited from

[Channel](Channel.md).[composeMessageKey](Channel.md#composemessagekey)

___

### deComposeMessageKey

▸ **deComposeMessageKey**(`key`): `Object`

Teases apart the three elements of a channel message key. Note, this does not
throw if there's an issue, it just sets all the parts to '', which should
never occur. Up to you if you want to run with that result or assert on it.
Strict about the format (defined as `[a-zA-Z0-9]{43}_[_a-zA-Z0-9]{4}_[0-3]{26}`).

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `channelId` | `string` |
| `i2` | `string` |
| `timestamp` | `string` |

#### Inherited from

[Channel](Channel.md).[deComposeMessageKey](Channel.md#decomposemessagekey)

___

### getLexicalExtremes

▸ **getLexicalExtremes**\<`T`\>(`set`): [] \| [`T`, `T`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` \| `number` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `set` | `Set`\<`T`\> |

#### Returns

[] \| [`T`, `T`]

#### Inherited from

[Channel](Channel.md).[getLexicalExtremes](Channel.md#getlexicalextremes)

___

### messageKeySetToPrefix

▸ **messageKeySetToPrefix**(`keys`): `string`

Given a set of (full) keys, reviews all the timestamp prefixes, and returns
the shortest prefix that would range all the keys in the set.

#### Parameters

| Name | Type |
| :------ | :------ |
| `keys` | `Set`\<`string`\> |

#### Returns

`string`

#### Inherited from

[Channel](Channel.md).[messageKeySetToPrefix](Channel.md#messagekeysettoprefix)

___

### timestampLongestPrefix

▸ **timestampLongestPrefix**(`s1`, `s2`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `s1` | `string` |
| `s2` | `string` |

#### Returns

`string`

#### Inherited from

[Channel](Channel.md).[timestampLongestPrefix](Channel.md#timestamplongestprefix)

___

### timestampToBase4String

▸ **timestampToBase4String**(`tsNum`): `string`

Converts from timestamp to 'base 4' string used in message IDs.

Time stamps are monotonically increasing. We enforce that they must be
different. Stored as a string of [0-3] to facilitate prefix searches (within
4x time ranges). We append "0000" for future needs, for example if we need
above 1000 messages per second. Can represent epoch timestamps for the next
400+ years. Currently the appended "0000" is stripped/ignored.

#### Parameters

| Name | Type |
| :------ | :------ |
| `tsNum` | `number` |

#### Returns

`string`

#### Inherited from

[Channel](Channel.md).[timestampToBase4String](Channel.md#timestamptobase4string)
