[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / SBProtocol

# Interface: SBProtocol

Key exchange protocol. (Note that SBMessage always includes
a reference to the channel)

## Implemented by

- [`Protocol_AES_GCM_256`](../classes/Protocol_AES_GCM_256.md)
- [`Protocol_ECDH`](../classes/Protocol_ECDH.md)

## Table of contents

### Methods

- [decryptionKey](SBProtocol.md#decryptionkey)
- [encryptionKey](SBProtocol.md#encryptionkey)
- [setChannel](SBProtocol.md#setchannel)

## Methods

### decryptionKey

▸ **decryptionKey**(`channel`, `msg`): `Promise`\<`undefined` \| `CryptoKey`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `channel` | [`Channel`](../classes/Channel.md) |
| `msg` | [`ChannelMessage`](ChannelMessage.md) |

#### Returns

`Promise`\<`undefined` \| `CryptoKey`\>

___

### encryptionKey

▸ **encryptionKey**(`msg`): `Promise`\<`CryptoKey`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | [`ChannelMessage`](ChannelMessage.md) |

#### Returns

`Promise`\<`CryptoKey`\>

___

### setChannel

▸ **setChannel**(`channel`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `channel` | [`Channel`](../classes/Channel.md) |

#### Returns

`void`
