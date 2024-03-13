[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / Channel

# Class: Channel

Channels are the core communication and 'read/write' object.

The Channel class communicates asynchronously with the channel.

The ChannelSocket class is a subclass of Channel, and it communicates
synchronously (via websockets).

Protocol is called for every message to get the CryptoKey to use for that
message; if provided, then it's the default for each message. Individual
messages can override this. Upon sending, one or the other needs to be there.
The default protocol is Protocol_ECDH, which does basic sender-receipient
public key encryption.

The interface equivalent of a Channel is [SBChannelHandle](../interfaces/SBChannelHandle.md).

Note that you don't need to worry about what API calls involve race
conditions and which don't, the library will do that for you. Like most
classes in SB it follows the "ready" template: objects can be used right
away, but they decide for themselves if they're ready or not. The SB384 state
is the *user* of the channel, not the channel itself; it has an Owner (also
SB384 object), which can be the same as the user/visitor, but that requires
finalizing creating the channel to find out (from the channel server).

## Hierarchy

- [`SBChannelKeys`](SBChannelKeys.md)

  ↳ **`Channel`**

  ↳↳ [`ChannelSocket`](ChannelSocket.md)

## Table of contents

### Constructors

- [constructor](Channel.md#constructor)

### Properties

- [channelReady](Channel.md#channelready)
- [channelServer](Channel.md#channelserver)
- [errorState](Channel.md#errorstate)
- [isClosed](Channel.md#isclosed)
- [locked](Channel.md#locked)
- [protocol](Channel.md#protocol)
- [sb384Ready](Channel.md#sb384ready)
- [sbChannelKeysReady](Channel.md#sbchannelkeysready)
- [sendQueue](Channel.md#sendqueue)
- [visitors](Channel.md#visitors)
- [HIGHEST\_TIMESTAMP](Channel.md#highest_timestamp)
- [LOWEST\_TIMESTAMP](Channel.md#lowest_timestamp)
- [ReadyFlag](Channel.md#readyflag)
- [defaultProtocol](Channel.md#defaultprotocol)
- [timestampRegex](Channel.md#timestampregex)

### Accessors

- [ChannelReadyFlag](Channel.md#channelreadyflag)
- [SB384ReadyFlag](Channel.md#sb384readyflag)
- [SBChannelKeysReadyFlag](Channel.md#sbchannelkeysreadyflag)
- [api](Channel.md#api)
- [channelData](Channel.md#channeldata)
- [channelId](Channel.md#channelid)
- [handle](Channel.md#handle)
- [hash](Channel.md#hash)
- [hashB32](Channel.md#hashb32)
- [jwkPrivate](Channel.md#jwkprivate)
- [jwkPublic](Channel.md#jwkpublic)
- [owner](Channel.md#owner)
- [ownerChannelId](Channel.md#ownerchannelid)
- [private](Channel.md#private)
- [privateKey](Channel.md#privatekey)
- [publicKey](Channel.md#publickey)
- [ready](Channel.md#ready)
- [signKey](Channel.md#signkey)
- [userId](Channel.md#userid)
- [userPrivateKey](Channel.md#userprivatekey)
- [userPrivateKeyDehydrated](Channel.md#userprivatekeydehydrated)
- [userPublicKey](Channel.md#userpublickey)
- [ySign](Channel.md#ysign)

### Methods

- [acceptVisitor](Channel.md#acceptvisitor)
- [budd](Channel.md#budd)
- [buildApiBody](Channel.md#buildapibody)
- [callApi](Channel.md#callapi)
- [close](Channel.md#close)
- [create](Channel.md#create)
- [extractMessage](Channel.md#extractmessage)
- [extractMessageMap](Channel.md#extractmessagemap)
- [finalizeMessage](Channel.md#finalizemessage)
- [getAdminData](Channel.md#getadmindata)
- [getCapacity](Channel.md#getcapacity)
- [getChannelKeys](Channel.md#getchannelkeys)
- [getHistory](Channel.md#gethistory)
- [getLastMessageTimes](Channel.md#getlastmessagetimes)
- [getLatestTimestamp](Channel.md#getlatesttimestamp)
- [getMessageKeys](Channel.md#getmessagekeys)
- [getMessageMap](Channel.md#getmessagemap)
- [getMother](Channel.md#getmother)
- [getPage](Channel.md#getpage)
- [getPubKeys](Channel.md#getpubkeys)
- [getRawMessageMap](Channel.md#getrawmessagemap)
- [getStorageLimit](Channel.md#getstoragelimit)
- [getStorageToken](Channel.md#getstoragetoken)
- [isLocked](Channel.md#islocked)
- [lock](Channel.md#lock)
- [messageQueueManager](Channel.md#messagequeuemanager)
- [packageMessage](Channel.md#packagemessage)
- [send](Channel.md#send)
- [setPage](Channel.md#setpage)
- [updateCapacity](Channel.md#updatecapacity)
- [base4StringToDate](Channel.md#base4stringtodate)
- [base4StringToTimestamp](Channel.md#base4stringtotimestamp)
- [base4stringToDate](Channel.md#base4stringtodate-1)
- [composeMessageKey](Channel.md#composemessagekey)
- [deComposeMessageKey](Channel.md#decomposemessagekey)
- [getLexicalExtremes](Channel.md#getlexicalextremes)
- [messageKeySetToPrefix](Channel.md#messagekeysettoprefix)
- [timestampLongestPrefix](Channel.md#timestamplongestprefix)
- [timestampToBase4String](Channel.md#timestamptobase4string)

## Constructors

### constructor

• **new Channel**(): [`Channel`](Channel.md)

Channel supports creation from scratch, from a handle, or from a key.
With no parameters, you're creating a channel from scratch, which
means in particular it creates the Owner keys. The resulting object
can be recreated from `channel.userPrivateKey`. A from-scratch
Channel is an "abstract" object, a mathematical construct, it isn't
yet hosted anywhere. But it's guaranteed to be globally unique.

#### Returns

[`Channel`](Channel.md)

#### Overrides

[SBChannelKeys](SBChannelKeys.md).[constructor](SBChannelKeys.md#constructor)

• **new Channel**(`newChannel`, `protocol`): [`Channel`](Channel.md)

In the special case where you want to create a Channel from scratch,
and immediately start using it, you can directly pass a protocol and
mark absense of a handle with `null`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `newChannel` | ``null`` |
| `protocol` | [`SBProtocol`](../interfaces/SBProtocol.md) |

#### Returns

[`Channel`](Channel.md)

#### Overrides

SBChannelKeys.constructor

• **new Channel**(`key`, `protocol?`): [`Channel`](Channel.md)

If you are re-createating a Channel from the Owner private key, you
can so so directly.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `protocol?` | [`SBProtocol`](../interfaces/SBProtocol.md) |

#### Returns

[`Channel`](Channel.md)

#### Overrides

SBChannelKeys.constructor

• **new Channel**(`handle`, `protocol?`): [`Channel`](Channel.md)

If you have a full (or partial) handle present, you can use that as well;
for example it might already contain the name of a specific channel server,
the ChannelData from that server for the channel, etc. This is also the
quickest way, since bootstrapping from keys requires more crypto.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handle` | [`SBChannelHandle`](../interfaces/SBChannelHandle.md) | SBChannelHandle |
| `protocol?` | [`SBProtocol`](../interfaces/SBProtocol.md) | SBProtocol |

#### Returns

[`Channel`](Channel.md)

#### Overrides

SBChannelKeys.constructor

## Properties

### channelReady

• **channelReady**: `Promise`\<[`Channel`](Channel.md)\>

___

### channelServer

• **channelServer**: `string`

#### Inherited from

[SBChannelKeys](SBChannelKeys.md).[channelServer](SBChannelKeys.md#channelserver)

___

### errorState

• **errorState**: `boolean` = `false`

#### Inherited from

[SBChannelKeys](SBChannelKeys.md).[errorState](SBChannelKeys.md#errorstate)

___

### isClosed

• **isClosed**: `boolean` = `false`

___

### locked

• `Optional` **locked**: `boolean` = `false`

___

### protocol

• `Optional` **protocol**: [`SBProtocol`](../interfaces/SBProtocol.md) = `Channel.defaultProtocol`

___

### sb384Ready

• **sb384Ready**: `Promise`\<[`SB384`](SB384.md)\>

#### Inherited from

[SBChannelKeys](SBChannelKeys.md).[sb384Ready](SBChannelKeys.md#sb384ready)

___

### sbChannelKeysReady

• **sbChannelKeysReady**: `Promise`\<[`SBChannelKeys`](SBChannelKeys.md)\>

#### Inherited from

[SBChannelKeys](SBChannelKeys.md).[sbChannelKeysReady](SBChannelKeys.md#sbchannelkeysready)

___

### sendQueue

• **sendQueue**: [`MessageQueue`](MessageQueue.md)\<`EnqueuedMessage`\>

___

### visitors

• **visitors**: `Map`\<`string`, `string`\>

___

### HIGHEST\_TIMESTAMP

▪ `Static` **HIGHEST\_TIMESTAMP**: `string`

Returns the 'lowest' possible timestamp.

___

### LOWEST\_TIMESTAMP

▪ `Static` **LOWEST\_TIMESTAMP**: `string`

Returns the 'lowest' possible timestamp.

___

### ReadyFlag

▪ `Static` **ReadyFlag**: `symbol`

#### Overrides

[SBChannelKeys](SBChannelKeys.md).[ReadyFlag](SBChannelKeys.md#readyflag)

___

### defaultProtocol

▪ `Static` **defaultProtocol**: [`SBProtocol`](../interfaces/SBProtocol.md)

___

### timestampRegex

▪ `Static` **timestampRegex**: `RegExp`

## Accessors

### ChannelReadyFlag

• `get` **ChannelReadyFlag**(): `boolean`

#### Returns

`boolean`

___

### SB384ReadyFlag

• `get` **SB384ReadyFlag**(): `any`

#### Returns

`any`

#### Inherited from

SBChannelKeys.SB384ReadyFlag

___

### SBChannelKeysReadyFlag

• `get` **SBChannelKeysReadyFlag**(): `any`

#### Returns

`any`

#### Inherited from

SBChannelKeys.SBChannelKeysReadyFlag

___

### api

• `get` **api**(): `this`

#### Returns

`this`

___

### channelData

• `get` **channelData**(): [`SBChannelData`](../interfaces/SBChannelData.md)

#### Returns

[`SBChannelData`](../interfaces/SBChannelData.md)

#### Inherited from

SBChannelKeys.channelData

___

### channelId

• `get` **channelId**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Inherited from

SBChannelKeys.channelId

___

### handle

• `get` **handle**(): [`SBChannelHandle`](../interfaces/SBChannelHandle.md)

#### Returns

[`SBChannelHandle`](../interfaces/SBChannelHandle.md)

#### Inherited from

SBChannelKeys.handle

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

SBChannelKeys.hash

___

### hashB32

• `get` **hashB32**(): `string`

Similar to [SB384.hash](SB384.md#hash), but base32 encoded.

#### Returns

`string`

#### Inherited from

SBChannelKeys.hashB32

___

### jwkPrivate

• `get` **jwkPrivate**(): `JsonWebKey`

#### Returns

`JsonWebKey`

#### Inherited from

SBChannelKeys.jwkPrivate

___

### jwkPublic

• `get` **jwkPublic**(): `JsonWebKey`

#### Returns

`JsonWebKey`

#### Inherited from

SBChannelKeys.jwkPublic

___

### owner

• `get` **owner**(): `undefined` \| `boolean` \| ``""``

#### Returns

`undefined` \| `boolean` \| ``""``

#### Inherited from

SBChannelKeys.owner

___

### ownerChannelId

• `get` **ownerChannelId**(): `string`

ChannelID that corresponds to this, if it's an owner

#### Returns

`string`

#### Inherited from

SBChannelKeys.ownerChannelId

___

### private

• `get` **private**(): `boolean`

Returns true if this is a private key, otherwise false.
Will throw an exception if the object is not ready.

#### Returns

`boolean`

#### Inherited from

SBChannelKeys.private

___

### privateKey

• `get` **privateKey**(): `CryptoKey`

#### Returns

`CryptoKey`

#### Inherited from

SBChannelKeys.privateKey

___

### publicKey

• `get` **publicKey**(): `CryptoKey`

#### Returns

`CryptoKey`

#### Inherited from

SBChannelKeys.publicKey

___

### ready

• `get` **ready**(): `Promise`\<[`Channel`](Channel.md)\>

#### Returns

`Promise`\<[`Channel`](Channel.md)\>

#### Overrides

SBChannelKeys.ready

___

### signKey

• `get` **signKey**(): `CryptoKey`

#### Returns

`CryptoKey`

#### Inherited from

SBChannelKeys.signKey

___

### userId

• `get` **userId**(): `string`

#### Returns

`string`

#### Inherited from

SBChannelKeys.userId

___

### userPrivateKey

• `get` **userPrivateKey**(): `string`

Wire format of full info of key (eg private key). Compressed.

#### Returns

`string`

#### Inherited from

SBChannelKeys.userPrivateKey

___

### userPrivateKeyDehydrated

• `get` **userPrivateKeyDehydrated**(): `string`

Compressed and dehydrated, meaning, 'x' needs to come from another source.
(If lost it can be reconstructed from 'd')

#### Returns

`string`

#### Inherited from

SBChannelKeys.userPrivateKeyDehydrated

___

### userPublicKey

• `get` **userPublicKey**(): `string`

Wire format of full (decodable) public key

#### Returns

`string`

#### Inherited from

SBChannelKeys.userPublicKey

___

### ySign

• `get` **ySign**(): ``0`` \| ``1``

#### Returns

``0`` \| ``1``

#### Inherited from

SBChannelKeys.ySign

## Methods

### acceptVisitor

▸ **acceptVisitor**(`userId`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |

#### Returns

`Promise`\<`any`\>

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

[SBChannelKeys](SBChannelKeys.md).[buildApiBody](SBChannelKeys.md#buildapibody)

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

[SBChannelKeys](SBChannelKeys.md).[callApi](SBChannelKeys.md#callapi)

▸ **callApi**(`path`, `apiPayload`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `apiPayload` | `any` |

#### Returns

`Promise`\<`any`\>

#### Inherited from

[SBChannelKeys](SBChannelKeys.md).[callApi](SBChannelKeys.md#callapi)

___

### close

▸ **close**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

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

___

### finalizeMessage

▸ **finalizeMessage**(`msg`): `Promise`\<[`ChannelMessage`](../interfaces/ChannelMessage.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | [`ChannelMessage`](../interfaces/ChannelMessage.md) |

#### Returns

`Promise`\<[`ChannelMessage`](../interfaces/ChannelMessage.md)\>

___

### getAdminData

▸ **getAdminData**(): `Promise`\<[`ChannelAdminData`](../interfaces/ChannelAdminData.md)\>

#### Returns

`Promise`\<[`ChannelAdminData`](../interfaces/ChannelAdminData.md)\>

___

### getCapacity

▸ **getCapacity**(): `Promise`\<`any`\>

#### Returns

`Promise`\<`any`\>

___

### getChannelKeys

▸ **getChannelKeys**(): `Promise`\<[`SBChannelData`](../interfaces/SBChannelData.md)\>

#### Returns

`Promise`\<[`SBChannelData`](../interfaces/SBChannelData.md)\>

___

### getHistory

▸ **getHistory**(): `Promise`\<[`MessageHistoryDirectory`](../interfaces/MessageHistoryDirectory.md)\>

Returns map of message keys from the server corresponding to the request.

#### Returns

`Promise`\<[`MessageHistoryDirectory`](../interfaces/MessageHistoryDirectory.md)\>

___

### getLastMessageTimes

▸ **getLastMessageTimes**(): `void`

Deprecated. Would take an array of channelIds and get latest time stamp from all of them

#### Returns

`void`

___

### getLatestTimestamp

▸ **getLatestTimestamp**(): `Promise`\<`string`\>

Gets the latest known timestamp on the server. Returns it in prefix string format.

#### Returns

`Promise`\<`string`\>

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

___

### getMother

▸ **getMother**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

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

___

### getPubKeys

▸ **getPubKeys**(): `Promise`\<`Map`\<`string`, `string`\>\>

#### Returns

`Promise`\<`Map`\<`string`, `string`\>\>

___

### getRawMessageMap

▸ **getRawMessageMap**(`messageKeys`): `Promise`\<`Map`\<`string`, `ArrayBuffer`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageKeys` | `Set`\<`string`\> |

#### Returns

`Promise`\<`Map`\<`string`, `ArrayBuffer`\>\>

___

### getStorageLimit

▸ **getStorageLimit**(): `Promise`\<`any`\>

#### Returns

`Promise`\<`any`\>

___

### getStorageToken

▸ **getStorageToken**(`size`): `Promise`\<[`SBStorageToken`](../interfaces/SBStorageToken.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number` |

#### Returns

`Promise`\<[`SBStorageToken`](../interfaces/SBStorageToken.md)\>

___

### isLocked

▸ **isLocked**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

___

### lock

▸ **lock**(): `Promise`\<\{ `success`: `boolean`  }\>

#### Returns

`Promise`\<\{ `success`: `boolean`  }\>

___

### messageQueueManager

▸ **messageQueueManager**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

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

___

### send

▸ **send**(`contents`, `options?`): `Promise`\<`string`\>

Sends a message to the channel. The message is enqueued synchronously and sent
asynchronously. The return value is a Promise that resolves to the
server's response. If the message is a low-level message (eg status, server,
etc), then 'sendString' should be set to 'true'. If 'sendTo' is not provided,
the message will be sent to the channel owner. If 'protocol' is not provided,
the channel's default protocol will be used. If 'ttl' is not provided, it will
default to 15.

#### Parameters

| Name | Type |
| :------ | :------ |
| `contents` | `any` |
| `options` | [`MessageOptions`](../interfaces/MessageOptions.md) |

#### Returns

`Promise`\<`string`\>

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

___

### updateCapacity

▸ **updateCapacity**(`capacity`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `capacity` | `number` |

#### Returns

`Promise`\<`any`\>

___

### base4StringToDate

▸ **base4StringToDate**(`tsStr`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tsStr` | `string` |

#### Returns

`string`

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

___

### base4stringToDate

▸ **base4stringToDate**(`tsStr`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tsStr` | `string` |

#### Returns

`string`

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
