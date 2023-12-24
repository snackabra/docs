[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / SBMessage

# Class: SBMessage

SBMessage

## Table of contents

### Constructors

- [constructor](SBMessage.md#constructor)

### Properties

- [MAX\_SB\_BODY\_SIZE](SBMessage.md#max_sb_body_size)
- [[SB\_MESSAGE\_SYMBOL]](SBMessage.md#[sb_message_symbol])
- [channel](SBMessage.md#channel)
- [contents](SBMessage.md#contents)
- [ready](SBMessage.md#ready)

### Accessors

- [encryptionKey](SBMessage.md#encryptionkey)
- [sendToPubKey](SBMessage.md#sendtopubkey)

### Methods

- [send](SBMessage.md#send)

## Constructors

### constructor

• **new SBMessage**(`channel`, `bodyParameter?`, `sendToJsonWebKey?`): [`SBMessage`](SBMessage.md)

SBMessage

Body should be below 32KiB, though it tolerates up to 64KiB

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `channel` | [`Channel`](Channel.md) | `undefined` |
| `bodyParameter` | `string` \| `SBMessageContents` | `''` |
| `sendToJsonWebKey?` | `JsonWebKey` | `undefined` |

#### Returns

[`SBMessage`](SBMessage.md)

## Properties

### MAX\_SB\_BODY\_SIZE

• **MAX\_SB\_BODY\_SIZE**: `number`

___

### [SB\_MESSAGE\_SYMBOL]

• **[SB\_MESSAGE\_SYMBOL]**: `boolean` = `true`

___

### channel

• **channel**: [`Channel`](Channel.md)

___

### contents

• **contents**: `SBMessageContents`

___

### ready

• **ready**: `Promise`\<[`SBMessage`](SBMessage.md)\>

## Accessors

### encryptionKey

• `get` **encryptionKey**(): `undefined` \| `CryptoKey`

#### Returns

`undefined` \| `CryptoKey`

___

### sendToPubKey

• `get` **sendToPubKey**(): `undefined` \| `JsonWebKey`

#### Returns

`undefined` \| `JsonWebKey`

## Methods

### send

▸ **send**(): `Promise`\<`string`\>

SBMessage.send()

#### Returns

`Promise`\<`string`\>
