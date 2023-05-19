[JSLib](../README.md) / ChannelSocket

# Class: ChannelSocket

ChannelSocket

 Class managing connections

## Hierarchy

- [`Channel`](Channel.md)

  ↳ **`ChannelSocket`**

## Table of contents

### Constructors

- [constructor](ChannelSocket.md#constructor)

### Properties

- [#ChannelReadyFlag](ChannelSocket.md##channelreadyflag)
- [#ChannelSocketReadyFlag](ChannelSocket.md##channelsocketreadyflag)
- [#SB384ReadyFlag](ChannelSocket.md##sb384readyflag)
- [#ack](ChannelSocket.md##ack)
- [#api](ChannelSocket.md##api)
- [#channelId](ChannelSocket.md##channelid)
- [#exportable\_owner\_pubKey](ChannelSocket.md##exportable_owner_pubkey)
- [#exportable\_privateKey](ChannelSocket.md##exportable_privatekey)
- [#exportable\_pubKey](ChannelSocket.md##exportable_pubkey)
- [#keyPair](ChannelSocket.md##keypair)
- [#keys](ChannelSocket.md##keys)
- [#onMessage](ChannelSocket.md##onmessage)
- [#ownerChannelId](ChannelSocket.md##ownerchannelid)
- [#privateKey](ChannelSocket.md##privatekey)
- [#sbServer](ChannelSocket.md##sbserver)
- [#sbServer](ChannelSocket.md##sbserver-1)
- [#traceSocket](ChannelSocket.md##tracesocket)
- [#ws](ChannelSocket.md##ws)
- [admin](ChannelSocket.md#admin)
- [adminData](ChannelSocket.md#admindata)
- [channelReady](ChannelSocket.md#channelready)
- [locked](ChannelSocket.md#locked)
- [motd](ChannelSocket.md#motd)
- [owner](ChannelSocket.md#owner)
- [ready](ChannelSocket.md#ready)
- [sb384Ready](ChannelSocket.md#sb384ready)
- [userName](ChannelSocket.md#username)
- [verifiedGuest](ChannelSocket.md#verifiedguest)

### Accessors

- [\_id](ChannelSocket.md#_id)
- [api](ChannelSocket.md#api)
- [channelId](ChannelSocket.md#channelid)
- [enableTrace](ChannelSocket.md#enabletrace)
- [exportable\_owner\_pubKey](ChannelSocket.md#exportable_owner_pubkey)
- [exportable\_privateKey](ChannelSocket.md#exportable_privatekey)
- [exportable\_pubKey](ChannelSocket.md#exportable_pubkey)
- [keyPair](ChannelSocket.md#keypair)
- [keys](ChannelSocket.md#keys)
- [onMessage](ChannelSocket.md#onmessage)
- [ownerChannelId](ChannelSocket.md#ownerchannelid)
- [privateKey](ChannelSocket.md#privatekey)
- [readyFlag](ChannelSocket.md#readyflag)
- [sbServer](ChannelSocket.md#sbserver)
- [status](ChannelSocket.md#status)

### Methods

- [#generateRoomHash](ChannelSocket.md##generateroomhash)
- [#generateRoomId](ChannelSocket.md##generateroomid)
- [#processMessage](ChannelSocket.md##processmessage)
- [#readyPromise](ChannelSocket.md##readypromise)
- [checkServerStatus](ChannelSocket.md#checkserverstatus)
- [close](ChannelSocket.md#close)
- [send](ChannelSocket.md#send)
- [sendSbObject](ChannelSocket.md#sendsbobject)

## Constructors

### constructor

• **new ChannelSocket**(`sbServer`, `onMessage`, `key?`, `channelId?`)

ChannelSocket

#### Parameters

| Name | Type |
| :------ | :------ |
| `sbServer` | [`SBServer`](../interfaces/SBServer.md) |
| `onMessage` | (`m`: [`ChannelMessage`](../interfaces/ChannelMessage.md)) => `void` |
| `key?` | `JsonWebKey` |
| `channelId?` | `string` |

#### Overrides

[Channel](Channel.md).[constructor](Channel.md#constructor)

## Properties

### #ChannelReadyFlag

• `Private` **#ChannelReadyFlag**: `boolean` = `false`

#### Inherited from

[Channel](Channel.md).[#ChannelReadyFlag](Channel.md##channelreadyflag)

___

### #ChannelSocketReadyFlag

• `Private` **#ChannelSocketReadyFlag**: `boolean` = `false`

___

### #SB384ReadyFlag

• `Private` **#SB384ReadyFlag**: `boolean` = `false`

#### Inherited from

[Channel](Channel.md).[#SB384ReadyFlag](Channel.md##sb384readyflag)

___

### #ack

• `Private` **#ack**: `Dictionary`<`any`\> = `[]`

___

### #api

• `Private` **#api**: `ChannelApi`

#### Inherited from

[Channel](Channel.md).[#api](Channel.md##api)

___

### #channelId

• `Private` `Optional` **#channelId**: `string`

#### Inherited from

[Channel](Channel.md).[#channelId](Channel.md##channelid)

___

### #exportable\_owner\_pubKey

• `Private` **#exportable\_owner\_pubKey**: ``null`` \| `JsonWebKey` = `null`

___

### #exportable\_privateKey

• `Private` **#exportable\_privateKey**: ``null`` \| `JsonWebKey` = `null`

#### Inherited from

[Channel](Channel.md).[#exportable_privateKey](Channel.md##exportable_privatekey)

___

### #exportable\_pubKey

• `Private` **#exportable\_pubKey**: ``null`` \| `JsonWebKey` = `null`

#### Inherited from

[Channel](Channel.md).[#exportable_pubKey](Channel.md##exportable_pubkey)

___

### #keyPair

• `Private` **#keyPair**: ``null`` \| `CryptoKeyPair` = `null`

#### Inherited from

[Channel](Channel.md).[#keyPair](Channel.md##keypair)

___

### #keys

• `Private` `Optional` **#keys**: [`ChannelKeys`](../interfaces/ChannelKeys.md)

___

### #onMessage

• `Private` **#onMessage**: (`m`: [`ChannelMessage`](../interfaces/ChannelMessage.md)) => `void`

#### Type declaration

▸ (`m`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `m` | [`ChannelMessage`](../interfaces/ChannelMessage.md) |

##### Returns

`void`

___

### #ownerChannelId

• `Private` **#ownerChannelId**: ``null`` \| `string` = `null`

#### Inherited from

[Channel](Channel.md).[#ownerChannelId](Channel.md##ownerchannelid)

___

### #privateKey

• `Private` **#privateKey**: ``null`` \| `CryptoKey` = `null`

#### Inherited from

[Channel](Channel.md).[#privateKey](Channel.md##privatekey)

___

### #sbServer

• `Private` **#sbServer**: [`SBServer`](../interfaces/SBServer.md)

#### Inherited from

[Channel](Channel.md).[#sbServer](Channel.md##sbserver)

___

### #sbServer

• `Private` **#sbServer**: [`SBServer`](../interfaces/SBServer.md)

#### Inherited from

Channel.#sbServer

___

### #traceSocket

• `Private` **#traceSocket**: `boolean` = `false`

___

### #ws

• `Private` **#ws**: `WSProtocolOptions`

___

### admin

• **admin**: `boolean` = `false`

#### Inherited from

[Channel](Channel.md).[admin](Channel.md#admin)

___

### adminData

• `Optional` **adminData**: `Dictionary`<`any`\>

#### Overrides

[Channel](Channel.md).[adminData](Channel.md#admindata)

___

### channelReady

• **channelReady**: `Promise`<[`Channel`](Channel.md)\>

#### Inherited from

[Channel](Channel.md).[channelReady](Channel.md#channelready)

___

### locked

• `Optional` **locked**: `boolean` = `false`

#### Inherited from

[Channel](Channel.md).[locked](Channel.md#locked)

___

### motd

• `Optional` **motd**: `string` = `''`

#### Inherited from

[Channel](Channel.md).[motd](Channel.md#motd)

___

### owner

• **owner**: `boolean` = `false`

#### Inherited from

[Channel](Channel.md).[owner](Channel.md#owner)

___

### ready

• **ready**: `Promise`<[`ChannelSocket`](ChannelSocket.md)\>

#### Overrides

[Channel](Channel.md).[ready](Channel.md#ready)

___

### sb384Ready

• **sb384Ready**: `Promise`<[`SB384`](SB384.md)\>

#### Inherited from

[Channel](Channel.md).[sb384Ready](Channel.md#sb384ready)

___

### userName

• **userName**: `string` = `''`

#### Inherited from

[Channel](Channel.md).[userName](Channel.md#username)

___

### verifiedGuest

• **verifiedGuest**: `boolean` = `false`

#### Inherited from

[Channel](Channel.md).[verifiedGuest](Channel.md#verifiedguest)

## Accessors

### \_id

• `get` **_id**(): `string`

#### Returns

`string`

#### Inherited from

Channel.\_id

___

### api

• `get` **api**(): `ChannelApi`

#### Returns

`ChannelApi`

#### Inherited from

Channel.api

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

#### Parameters

| Name | Type |
| :------ | :------ |
| `b` | `boolean` |

#### Returns

`void`

___

### exportable\_owner\_pubKey

• `get` **exportable_owner_pubKey**(): ``null`` \| `JsonWebKey`

#### Returns

``null`` \| `JsonWebKey`

___

### exportable\_privateKey

• `get` **exportable_privateKey**(): ``null`` \| `JsonWebKey`

#### Returns

``null`` \| `JsonWebKey`

#### Inherited from

Channel.exportable\_privateKey

___

### exportable\_pubKey

• `get` **exportable_pubKey**(): ``null`` \| `JsonWebKey`

#### Returns

``null`` \| `JsonWebKey`

#### Inherited from

Channel.exportable\_pubKey

___

### keyPair

• `get` **keyPair**(): ``null`` \| `CryptoKeyPair`

#### Returns

``null`` \| `CryptoKeyPair`

#### Inherited from

Channel.keyPair

___

### keys

• `get` **keys**(): [`ChannelKeys`](../interfaces/ChannelKeys.md)

ChannelSocket.keys

Will throw an exception if keys are unknown or not yet loaded

#### Returns

[`ChannelKeys`](../interfaces/ChannelKeys.md)

#### Overrides

Channel.keys

___

### onMessage

• `get` **onMessage**(): (`m`: [`ChannelMessage`](../interfaces/ChannelMessage.md)) => `void`

#### Returns

`fn`

▸ (`m`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `m` | [`ChannelMessage`](../interfaces/ChannelMessage.md) |

##### Returns

`void`

#### Overrides

Channel.onMessage

• `set` **onMessage**(`f`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`m`: [`ChannelMessage`](../interfaces/ChannelMessage.md)) => `void` |

#### Returns

`void`

#### Overrides

Channel.onMessage

___

### ownerChannelId

• `get` **ownerChannelId**(): ``null`` \| `string`

#### Returns

``null`` \| `string`

#### Inherited from

Channel.ownerChannelId

___

### privateKey

• `get` **privateKey**(): ``null`` \| `CryptoKey`

#### Returns

``null`` \| `CryptoKey`

#### Inherited from

Channel.privateKey

___

### readyFlag

• `get` **readyFlag**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Channel.readyFlag

___

### sbServer

• `get` **sbServer**(): [`SBServer`](../interfaces/SBServer.md)

#### Returns

[`SBServer`](../interfaces/SBServer.md)

#### Inherited from

Channel.sbServer

___

### status

• `get` **status**(): ``"CLOSED"`` \| ``"CONNECTING"`` \| ``"OPEN"`` \| ``"CLOSING"``

#### Returns

``"CLOSED"`` \| ``"CONNECTING"`` \| ``"OPEN"`` \| ``"CLOSING"``

## Methods

### #generateRoomHash

▸ `Private` **#generateRoomHash**(`channelBytes`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelBytes` | `ArrayBuffer` |

#### Returns

`Promise`<`string`\>

#### Inherited from

[Channel](Channel.md).[#generateRoomHash](Channel.md##generateroomhash)

___

### #generateRoomId

▸ `Private` **#generateRoomId**(`x`, `y`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `string` |
| `y` | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

[Channel](Channel.md).[#generateRoomId](Channel.md##generateroomid)

___

### #processMessage

▸ `Private` **#processMessage**(`m`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `m` | `any` |

#### Returns

`void`

___

### #readyPromise

▸ `Private` **#readyPromise**(): `Promise`<[`ChannelSocket`](ChannelSocket.md)\>

#### Returns

`Promise`<[`ChannelSocket`](ChannelSocket.md)\>

___

### checkServerStatus

▸ **checkServerStatus**(`url`, `timeout`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `timeout` | `number` |
| `callback` | (`online`: `boolean`) => `void` |

#### Returns

`void`

___

### close

▸ **close**(): `void`

#### Returns

`void`

___

### send

▸ **send**(`msg`): `Promise`<`string`\>

ChannelSocket.send()

Returns a promise that resolves to "success" when sent,
or an error message if it fails.

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` \| [`SBMessage`](SBMessage.md) |

#### Returns

`Promise`<`string`\>

#### Overrides

[Channel](Channel.md).[send](Channel.md#send)

___

### sendSbObject

▸ **sendSbObject**(`file`): `Promise`<`string`\>

ChannelSocket.sendSbObject()

Send SB object (file) on channel socket

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | [`SBFile`](SBFile.md) |

#### Returns

`Promise`<`string`\>
