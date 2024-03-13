[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / SBChannelKeys

# Class: SBChannelKeys

The minimum state of a Channel is the "user" keys, eg
how we identify when connecting to the channel.

## Hierarchy

- [`SB384`](SB384.md)

  ↳ **`SBChannelKeys`**

  ↳↳ [`Channel`](Channel.md)

## Table of contents

### Constructors

- [constructor](SBChannelKeys.md#constructor)

### Properties

- [channelServer](SBChannelKeys.md#channelserver)
- [errorState](SBChannelKeys.md#errorstate)
- [sb384Ready](SBChannelKeys.md#sb384ready)
- [sbChannelKeysReady](SBChannelKeys.md#sbchannelkeysready)
- [ReadyFlag](SBChannelKeys.md#readyflag)

### Accessors

- [SB384ReadyFlag](SBChannelKeys.md#sb384readyflag)
- [SBChannelKeysReadyFlag](SBChannelKeys.md#sbchannelkeysreadyflag)
- [channelData](SBChannelKeys.md#channeldata)
- [channelId](SBChannelKeys.md#channelid)
- [handle](SBChannelKeys.md#handle)
- [hash](SBChannelKeys.md#hash)
- [hashB32](SBChannelKeys.md#hashb32)
- [jwkPrivate](SBChannelKeys.md#jwkprivate)
- [jwkPublic](SBChannelKeys.md#jwkpublic)
- [owner](SBChannelKeys.md#owner)
- [ownerChannelId](SBChannelKeys.md#ownerchannelid)
- [private](SBChannelKeys.md#private)
- [privateKey](SBChannelKeys.md#privatekey)
- [publicKey](SBChannelKeys.md#publickey)
- [ready](SBChannelKeys.md#ready)
- [signKey](SBChannelKeys.md#signkey)
- [userId](SBChannelKeys.md#userid)
- [userPrivateKey](SBChannelKeys.md#userprivatekey)
- [userPrivateKeyDehydrated](SBChannelKeys.md#userprivatekeydehydrated)
- [userPublicKey](SBChannelKeys.md#userpublickey)
- [ySign](SBChannelKeys.md#ysign)

### Methods

- [buildApiBody](SBChannelKeys.md#buildapibody)
- [callApi](SBChannelKeys.md#callapi)

## Constructors

### constructor

• **new SBChannelKeys**(`handleOrKey?`): [`SBChannelKeys`](SBChannelKeys.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `handleOrKey?` | `string` \| [`SBChannelHandle`](../interfaces/SBChannelHandle.md) |

#### Returns

[`SBChannelKeys`](SBChannelKeys.md)

#### Overrides

[SB384](SB384.md).[constructor](SB384.md#constructor)

## Properties

### channelServer

• **channelServer**: `string`

___

### errorState

• **errorState**: `boolean` = `false`

#### Inherited from

[SB384](SB384.md).[errorState](SB384.md#errorstate)

___

### sb384Ready

• **sb384Ready**: `Promise`\<[`SB384`](SB384.md)\>

#### Inherited from

[SB384](SB384.md).[sb384Ready](SB384.md#sb384ready)

___

### sbChannelKeysReady

• **sbChannelKeysReady**: `Promise`\<[`SBChannelKeys`](SBChannelKeys.md)\>

___

### ReadyFlag

▪ `Static` **ReadyFlag**: `symbol`

#### Overrides

[SB384](SB384.md).[ReadyFlag](SB384.md#readyflag)

## Accessors

### SB384ReadyFlag

• `get` **SB384ReadyFlag**(): `any`

#### Returns

`any`

#### Inherited from

SB384.SB384ReadyFlag

___

### SBChannelKeysReadyFlag

• `get` **SBChannelKeysReadyFlag**(): `any`

#### Returns

`any`

___

### channelData

• `get` **channelData**(): [`SBChannelData`](../interfaces/SBChannelData.md)

#### Returns

[`SBChannelData`](../interfaces/SBChannelData.md)

___

### channelId

• `get` **channelId**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

___

### handle

• `get` **handle**(): [`SBChannelHandle`](../interfaces/SBChannelHandle.md)

#### Returns

[`SBChannelHandle`](../interfaces/SBChannelHandle.md)

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

SB384.hash

___

### hashB32

• `get` **hashB32**(): `string`

Similar to [SB384.hash](SB384.md#hash), but base32 encoded.

#### Returns

`string`

#### Inherited from

SB384.hashB32

___

### jwkPrivate

• `get` **jwkPrivate**(): `JsonWebKey`

#### Returns

`JsonWebKey`

#### Inherited from

SB384.jwkPrivate

___

### jwkPublic

• `get` **jwkPublic**(): `JsonWebKey`

#### Returns

`JsonWebKey`

#### Inherited from

SB384.jwkPublic

___

### owner

• `get` **owner**(): `undefined` \| `boolean` \| ``""``

#### Returns

`undefined` \| `boolean` \| ``""``

___

### ownerChannelId

• `get` **ownerChannelId**(): `string`

ChannelID that corresponds to this, if it's an owner

#### Returns

`string`

#### Inherited from

SB384.ownerChannelId

___

### private

• `get` **private**(): `boolean`

Returns true if this is a private key, otherwise false.
Will throw an exception if the object is not ready.

#### Returns

`boolean`

#### Inherited from

SB384.private

___

### privateKey

• `get` **privateKey**(): `CryptoKey`

#### Returns

`CryptoKey`

#### Inherited from

SB384.privateKey

___

### publicKey

• `get` **publicKey**(): `CryptoKey`

#### Returns

`CryptoKey`

#### Inherited from

SB384.publicKey

___

### ready

• `get` **ready**(): `Promise`\<[`SBChannelKeys`](SBChannelKeys.md)\>

#### Returns

`Promise`\<[`SBChannelKeys`](SBChannelKeys.md)\>

#### Overrides

SB384.ready

___

### signKey

• `get` **signKey**(): `CryptoKey`

#### Returns

`CryptoKey`

#### Inherited from

SB384.signKey

___

### userId

• `get` **userId**(): `string`

#### Returns

`string`

#### Inherited from

SB384.userId

___

### userPrivateKey

• `get` **userPrivateKey**(): `string`

Wire format of full info of key (eg private key). Compressed.

#### Returns

`string`

#### Inherited from

SB384.userPrivateKey

___

### userPrivateKeyDehydrated

• `get` **userPrivateKeyDehydrated**(): `string`

Compressed and dehydrated, meaning, 'x' needs to come from another source.
(If lost it can be reconstructed from 'd')

#### Returns

`string`

#### Inherited from

SB384.userPrivateKeyDehydrated

___

### userPublicKey

• `get` **userPublicKey**(): `string`

Wire format of full (decodable) public key

#### Returns

`string`

#### Inherited from

SB384.userPublicKey

___

### ySign

• `get` **ySign**(): ``0`` \| ``1``

#### Returns

``0`` \| ``1``

#### Inherited from

SB384.ySign

## Methods

### buildApiBody

▸ **buildApiBody**(`path`, `apiPayload?`): `Promise`\<[`ChannelApiBody`](../interfaces/ChannelApiBody.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `apiPayload?` | `any` |

#### Returns

`Promise`\<[`ChannelApiBody`](../interfaces/ChannelApiBody.md)\>

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

▸ **callApi**(`path`, `apiPayload`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `apiPayload` | `any` |

#### Returns

`Promise`\<`any`\>
