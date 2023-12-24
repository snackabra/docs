[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / SBObjectHandle

# Class: SBObjectHandle

SBObjecdtHandle

## Implements

- [`SBObjectHandle_base`](../interfaces/Interfaces.SBObjectHandle_base.md)

## Table of contents

### Constructors

- [constructor](SBObjectHandle.md#constructor)

### Properties

- [actualSize](SBObjectHandle.md#actualsize)
- [dateAndTime](SBObjectHandle.md#dateandtime)
- [fileName](SBObjectHandle.md#filename)
- [fileType](SBObjectHandle.md#filetype)
- [iv](SBObjectHandle.md#iv)
- [lastModified](SBObjectHandle.md#lastmodified)
- [salt](SBObjectHandle.md#salt)
- [savedSize](SBObjectHandle.md#savedsize)
- [shardServer](SBObjectHandle.md#shardserver)
- [version](SBObjectHandle.md#version)

### Accessors

- [id](SBObjectHandle.md#id)
- [id32](SBObjectHandle.md#id32)
- [id64](SBObjectHandle.md#id64)
- [id\_binary](SBObjectHandle.md#id_binary)
- [key](SBObjectHandle.md#key)
- [key32](SBObjectHandle.md#key32)
- [key64](SBObjectHandle.md#key64)
- [key\_binary](SBObjectHandle.md#key_binary)
- [type](SBObjectHandle.md#type)
- [verification](SBObjectHandle.md#verification)

## Constructors

### constructor

• **new SBObjectHandle**(`options`): [`SBObjectHandle`](SBObjectHandle.md)

Basic object handle for a shard (all storage).

To RETRIEVE a shard, you need id and verification.

To DECRYPT a shard, you need key, iv, and salt. Current
generation of shard servers will provide (iv, salt) upon
request if (and only if) you have id and verification.

Note that id32/key32 are array32 encoded base62 encoded.

'verification' is a 64-bit integer, encoded as a string
of up 23 characters: it is four 16-bit integers, either
joined by '.' or simply concatenated. Currently all four
values are random, future generation only first three
are guaranteed to be random, the fourth may be "designed".

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`SBObjectHandle`](../modules/Interfaces.md#sbobjecthandle) |

#### Returns

[`SBObjectHandle`](SBObjectHandle.md)

## Properties

### actualSize

• `Optional` **actualSize**: `number`

#### Implementation of

[SBObjectHandle_base](../interfaces/Interfaces.SBObjectHandle_base.md).[actualSize](../interfaces/Interfaces.SBObjectHandle_base.md#actualsize)

___

### dateAndTime

• `Optional` **dateAndTime**: `string`

#### Implementation of

[SBObjectHandle_base](../interfaces/Interfaces.SBObjectHandle_base.md).[dateAndTime](../interfaces/Interfaces.SBObjectHandle_base.md#dateandtime)

___

### fileName

• `Optional` **fileName**: `string`

#### Implementation of

[SBObjectHandle_base](../interfaces/Interfaces.SBObjectHandle_base.md).[fileName](../interfaces/Interfaces.SBObjectHandle_base.md#filename)

___

### fileType

• `Optional` **fileType**: `string`

#### Implementation of

[SBObjectHandle_base](../interfaces/Interfaces.SBObjectHandle_base.md).[fileType](../interfaces/Interfaces.SBObjectHandle_base.md#filetype)

___

### iv

• `Optional` **iv**: `string` \| `Uint8Array`

#### Implementation of

[SBObjectHandle_base](../interfaces/Interfaces.SBObjectHandle_base.md).[iv](../interfaces/Interfaces.SBObjectHandle_base.md#iv)

___

### lastModified

• `Optional` **lastModified**: `number`

#### Implementation of

[SBObjectHandle_base](../interfaces/Interfaces.SBObjectHandle_base.md).[lastModified](../interfaces/Interfaces.SBObjectHandle_base.md#lastmodified)

___

### salt

• `Optional` **salt**: `string` \| `Uint8Array`

#### Implementation of

[SBObjectHandle_base](../interfaces/Interfaces.SBObjectHandle_base.md).[salt](../interfaces/Interfaces.SBObjectHandle_base.md#salt)

___

### savedSize

• `Optional` **savedSize**: `number`

#### Implementation of

[SBObjectHandle_base](../interfaces/Interfaces.SBObjectHandle_base.md).[savedSize](../interfaces/Interfaces.SBObjectHandle_base.md#savedsize)

___

### shardServer

• `Optional` **shardServer**: `string`

___

### version

• **version**: [`SBObjectHandleVersions`](../modules.md#sbobjecthandleversions) = `currentSBOHVersion`

#### Implementation of

[SBObjectHandle_base](../interfaces/Interfaces.SBObjectHandle_base.md).[version](../interfaces/Interfaces.SBObjectHandle_base.md#version)

## Accessors

### id

• `get` **id**(): `string`

#### Returns

`string`

• `set` **id**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `ArrayBuffer` \| `Base62Encoded` |

#### Returns

`void`

___

### id32

• `get` **id32**(): `Base62Encoded`

#### Returns

`Base62Encoded`

___

### id64

• `get` **id64**(): `string`

#### Returns

`string`

___

### id\_binary

• `set` **id_binary**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `ArrayBuffer` |

#### Returns

`void`

___

### key

• `get` **key**(): `string`

#### Returns

`string`

• `set` **key**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `ArrayBuffer` \| `Base62Encoded` |

#### Returns

`void`

___

### key32

• `get` **key32**(): `Base62Encoded`

#### Returns

`Base62Encoded`

___

### key64

• `get` **key64**(): `string`

#### Returns

`string`

___

### key\_binary

• `set` **key_binary**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `ArrayBuffer` |

#### Returns

`void`

___

### type

• `get` **type**(): [`SBObjectType`](../modules.md#sbobjecttype)

#### Returns

[`SBObjectType`](../modules.md#sbobjecttype)

#### Implementation of

[SBObjectHandle_base](../interfaces/Interfaces.SBObjectHandle_base.md).[type](../interfaces/Interfaces.SBObjectHandle_base.md#type)

___

### verification

• `get` **verification**(): `string` \| `Promise`\<`string`\>

#### Returns

`string` \| `Promise`\<`string`\>

#### Implementation of

[SBObjectHandle_base](../interfaces/Interfaces.SBObjectHandle_base.md).[verification](../interfaces/Interfaces.SBObjectHandle_base.md#verification)

• `set` **verification**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `Promise`\<`string`\> |

#### Returns

`void`

#### Implementation of

[SBObjectHandle_base](../interfaces/Interfaces.SBObjectHandle_base.md).[verification](../interfaces/Interfaces.SBObjectHandle_base.md#verification)
