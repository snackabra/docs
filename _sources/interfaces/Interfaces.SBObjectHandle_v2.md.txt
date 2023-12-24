[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / [Interfaces](../modules/Interfaces.md) / SBObjectHandle\_v2

# Interface: SBObjectHandle\_v2

[Interfaces](../modules/Interfaces.md).SBObjectHandle_v2

## Hierarchy

- [`SBObjectHandle_base`](Interfaces.SBObjectHandle_base.md)

  ↳ **`SBObjectHandle_v2`**

## Table of contents

### Properties

- [[SB\_OBJECT\_HANDLE\_SYMBOL]](Interfaces.SBObjectHandle_v2.md#[sb_object_handle_symbol])
- [actualSize](Interfaces.SBObjectHandle_v2.md#actualsize)
- [dateAndTime](Interfaces.SBObjectHandle_v2.md#dateandtime)
- [fileName](Interfaces.SBObjectHandle_v2.md#filename)
- [fileType](Interfaces.SBObjectHandle_v2.md#filetype)
- [id](Interfaces.SBObjectHandle_v2.md#id)
- [iv](Interfaces.SBObjectHandle_v2.md#iv)
- [key](Interfaces.SBObjectHandle_v2.md#key)
- [lastModified](Interfaces.SBObjectHandle_v2.md#lastmodified)
- [salt](Interfaces.SBObjectHandle_v2.md#salt)
- [savedSize](Interfaces.SBObjectHandle_v2.md#savedsize)
- [type](Interfaces.SBObjectHandle_v2.md#type)
- [verification](Interfaces.SBObjectHandle_v2.md#verification)
- [version](Interfaces.SBObjectHandle_v2.md#version)

## Properties

### [SB\_OBJECT\_HANDLE\_SYMBOL]

• `Optional` **[SB\_OBJECT\_HANDLE\_SYMBOL]**: `boolean`

#### Inherited from

[SBObjectHandle_base](Interfaces.SBObjectHandle_base.md).[[SB_OBJECT_HANDLE_SYMBOL]](Interfaces.SBObjectHandle_base.md#[sb_object_handle_symbol])

___

### actualSize

• `Optional` **actualSize**: `number`

#### Inherited from

[SBObjectHandle_base](Interfaces.SBObjectHandle_base.md).[actualSize](Interfaces.SBObjectHandle_base.md#actualsize)

___

### dateAndTime

• `Optional` **dateAndTime**: `string`

#### Inherited from

[SBObjectHandle_base](Interfaces.SBObjectHandle_base.md).[dateAndTime](Interfaces.SBObjectHandle_base.md#dateandtime)

___

### fileName

• `Optional` **fileName**: `string`

#### Inherited from

[SBObjectHandle_base](Interfaces.SBObjectHandle_base.md).[fileName](Interfaces.SBObjectHandle_base.md#filename)

___

### fileType

• `Optional` **fileType**: `string`

#### Inherited from

[SBObjectHandle_base](Interfaces.SBObjectHandle_base.md).[fileType](Interfaces.SBObjectHandle_base.md#filetype)

___

### id

• **id**: `Base62Encoded`

___

### iv

• `Optional` **iv**: `string` \| `Uint8Array`

#### Inherited from

[SBObjectHandle_base](Interfaces.SBObjectHandle_base.md).[iv](Interfaces.SBObjectHandle_base.md#iv)

___

### key

• **key**: `Base62Encoded`

___

### lastModified

• `Optional` **lastModified**: `number`

#### Inherited from

[SBObjectHandle_base](Interfaces.SBObjectHandle_base.md).[lastModified](Interfaces.SBObjectHandle_base.md#lastmodified)

___

### salt

• `Optional` **salt**: `string` \| `Uint8Array`

#### Inherited from

[SBObjectHandle_base](Interfaces.SBObjectHandle_base.md).[salt](Interfaces.SBObjectHandle_base.md#salt)

___

### savedSize

• `Optional` **savedSize**: `number`

#### Inherited from

[SBObjectHandle_base](Interfaces.SBObjectHandle_base.md).[savedSize](Interfaces.SBObjectHandle_base.md#savedsize)

___

### type

• `Optional` **type**: [`SBObjectType`](../modules.md#sbobjecttype)

#### Inherited from

[SBObjectHandle_base](Interfaces.SBObjectHandle_base.md).[type](Interfaces.SBObjectHandle_base.md#type)

___

### verification

• `Optional` **verification**: `string` \| `Promise`\<`string`\>

#### Inherited from

[SBObjectHandle_base](Interfaces.SBObjectHandle_base.md).[verification](Interfaces.SBObjectHandle_base.md#verification)

___

### version

• **version**: ``"2"``

#### Overrides

[SBObjectHandle_base](Interfaces.SBObjectHandle_base.md).[version](Interfaces.SBObjectHandle_base.md#version)
