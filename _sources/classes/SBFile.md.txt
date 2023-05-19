[JSLib Reference Manual](../jslib2.md) / [Exports](../modules.md) / SBFile

# Class: SBFile

SBFile

## Hierarchy

- [`SBMessage`](SBMessage.md)

  ↳ **`SBFile`**

## Table of contents

### Constructors

- [constructor](SBFile.md#constructor)

### Properties

- [MAX\_SB\_BODY\_SIZE](SBFile.md#max_sb_body_size)
- [[SB\_MESSAGE\_SYMBOL]](SBFile.md#[sb_message_symbol])
- [channel](SBFile.md#channel)
- [contents](SBFile.md#contents)
- [data](SBFile.md#data)
- [image](SBFile.md#image)
- [imageMetaData](SBFile.md#imagemetadata)
- [image\_sign](SBFile.md#image_sign)
- [ready](SBFile.md#ready)

### Methods

- [#asImage](SBFile.md##asimage)
- [send](SBFile.md#send)

## Constructors

### constructor

• **new SBFile**(`channel`, `file`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `channel` | [`Channel`](Channel.md) |
| `file` | `File` |

#### Overrides

[SBMessage](SBMessage.md).[constructor](SBMessage.md#constructor)

## Properties

### MAX\_SB\_BODY\_SIZE

• **MAX\_SB\_BODY\_SIZE**: `number`

#### Inherited from

[SBMessage](SBMessage.md).[MAX_SB_BODY_SIZE](SBMessage.md#max_sb_body_size)

___

### [SB\_MESSAGE\_SYMBOL]

• **[SB\_MESSAGE\_SYMBOL]**: `boolean` = `true`

#### Inherited from

[SBMessage](SBMessage.md).[[SB_MESSAGE_SYMBOL]](SBMessage.md#[sb_message_symbol])

___

### channel

• **channel**: [`Channel`](Channel.md)

#### Inherited from

[SBMessage](SBMessage.md).[channel](SBMessage.md#channel)

___

### contents

• **contents**: `SBMessageContents`

#### Inherited from

[SBMessage](SBMessage.md).[contents](SBMessage.md#contents)

___

### data

• **data**: `Dictionary`<`string`\>

___

### image

• **image**: `string` = `''`

___

### imageMetaData

• **imageMetaData**: `ImageMetaData` = `{}`

___

### image\_sign

• **image\_sign**: `string` = `''`

___

### ready

• **ready**: `Promise`<[`SBMessage`](SBMessage.md)\>

#### Inherited from

[SBMessage](SBMessage.md).[ready](SBMessage.md#ready)

## Methods

### #asImage

▸ `Private` **#asImage**(`image`, `signKey`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `image` | `File` |
| `signKey` | `CryptoKey` |

#### Returns

`Promise`<`void`\>

___

### send

▸ **send**(): `Promise`<`string`\>

SBMessage.send()

#### Returns

`Promise`<`string`\>

#### Inherited from

[SBMessage](SBMessage.md).[send](SBMessage.md#send)
