[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / Message

# Interface: Message

The "app" level message format, provided to onMessage (by ChannelSocket), and
similar interfaces. Note it will only be forwarded if verified.

## Table of contents

### Properties

- [\_id](Message.md#_id)
- [body](Message.md#body)
- [channelId](Message.md#channelid)
- [eol](Message.md#eol)
- [messageTo](Message.md#messageto)
- [sender](Message.md#sender)
- [senderPublicKey](Message.md#senderpublickey)
- [senderTimestamp](Message.md#sendertimestamp)
- [serverTimestamp](Message.md#servertimestamp)

## Properties

### \_id

• **\_id**: `string`

___

### body

• **body**: `any`

___

### channelId

• **channelId**: `string`

___

### eol

• `Optional` **eol**: `number`

___

### messageTo

• `Optional` **messageTo**: `string`

___

### sender

• **sender**: `string`

___

### senderPublicKey

• **senderPublicKey**: `string`

___

### senderTimestamp

• **senderTimestamp**: `number`

___

### serverTimestamp

• **serverTimestamp**: `number`
