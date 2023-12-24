[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / Channel

# Class: Channel

Channel

## Hierarchy

- `SBChannelKeys`

  ↳ **`Channel`**

  ↳↳ [`ChannelSocket`](ChannelSocket.md)

## Table of contents

### Constructors

- [constructor](Channel.md#constructor)

### Properties

- [adminData](Channel.md#admindata)
- [channelReady](Channel.md#channelready)
- [locked](Channel.md#locked)
- [motd](Channel.md#motd)
- [ready](Channel.md#ready)
- [sb384Ready](Channel.md#sb384ready)
- [sbChannelKeysReady](Channel.md#sbchannelkeysready)
- [verifiedGuest](Channel.md#verifiedguest)

### Accessors

- [api](Channel.md#api)
- [channelData](Channel.md#channeldata)
- [channelId](Channel.md#channelid)
- [channelServer](Channel.md#channelserver)
- [channelSignKey](Channel.md#channelsignkey)
- [encryptionKey](Channel.md#encryptionkey)
- [exportable\_pubKey](Channel.md#exportable_pubkey)
- [hash](Channel.md#hash)
- [jwk](Channel.md#jwk)
- [key](Channel.md#key)
- [keys](Channel.md#keys)
- [owner](Channel.md#owner)
- [ownerChannelId](Channel.md#ownerchannelid)
- [private](Channel.md#private)
- [readyFlag](Channel.md#readyflag)
- [userId](Channel.md#userid)
- [userKeyString](Channel.md#userkeystring)

### Methods

- [acceptVisitor](Channel.md#acceptvisitor)
- [authorize](Channel.md#authorize)
- [budd](Channel.md#budd)
- [deCryptChannelMessage](Channel.md#decryptchannelmessage)
- [downloadData](Channel.md#downloaddata)
- [getAdminData](Channel.md#getadmindata)
- [getCapacity](Channel.md#getcapacity)
- [getJoinRequests](Channel.md#getjoinrequests)
- [getLastMessageTimes](Channel.md#getlastmessagetimes)
- [getMother](Channel.md#getmother)
- [getOldMessages](Channel.md#getoldmessages)
- [getStorageLimit](Channel.md#getstoragelimit)
- [getStorageToken](Channel.md#getstoragetoken)
- [isLocked](Channel.md#islocked)
- [lock](Channel.md#lock)
- [ownerKeyRotation](Channel.md#ownerkeyrotation)
- [postPubKey](Channel.md#postpubkey)
- [send](Channel.md#send)
- [setMOTD](Channel.md#setmotd)
- [storageRequest](Channel.md#storagerequest)
- [updateCapacity](Channel.md#updatecapacity)
- [uploadChannel](Channel.md#uploadchannel)

## Constructors

### constructor

• **new Channel**(`handle`): [`Channel`](Channel.md)

Join a channel, taking a channel handle. Returns channel object.

You must have an identity when connecting, because every single
message is signed by sender.

Most classes in SB follow the "ready" template: objects can be used
right away, but they decide for themselves if they're ready or not.
The SB384 state is the *user* of the channel, not the channel
itself; it has an Owner (also SB384 object), which can be the
same as the user/visitor, but that requires finalizing creating
the channel to find out (from the channel server).

The Channel class communicates asynchronously with the channel.

The ChannelSocket class is a subclass of Channel, and it communicates
synchronously (via websockets).

Note that you don't need to worry about what API calls involve race
conditions and which don't, the library will do that for you.

Current (2.x) interface:

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | [`SBChannelHandle`](../interfaces/SBChannelHandle.md) |

#### Returns

[`Channel`](Channel.md)

#### Overrides

SBChannelKeys.constructor

• **new Channel**(`sbServer`, `userKey`, `channelId`): [`Channel`](Channel.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sbServer` | [`SBServer`](../interfaces/SBServer.md) |
| `userKey` | `JsonWebKey` |
| `channelId` | `string` |

#### Returns

[`Channel`](Channel.md)

#### Overrides

SBChannelKeys.constructor

## Properties

### adminData

• `Optional` **adminData**: `Dictionary`\<`any`\>

___

### channelReady

• **channelReady**: `Promise`\<[`Channel`](Channel.md)\>

___

### locked

• `Optional` **locked**: `boolean` = `false`

___

### motd

• `Optional` **motd**: `string` = `''`

___

### ready

• **ready**: `Promise`\<[`Channel`](Channel.md)\>

#### Overrides

SBChannelKeys.ready

___

### sb384Ready

• **sb384Ready**: `Promise`\<[`SB384`](SB384.md)\>

#### Inherited from

SBChannelKeys.sb384Ready

___

### sbChannelKeysReady

• **sbChannelKeysReady**: `Promise`\<`SBChannelKeys`\>

#### Inherited from

SBChannelKeys.sbChannelKeysReady

___

### verifiedGuest

• **verifiedGuest**: `boolean` = `false`

## Accessors

### api

• `get` **api**(): `this`

#### Returns

`this`

___

### channelData

• `get` **channelData**(): [`ChannelData`](../interfaces/ChannelData.md)

#### Returns

[`ChannelData`](../interfaces/ChannelData.md)

#### Inherited from

SBChannelKeys.channelData

___

### channelId

• `get` **channelId**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Inherited from

SBChannelKeys.channelId

___

### channelServer

• `get` **channelServer**(): `string`

#### Returns

`string`

#### Inherited from

SBChannelKeys.channelServer

• `set` **channelServer**(`channelServer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelServer` | `string` |

#### Returns

`void`

#### Inherited from

SBChannelKeys.channelServer

___

### channelSignKey

• `get` **channelSignKey**(): `CryptoKey`

#### Returns

`CryptoKey`

#### Inherited from

SBChannelKeys.channelSignKey

___

### encryptionKey

• `get` **encryptionKey**(): `CryptoKey`

#### Returns

`CryptoKey`

#### Inherited from

SBChannelKeys.encryptionKey

___

### exportable\_pubKey

• `get` **exportable_pubKey**(): `JsonWebKey`

For 'jwk' format use cases.

#### Returns

`JsonWebKey`

#### Inherited from

SBChannelKeys.exportable\_pubKey

___

### hash

• `get` **hash**(): `string`

Returns a unique identifier for external use, that will be unique
for any class or object that uses SB384 as it's root.

This is deterministic. Important use case is to translate a user id
into a channel id (eg the channel that any user id is inherently
the owner of).

The hash is base64 encoding of the SHA-384 hash of the public key,
taking the 'x' and 'y' fields. Note that it is slightly restricted, it only
allows [A-Za-z0-9], eg does not allow the '_' or '-' characters. This makes the
encoding more practical for end-user interactions like copy-paste. This
is accomplished by simply re-hashing until the result is valid. This 
reduces the entropy of the channel ID by a neglible amount. 

Note this is not b62 encoding, which we use for 256-bit entities. This
is still ~384 bits (e.g. x and y fields are each 384 bits, but of course
the underlying total entropy isn't that (exercise left to the reader).

NOTE: if you ever need to COMPARE hashes, the short version is that
you cannot do so in the general case: you need to use sbCrypto.compareHashWithKey()

#### Returns

`string`

#### Inherited from

SBChannelKeys.hash

___

### jwk

• `get` **jwk**(): `JsonWebKey`

#### Returns

`JsonWebKey`

#### Inherited from

SBChannelKeys.jwk

___

### key

• `get` **key**(): `CryptoKey`

#### Returns

`CryptoKey`

#### Inherited from

SBChannelKeys.key

___

### keys

• `get` **keys**(): [`ChannelKeys`](../interfaces/ChannelKeys.md)

#### Returns

[`ChannelKeys`](../interfaces/ChannelKeys.md)

#### Inherited from

SBChannelKeys.keys

___

### owner

• `get` **owner**(): `boolean`

#### Returns

`boolean`

#### Inherited from

SBChannelKeys.owner

___

### ownerChannelId

• `get` **ownerChannelId**(): `string`

ChannelID that corresponds to this, if it's an owner

#### Returns

`string`

#### Inherited from

SBChannelKeys.ownerChannelId

___

### private

• `get` **private**(): `boolean`

Returns true if this is a private key, otherwise false.
Will throw an exception if the object is not ready.

#### Returns

`boolean`

#### Inherited from

SBChannelKeys.private

___

### readyFlag

• `get` **readyFlag**(): `boolean`

#### Returns

`boolean`

#### Overrides

SBChannelKeys.readyFlag

___

### userId

• `get` **userId**(): `string`

Somewhat confusing at times, the string version of the user key per se is
different from "hash" (the full public key can be recovered from SBUserId).
Eg this is the public identifier.

#### Returns

`string`

#### Inherited from

SBChannelKeys.userId

___

### userKeyString

• `get` **userKeyString**(): `string`

Wire format of full info of key (eg private key).

#### Returns

`string`

#### Inherited from

SBChannelKeys.userKeyString

## Methods

### acceptVisitor

▸ **acceptVisitor**(`userId`): `Promise`\<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |

#### Returns

`Promise`\<`unknown`\>

___

### authorize

▸ **authorize**(`ownerPublicKey`, `serverSecret`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ownerPublicKey` | `Dictionary`\<`any`\> |
| `serverSecret` | `string` |

#### Returns

`Promise`\<`any`\>

___

### budd

▸ **budd**(): `Promise`\<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

"budd" will spin a channel off an existing one.
You need to provide one of the following combinations of info:

- nothing: create new channel and transfer all storage budget
- just storage amount: creates new channel with that amount, returns new channel
- just a target channel: moves all storage budget to that channel
- just keys: creates new channel with those keys and transfers all storage budget
- keys and storage amount: creates new channel with those keys and that storage amount

In the first (special) case you can just call budd(), in the other
cases you need to fill out the 'options' object.

Another way to remember the above: all combinations are valid except
both a target channel and assigning keys.

Note: if you're specifying the target channel, then the return values will
not include the private key (that return value will be empty).

Same channels as mother and target will be a no-op, regardless of other
parameters.

Note: if you provide a value for 'storage', it cannot be undefined. If you
wish it to be Infinity, then you need to omit the property from options.

Future: negative amount of storage leaves that amount behind, the rest is transferred

#### Returns

`Promise`\<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

▸ **budd**(`options`): `Promise`\<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.keys?` | `JsonWebKey` |
| `options.storage?` | `number` |
| `options.targetChannel?` | `string` |

#### Returns

`Promise`\<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

___

### deCryptChannelMessage

▸ **deCryptChannelMessage**(`m00`, `m01`): `Promise`\<`undefined` \| [`ChannelMessage`](../interfaces/ChannelMessage.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `m00` | `string` |
| `m01` | [`EncryptedContents`](../interfaces/EncryptedContents.md) |

#### Returns

`Promise`\<`undefined` \| [`ChannelMessage`](../interfaces/ChannelMessage.md)\>

___

### downloadData

▸ **downloadData**(): `Promise`\<`unknown`\>

Channel.downloadData

#### Returns

`Promise`\<`unknown`\>

___

### getAdminData

▸ **getAdminData**(): `Promise`\<[`ChannelAdminData`](../interfaces/ChannelAdminData.md)\>

Channel.getAdminData

#### Returns

`Promise`\<[`ChannelAdminData`](../interfaces/ChannelAdminData.md)\>

___

### getCapacity

▸ **getCapacity**(): `Promise`\<`any`\>

getCapacity

#### Returns

`Promise`\<`any`\>

___

### getJoinRequests

▸ **getJoinRequests**(): `Promise`\<`any`\>

getJoinRequests

#### Returns

`Promise`\<`any`\>

___

### getLastMessageTimes

▸ **getLastMessageTimes**(): `void`

Channel.getLastMessageTimes

#### Returns

`void`

___

### getMother

▸ **getMother**(): `Promise`\<`any`\>

getMother

Get the channelID from which this channel was budded. Note that
this is only accessible by Owner (as well as hosting server)

#### Returns

`Promise`\<`any`\>

___

### getOldMessages

▸ **getOldMessages**(`currentMessagesLength?`, `paginate?`): `Promise`\<[`ChannelMessage`](../interfaces/ChannelMessage.md)[]\>

Channel.getOldMessages

Will return most recent messages from the channel.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `currentMessagesLength` | `number` | `100` | number to fetch (default 100) |
| `paginate` | `boolean` | `false` | if true, will paginate from last request (default false) |

#### Returns

`Promise`\<[`ChannelMessage`](../interfaces/ChannelMessage.md)[]\>

___

### getStorageLimit

▸ **getStorageLimit**(): `Promise`\<`any`\>

getStorageLimit (current storage budget)

#### Returns

`Promise`\<`any`\>

___

### getStorageToken

▸ **getStorageToken**(`size`): `Promise`\<`string`\>

returns a storage token (promise); basic consumption of channel budget

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number` |

#### Returns

`Promise`\<`string`\>

___

### isLocked

▸ **isLocked**(): `Promise`\<`boolean`\>

isLocked

#### Returns

`Promise`\<`boolean`\>

___

### lock

▸ **lock**(`key?`): `Promise`\<\{ `locked`: `boolean` ; `lockedKey`: `JsonWebKey`  }\>

Channel.lock()

Locks the channel, so that new visitors need an "ack" to join.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key?` | `CryptoKey` |

#### Returns

`Promise`\<\{ `locked`: `boolean` ; `lockedKey`: `JsonWebKey`  }\>

___

### ownerKeyRotation

▸ **ownerKeyRotation**(): `void`

#### Returns

`void`

___

### postPubKey

▸ **postPubKey**(`_exportable_pubKey`): `Promise`\<\{ `success`: `boolean`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_exportable_pubKey` | `JsonWebKey` |

#### Returns

`Promise`\<\{ `success`: `boolean`  }\>

___

### send

▸ **send**(`_msg`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_msg` | `string` \| [`SBMessage`](SBMessage.md) |

#### Returns

`Promise`\<`string`\>

___

### setMOTD

▸ **setMOTD**(`motd`): `Promise`\<`any`\>

Set message of the day

#### Parameters

| Name | Type |
| :------ | :------ |
| `motd` | `string` |

#### Returns

`Promise`\<`any`\>

___

### storageRequest

▸ **storageRequest**(`byteLength`): `Promise`\<`Dictionary`\<`any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `byteLength` | `number` |

#### Returns

`Promise`\<`Dictionary`\<`any`\>\>

___

### updateCapacity

▸ **updateCapacity**(`capacity`): `Promise`\<`any`\>

Update (set) the capacity of the channel; Owner only

#### Parameters

| Name | Type |
| :------ | :------ |
| `capacity` | `number` |

#### Returns

`Promise`\<`any`\>

___

### uploadChannel

▸ **uploadChannel**(`channelData`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelData` | [`ChannelData`](../interfaces/ChannelData.md) |

#### Returns

`Promise`\<`any`\>
