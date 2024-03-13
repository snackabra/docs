[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / MessageHistoryDirectory

# Interface: MessageHistoryDirectory

Directory of message history structures. entries can be 'direct' objects, or
to handle (arbitrary) scaling then at any point they can be 'sharded' (eg
payload-wrapped); the string key is always the 'from' ('first') of whatever
is referenced by Map (directly or indirectly).

'depth' of '0' means all the entries are 'direct', eg they are all shards
of sets of messages; depth '1' means

## Hierarchy

- [`MessageHistory`](MessageHistory.md)

  ↳ **`MessageHistoryDirectory`**

## Table of contents

### Properties

- [channelId](MessageHistoryDirectory.md#channelid)
- [channelServer](MessageHistoryDirectory.md#channelserver)
- [count](MessageHistoryDirectory.md#count)
- [created](MessageHistoryDirectory.md#created)
- [depth](MessageHistoryDirectory.md#depth)
- [from](MessageHistoryDirectory.md#from)
- [lastModified](MessageHistoryDirectory.md#lastmodified)
- [ownerPublicKey](MessageHistoryDirectory.md#ownerpublickey)
- [shards](MessageHistoryDirectory.md#shards)
- [subdirectories](MessageHistoryDirectory.md#subdirectories)
- [to](MessageHistoryDirectory.md#to)
- [type](MessageHistoryDirectory.md#type)
- [version](MessageHistoryDirectory.md#version)

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

### depth

• **depth**: `number`

___

### from

• **from**: `string`

#### Inherited from

[MessageHistory](MessageHistory.md).[from](MessageHistory.md#from)

___

### lastModified

• **lastModified**: `number`

___

### ownerPublicKey

• **ownerPublicKey**: `string`

#### Inherited from

[MessageHistory](MessageHistory.md).[ownerPublicKey](MessageHistory.md#ownerpublickey)

___

### shards

• `Optional` **shards**: `Map`\<`string`, [`SBObjectHandle`](SBObjectHandle.md)\>

___

### subdirectories

• `Optional` **subdirectories**: `Map`\<`string`, [`MessageHistoryDirectory`](MessageHistoryDirectory.md)\>

___

### to

• **to**: `string`

#### Inherited from

[MessageHistory](MessageHistory.md).[to](MessageHistory.md#to)

___

### type

• **type**: ``"directory"``

#### Overrides

[MessageHistory](MessageHistory.md).[type](MessageHistory.md#type)

___

### version

• **version**: ``"20240228001"``

#### Inherited from

[MessageHistory](MessageHistory.md).[version](MessageHistory.md#version)
