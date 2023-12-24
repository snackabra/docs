[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / [Interfaces](../modules/Interfaces.md) / SBObjectHandle\_base

# Interface: SBObjectHandle\_base

[Interfaces](../modules/Interfaces.md).SBObjectHandle_base

## Hierarchy

- **`SBObjectHandle_base`**

  ↳ [`SBObjectHandle_v1`](Interfaces.SBObjectHandle_v1.md)

  ↳ [`SBObjectHandle_v2`](Interfaces.SBObjectHandle_v2.md)

## Implemented by

- [`SBObjectHandle`](../classes/SBObjectHandle.md)

## Table of contents

### Properties

- [[SB\_OBJECT\_HANDLE\_SYMBOL]](Interfaces.SBObjectHandle_base.md#[sb_object_handle_symbol])
- [actualSize](Interfaces.SBObjectHandle_base.md#actualsize)
- [dateAndTime](Interfaces.SBObjectHandle_base.md#dateandtime)
- [fileName](Interfaces.SBObjectHandle_base.md#filename)
- [fileType](Interfaces.SBObjectHandle_base.md#filetype)
- [iv](Interfaces.SBObjectHandle_base.md#iv)
- [lastModified](Interfaces.SBObjectHandle_base.md#lastmodified)
- [salt](Interfaces.SBObjectHandle_base.md#salt)
- [savedSize](Interfaces.SBObjectHandle_base.md#savedsize)
- [type](Interfaces.SBObjectHandle_base.md#type)
- [verification](Interfaces.SBObjectHandle_base.md#verification)
- [version](Interfaces.SBObjectHandle_base.md#version)

## Properties

### [SB\_OBJECT\_HANDLE\_SYMBOL]

• `Optional` **[SB\_OBJECT\_HANDLE\_SYMBOL]**: `boolean`

___

### actualSize

• `Optional` **actualSize**: `number`

___

### dateAndTime

• `Optional` **dateAndTime**: `string`

___

### fileName

• `Optional` **fileName**: `string`

___

### fileType

• `Optional` **fileType**: `string`

___

### iv

• `Optional` **iv**: `string` \| `Uint8Array`

___

### lastModified

• `Optional` **lastModified**: `number`

___

### salt

• `Optional` **salt**: `string` \| `Uint8Array`

___

### savedSize

• `Optional` **savedSize**: `number`

___

### type

• `Optional` **type**: [`SBObjectType`](../modules.md#sbobjecttype)

___

### verification

• `Optional` **verification**: `string` \| `Promise`\<`string`\>

___

### version

• `Optional` **version**: [`SBObjectHandleVersions`](../modules.md#sbobjecthandleversions)
