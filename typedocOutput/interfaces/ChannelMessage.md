[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / ChannelMessage

# Interface: ChannelMessage

SB standard wrapped encrypted messages. This is largely 'internal', normal
usage of the library will work at a higher level ('Message' interface).

Encryption is done with AES-GCM, 16 bytes of salt.

Timestamp prefix is fourty-two (26) [0-3] characters. It encodes epoch
milliseconds * 4^4 (last four are '0000').

"Everything is optional" as this is used in multiple contexts. Use
``validate_ChannelMessage()`` to validate.

Note that channel server doesn't need userPublicKey on every channel message
since it's provided on websocket setup.

Complete channel "_id" is channelId + '_' + subChannel + '_' +
timestampPrefix This allows (prefix) searches within time spans on a per
channel (and if applicable, subchannel) basis. Special subchannel 'blank'
(represented as '____') is the default channel and generally the only one
that visitors have access to.

A core exception is that all messages with a TTL in the range 1-7 (eg range
of 1 minute to 72 hours) are duplicated onto subchannels matching the TTLs,
namely '___1', '___2', '___3', etc. Thus an oldMessages fetch can for example
request '___4' to get all messages that were sent with TTL 4 (eg 1 hour).
Which also means that as Owner, if you set TTL on a message then you can't
use the fourth character (if you try to while setting a TTL, channel server
will reject it).

Properties that are generally retained or communicated inside payload
packaging have short names (apologies for lack of readability).
'unencryptedContents' has a long and cumbersome name for obvious reasons.

There are a couple of semantics that are enforced by the channel server;
since this is partly a policy issue of the channel server, anything in this
jslib documentation might be incomplete. For example, baseline channel server
does not allow messages to both be 'infinite ttl' and addressed (eg have a
'to' field value). 

If any protocol wants to do additional or different encryption, it would need
to wrap: the core binary format is defined to have room for iv and salt, and
prescribes sizes 12 and 16 respectively. Strictly speaking, the protocol can
use these 28 bytes for whatever it wants. A protocol that wants to do
something completely different can simply modify the 'c' (contents) buffer
and append any binary data it needs.

## Table of contents

### Properties

- [[SB\_CHANNEL\_MESSAGE\_SYMBOL]](ChannelMessage.md#[sb_channel_message_symbol])
- [\_id](ChannelMessage.md#_id)
- [c](ChannelMessage.md#c)
- [channelId](ChannelMessage.md#channelid)
- [error](ChannelMessage.md#error)
- [f](ChannelMessage.md#f)
- [i2](ChannelMessage.md#i2)
- [iv](ChannelMessage.md#iv)
- [protocol](ChannelMessage.md#protocol)
- [ready](ChannelMessage.md#ready)
- [s](ChannelMessage.md#s)
- [salt](ChannelMessage.md#salt)
- [stringMessage](ChannelMessage.md#stringmessage)
- [sts](ChannelMessage.md#sts)
- [t](ChannelMessage.md#t)
- [timestampPrefix](ChannelMessage.md#timestampprefix)
- [ts](ChannelMessage.md#ts)
- [ttl](ChannelMessage.md#ttl)
- [unencryptedContents](ChannelMessage.md#unencryptedcontents)

## Properties

### [SB\_CHANNEL\_MESSAGE\_SYMBOL]

• `Optional` **[SB\_CHANNEL\_MESSAGE\_SYMBOL]**: `boolean`

___

### \_id

• `Optional` **\_id**: `string`

___

### c

• `Optional` **c**: `string` \| `ArrayBuffer`

___

### channelId

• `Optional` **channelId**: `string`

___

### error

• `Optional` **error**: `string`

___

### f

• `Optional` **f**: `string`

___

### i2

• `Optional` **i2**: `string`

___

### iv

• `Optional` **iv**: `Uint8Array`

___

### protocol

• `Optional` **protocol**: [`SBProtocol`](SBProtocol.md)

___

### ready

• `Optional` **ready**: `boolean`

___

### s

• `Optional` **s**: `ArrayBuffer`

___

### salt

• `Optional` **salt**: `ArrayBuffer`

___

### stringMessage

• `Optional` **stringMessage**: `boolean`

___

### sts

• `Optional` **sts**: `number`

___

### t

• `Optional` **t**: `string`

___

### timestampPrefix

• `Optional` **timestampPrefix**: `string`

___

### ts

• `Optional` **ts**: `number`

___

### ttl

• `Optional` **ttl**: `number`

___

### unencryptedContents

• `Optional` **unencryptedContents**: `any`
