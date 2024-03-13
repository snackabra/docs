[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / Snackabra

# Class: Snackabra

Main class. It corresponds to a single channel server. Most apps
will only be talking to one channel server, but it is possible
to have multiple instances of Snackabra, each talking to a
different channel server.

Takes a single parameter, the URL to the channel server.

**`Example`**

```typescript
    const sb = new Snackabra('http://localhost:3845')
```

Websocket server is always the same server (just different protocol),
storage server is now provided by '/api/v2/info' endpoint from the
channel server.

You can give an options parameter with various settings, including
debug levels. For ease of use, you can just give a boolean value
(eg 'true') to turn on basic debugging.

The 'sbFetch' option allows you to provide a custom fetch function
for accessing channel and storage servers. For example, to provide
a specific service binding for a web worker.

## Hierarchy

- `EventEmitter`

  ↳ **`Snackabra`**

## Table of contents

### Constructors

- [constructor](Snackabra.md#constructor)

### Properties

- [activeFetches](Snackabra.md#activefetches)
- [defaultChannelServer](Snackabra.md#defaultchannelserver)
- [isShutdown](Snackabra.md#isshutdown)
- [lastTimeStamp](Snackabra.md#lasttimestamp)
- [lastTimestampPrefix](Snackabra.md#lasttimestampprefix)
- [onlineStatus](Snackabra.md#onlinestatus)

### Accessors

- [crypto](Snackabra.md#crypto)
- [storage](Snackabra.md#storage)
- [version](Snackabra.md#version)

### Methods

- [connect](Snackabra.md#connect)
- [create](Snackabra.md#create)
- [getPage](Snackabra.md#getpage)
- [getStorageServer](Snackabra.md#getstorageserver)
- [addChannelSocket](Snackabra.md#addchannelsocket)
- [checkUnknownNetworkStatus](Snackabra.md#checkunknownnetworkstatus)
- [closeAll](Snackabra.md#closeall)
- [dateNow](Snackabra.md#datenow)
- [emit](Snackabra.md#emit)
- [haveNotHeardFromServer](Snackabra.md#havenotheardfromserver)
- [heardFromServer](Snackabra.md#heardfromserver)
- [off](Snackabra.md#off)
- [on](Snackabra.md#on)
- [removeChannelSocket](Snackabra.md#removechannelsocket)

## Constructors

### constructor

• **new Snackabra**(`channelServer`, `options?`): [`Snackabra`](Snackabra.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelServer` | `string` |
| `options?` | `boolean` \| \{ `DEBUG?`: `boolean` ; `DEBUG2?`: `boolean` ; `sbFetch?`: (`input`: `RequestInfo` \| `URL`, `init?`: `RequestInit`) => `Promise`\<`Response`\>  } |

#### Returns

[`Snackabra`](Snackabra.md)

#### Overrides

EventEmitter.constructor

## Properties

### activeFetches

▪ `Static` **activeFetches**: `Map`\<`symbol`, `AbortController`\>

___

### defaultChannelServer

▪ `Static` **defaultChannelServer**: `string` = `'http://localhost:3845'`

___

### isShutdown

▪ `Static` **isShutdown**: `boolean` = `false`

___

### lastTimeStamp

▪ `Static` **lastTimeStamp**: `number` = `0`

___

### lastTimestampPrefix

▪ `Static` **lastTimestampPrefix**: `string`

___

### onlineStatus

▪ `Static` **onlineStatus**: `ServerOnlineStatus` = `'unknown'`

## Accessors

### crypto

• `get` **crypto**(): [`SBCrypto`](SBCrypto.md)

Returns the crypto API

#### Returns

[`SBCrypto`](SBCrypto.md)

___

### storage

• `get` **storage**(): [`StorageApi`](StorageApi.md)

Returns the storage API

#### Returns

[`StorageApi`](StorageApi.md)

___

### version

• `get` **version**(): `string`

Returns version of jslib

#### Returns

`string`

## Methods

### connect

▸ **connect**(`handleOrKey`): [`Channel`](Channel.md)

Connects to :term:`Channel` on this channel server. Returns a Channel  if
no message handler is provided; if onMessage is provided then it returns a
ChannelSocket.

#### Parameters

| Name | Type |
| :------ | :------ |
| `handleOrKey` | `string` \| [`SBChannelHandle`](../interfaces/SBChannelHandle.md) |

#### Returns

[`Channel`](Channel.md)

▸ **connect**(`handleOrKey`, `onMessage`): [`ChannelSocket`](ChannelSocket.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `handleOrKey` | `string` \| [`SBChannelHandle`](../interfaces/SBChannelHandle.md) |
| `onMessage` | (`m`: `string` \| [`Message`](../interfaces/Message.md)) => `void` |

#### Returns

[`ChannelSocket`](ChannelSocket.md)

___

### create

▸ **create**(`budgetChannel`): `Promise`\<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

Creates a new channel. Returns a promise to a ''SBChannelHandle'' object.
Note that this method does not connect to the channel, it just creates
(authorizes) it and allocates storage budget.

New (2.0) interface:

#### Parameters

| Name | Type |
| :------ | :------ |
| `budgetChannel` | [`Channel`](Channel.md) |

#### Returns

`Promise`\<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

▸ **create**(`storageToken`): `Promise`\<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `storageToken` | [`SBStorageToken`](../interfaces/SBStorageToken.md) |

#### Returns

`Promise`\<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

___

### getPage

▸ **getPage**(`prefix`): `Promise`\<`any`\>

"Anonymous" version of fetching a page, since unless it's locked you do not
need to be authenticated to fetch a page (or even know what channel it's
related to).

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefix` | `string` |

#### Returns

`Promise`\<`any`\>

___

### getStorageServer

▸ **getStorageServer**(): `Promise`\<`string`\>

Returns matching storage server

#### Returns

`Promise`\<`string`\>

___

### addChannelSocket

▸ **addChannelSocket**(`socket`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | [`ChannelSocket`](ChannelSocket.md) |

#### Returns

`void`

___

### checkUnknownNetworkStatus

▸ **checkUnknownNetworkStatus**(): `void`

#### Returns

`void`

___

### closeAll

▸ **closeAll**(): `Promise`\<`void`\>

Closes all active operations and connections, including any fetches
and websockets. This closes EVERYTHING (globally).

#### Returns

`Promise`\<`void`\>

___

### dateNow

▸ **dateNow**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

___

### emit

▸ **emit**(`eventName`, `...args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `...args` | `any`[] |

#### Returns

`void`

#### Inherited from

EventEmitter.emit

___

### haveNotHeardFromServer

▸ **haveNotHeardFromServer**(): `void`

Call when we haven't heard from any channel server for a while, and we
think we should have.

#### Returns

`void`

___

### heardFromServer

▸ **heardFromServer**(): `void`

Call when somethings been heard from any channel server; this is used to
track whether we are online or not.

#### Returns

`void`

___

### off

▸ **off**(`eventName`, `listener`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Function` |

#### Returns

`void`

#### Inherited from

EventEmitter.off

___

### on

▸ **on**(`eventName`, `listener`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Function` |

#### Returns

`void`

#### Inherited from

EventEmitter.on

___

### removeChannelSocket

▸ **removeChannelSocket**(`socket`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | [`ChannelSocket`](ChannelSocket.md) |

#### Returns

`void`
