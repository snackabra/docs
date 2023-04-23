[JSLib](../README.md) / Channel

# Class: Channel

Channel Class

Join a channel, returns channel object.

Currently, you must have an identity when connecting, because every single
message is signed by sender. TODO is to look at how to provide a 'listening'
mode on channels.

Most classes in SB follow the "ready" template: objects can be used
right away, but they decide for themselves if they're ready or not.

**`Param`**

server to join

**`Param`**

key to use to join (optional)

**`Param`**

(the :term:`Channel Name`) to find on that server (optional)

## Hierarchy

- [`SB384`](SB384.md)

  ↳ **`Channel`**

  ↳↳ [`ChannelSocket`](ChannelSocket.md)

## Table of contents

### Constructors

- [constructor](Channel.md#constructor)

### Properties

- [#ChannelReadyFlag](Channel.md##channelreadyflag)
- [#SB384ReadyFlag](Channel.md##sb384readyflag)
- [#api](Channel.md##api)
- [#channelId](Channel.md##channelid)
- [#exportable\_privateKey](Channel.md##exportable_privatekey)
- [#exportable\_pubKey](Channel.md##exportable_pubkey)
- [#keyPair](Channel.md##keypair)
- [#ownerChannelId](Channel.md##ownerchannelid)
- [#privateKey](Channel.md##privatekey)
- [#sbServer](Channel.md##sbserver)
- [admin](Channel.md#admin)
- [adminData](Channel.md#admindata)
- [channelReady](Channel.md#channelready)
- [locked](Channel.md#locked)
- [motd](Channel.md#motd)
- [owner](Channel.md#owner)
- [ready](Channel.md#ready)
- [sb384Ready](Channel.md#sb384ready)
- [userName](Channel.md#username)
- [verifiedGuest](Channel.md#verifiedguest)

### Accessors

- [\_id](Channel.md#_id)
- [api](Channel.md#api)
- [channelId](Channel.md#channelid)
- [exportable\_privateKey](Channel.md#exportable_privatekey)
- [exportable\_pubKey](Channel.md#exportable_pubkey)
- [keyPair](Channel.md#keypair)
- [keys](Channel.md#keys)
- [onMessage](Channel.md#onmessage)
- [ownerChannelId](Channel.md#ownerchannelid)
- [privateKey](Channel.md#privatekey)
- [readyFlag](Channel.md#readyflag)
- [sbServer](Channel.md#sbserver)

### Methods

- [#generateRoomHash](Channel.md##generateroomhash)
- [#generateRoomId](Channel.md##generateroomid)
- [send](Channel.md#send)

## Constructors

### constructor

• **new Channel**(`sbServer`, `key?`, `channelId?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sbServer` | [`SBServer`](../interfaces/SBServer.md) |
| `key?` | `JsonWebKey` |
| `channelId?` | `string` |

#### Overrides

[SB384](SB384.md).[constructor](SB384.md#constructor)

## Properties

### #ChannelReadyFlag

• `Private` **#ChannelReadyFlag**: `boolean` = `false`

___

### #SB384ReadyFlag

• `Private` **#SB384ReadyFlag**: `boolean` = `false`

#### Inherited from

[SB384](SB384.md).[#SB384ReadyFlag](SB384.md##sb384readyflag)

___

### #api

• `Private` **#api**: `ChannelApi`

___

### #channelId

• `Private` `Optional` **#channelId**: `string`

___

### #exportable\_privateKey

• `Private` **#exportable\_privateKey**: ``null`` \| `JsonWebKey` = `null`

#### Inherited from

[SB384](SB384.md).[#exportable_privateKey](SB384.md##exportable_privatekey)

___

### #exportable\_pubKey

• `Private` **#exportable\_pubKey**: ``null`` \| `JsonWebKey` = `null`

#### Inherited from

[SB384](SB384.md).[#exportable_pubKey](SB384.md##exportable_pubkey)

___

### #keyPair

• `Private` **#keyPair**: ``null`` \| `CryptoKeyPair` = `null`

#### Inherited from

[SB384](SB384.md).[#keyPair](SB384.md##keypair)

___

### #ownerChannelId

• `Private` **#ownerChannelId**: ``null`` \| `string` = `null`

#### Inherited from

[SB384](SB384.md).[#ownerChannelId](SB384.md##ownerchannelid)

___

### #privateKey

• `Private` **#privateKey**: ``null`` \| `CryptoKey` = `null`

#### Inherited from

[SB384](SB384.md).[#privateKey](SB384.md##privatekey)

___

### #sbServer

• `Private` **#sbServer**: [`SBServer`](../interfaces/SBServer.md)

___

### admin

• **admin**: `boolean` = `false`

___

### adminData

• `Optional` `Abstract` **adminData**: `Dictionary`<`any`\>

___

### channelReady

• **channelReady**: `Promise`<[`Channel`](Channel.md)\>

___

### locked

• `Optional` **locked**: `boolean` = `false`

___

### motd

• `Optional` **motd**: `string` = `''`

___

### owner

• **owner**: `boolean` = `false`

___

### ready

• **ready**: `Promise`<[`Channel`](Channel.md)\>

#### Overrides

[SB384](SB384.md).[ready](SB384.md#ready)

___

### sb384Ready

• **sb384Ready**: `Promise`<[`SB384`](SB384.md)\>

#### Inherited from

[SB384](SB384.md).[sb384Ready](SB384.md#sb384ready)

___

### userName

• **userName**: `string` = `''`

___

### verifiedGuest

• **verifiedGuest**: `boolean` = `false`

## Accessors

### \_id

• `get` **_id**(): `string`

#### Returns

`string`

#### Inherited from

SB384.\_id

___

### api

• `get` **api**(): `ChannelApi`

#### Returns

`ChannelApi`

___

### channelId

• `get` **channelId**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

___

### exportable\_privateKey

• `get` **exportable_privateKey**(): ``null`` \| `JsonWebKey`

#### Returns

``null`` \| `JsonWebKey`

#### Inherited from

SB384.exportable\_privateKey

___

### exportable\_pubKey

• `get` **exportable_pubKey**(): ``null`` \| `JsonWebKey`

#### Returns

``null`` \| `JsonWebKey`

#### Inherited from

SB384.exportable\_pubKey

___

### keyPair

• `get` **keyPair**(): ``null`` \| `CryptoKeyPair`

#### Returns

``null`` \| `CryptoKeyPair`

#### Inherited from

SB384.keyPair

___

### keys

• `Abstract` `get` **keys**(): [`ChannelKeys`](../interfaces/ChannelKeys.md)

#### Returns

[`ChannelKeys`](../interfaces/ChannelKeys.md)

___

### onMessage

• `Abstract` `set` **onMessage**(`f`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | `CallableFunction` |

#### Returns

`void`

___

### ownerChannelId

• `get` **ownerChannelId**(): ``null`` \| `string`

#### Returns

``null`` \| `string`

#### Inherited from

SB384.ownerChannelId

___

### privateKey

• `get` **privateKey**(): ``null`` \| `CryptoKey`

#### Returns

``null`` \| `CryptoKey`

#### Inherited from

SB384.privateKey

___

### readyFlag

• `get` **readyFlag**(): `boolean`

#### Returns

`boolean`

#### Overrides

SB384.readyFlag

___

### sbServer

• `get` **sbServer**(): [`SBServer`](../interfaces/SBServer.md)

#### Returns

[`SBServer`](../interfaces/SBServer.md)

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

[SB384](SB384.md).[#generateRoomHash](SB384.md##generateroomhash)

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

[SB384](SB384.md).[#generateRoomId](SB384.md##generateroomid)

___

### send

▸ `Abstract` **send**(`m`, `messageType?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `m` | `string` \| [`SBMessage`](SBMessage.md) |
| `messageType?` | ``"string"`` \| ``"SBMessage"`` |

#### Returns

`Promise`<`string`\>
