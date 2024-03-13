[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / SBObjectHandle

# Interface: SBObjectHandle

SBObjectHandle

SBObjectHandle is a string that encodes the object type, object id, and
object key. It is used to retrieve objects from the storage server.

- version is a single character string that indicates the version of the
  object handle. Currently, the following versions are supported:

  - '1' : version 1 (legacy)
  - '2' : version 2 (legacy)
  - '3' : version 3 (current)

- id is a 43 character base62 string that identifies the object. It is used
  to retrieve the object from the storage server.

- key is a 43 character base62

- verification is a random (server specific) string that is used to verify
  that you're allowed to access the object (specifically, that somebody,
  perhaps you, has paid for the object).

- iv and salt are optional and not tracked by shard servers etc, but
  facilitates app usage. During a period of time (the 'privacy window') you
  can request these from the storage server. After that window they get
  re-randomized, and if you didn't keep the values (for example, you received
  an object but didn't do anything with it), then they're gone.

- storageServer is optional, if provided it'll be asked first

## Table of contents

### Properties

- [[SB\_OBJECT\_HANDLE\_SYMBOL]](SBObjectHandle.md#[sb_object_handle_symbol])
- [actualSize](SBObjectHandle.md#actualsize)
- [data](SBObjectHandle.md#data)
- [dateAndTime](SBObjectHandle.md#dateandtime)
- [fileName](SBObjectHandle.md#filename)
- [fileType](SBObjectHandle.md#filetype)
- [id](SBObjectHandle.md#id)
- [iv](SBObjectHandle.md#iv)
- [key](SBObjectHandle.md#key)
- [lastModified](SBObjectHandle.md#lastmodified)
- [payload](SBObjectHandle.md#payload)
- [salt](SBObjectHandle.md#salt)
- [savedSize](SBObjectHandle.md#savedsize)
- [storageServer](SBObjectHandle.md#storageserver)
- [type](SBObjectHandle.md#type)
- [verification](SBObjectHandle.md#verification)
- [version](SBObjectHandle.md#version)

## Properties

### [SB\_OBJECT\_HANDLE\_SYMBOL]

• `Optional` **[SB\_OBJECT\_HANDLE\_SYMBOL]**: `boolean`

___

### actualSize

• `Optional` **actualSize**: `number`

___

### data

• `Optional` **data**: `ArrayBuffer` \| `WeakRef`\<`ArrayBuffer`\>

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

### id

• **id**: [`Base62Encoded`](../modules.md#base62encoded)

___

### iv

• `Optional` **iv**: `Uint8Array` \| [`Base62Encoded`](../modules.md#base62encoded)

___

### key

• `Optional` **key**: [`Base62Encoded`](../modules.md#base62encoded)

___

### lastModified

• `Optional` **lastModified**: `number`

___

### payload

• `Optional` **payload**: `any`

___

### salt

• `Optional` **salt**: `ArrayBuffer` \| [`Base62Encoded`](../modules.md#base62encoded)

___

### savedSize

• `Optional` **savedSize**: `number`

___

### storageServer

• `Optional` **storageServer**: `string`

___

### type

• `Optional` **type**: `string`

___

### verification

• `Optional` **verification**: `string` \| `Promise`\<`string`\>

___

### version

• `Optional` **version**: [`SBObjectHandleVersions`](../modules.md#sbobjecthandleversions)
