[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / Channel

# Class: Channel

Channel Class

Join a channel, returns channel object.

Currently, you must have an identity when connecting, because every single
message is signed by sender. TODO is to look at how to provide a 'listening'
mode on channels.

Most classes in SB follow the "ready" template: objects can be used
right away, but they decide for themselves if they're ready or not.

## Hierarchy

- [`SB384`](SB384.md)

  ↳ **`Channel`**

  ↳↳ [`ChannelSocket`](ChannelSocket.md)

  ↳↳ [`ChannelEndpoint`](ChannelEndpoint.md)

## Table of contents

### Constructors

- [constructor](Channel.md#constructor)

### Properties

- [admin](Channel.md#admin)
- [adminData](Channel.md#admindata)
- [channelReady](Channel.md#channelready)
- [locked](Channel.md#locked)
- [motd](Channel.md#motd)
- [owner](Channel.md#owner)
- [ready](Channel.md#ready)
- [sb384Ready](Channel.md#sb384ready)
- [userName](Channel.md#username)
- [verifiedGuest](Channel.md#verifiedguest)

### Accessors

- [\_id](Channel.md#_id)
- [api](Channel.md#api)
- [channelId](Channel.md#channelid)
- [channelSignKey](Channel.md#channelsignkey)
- [exportable\_privateKey](Channel.md#exportable_privatekey)
- [exportable\_pubKey](Channel.md#exportable_pubkey)
- [hash](Channel.md#hash)
- [keys](Channel.md#keys)
- [ownerChannelId](Channel.md#ownerchannelid)
- [privateKey](Channel.md#privatekey)
- [readyFlag](Channel.md#readyflag)
- [sbServer](Channel.md#sbserver)

### Methods

- [acceptVisitor](Channel.md#acceptvisitor)
- [authorize](Channel.md#authorize)
- [budd](Channel.md#budd)
- [downloadData](Channel.md#downloaddata)
- [getAdminData](Channel.md#getadmindata)
- [getCapacity](Channel.md#getcapacity)
- [getJoinRequests](Channel.md#getjoinrequests)
- [getLastMessageTimes](Channel.md#getlastmessagetimes)
- [getMother](Channel.md#getmother)
- [getOldMessages](Channel.md#getoldmessages)
- [getStorageLimit](Channel.md#getstoragelimit)
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

• **new Channel**(`sbServer`, `key?`, `channelId?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sbServer` | [`SBServer`](../interfaces/SBServer.md) |
| `key?` | `JsonWebKey` |
| `channelId?` | `string` |

#### Overrides

[SB384](SB384.md).[constructor](SB384.md#constructor)

## Properties

### admin

• **admin**: `boolean` = `false`

___

### adminData

• `Optional` **adminData**: `Dictionary`<`any`\>

___

### channelReady

• **channelReady**: `Promise`<[`Channel`](Channel.md)\>

Channel Class

This is the main work horse for channels. However, it is ABSTRACT,
meaning you need a 'concrete' class to use it.

Currently you have two options:

You can create a ChannelEndpoint object. That can do everything against
a channel except send/receive messages synchronously.

The other option is ChannelSocket, which does everything ChannelEndpoint
does, but ALSO connects with a web socket.

So unless you're actually connecting with intent on interactive, fast
messaging, an endpoint is sufficient. In fact, UNLESS you are going to
do send/receive, you should use ChannelEndpoint, not ChannelSocket.

In our current thinking, 'Channel' captures pretty much everything, 
except how you want (instant) messaging to be hooked up. So for example, our
next class might be 'ChannelP2P', which would be setting up webrtc
data channel connections in a mesh.

Note that you don't need to worry about what API calls involve race
conditions and which don't, jslib will do that for you.

**`Param`**

server to join

**`Param`**

key to use to join (optional)

**`Param`**

the <a href="../glossary.html#term-channel-name">Channel Name</a> to find on that server (optional)

___

### locked

• `Optional` **locked**: `boolean` = `false`

___

### motd

• `Optional` **motd**: `string` = `''`

___

### owner

• **owner**: `boolean` = `false`

___

### ready

• **ready**: `Promise`<[`SB384`](SB384.md)\>

#### Inherited from

[SB384](SB384.md).[ready](SB384.md#ready)

___

### sb384Ready

• **sb384Ready**: `Promise`<[`SB384`](SB384.md)\>

#### Inherited from

[SB384](SB384.md).[sb384Ready](SB384.md#sb384ready)

___

### userName

• **userName**: `string` = `''`

___

### verifiedGuest

• **verifiedGuest**: `boolean` = `false`

## Accessors

### \_id

• `get` **_id**(): `string`

#### Returns

`string`

#### Inherited from

SB384.\_id

___

### api

• `get` **api**(): `this`

#### Returns

`this`

___

### channelId

• `get` **channelId**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

___

### channelSignKey

• `get` **channelSignKey**(): `CryptoKey`

#### Returns

`CryptoKey`

___

### exportable\_privateKey

• `get` **exportable_privateKey**(): `JsonWebKey`

#### Returns

`JsonWebKey`

#### Inherited from

SB384.exportable\_privateKey

___

### exportable\_pubKey

• `get` **exportable_pubKey**(): `JsonWebKey`

#### Returns

`JsonWebKey`

#### Inherited from

SB384.exportable\_pubKey

___

### hash

• `get` **hash**(): `string`

Returns a unique identifier for external use, that will be unique
for any class or object that uses SB384 as it's root.

This is deterministic, used to identify users, channels, etc.

The hash is base64 encoding of the SHA-384 hash of the public key,
taking the 'x' and 'y' fields. Note that it is slightly restricted, it only
allows [A-Za-z0-9], eg does not allow the '_' or '-' characters. This makes the
encoding more practical for end-user interactions like copy-paste. This
is accomplished by simply re-hashing until the result is valid. This 
reduces the entropy of the channel ID by a neglible amount. 

Note this is not b62 encoding, which we use for 256-bit entities. This
is still ~384 bits (e.g. x and y fields are each 384 bits, but of course
the underlying total entropy isn't that, see <insert lots of fun math crypto
study material heh>).

NOTE: if you ever need to COMPARE hashes, well short version is that
you cannot do so in the general case. You can use sbCrypto.compareHashWithKey()
to compare a hash with a key, but you cannot compare two hashes. See the
comparison function for more details.

#### Returns

`string`

#### Inherited from

SB384.hash

___

### keys

• `get` **keys**(): [`ChannelKeys`](../interfaces/ChannelKeys.md)

#### Returns

[`ChannelKeys`](../interfaces/ChannelKeys.md)

___

### ownerChannelId

• `get` **ownerChannelId**(): `string`

#### Returns

`string`

#### Inherited from

SB384.ownerChannelId

___

### privateKey

• `get` **privateKey**(): `CryptoKey`

#### Returns

`CryptoKey`

#### Inherited from

SB384.privateKey

___

### readyFlag

• `get` **readyFlag**(): `boolean`

#### Returns

`boolean`

#### Overrides

SB384.readyFlag

___

### sbServer

• `get` **sbServer**(): [`SBServer`](../interfaces/SBServer.md)

#### Returns

[`SBServer`](../interfaces/SBServer.md)

## Methods

### acceptVisitor

▸ **acceptVisitor**(`pubKey`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pubKey` | `string` |

#### Returns

`Promise`<`unknown`\>

___

### authorize

▸ **authorize**(`ownerPublicKey`, `serverSecret`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ownerPublicKey` | `Dictionary`<`any`\> |
| `serverSecret` | `string` |

#### Returns

`Promise`<`any`\>

___

### budd

▸ **budd**(): `Promise`<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

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

`Promise`<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

▸ **budd**(`options`): `Promise`<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.keys?` | `JsonWebKey` |
| `options.storage?` | `number` |
| `options.targetChannel?` | `string` |

#### Returns

`Promise`<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

___

### downloadData

▸ **downloadData**(): `Promise`<`unknown`\>

Channel.downloadData

#### Returns

`Promise`<`unknown`\>

___

### getAdminData

▸ **getAdminData**(): `Promise`<[`ChannelAdminData`](../interfaces/ChannelAdminData.md)\>

Channel.getAdminData

#### Returns

`Promise`<[`ChannelAdminData`](../interfaces/ChannelAdminData.md)\>

___

### getCapacity

▸ **getCapacity**(): `Promise`<`any`\>

getCapacity

#### Returns

`Promise`<`any`\>

___

### getJoinRequests

▸ **getJoinRequests**(): `Promise`<`any`\>

getJoinRequests

#### Returns

`Promise`<`any`\>

___

### getLastMessageTimes

▸ **getLastMessageTimes**(): `Promise`<`unknown`\>

Channel.getLastMessageTimes

#### Returns

`Promise`<`unknown`\>

___

### getMother

▸ **getMother**(): `Promise`<`any`\>

getMother

Get the channelID from which this channel was budded. Note that
this is only accessible by Owner (as well as hosting server)

#### Returns

`Promise`<`any`\>

___

### getOldMessages

▸ **getOldMessages**(`currentMessagesLength?`, `paginate?`): `Promise`<[`ChannelMessage`](../interfaces/ChannelMessage.md)[]\>

Channel.getOldMessages

Will return most recent messages from the channel.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `currentMessagesLength` | `number` | `100` | number to fetch (default 100) |
| `paginate` | `boolean` | `false` | if true, will paginate from last request (default false) |

#### Returns

`Promise`<[`ChannelMessage`](../interfaces/ChannelMessage.md)[]\>

___

### getStorageLimit

▸ **getStorageLimit**(): `Promise`<`any`\>

getStorageLimit (current storage budget)

#### Returns

`Promise`<`any`\>

___

### isLocked

▸ **isLocked**(): `Promise`<`boolean`\>

isLocked

#### Returns

`Promise`<`boolean`\>

___

### lock

▸ **lock**(): `Promise`<`unknown`\>

Channel.lock()

Locks the channel, so that new visitors need an "ack" to join..

#### Returns

`Promise`<`unknown`\>

___

### ownerKeyRotation

▸ **ownerKeyRotation**(): `void`

#### Returns

`void`

___

### postPubKey

▸ **postPubKey**(`_exportable_pubKey`): `Promise`<{ `success`: `boolean`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_exportable_pubKey` | `JsonWebKey` |

#### Returns

`Promise`<{ `success`: `boolean`  }\>

___

### send

▸ `Abstract` **send**(`message`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`SBMessage`](SBMessage.md) |

#### Returns

`Promise`<`string`\>

___

### setMOTD

▸ **setMOTD**(`motd`): `Promise`<`any`\>

Set message of the day

#### Parameters

| Name | Type |
| :------ | :------ |
| `motd` | `string` |

#### Returns

`Promise`<`any`\>

___

### storageRequest

▸ **storageRequest**(`byteLength`): `Promise`<`Dictionary`<`any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `byteLength` | `number` |

#### Returns

`Promise`<`Dictionary`<`any`\>\>

___

### updateCapacity

▸ **updateCapacity**(`capacity`): `Promise`<`any`\>

Update (set) the capacity of the channel; Owner only

#### Parameters

| Name | Type |
| :------ | :------ |
| `capacity` | `number` |

#### Returns

`Promise`<`any`\>

___

### uploadChannel

▸ **uploadChannel**(`channelData`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelData` | [`ChannelData`](../interfaces/ChannelData.md) |

#### Returns

`Promise`<`any`\>
