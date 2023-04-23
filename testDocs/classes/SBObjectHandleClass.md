[JSLib](../README.md) / SBObjectHandleClass

# Class: SBObjectHandleClass

Basic object handle for a shard (all storage).

To RETRIEVE a shard, you need id and verification.
Next generation shard servers will only require id32.
Same goes for shard mirrors.

To DECRYPT a shard, you need key, iv, and salt. Current
generation of shard servers will provide (iv, salt) upon
request if (and only if) you have id and verification.

Note that id32/key32 are array32 encoded (b62). (Both 
id and key are 256-bit entities).

'verification' is a 64-bit integer, encoded as a string
of up 23 characters: it is four 16-bit integers, either
joined by '.' or simply concatenated. Currently all four
values are random, future generation only first three
are guaranteed to be random, the fourth may be "designed".

## Table of contents

### Constructors

- [constructor](SBObjectHandleClass.md#constructor)

### Properties

- [#id](SBObjectHandleClass.md##id)
- [#id32](SBObjectHandleClass.md##id32)
- [#key](SBObjectHandleClass.md##key)
- [#key32](SBObjectHandleClass.md##key32)
- [#type](SBObjectHandleClass.md##type)
- [#verification](SBObjectHandleClass.md##verification)
- [actualSize](SBObjectHandleClass.md#actualsize)
- [dateAndTime](SBObjectHandleClass.md#dateandtime)
- [fileName](SBObjectHandleClass.md#filename)
- [fileType](SBObjectHandleClass.md#filetype)
- [iv](SBObjectHandleClass.md#iv)
- [lastModified](SBObjectHandleClass.md#lastmodified)
- [salt](SBObjectHandleClass.md#salt)
- [savedSize](SBObjectHandleClass.md#savedsize)
- [shardServer](SBObjectHandleClass.md#shardserver)
- [version](SBObjectHandleClass.md#version)

### Accessors

- [id](SBObjectHandleClass.md#id)
- [id32](SBObjectHandleClass.md#id32)
- [key](SBObjectHandleClass.md#key)
- [key32](SBObjectHandleClass.md#key32)
- [type](SBObjectHandleClass.md#type)
- [verification](SBObjectHandleClass.md#verification)

### Methods

- [#setId32](SBObjectHandleClass.md##setid32)

## Constructors

### constructor

• **new SBObjectHandleClass**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`SBObjectHandle`](../interfaces/SBObjectHandle.md) |

## Properties

### #id

• `Private` `Optional` **#id**: `string`

___

### #id32

• `Private` `Optional` **#id32**: `Base62Encoded`

___

### #key

• `Private` `Optional` **#key**: `string`

___

### #key32

• `Private` `Optional` **#key32**: `Base62Encoded`

___

### #type

• `Private` **#type**: [`SBObjectType`](../README.md#sbobjecttype) = `'b'`

___

### #verification

• `Private` `Optional` **#verification**: `string` \| `Promise`<`string`\>

___

### actualSize

• `Optional` **actualSize**: `number`

optional: actual size of underlying file, if any

___

### dateAndTime

• `Optional` **dateAndTime**: `string`

optional: time of shard creation

___

### fileName

• `Optional` **fileName**: `string`

by convention will be "PAYLOAD" if it's a set of objects

___

### fileType

• `Optional` **fileType**: `string`

optional: file type (mime)

___

### iv

• `Optional` **iv**: `string` \| `Uint8Array`

you'll need these in case you want to track an object
across future (storage) servers, but as long as you
are within the same SB servers you can request them.

___

### lastModified

• `Optional` **lastModified**: `number`

optional: last modified time (of underlying file, if any)

___

### salt

• `Optional` **salt**: `string` \| `Uint8Array`

you'll need these in case you want to track an object
across future (storage) servers, but as long as you
are within the same SB servers you can request them.

___

### savedSize

• `Optional` **savedSize**: `number`

optional: size of shard (may be different from actualSize)

___

### shardServer

• `Optional` **shardServer**: `string`

optionally direct a shard to a specific server (especially for reads)

___

### version

• **version**: `string` = `'1'`

version of this object

## Accessors

### id

• `get` **id**(): `string`

id of object

#### Returns

`string`

• `set` **id**(`value`): `void`

id of object

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

___

### id32

• `get` **id32**(): `Base62Encoded`

optional: array32 format of id

#### Returns

`Base62Encoded`

• `set` **id32**(`value`): `void`

optional: array32 format of id

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Base62Encoded` |

#### Returns

`void`

___

### key

• `get` **key**(): `string`

key of object

#### Returns

`string`

• `set` **key**(`value`): `void`

key of object

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

___

### key32

• `get` **key32**(): `Base62Encoded`

optional: array32 format of key

#### Returns

`Base62Encoded`

• `set` **key32**(`value`): `void`

optional: array32 format of key

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Base62Encoded` |

#### Returns

`void`

___

### type

• `get` **type**(): [`SBObjectType`](../README.md#sbobjecttype)

type of object

#### Returns

[`SBObjectType`](../README.md#sbobjecttype)

___

### verification

• `get` **verification**(): `string` \| `Promise`<`string`\>

and currently you also need to keep track of this,
but you can start sharing / communicating the
object before it's resolved: among other things it
serves as a 'write-through' verification

#### Returns

`string` \| `Promise`<`string`\>

• `set` **verification**(`value`): `void`

and currently you also need to keep track of this,
but you can start sharing / communicating the
object before it's resolved: among other things it
serves as a 'write-through' verification

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `Promise`<`string`\> |

#### Returns

`void`

## Methods

### #setId32

▸ `Private` **#setId32**(): `void`

#### Returns

`void`
