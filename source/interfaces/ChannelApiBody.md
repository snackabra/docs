[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / ChannelApiBody

# Interface: ChannelApiBody

Pretty much every api call needs a payload that contains the
api request, information about 'requestor' (user/visitor),
signature of same, time stamp, yada yada.

## Table of contents

### Properties

- [[SB\_CHANNEL\_API\_BODY\_SYMBOL]](ChannelApiBody.md#[sb_channel_api_body_symbol])
- [apiPayload](ChannelApiBody.md#apipayload)
- [apiPayloadBuf](ChannelApiBody.md#apipayloadbuf)
- [channelId](ChannelApiBody.md#channelid)
- [isOwner](ChannelApiBody.md#isowner)
- [path](ChannelApiBody.md#path)
- [sign](ChannelApiBody.md#sign)
- [timestamp](ChannelApiBody.md#timestamp)
- [userId](ChannelApiBody.md#userid)
- [userPublicKey](ChannelApiBody.md#userpublickey)

## Properties

### [SB\_CHANNEL\_API\_BODY\_SYMBOL]

• `Optional` **[SB\_CHANNEL\_API\_BODY\_SYMBOL]**: `boolean`

___

### apiPayload

• `Optional` **apiPayload**: `any`

___

### apiPayloadBuf

• `Optional` **apiPayloadBuf**: `ArrayBuffer`

___

### channelId

• **channelId**: `string`

___

### isOwner

• `Optional` **isOwner**: `boolean`

___

### path

• **path**: `string`

___

### sign

• **sign**: `ArrayBuffer`

___

### timestamp

• **timestamp**: `number`

___

### userId

• **userId**: `string`

___

### userPublicKey

• **userPublicKey**: `string`
