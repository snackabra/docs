JSLib

# JSLib

## Table of contents

### Classes

- [Channel](classes/Channel.md)
- [ChannelSocket](classes/ChannelSocket.md)
- [MessageBus](classes/MessageBus.md)
- [SB384](classes/SB384.md)
- [SBCrypto](classes/SBCrypto.md)
- [SBFile](classes/SBFile.md)
- [SBMessage](classes/SBMessage.md)
- [SBObjectHandleClass](classes/SBObjectHandleClass.md)
- [Snackabra](classes/Snackabra.md)

### Interfaces

- [ChannelKeys](interfaces/ChannelKeys.md)
- [ChannelMessage](interfaces/ChannelMessage.md)
- [EncryptedContents](interfaces/EncryptedContents.md)
- [EncryptedContentsBin](interfaces/EncryptedContentsBin.md)
- [SBChannelHandle](interfaces/SBChannelHandle.md)
- [SBObjectHandle](interfaces/SBObjectHandle.md)
- [SBObjectMetadata](interfaces/SBObjectMetadata.md)
- [SBPayload](interfaces/SBPayload.md)
- [SBServer](interfaces/SBServer.md)

### Type Aliases

- [ChannelMessageTypes](README.md#channelmessagetypes)
- [SBChannelId](README.md#sbchannelid)
- [SBObjectType](README.md#sbobjecttype)

### Variables

- [SB](README.md#sb)

### Functions

- [\_appendBuffer](README.md#_appendbuffer)
- [\_assertBase64](README.md#_assertbase64)
- [\_sb\_assert](README.md#_sb_assert)
- [\_sb\_exception](README.md#_sb_exception)
- [\_sb\_resolve](README.md#_sb_resolve)
- [arrayBuffer32ToBase62](README.md#arraybuffer32tobase62)
- [arrayBufferToBase64](README.md#arraybuffertobase64)
- [assemblePayload](README.md#assemblepayload)
- [base62ToArrayBuffer32](README.md#base62toarraybuffer32)
- [base62ToBase64](README.md#base62tobase64)
- [base64ToArrayBuffer](README.md#base64toarraybuffer)
- [base64ToBase62](README.md#base64tobase62)
- [cleanBase32mi](README.md#cleanbase32mi)
- [compareBuffers](README.md#comparebuffers)
- [decodeB64Url](README.md#decodeb64url)
- [encodeB64Url](README.md#encodeb64url)
- [encryptedContentsMakeBinary](README.md#encryptedcontentsmakebinary)
- [extractPayload](README.md#extractpayload)
- [extractPayloadV1](README.md#extractpayloadv1)
- [getRandomValues](README.md#getrandomvalues)
- [jsonParseWrapper](README.md#jsonparsewrapper)
- [partition](README.md#partition)
- [simpleRand256](README.md#simplerand256)
- [simpleRandomString](README.md#simplerandomstring)

## Type Aliases

### ChannelMessageTypes

Ƭ **ChannelMessageTypes**: ``"ack"`` \| ``"keys"`` \| ``"invalid"`` \| ``"ready"`` \| ``"encypted"``

___

### SBChannelId

Ƭ **SBChannelId**: `string`

___

### SBObjectType

Ƭ **SBObjectType**: ``"f"`` \| ``"p"`` \| ``"b"`` \| ``"t"``

## Variables

### SB

• **SB**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Channel` | typeof [`Channel`](classes/Channel.md) |
| `SB384` | typeof [`SB384`](classes/SB384.md) |
| `SBCrypto` | typeof [`SBCrypto`](classes/SBCrypto.md) |
| `SBMessage` | typeof [`SBMessage`](classes/SBMessage.md) |
| `Snackabra` | typeof [`Snackabra`](classes/Snackabra.md) |
| `arrayBufferToBase64` | (`buffer`: ``null`` \| `ArrayBuffer` \| `Uint8Array`, `variant`: ``"url"`` \| ``"b64"``) => `string` |

## Functions

### \_appendBuffer

▸ **_appendBuffer**(`buffer1`, `buffer2`): `ArrayBuffer`

Appends two buffers and returns a new buffer

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer1` | `ArrayBuffer` \| `Uint8Array` |
| `buffer2` | `ArrayBuffer` \| `Uint8Array` |

#### Returns

`ArrayBuffer`

new buffer

___

### \_assertBase64

▸ **_assertBase64**(`base64`): `boolean`

Returns 'true' if (and only if) string is well-formed base64.
Works same on browsers and nodejs.

#### Parameters

| Name | Type |
| :------ | :------ |
| `base64` | `string` |

#### Returns

`boolean`

___

### \_sb\_assert

▸ **_sb_assert**(`val`, `msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `unknown` |
| `msg` | `string` |

#### Returns

`void`

___

### \_sb\_exception

▸ **_sb_exception**(`loc`, `msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `loc` | `string` |
| `msg` | `string` |

#### Returns

`void`

___

### \_sb\_resolve

▸ **_sb_resolve**(`val`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `any` |

#### Returns

`any`

___

### arrayBuffer32ToBase62

▸ **arrayBuffer32ToBase62**(`buffer`): `string`

arrayBuffer32ToBase62 converts an ArrayBuffer32 to a base62 encoded string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buffer` | `ArrayBuffer` | ArrayBuffer32 |

#### Returns

`string`

base62 encoded string

___

### arrayBufferToBase64

▸ **arrayBufferToBase64**(`buffer`, `variant?`): `string`

Standardized 'btoa()'-like function, e.g., takes a binary string
('b') and returns a Base64 encoded version ('a' used to be short
for 'ascii').

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buffer` | ``null`` \| `ArrayBuffer` \| `Uint8Array` | `undefined` |
| `variant` | ``"url"`` \| ``"b64"`` | `'url'` |

#### Returns

`string`

base64 string

___

### assemblePayload

▸ **assemblePayload**(`data`): `BodyInit` \| ``null``

Assemble payload

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`SBPayload`](interfaces/SBPayload.md) |

#### Returns

`BodyInit` \| ``null``

___

### base62ToArrayBuffer32

▸ **base62ToArrayBuffer32**(`s`): `ArrayBuffer`

base62ToArrayBuffer32 converts a base62 encoded string to an ArrayBuffer32.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `s` | `string` | base62 encoded string |

#### Returns

`ArrayBuffer`

ArrayBuffer32

___

### base62ToBase64

▸ **base62ToBase64**(`s`): `string`

base62ToBase64 converts a base62 encoded string to a base64 encoded string.

**`Throws`**

Error if the string is not a valid base62 encoded string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `s` | `string` | base62 encoded string |

#### Returns

`string`

base64 encoded string

___

### base64ToArrayBuffer

▸ **base64ToArrayBuffer**(`str`): `Uint8Array`

Standardized 'atob()' function, e.g. takes the a Base64 encoded
input and decodes it. Note: always returns Uint8Array.
Accepts both regular Base64 and the URL-friendly variant,
where `+` => `-`, `/` => `_`, and the padding character is omitted.

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`Uint8Array`

returns decoded binary result

___

### base64ToBase62

▸ **base64ToBase62**(`s`): `string`

base64ToBase62 converts a base64 encoded string to a base62 encoded string.

**`Throws`**

Error if the string is not a valid base64 encoded string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `s` | `string` | base64 encoded string |

#### Returns

`string`

base62 encoded string

___

### cleanBase32mi

▸ **cleanBase32mi**(`s`): `string`

Disambiguates strings that are known to be 'base32mi' type

::

    'base32mi': '0123456789abcdefyhEjkLmNHpFrRTUW'

This is the base32mi disambiguation table

 ::

    [OoQD] -> '0'
    [lIiJ] -> '1'
    [Zz] -> '2'
    [A] -> '4'
    [Ss] -> '5'
    [G] -> '6'
    [t] -> '7'
    [B] -> '8'
    [gq] -> '9'
    [C] -> 'c'
    [Y] -> 'y'
    [KxX] -> 'k'
    [M] -> 'm'
    [n] -> 'N'
    [P] -> 'p'
    [uvV] -> 'U'
    [w] -> 'W'

Another way to think of it is this transform ('.' means no change):

::

    0123456789abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVXYZ
    ................9.1..1.N0.9.57UUk.248c0EF6.11kLm.0p0.5..Uky2

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

`string`

___

### compareBuffers

▸ **compareBuffers**(`a`, `b`): `boolean`

Compare buffers

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | ``null`` \| `ArrayBuffer` \| `Uint8Array` |
| `b` | ``null`` \| `ArrayBuffer` \| `Uint8Array` |

#### Returns

`boolean`

___

### decodeB64Url

▸ **decodeB64Url**(`input`): `string`

Decode b64 URL

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`string`

___

### encodeB64Url

▸ **encodeB64Url**(`input`): `string`

Encode into b64 URL

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`string`

___

### encryptedContentsMakeBinary

▸ **encryptedContentsMakeBinary**(`o`): [`EncryptedContentsBin`](interfaces/EncryptedContentsBin.md)

Force EncryptedContents object to binary (interface
supports either string or arrays). String contents
implies base64 encoding.

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | [`EncryptedContents`](interfaces/EncryptedContents.md) |

#### Returns

[`EncryptedContentsBin`](interfaces/EncryptedContentsBin.md)

___

### extractPayload

▸ **extractPayload**(`payload`): [`SBPayload`](interfaces/SBPayload.md)

Extract payload - this decodes from our binary (wire) format
to a JS object. This provides a binary encoding of any JSON,
and it allows some elements of the JSON to be raw (binary).

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `ArrayBuffer` |

#### Returns

[`SBPayload`](interfaces/SBPayload.md)

___

### extractPayloadV1

▸ **extractPayloadV1**(`payload`): [`SBPayload`](interfaces/SBPayload.md)

Deprecated (older version of payloads, for older channels)

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `ArrayBuffer` |

#### Returns

[`SBPayload`](interfaces/SBPayload.md)

___

### getRandomValues

▸ **getRandomValues**(`buffer`): `Uint8Array`

Fills buffer with random data

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | `Uint8Array` |

#### Returns

`Uint8Array`

___

### jsonParseWrapper

▸ **jsonParseWrapper**(`str`, `loc`): `any`

There are many problems with JSON parsing, adding a wrapper to capture more info.
The 'loc' parameter should be a (unique) string that allows you to find the usage
in the code; one approach is the line number in the file (at some point).

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `loc` | `string` |

#### Returns

`any`

___

### partition

▸ **partition**(`str`, `n`): `void`

Partition

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `n` | `number` |

#### Returns

`void`

___

### simpleRand256

▸ **simpleRand256**(): `number`

Returns random number

#### Returns

`number`

integer 0..255

___

### simpleRandomString

▸ **simpleRandomString**(`n`, `code`): `string`

Returns a random string in requested encoding

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |
| `code` | `string` |

#### Returns

`string`

random string

base32mi: ``0123456789abcdefyhEjkLmNHpFrRTUW``
