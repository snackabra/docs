[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / Protocol\_ECDH

# Class: Protocol\_ECDH

Implements 'whisper', eg 1:1 public-key based encryption between
sender and receiver. It will use as sender the private key used
on the Channel, and you can either provide 'sendTo' in the 
SBMessage options, or omit it in which case it will use the
channel owner's public key.

If no protocol is provided to a channel or message, then this
protocol is used by default.

## Implements

- [`SBProtocol`](../interfaces/SBProtocol.md)

## Table of contents

### Constructors

- [constructor](Protocol_ECDH.md#constructor)

### Methods

- [decryptionKey](Protocol_ECDH.md#decryptionkey)
- [encryptionKey](Protocol_ECDH.md#encryptionkey)
- [setChannel](Protocol_ECDH.md#setchannel)

## Constructors

### constructor

• **new Protocol_ECDH**(): [`Protocol_ECDH`](Protocol_ECDH.md)

#### Returns

[`Protocol_ECDH`](Protocol_ECDH.md)

## Methods

### decryptionKey

▸ **decryptionKey**(`channel`, `msg`): `Promise`\<`undefined` \| `CryptoKey`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `channel` | `any` |
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

### setChannel

▸ **setChannel**(`channel`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `channel` | [`Channel`](Channel.md) |

#### Returns

`void`

#### Implementation of

[SBProtocol](../interfaces/SBProtocol.md).[setChannel](../interfaces/SBProtocol.md#setchannel)
