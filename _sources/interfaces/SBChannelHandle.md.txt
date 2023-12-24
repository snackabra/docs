[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / SBChannelHandle

# Interface: SBChannelHandle

SBChannelHandle

Complete descriptor of a channel. SBUserKeyString (previously 'key')
is a canonical format of stringified version of 'jwk'..
The underlying key is always private. If it corresponds to the channelId,
then it's an 'owner' key.

## Table of contents

### Properties

- [[SB\_CHANNEL\_HANDLE\_SYMBOL]](SBChannelHandle.md#[sb_channel_handle_symbol])
- [channelId](SBChannelHandle.md#channelid)
- [channelServer](SBChannelHandle.md#channelserver)
- [userKeyString](SBChannelHandle.md#userkeystring)

## Properties

### [SB\_CHANNEL\_HANDLE\_SYMBOL]

• `Optional` **[SB\_CHANNEL\_HANDLE\_SYMBOL]**: `boolean`

___

### channelId

• **channelId**: `string`

___

### channelServer

• `Optional` **channelServer**: `string`

___

### userKeyString

• **userKeyString**: `string`
