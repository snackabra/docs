[JSLib Reference Manual](../jslib2.md) / [Exports](../modules.md) / SBCrypto

# Class: SBCrypto

SBCrypto

SBCrypto contains all the SB specific crypto functions,
as well as some general utility functions.

## Table of contents

### Constructors

- [constructor](SBCrypto.md#constructor)

### Methods

- [ab2str](SBCrypto.md#ab2str)
- [compareKeys](SBCrypto.md#comparekeys)
- [deriveKey](SBCrypto.md#derivekey)
- [encrypt](SBCrypto.md#encrypt)
- [extractPubKey](SBCrypto.md#extractpubkey)
- [generateIdKey](SBCrypto.md#generateidkey)
- [generateKeys](SBCrypto.md#generatekeys)
- [importKey](SBCrypto.md#importkey)
- [sign](SBCrypto.md#sign)
- [str2ab](SBCrypto.md#str2ab)
- [unwrap](SBCrypto.md#unwrap)
- [verify](SBCrypto.md#verify)
- [wrap](SBCrypto.md#wrap)

## Constructors

### constructor

• **new SBCrypto**()

## Methods

### ab2str

▸ **ab2str**(`buffer`): `string`

Standardized 'ab2str()' function, array buffer to string.
This assumes one byte per character.

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | `Uint8Array` |

#### Returns

`string`

string

___

### compareKeys

▸ **compareKeys**(`key1`, `key2`): `boolean`

SBCrypto.compareKeys()

Compare JSON keys, true if the 'same', false if different.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key1` | `Dictionary`<`any`\> |
| `key2` | `Dictionary`<`any`\> |

#### Returns

`boolean`

___

### deriveKey

▸ **deriveKey**(`privateKey`, `publicKey`, `type`, `extractable`, `keyUsages`): `Promise`<`CryptoKey`\>

SBCrypto.deriveKey()

Derive key.

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `CryptoKey` |
| `publicKey` | `CryptoKey` |
| `type` | `string` |
| `extractable` | `boolean` |
| `keyUsages` | `KeyUsage`[] |

#### Returns

`Promise`<`CryptoKey`\>

___

### encrypt

▸ **encrypt**(`data`, `key`, `_iv?`, `returnType?`): `Promise`<[`EncryptedContents`](../interfaces/EncryptedContents.md)\>

SBCrypto.encrypt()

Encrypt. if no nonce (iv) is given, will create it. Returns a Promise
that resolves either to raw array buffer or a packaged EncryptedContents.
Note that for the former, nonce must be given.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `BufferSource` |
| `key` | `CryptoKey` |
| `_iv?` | ``null`` \| `Uint8Array` |
| `returnType?` | ``"encryptedContents"`` |

#### Returns

`Promise`<[`EncryptedContents`](../interfaces/EncryptedContents.md)\>

▸ **encrypt**(`data`, `key`, `_iv?`, `returnType?`): `Promise`<`ArrayBuffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `BufferSource` |
| `key` | `CryptoKey` |
| `_iv?` | ``null`` \| `Uint8Array` |
| `returnType?` | ``"arrayBuffer"`` |

#### Returns

`Promise`<`ArrayBuffer`\>

___

### extractPubKey

▸ **extractPubKey**(`privateKey`): ``null`` \| `JsonWebKey`

Extracts (generates) public key from a private key.

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `JsonWebKey` |

#### Returns

``null`` \| `JsonWebKey`

___

### generateIdKey

▸ **generateIdKey**(`buf`): `Promise`<{ `id`: `string` ; `key`: `string`  }\>

Hashes and splits into two (h1 and h1) signature of data, h1
is used to request (salt, iv) pair and then h2 is used for
encryption (h2, salt, iv)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buf` | `ArrayBuffer` | blob of data to be stored |

#### Returns

`Promise`<{ `id`: `string` ; `key`: `string`  }\>

___

### generateKeys

▸ **generateKeys**(): `Promise`<`CryptoKeyPair`\>

SBCrypto.generatekeys()

Generates standard ``ECDH`` keys using ``P-384``.

#### Returns

`Promise`<`CryptoKeyPair`\>

___

### importKey

▸ **importKey**(`format`, `key`, `type`, `extractable`, `keyUsages`): `Promise`<`CryptoKey`\>

SBCrypto.importKey()

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

`Promise`<`CryptoKey`\>

___

### sign

▸ **sign**(`secretKey`, `contents`): `Promise`<`string`\>

SBCrypto.sign()

Sign

#### Parameters

| Name | Type |
| :------ | :------ |
| `secretKey` | `CryptoKey` |
| `contents` | `string` |

#### Returns

`Promise`<`string`\>

___

### str2ab

▸ **str2ab**(`string`): `Uint8Array`

Standardized 'str2ab()' function, string to array buffer.
This assumes on byte per character.

#### Parameters

| Name | Type |
| :------ | :------ |
| `string` | `string` |

#### Returns

`Uint8Array`

buffer

___

### unwrap

▸ **unwrap**(`k`, `o`, `returnType`): `Promise`<`string`\>

SBCrypto.unwrap

Decrypts a wrapped object, returns (promise to) decrypted contents
per se (either as a string or arrayBuffer)

#### Parameters

| Name | Type |
| :------ | :------ |
| `k` | `CryptoKey` |
| `o` | [`EncryptedContents`](../interfaces/EncryptedContents.md) |
| `returnType` | ``"string"`` |

#### Returns

`Promise`<`string`\>

▸ **unwrap**(`k`, `o`, `returnType`): `Promise`<`ArrayBuffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `k` | `CryptoKey` |
| `o` | [`EncryptedContents`](../interfaces/EncryptedContents.md) |
| `returnType` | ``"arrayBuffer"`` |

#### Returns

`Promise`<`ArrayBuffer`\>

___

### verify

▸ **verify**(`verifyKey`, `sign`, `contents`): `Promise`<`boolean`\>

SBCrypto.verify()

Verify signature.

#### Parameters

| Name | Type |
| :------ | :------ |
| `verifyKey` | `CryptoKey` |
| `sign` | `string` |
| `contents` | `string` |

#### Returns

`Promise`<`boolean`\>

___

### wrap

▸ **wrap**(`k`, `b`, `bodyType`): `Promise`<[`EncryptedContents`](../interfaces/EncryptedContents.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `k` | `CryptoKey` |
| `b` | `string` |
| `bodyType` | ``"string"`` |

#### Returns

`Promise`<[`EncryptedContents`](../interfaces/EncryptedContents.md)\>

▸ **wrap**(`k`, `b`, `bodyType`): `Promise`<[`EncryptedContents`](../interfaces/EncryptedContents.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `k` | `CryptoKey` |
| `b` | `ArrayBuffer` |
| `bodyType` | ``"arrayBuffer"`` |

#### Returns

`Promise`<[`EncryptedContents`](../interfaces/EncryptedContents.md)\>
