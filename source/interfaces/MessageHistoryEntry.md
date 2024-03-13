[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / MessageHistoryEntry

# Interface: MessageHistoryEntry

A single messagehistory shard: a Map<string, ArrayBuffer> where each buffer
is a payload-wrapped ChannelMessage, in turn payload-wrapped and shardified.
If the shard is missing, count must be zero (and vice versa).

An entry is always shardified.

## Hierarchy

- [`MessageHistory`](MessageHistory.md)

  ↳ **`MessageHistoryEntry`**

## Table of contents

### Properties

- [channelId](MessageHistoryEntry.md#channelid)
- [channelServer](MessageHistoryEntry.md#channelserver)
- [count](MessageHistoryEntry.md#count)
- [created](MessageHistoryEntry.md#created)
- [from](MessageHistoryEntry.md#from)
- [messages](MessageHistoryEntry.md#messages)
- [ownerPublicKey](MessageHistoryEntry.md#ownerpublickey)
- [to](MessageHistoryEntry.md#to)
- [type](MessageHistoryEntry.md#type)
- [version](MessageHistoryEntry.md#version)

## Properties

### channelId

• **channelId**: `string`

#### Inherited from

[MessageHistory](MessageHistory.md).[channelId](MessageHistory.md#channelid)

___

### channelServer

• `Optional` **channelServer**: `string`

#### Inherited from

[MessageHistory](MessageHistory.md).[channelServer](MessageHistory.md#channelserver)

___

### count

• **count**: `number`

#### Inherited from

[MessageHistory](MessageHistory.md).[count](MessageHistory.md#count)

___

### created

• **created**: `number`

#### Inherited from

[MessageHistory](MessageHistory.md).[created](MessageHistory.md#created)

___

### from

• **from**: `string`

#### Inherited from

[MessageHistory](MessageHistory.md).[from](MessageHistory.md#from)

___

### messages

• **messages**: `Map`\<`string`, `ArrayBuffer`\>

___

### ownerPublicKey

• **ownerPublicKey**: `string`

#### Inherited from

[MessageHistory](MessageHistory.md).[ownerPublicKey](MessageHistory.md#ownerpublickey)

___

### to

• **to**: `string`

#### Inherited from

[MessageHistory](MessageHistory.md).[to](MessageHistory.md#to)

___

### type

• **type**: ``"entry"``

#### Overrides

[MessageHistory](MessageHistory.md).[type](MessageHistory.md#type)

___

### version

• **version**: ``"20240228001"``

#### Inherited from

[MessageHistory](MessageHistory.md).[version](MessageHistory.md#version)
