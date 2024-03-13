[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / MessageHistory

# Interface: MessageHistory

'MessageHistory' is where Messages go to retire. It's an infinitely-scaleable
(in a practical sense) structure that can be used to store messages in a
flexible way. Chunks of messages are stored as shards, in the form of a
payload wrapped Map (key->message), where each message in turn is a
payload-wrapped ChannelMessage.

This can be thought of as a flexible 'key-value store archive format' (where
the keys are globally unique and monotonically increasing).

The channel server keeps the 'latest' messages (by some definition) in a
straight KV format; overflow (or archiving) is done by processing these into
this structure.

Note that depending on at what stage this object is in, it can either be
mutable or immutable. While immutable, the timestamps track updates. Once
(and eventually) encapsulated into a shard and it becomes immutable, then
'lastModified' documents that point of time.

Note that this structure is not particularly opinionated about how it should
organize itself. Since any components that are shardified are immutable, any
future processing requirements can re-map as needed. Our initial design
priority is to be flexible, and simple, in particular to keep bug rate low.

## Hierarchy

- **`MessageHistory`**

  ↳ [`MessageHistoryEntry`](MessageHistoryEntry.md)

  ↳ [`MessageHistoryDirectory`](MessageHistoryDirectory.md)

## Table of contents

### Properties

- [channelId](MessageHistory.md#channelid)
- [channelServer](MessageHistory.md#channelserver)
- [count](MessageHistory.md#count)
- [created](MessageHistory.md#created)
- [from](MessageHistory.md#from)
- [ownerPublicKey](MessageHistory.md#ownerpublickey)
- [to](MessageHistory.md#to)
- [type](MessageHistory.md#type)
- [version](MessageHistory.md#version)

## Properties

### channelId

• **channelId**: `string`

___

### channelServer

• `Optional` **channelServer**: `string`

___

### count

• **count**: `number`

___

### created

• **created**: `number`

___

### from

• **from**: `string`

___

### ownerPublicKey

• **ownerPublicKey**: `string`

___

### to

• **to**: `string`

___

### type

• **type**: ``"directory"`` \| ``"entry"``

___

### version

• **version**: ``"20240228001"``
