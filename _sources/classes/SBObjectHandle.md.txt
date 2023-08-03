[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / SBObjectHandle

# Class: SBObjectHandle

Basic object handle for a shard (all storage).

To RETRIEVE a shard, you need id and verification.

To DECRYPT a shard, you need key, iv, and salt. Current
generation of shard servers will provide (iv, salt) upon
request if (and only if) you have id and verification.

Note that id32/key32 are array32 encoded (a32). (Both 
id and key are 256-bit entities).

'verification' is a 64-bit integer, encoded as a string
of up 23 characters: it is four 16-bit integers, either
joined by '.' or simply concatenated. Currently all four
values are random, future generation only first three
are guaranteed to be random, the fourth may be "designed".

## Implements

- [`SBObjectHandle`](SBObjectHandle.md)

## Implemented by

- [`SBObjectHandle`](SBObjectHandle.md)

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
- [key](SBObjectHandle.md#key)
- [key32](SBObjectHandle.md#key32)
- [type](SBObjectHandle.md#type)
- [verification](SBObjectHandle.md#verification)

## Constructors

### constructor

• **new SBObjectHandle**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`SBObjectHandle`](SBObjectHandle.md) |

## Properties

### actualSize

• `Optional` **actualSize**: `number`

optional: actual size of underlying file, if any

#### Implementation of

SBObjectHandle.actualSize

___

### dateAndTime

• `Optional` **dateAndTime**: `string`

optional: time of shard creation

#### Implementation of

SBObjectHandle.dateAndTime

___

### fileName

• `Optional` **fileName**: `string`

by convention will be "PAYLOAD" if it's a set of objects

#### Implementation of

SBObjectHandle.fileName

___

### fileType

• `Optional` **fileType**: `string`

optional: file type (mime)

#### Implementation of

SBObjectHandle.fileType

___

### iv

• `Optional` **iv**: `string` \| `Uint8Array`

you'll need these in case you want to track an object
across future (storage) servers, but as long as you
are within the same SB servers you can request them.

#### Implementation of

SBObjectHandle.iv

___

### lastModified

• `Optional` **lastModified**: `number`

optional: last modified time (of underlying file, if any)

#### Implementation of

SBObjectHandle.lastModified

___

### salt

• `Optional` **salt**: `string` \| `Uint8Array`

you'll need these in case you want to track an object
across future (storage) servers, but as long as you
are within the same SB servers you can request them.

#### Implementation of

SBObjectHandle.salt

___

### savedSize

• `Optional` **savedSize**: `number`

optional: size of shard (may be different from actualSize)

#### Implementation of

SBObjectHandle.savedSize

___

### shardServer

• `Optional` **shardServer**: `string`

optionally direct a shard to a specific server (especially for reads)

#### Implementation of

SBObjectHandle.shardServer

___

### version

• `Optional` **version**: `string` = `'1'`

version of this object

#### Implementation of

SBObjectHandle.version

## Accessors

### id

• `get` **id**(): `string`

id of object

#### Returns

`string`

#### Implementation of

SBObjectHandle.id

• `set` **id**(`value`): `void`

id of object

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Implementation of

SBObjectHandle.id

___

### id32

• `get` **id32**(): `Base62Encoded`

optional: array32 format of id

#### Returns

`Base62Encoded`

#### Implementation of

SBObjectHandle.id32

• `set` **id32**(`value`): `void`

optional: array32 format of id

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Base62Encoded` |

#### Returns

`void`

#### Implementation of

SBObjectHandle.id32

___

### key

• `get` **key**(): `string`

key of object

#### Returns

`string`

#### Implementation of

SBObjectHandle.key

• `set` **key**(`value`): `void`

key of object

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Implementation of

SBObjectHandle.key

___

### key32

• `get` **key32**(): `Base62Encoded`

optional: array32 format of key

#### Returns

`Base62Encoded`

#### Implementation of

SBObjectHandle.key32

• `set` **key32**(`value`): `void`

optional: array32 format of key

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Base62Encoded` |

#### Returns

`void`

#### Implementation of

SBObjectHandle.key32

___

### type

• `get` **type**(): [`SBObjectType`](../modules.md#sbobjecttype)

type of object

#### Returns

[`SBObjectType`](../modules.md#sbobjecttype)

#### Implementation of

SBObjectHandle.type

___

### verification

• `get` **verification**(): `string` \| `Promise`<`string`\>

and currently you also need to keep track of this,
but you can start sharing / communicating the
object before it's resolved: among other things it
serves as a 'write-through' verification

#### Returns

`string` \| `Promise`<`string`\>

#### Implementation of

SBObjectHandle.verification

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

#### Implementation of

SBObjectHandle.verification
