[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / SBMessage

# Class: SBMessage

Every message being sent goes through the SBMessage object. Upon creation,
the provided contents (which can be any JS object more or les) is encrypted
and wrapped into a ChannelMessage object, which is what is later sent. Same
binary format is used for restful endpoints, websockets, and other
transports.

Body should be below 32KiB. Note: for protocol choice, sbm will prioritize
message options over channel choice, and lacking both will default to
Channel.defaultProtocol (which is Protocol_ECDH).

Note that with Protocl_ECDH, you need to make sure 'sendTo' is set, since
that will otherwise default to Owner. It does not support channel
'broadcast'.

The option 'sendString' allows for 'lower-level' messaging, for example for
special 'keep alive' messages that might be server-specific. If that is set,
the contents are expected to be a string, and the message will be sent as-is,
and features like encryption, ack/nack, ttl, routing, etc, are not available.

## Table of contents

### Constructors

- [constructor](SBMessage.md#constructor)

### Properties

- [[SB\_MESSAGE\_SYMBOL]](SBMessage.md#[sb_message_symbol])
- [channel](SBMessage.md#channel)
- [contents](SBMessage.md#contents)
- [options](SBMessage.md#options)
- [salt](SBMessage.md#salt)
- [sbMessageReady](SBMessage.md#sbmessageready)
- [ReadyFlag](SBMessage.md#readyflag)

### Accessors

- [SBMessageReadyFlag](SBMessage.md#sbmessagereadyflag)
- [message](SBMessage.md#message)
- [ready](SBMessage.md#ready)

### Methods

- [send](SBMessage.md#send)

## Constructors

### constructor

• **new SBMessage**(`channel`, `contents`, `options?`): [`SBMessage`](SBMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `channel` | [`Channel`](Channel.md) |
| `contents` | `any` |
| `options` | [`MessageOptions`](../interfaces/MessageOptions.md) |

#### Returns

[`SBMessage`](SBMessage.md)

## Properties

### [SB\_MESSAGE\_SYMBOL]

• **[SB\_MESSAGE\_SYMBOL]**: `boolean` = `true`

___

### channel

• **channel**: [`Channel`](Channel.md)

___

### contents

• **contents**: `any`

___

### options

• **options**: [`MessageOptions`](../interfaces/MessageOptions.md) = `{}`

___

### salt

• `Optional` **salt**: `ArrayBuffer`

___

### sbMessageReady

• **sbMessageReady**: `Promise`\<[`SBMessage`](SBMessage.md)\>

___

### ReadyFlag

▪ `Static` **ReadyFlag**: `symbol`

## Accessors

### SBMessageReadyFlag

• `get` **SBMessageReadyFlag**(): `any`

#### Returns

`any`

___

### message

• `get` **message**(): `string` \| [`ChannelMessage`](../interfaces/ChannelMessage.md)

#### Returns

`string` \| [`ChannelMessage`](../interfaces/ChannelMessage.md)

___

### ready

• `get` **ready**(): `Promise`\<[`SBMessage`](SBMessage.md)\>

#### Returns

`Promise`\<[`SBMessage`](SBMessage.md)\>

## Methods

### send

▸ **send**(): `Promise`\<`any`\>

SBMessage.send()

#### Returns

`Promise`\<`any`\>
