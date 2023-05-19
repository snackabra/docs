[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / SBChannelHandle

# Interface: SBChannelHandle

SBChannelHandle

Complete descriptor of a channel. 'key' is stringified 'jwk' key.
The key is always private. If it matches the channelId, then it's
an 'owner' key.

## Table of contents

### Properties

- [channelId](SBChannelHandle.md#channelid)
- [key](SBChannelHandle.md#key)

## Properties

### channelId

• **channelId**: `string`

___

### key

• **key**: `JsonWebKey`
