[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / Protocol\_AES\_GCM\_256

# Class: Protocol\_AES\_GCM\_256

Basic protocol, just provide entropy and salt, then all
messages are encrypted accordingly.

## Implements

- [`SBProtocol`](../interfaces/SBProtocol.md)

## Table of contents

### Constructors

- [constructor](Protocol_AES_GCM_256.md#constructor)

### Methods

- [decryptionKey](Protocol_AES_GCM_256.md#decryptionkey)
- [encryptionKey](Protocol_AES_GCM_256.md#encryptionkey)
- [initializeMasterKey](Protocol_AES_GCM_256.md#initializemasterkey)
- [setChannel](Protocol_AES_GCM_256.md#setchannel)
- [genKey](Protocol_AES_GCM_256.md#genkey)

## Constructors

### constructor

• **new Protocol_AES_GCM_256**(`passphrase`, `keyInfo`): [`Protocol_AES_GCM_256`](Protocol_AES_GCM_256.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `passphrase` | `string` |
| `keyInfo` | [`Protocol_KeyInfo`](../interfaces/Protocol_KeyInfo.md) |

#### Returns

[`Protocol_AES_GCM_256`](Protocol_AES_GCM_256.md)

## Methods

### decryptionKey

▸ **decryptionKey**(`_channel`, `msg`): `Promise`\<`undefined` \| `CryptoKey`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_channel` | [`Channel`](Channel.md) |
| `msg` | [`ChannelMessage`](../interfaces/ChannelMessage.md) |

#### Returns

`Promise`\<`undefined` \| `CryptoKey`\>

#### Implementation of

[SBProtocol](../interfaces/SBProtocol.md).[decryptionKey](../interfaces/SBProtocol.md#decryptionkey)

___

### encryptionKey

▸ **encryptionKey**(`msg`): `Promise`\<`CryptoKey`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | [`ChannelMessage`](../interfaces/ChannelMessage.md) |

#### Returns

`Promise`\<`CryptoKey`\>

#### Implementation of

[SBProtocol](../interfaces/SBProtocol.md).[encryptionKey](../interfaces/SBProtocol.md#encryptionkey)

___

### initializeMasterKey

▸ **initializeMasterKey**(`passphrase`): `Promise`\<`CryptoKey`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `passphrase` | `string` |

#### Returns

`Promise`\<`CryptoKey`\>

___

### setChannel

▸ **setChannel**(`_channel`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_channel` | [`Channel`](Channel.md) |

#### Returns

`void`

#### Implementation of

[SBProtocol](../interfaces/SBProtocol.md).[setChannel](../interfaces/SBProtocol.md#setchannel)

___

### genKey

▸ **genKey**(): `Promise`\<[`Protocol_KeyInfo`](../interfaces/Protocol_KeyInfo.md)\>

#### Returns

`Promise`\<[`Protocol_KeyInfo`](../interfaces/Protocol_KeyInfo.md)\>
