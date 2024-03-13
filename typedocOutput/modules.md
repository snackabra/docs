[JSLib Reference Manual](README.md) / Exports

# JSLib Reference Manual

## Table of contents

### Enumerations

- [KeyPrefix](enums/KeyPrefix.md)

### Classes

- [Channel](classes/Channel.md)
- [ChannelSocket](classes/ChannelSocket.md)
- [MessageBus](classes/MessageBus.md)
- [MessageQueue](classes/MessageQueue.md)
- [Protocol\_AES\_GCM\_256](classes/Protocol_AES_GCM_256.md)
- [Protocol\_ECDH](classes/Protocol_ECDH.md)
- [SB384](classes/SB384.md)
- [SBChannelKeys](classes/SBChannelKeys.md)
- [SBCrypto](classes/SBCrypto.md)
- [SBError](classes/SBError.md)
- [Snackabra](classes/Snackabra.md)
- [StorageApi](classes/StorageApi.md)

### Interfaces

- [ChannelAdminData](interfaces/ChannelAdminData.md)
- [ChannelApiBody](interfaces/ChannelApiBody.md)
- [ChannelMessage](interfaces/ChannelMessage.md)
- [EncryptParams](interfaces/EncryptParams.md)
- [Message](interfaces/Message.md)
- [MessageHistory](interfaces/MessageHistory.md)
- [MessageHistoryDirectory](interfaces/MessageHistoryDirectory.md)
- [MessageHistoryEntry](interfaces/MessageHistoryEntry.md)
- [MessageOptions](interfaces/MessageOptions.md)
- [Protocol\_KeyInfo](interfaces/Protocol_KeyInfo.md)
- [SBChannelData](interfaces/SBChannelData.md)
- [SBChannelHandle](interfaces/SBChannelHandle.md)
- [SBObjectHandle](interfaces/SBObjectHandle.md)
- [SBProtocol](interfaces/SBProtocol.md)
- [SBStorageToken](interfaces/SBStorageToken.md)
- [Shard](interfaces/Shard.md)

### Type Aliases

- [Base62Encoded](modules.md#base62encoded)
- [MessageTtl](modules.md#messagettl)
- [SB384Hash](modules.md#sb384hash)
- [SBChannelId](modules.md#sbchannelid)
- [SBObjectHandleVersions](modules.md#sbobjecthandleversions)
- [SBStorageTokenHash](modules.md#sbstoragetokenhash)
- [SBUserId](modules.md#sbuserid)
- [SBUserPrivateKey](modules.md#sbuserprivatekey)
- [SBUserPublicKey](modules.md#sbuserpublickey)

### Variables

- [NEW\_CHANNEL\_MINIMUM\_BUDGET](modules.md#new_channel_minimum_budget)
- [SB](modules.md#sb)
- [SBStorageTokenPrefix](modules.md#sbstoragetokenprefix)
- [b62regex](modules.md#b62regex)
- [base62](modules.md#base62)
- [base62regex](modules.md#base62regex)
- [base64url](modules.md#base64url)
- [msgTtlToSeconds](modules.md#msgttltoseconds)
- [msgTtlToString](modules.md#msgttltostring)
- [sbCrypto](modules.md#sbcrypto)
- [version](modules.md#version)

### Functions

- [Memoize](modules.md#memoize)
- [Ready](modules.md#ready)
- [SBApiFetch](modules.md#sbapifetch)
- [\_check\_SBChannelData](modules.md#_check_sbchanneldata)
- [\_check\_SBChannelHandle](modules.md#_check_sbchannelhandle)
- [\_check\_SBObjectHandle](modules.md#_check_sbobjecthandle)
- [\_check\_SBStorageToken](modules.md#_check_sbstoragetoken)
- [arrayBufferToBase62](modules.md#arraybuffertobase62)
- [arrayBufferToBase64url](modules.md#arraybuffertobase64url)
- [assemblePayload](modules.md#assemblepayload)
- [b32decode](modules.md#b32decode)
- [b32encode](modules.md#b32encode)
- [b32process](modules.md#b32process)
- [base62ToArrayBuffer](modules.md#base62toarraybuffer)
- [base62ToBase64](modules.md#base62tobase64)
- [base64ToArrayBuffer](modules.md#base64toarraybuffer)
- [base64ToBase62](modules.md#base64tobase62)
- [compareBuffers](modules.md#comparebuffers)
- [extractPayload](modules.md#extractpayload)
- [getRandomValues](modules.md#getrandomvalues)
- [hydrateKey](modules.md#hydratekey)
- [isBase62Encoded](modules.md#isbase62encoded)
- [jsonOrString](modules.md#jsonorstring)
- [jsonParseWrapper](modules.md#jsonparsewrapper)
- [setDebugLevel](modules.md#setdebuglevel)
- [stringify\_SBObjectHandle](modules.md#stringify_sbobjecthandle)
- [stripChannelMessage](modules.md#stripchannelmessage)
- [validate\_ChannelApiBody](modules.md#validate_channelapibody)
- [validate\_ChannelMessage](modules.md#validate_channelmessage)
- [validate\_Message](modules.md#validate_message)
- [validate\_SBChannelData](modules.md#validate_sbchanneldata)
- [validate\_SBChannelHandle](modules.md#validate_sbchannelhandle)
- [validate\_SBObjectHandle](modules.md#validate_sbobjecthandle)
- [validate\_SBStorageToken](modules.md#validate_sbstoragetoken)

## Type Aliases

### Base62Encoded

Ƭ **Base62Encoded**: `string` & \{ `_brand?`: ``"Base62Encoded"``  }

***************************************************************************************************

___

### MessageTtl

Ƭ **MessageTtl**: ``0`` \| ``3`` \| ``4`` \| ``5`` \| ``6`` \| ``7`` \| ``8`` \| ``15``

Index/number of seconds/string description of TTL values (0-15) for
messages.

```text
    #    Seconds  Description
    0          0  Ephemeral (not stored)
    1             <reserved>
    2             <reserved>
    3         60  One minute (current minimum)
    4        300  Five minutes
    5       1800  Thirty minutes
    6      14400  Four hours
    7     129600  36 hours
    8     864000  Ten days
   10             <reserved> (all 'reserved' future choices will be monotonically increasing)
   11             <reserved>
   12             <reserved>
   13             <reserved>
   14             <reserved>
   15   Infinity  Permastore, this is the default.
 ```

 Note that time periods above '8' (10 days) is largely TBD pending
 finalization of what the storage server will prefer. As far as messages
 are concerned, anything above '8' is 'very long'.

 A few rules around messages and TTL (this list is not exhaustive):

 - Currently only values 0, 3-8, and 15 are valid (15 is default).
 - Routable messages (eg messages with a 'to' field) may not have ttl above '8'.
 - TTL messages are never in storage shards; channel servers can chose to
   limit how many they will keep (on a per TTL category basis) regardless
   of time value (but at least last 1000).
 - TTL messages are duplicated and available on 'main' channel ('i2')
   '____' as well as on subchannels '___3', '___4', up to '___8'.

 It's valid to encode it as four bits.

___

### SB384Hash

Ƭ **SB384Hash**: `string`

___

### SBChannelId

Ƭ **SBChannelId**: [`SB384Hash`](modules.md#sb384hash)

___

### SBObjectHandleVersions

Ƭ **SBObjectHandleVersions**: ``"1"`` \| ``"2"`` \| ``"3"``

___

### SBStorageTokenHash

Ƭ **SBStorageTokenHash**: `string`

This is whatever token system the channel server uses.

For example with 'channel-server', you could command-line bootstrap with
something like:

'''bash
  wrangler kv:key put --preview false --binding=LEDGER_NAMESPACE "zzR5Ljv8LlYjgOnO5yOr4Gtgr9yVS7dTAQkJeVQ4I7w" '{"used":false,"size":33554432}'

___

### SBUserId

Ƭ **SBUserId**: [`SB384Hash`](modules.md#sb384hash)

The three encodings of a 'user'

___

### SBUserPrivateKey

Ƭ **SBUserPrivateKey**: `string`

___

### SBUserPublicKey

Ƭ **SBUserPublicKey**: `string`

## Variables

### NEW\_CHANNEL\_MINIMUM\_BUDGET

• `Const` **NEW\_CHANNEL\_MINIMUM\_BUDGET**: `number`

***************************************************************************************************

___

### SB

• **SB**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Channel` | typeof [`Channel`](classes/Channel.md) |
| `SB384` | typeof [`SB384`](classes/SB384.md) |
| `SBCrypto` | typeof [`SBCrypto`](classes/SBCrypto.md) |
| `Snackabra` | typeof [`Snackabra`](classes/Snackabra.md) |
| `arrayBufferToBase62` | (`buffer`: `ArrayBuffer` \| `Uint8Array`) => `string` |
| `arrayBufferToBase64url` | (`buffer`: `ArrayBuffer` \| `Uint8Array`) => `string` |
| `base62ToArrayBuffer` | (`s`: `string`) => `ArrayBuffer` |
| `base64ToArrayBuffer` | (`s`: `string`) => `Uint8Array` |
| `sbCrypto` | [`SBCrypto`](classes/SBCrypto.md) |
| `setDebugLevel` | (`dbg1`: `boolean`, `dbg2?`: `boolean`) => `void` |
| `version` | `string` |

___

### SBStorageTokenPrefix

• `Const` **SBStorageTokenPrefix**: ``"LM2r"``

___

### b62regex

• `Const` **b62regex**: `RegExp`

___

### base62

• `Const` **base62**: ``"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"``

___

### base62regex

• `Const` **base62regex**: `RegExp` = `b62regex`

___

### base64url

• `Const` **base64url**: ``"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"``

___

### msgTtlToSeconds

• `Const` **msgTtlToSeconds**: `number`[]

___

### msgTtlToString

• `Const` **msgTtlToString**: `string`[]

___

### sbCrypto

• `Const` **sbCrypto**: [`SBCrypto`](classes/SBCrypto.md)

This is the GLOBAL SBCrypto object, which is instantiated
immediately upon loading the jslib library.

You should use this guy, not instantiate your own. We don't
use static functions in SBCrypto(), because we want to be
able to add features (like global key store) incrementally.

___

### version

• `Const` **version**: ``"2.0.0-alpha.5 (build 093)"``

## Functions

### Memoize

▸ **Memoize**(`target`, `propertyKey`, `descriptor?`): `void`

***************************************************************************************************

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `any` |
| `propertyKey` | `string` |
| `descriptor?` | `PropertyDescriptor` |

#### Returns

`void`

___

### Ready

▸ **Ready**(`target`, `propertyKey`, `descriptor?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `any` |
| `propertyKey` | `string` |
| `descriptor?` | `PropertyDescriptor` |

#### Returns

`void`

___

### SBApiFetch

▸ **SBApiFetch**(`input`, `init?`): `Promise`\<`any`\>

Wrapper to SBFetch that applies SB API calling conventions on both sides of
the call; it will return whatever data structure the server returns, note
that it will extract the reply (either from json or from payload). if there
are any issues or if the reply contains an error message, it will throw an
error.

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `RequestInfo` \| `URL` |
| `init?` | `RequestInit` |

#### Returns

`Promise`\<`any`\>

___

### \_check\_SBChannelData

▸ **_check_SBChannelData**(`data`): `boolean` \| ``""`` \| [`SBStorageToken`](interfaces/SBStorageToken.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`SBChannelData`](interfaces/SBChannelData.md) |

#### Returns

`boolean` \| ``""`` \| [`SBStorageToken`](interfaces/SBStorageToken.md)

___

### \_check\_SBChannelHandle

▸ **_check_SBChannelHandle**(`data`): `boolean` \| ``""`` \| [`SBStorageToken`](interfaces/SBStorageToken.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`SBChannelHandle`](interfaces/SBChannelHandle.md) |

#### Returns

`boolean` \| ``""`` \| [`SBStorageToken`](interfaces/SBStorageToken.md)

___

### \_check\_SBObjectHandle

▸ **_check_SBObjectHandle**(`h`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `h` | [`SBObjectHandle`](interfaces/SBObjectHandle.md) |

#### Returns

`boolean`

___

### \_check\_SBStorageToken

▸ **_check_SBStorageToken**(`data`): `boolean` \| ``""``

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`SBStorageToken`](interfaces/SBStorageToken.md) |

#### Returns

`boolean` \| ``""``

___

### arrayBufferToBase62

▸ **arrayBufferToBase62**(`buffer`): `string`

Converts any array buffer to base62.

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | `ArrayBuffer` \| `Uint8Array` |

#### Returns

`string`

___

### arrayBufferToBase64url

▸ **arrayBufferToBase64url**(`buffer`): `string`

Converts an ArrayBuffer to base64url.

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | `ArrayBuffer` \| `Uint8Array` |

#### Returns

`string`

___

### assemblePayload

▸ **assemblePayload**(`data`): `ArrayBuffer` \| ``null``

Assemble payload. This creates a single binary (wire) format
of an arbitrary set of (named) binary objects.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`ArrayBuffer` \| ``null``

___

### b32decode

▸ **b32decode**(`encoded`): `number` \| ``null``

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoded` | `string` |

#### Returns

`number` \| ``null``

___

### b32encode

▸ **b32encode**(`num`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `num` | `number` |

#### Returns

`string`

___

### b32process

▸ **b32process**(`str`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

___

### base62ToArrayBuffer

▸ **base62ToArrayBuffer**(`s`): `ArrayBuffer`

Converts a base62 string to matching ArrayBuffer.

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

`ArrayBuffer`

___

### base62ToBase64

▸ **base62ToBase64**(`s`): `string`

Convenience: direct conversion from Base62 to Base64.

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | [`Base62Encoded`](modules.md#base62encoded) |

#### Returns

`string`

___

### base64ToArrayBuffer

▸ **base64ToArrayBuffer**(`s`): `Uint8Array`

Converts base64/base64url to ArrayBuffer. We're tolerant of inputs. Despite
it's name, we return Uint8Array.

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

`Uint8Array`

___

### base64ToBase62

▸ **base64ToBase62**(`s`): [`Base62Encoded`](modules.md#base62encoded)

Convenience: direct conversion from Base64 to Base62.

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

[`Base62Encoded`](modules.md#base62encoded)

___

### compareBuffers

▸ **compareBuffers**(`a`, `b`): `boolean`

Simple comparison of buffers

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | ``null`` \| `ArrayBuffer` \| `Uint8Array` |
| `b` | ``null`` \| `ArrayBuffer` \| `Uint8Array` |

#### Returns

`boolean`

___

### extractPayload

▸ **extractPayload**(`value`): `any`

Extract payload - this decodes from our binary (wire) format
to a JS object. This supports a wide range of objects.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `ArrayBuffer` |

#### Returns

`any`

___

### getRandomValues

▸ **getRandomValues**(`buffer`): `Uint8Array`

Fills buffer with random data

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | `Uint8Array` |

#### Returns

`Uint8Array`

___

### hydrateKey

▸ **hydrateKey**(`privKey`, `pubKey?`): [`SBUserPrivateKey`](modules.md#sbuserprivatekey) \| `undefined`

'hydrates' a key - if needed; if it's already good on hydration, just returns it.
Providing pubKey (from other source) is optional so that you can use this function
to easily confirm that a key is hydrated, it will return undefined if it's not.

#### Parameters

| Name | Type |
| :------ | :------ |
| `privKey` | `string` |
| `pubKey?` | `string` |

#### Returns

[`SBUserPrivateKey`](modules.md#sbuserprivatekey) \| `undefined`

___

### isBase62Encoded

▸ **isBase62Encoded**(`value`): value is Base62Encoded

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| [`Base62Encoded`](modules.md#base62encoded) |

#### Returns

value is Base62Encoded

___

### jsonOrString

▸ **jsonOrString**(`str`): `any`

Different version than jsonParseWrapper. Does not throw, and also checks for
simple strings (which are not valid JSON) and would return those. Returns
null if input is null, or it can't figure out what it is. Used in (low level)
messaging contexts.

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | ``null`` \| `string` |

#### Returns

`any`

___

### jsonParseWrapper

▸ **jsonParseWrapper**(`str`, `loc?`, `reviver?`): `any`

Adding a more resilient wrapper around JSON.parse. The 'loc' parameter is typically (file) line number.

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | ``null`` \| `string` |
| `loc?` | `string` |
| `reviver?` | (`this`: `any`, `key`: `string`, `value`: `any`) => `any` |

#### Returns

`any`

___

### setDebugLevel

▸ **setDebugLevel**(`dbg1`, `dbg2?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dbg1` | `boolean` |
| `dbg2?` | `boolean` |

#### Returns

`void`

___

### stringify\_SBObjectHandle

▸ **stringify_SBObjectHandle**(`h`): `Promise`\<[`SBObjectHandle`](interfaces/SBObjectHandle.md)\>

In some circumstances we need to make sure we have a JSON serializable
version of the object handle, eg that iv and salt are base62 strings,
and that the verification has been resolved

#### Parameters

| Name | Type |
| :------ | :------ |
| `h` | [`SBObjectHandle`](interfaces/SBObjectHandle.md) |

#### Returns

`Promise`\<[`SBObjectHandle`](interfaces/SBObjectHandle.md)\>

___

### stripChannelMessage

▸ **stripChannelMessage**(`msg`, `serverMode?`): [`ChannelMessage`](interfaces/ChannelMessage.md)

Complements validate_ChannelMessage. This is used to strip out the parts that
are not strictly needed. Addresses privacy, security, and message size
issues. Note that 'ChannelMessage' is a 'public' interface, in the sense that
this is what is actually stored (as payload ArrayBuffers) at rest, both on
servers and clients.

'serverMode' is slightly more strict and used by server-side code.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `msg` | [`ChannelMessage`](interfaces/ChannelMessage.md) | `undefined` |
| `serverMode` | `boolean` | `false` |

#### Returns

[`ChannelMessage`](interfaces/ChannelMessage.md)

___

### validate\_ChannelApiBody

▸ **validate_ChannelApiBody**(`body`): [`ChannelApiBody`](interfaces/ChannelApiBody.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `body` | `any` |

#### Returns

[`ChannelApiBody`](interfaces/ChannelApiBody.md)

___

### validate\_ChannelMessage

▸ **validate_ChannelMessage**(`body`): [`ChannelMessage`](interfaces/ChannelMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `body` | [`ChannelMessage`](interfaces/ChannelMessage.md) |

#### Returns

[`ChannelMessage`](interfaces/ChannelMessage.md)

___

### validate\_Message

▸ **validate_Message**(`data`): [`Message`](interfaces/Message.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`Message`](interfaces/Message.md) |

#### Returns

[`Message`](interfaces/Message.md)

___

### validate\_SBChannelData

▸ **validate_SBChannelData**(`data`): [`SBChannelData`](interfaces/SBChannelData.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

[`SBChannelData`](interfaces/SBChannelData.md)

___

### validate\_SBChannelHandle

▸ **validate_SBChannelHandle**(`data`): [`SBChannelHandle`](interfaces/SBChannelHandle.md)

Validates 'SBChannelHandle', throws if there's an issue

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`SBChannelHandle`](interfaces/SBChannelHandle.md) |

#### Returns

[`SBChannelHandle`](interfaces/SBChannelHandle.md)

___

### validate\_SBObjectHandle

▸ **validate_SBObjectHandle**(`h`): [`SBObjectHandle`](interfaces/SBObjectHandle.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `h` | [`SBObjectHandle`](interfaces/SBObjectHandle.md) |

#### Returns

[`SBObjectHandle`](interfaces/SBObjectHandle.md)

___

### validate\_SBStorageToken

▸ **validate_SBStorageToken**(`data`): [`SBStorageToken`](interfaces/SBStorageToken.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`SBStorageToken`](interfaces/SBStorageToken.md) |

#### Returns

[`SBStorageToken`](interfaces/SBStorageToken.md)
