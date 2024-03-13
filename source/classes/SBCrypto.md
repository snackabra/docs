[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / SBCrypto

# Class: SBCrypto

Utility class for SB crypto functions. Generally we use an object instantiation
of this (typically ''sbCrypto'') as a global variable.

## Table of contents

### Constructors

- [constructor](SBCrypto.md#constructor)

### Methods

- [ab2str](SBCrypto.md#ab2str)
- [encrypt](SBCrypto.md#encrypt)
- [exportKey](SBCrypto.md#exportkey)
- [generateIdKey](SBCrypto.md#generateidkey)
- [generateKeys](SBCrypto.md#generatekeys)
- [importKey](SBCrypto.md#importkey)
- [sign](SBCrypto.md#sign)
- [str2ab](SBCrypto.md#str2ab)
- [verify](SBCrypto.md#verify)
- [wrap](SBCrypto.md#wrap)

## Constructors

### constructor

• **new SBCrypto**(): [`SBCrypto`](SBCrypto.md)

#### Returns

[`SBCrypto`](SBCrypto.md)

## Methods

### ab2str

▸ **ab2str**(`buffer`): `string`

Standardized 'ab2str()' function, array buffer to string.

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | `Uint8Array` |

#### Returns

`string`

___

### encrypt

▸ **encrypt**(`data`, `key`, `params`): `Promise`\<`ArrayBuffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `BufferSource` |
| `key` | `CryptoKey` |
| `params` | [`EncryptParams`](../interfaces/EncryptParams.md) |

#### Returns

`Promise`\<`ArrayBuffer`\>

___

### exportKey

▸ **exportKey**(`format`, `key`): `Promise`\<`undefined` \| `JsonWebKey`\>

Export key; note that if there's an issue, this will return undefined.
That can happen normally if for example the key is restricted (and
not extractable).

#### Parameters

| Name | Type |
| :------ | :------ |
| `format` | ``"jwk"`` |
| `key` | `CryptoKey` |

#### Returns

`Promise`\<`undefined` \| `JsonWebKey`\>

___

### generateIdKey

▸ **generateIdKey**(`buf`): `Promise`\<\{ `idBinary`: `ArrayBuffer` ; `keyMaterial`: `ArrayBuffer`  }\>

Hashes and splits into two (h1 and h1) signature of data, h1
is used to request (salt, iv) pair and then h2 is used for
encryption (h2, salt, iv).

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `ArrayBuffer` |

#### Returns

`Promise`\<\{ `idBinary`: `ArrayBuffer` ; `keyMaterial`: `ArrayBuffer`  }\>

___

### generateKeys

▸ **generateKeys**(): `Promise`\<`CryptoKeyPair`\>

SBCrypto.generatekeys()

Generates standard ``ECDH`` keys using ``P-384``.

#### Returns

`Promise`\<`CryptoKeyPair`\>

___

### importKey

▸ **importKey**(`format`, `key`, `type`, `extractable`, `keyUsages`): `Promise`\<`CryptoKey`\>

Import keys

#### Parameters

| Name | Type |
| :------ | :------ |
| `format` | `KeyFormat` |
| `key` | `BufferSource` \| `JsonWebKey` |
| `type` | ``"ECDH"`` \| ``"AES"`` \| ``"PBKDF2"`` |
| `extractable` | `boolean` |
| `keyUsages` | `KeyUsage`[] |

#### Returns

`Promise`\<`CryptoKey`\>

___

### sign

▸ **sign**(`signKey`, `contents`): `Promise`\<`ArrayBuffer`\>

Basic signing

#### Parameters

| Name | Type |
| :------ | :------ |
| `signKey` | `CryptoKey` |
| `contents` | `ArrayBuffer` |

#### Returns

`Promise`\<`ArrayBuffer`\>

___

### str2ab

▸ **str2ab**(`string`): `Uint8Array`

Standardized 'str2ab()' function, string to array buffer.

#### Parameters

| Name | Type |
| :------ | :------ |
| `string` | `string` |

#### Returns

`Uint8Array`

___

### verify

▸ **verify**(`verifyKey`, `sign`, `contents`): `Promise`\<`boolean`\>

Basic verifcation

#### Parameters

| Name | Type |
| :------ | :------ |
| `verifyKey` | `CryptoKey` |
| `sign` | `ArrayBuffer` |
| `contents` | `ArrayBuffer` |

#### Returns

`Promise`\<`boolean`\>

___

### wrap

▸ **wrap**(`body`, `sender`, `encryptionKey`, `salt`, `signingKey`): `Promise`\<[`ChannelMessage`](../interfaces/ChannelMessage.md)\>

Internally this is Deprecated, but we retain a simplified version for now; for example,
some unit tests use this to 'track' higher-level jslib primitives. This used to be
the main approach to boot-strap a ChannelMessage object; this is now divided into
sync and async phases over internal channel queues.

#### Parameters

| Name | Type |
| :------ | :------ |
| `body` | `any` |
| `sender` | `string` |
| `encryptionKey` | `CryptoKey` |
| `salt` | `ArrayBuffer` |
| `signingKey` | `CryptoKey` |

#### Returns

`Promise`\<[`ChannelMessage`](../interfaces/ChannelMessage.md)\>
