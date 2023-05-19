[JSLib](../README.md) / Snackabra

# Class: Snackabra

## Table of contents

### Constructors

- [constructor](Snackabra.md#constructor)

### Properties

- [#channel](Snackabra.md##channel)
- [#preferredServer](Snackabra.md##preferredserver)
- [#storage](Snackabra.md##storage)

### Accessors

- [channel](Snackabra.md#channel)
- [crypto](Snackabra.md#crypto)
- [storage](Snackabra.md#storage)

### Methods

- [connect](Snackabra.md#connect)
- [create](Snackabra.md#create)
- [sendFile](Snackabra.md#sendfile)

## Constructors

### constructor

• **new Snackabra**(`args?`, `DEBUG?`)

Constructor expects an object with the names of the matching servers, for example
below shows the miniflare local dev config. Note that 'new Snackabra()' is
guaranteed synchronous, so can be 'used' right away. You can optionally call
without a parameter in which case SB will ping known servers.

::

    {
      channel_server: 'http://127.0.0.1:4001',
      channel_ws: 'ws://127.0.0.1:4001',
      storage_server: 'http://127.0.0.1:4000'
    }

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `args?` | [`SBServer`](../interfaces/SBServer.md) | `undefined` | {SBServer} server names (optional) |
| `DEBUG` | `boolean` | `false` | - |

## Properties

### #channel

• `Private` **#channel**: [`Channel`](Channel.md)

___

### #preferredServer

• `Private` `Optional` **#preferredServer**: [`SBServer`](../interfaces/SBServer.md)

___

### #storage

• `Private` **#storage**: `StorageApi`

## Accessors

### channel

• `get` **channel**(): [`Channel`](Channel.md)

#### Returns

[`Channel`](Channel.md)

___

### crypto

• `get` **crypto**(): [`SBCrypto`](SBCrypto.md)

#### Returns

[`SBCrypto`](SBCrypto.md)

___

### storage

• `get` **storage**(): `StorageApi`

#### Returns

`StorageApi`

## Methods

### connect

▸ **connect**(`onMessage`, `key?`, `channelId?`): `Promise`<[`ChannelSocket`](ChannelSocket.md)\>

Connects to :term:`Channel Name` on this SB config.
Returns a channel object right away, but the channel
will not be ready until the ``ready`` promise is resolved.
Note that if you have a preferred server then the channel
object will be returned right away, but the ``ready`` promise
will still be pending. If you do not have a preferred server,
then the ``ready`` promise will be resolved when a least
one of the known servers is ready.

#### Parameters

| Name | Type |
| :------ | :------ |
| `onMessage` | (`m`: [`ChannelMessage`](../interfaces/ChannelMessage.md)) => `void` |
| `key?` | `JsonWebKey` |
| `channelId?` | `string` |

#### Returns

`Promise`<[`ChannelSocket`](ChannelSocket.md)\>

___

### create

▸ **create**(`sbServer`, `serverSecret`, `keys?`): `Promise`<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

Creates a new channel. Currently uses trivial authentication.
Returns a promise to a ''SBChannelHandle'' object
(which includes the :term:`Channel Name`).
Note that this method does not connect to the channel,
it just creates (authorizes) it.

#### Parameters

| Name | Type |
| :------ | :------ |
| `sbServer` | [`SBServer`](../interfaces/SBServer.md) |
| `serverSecret` | `string` |
| `keys?` | `JsonWebKey` |

#### Returns

`Promise`<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

___

### sendFile

▸ **sendFile**(`file`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | [`SBFile`](SBFile.md) |

#### Returns

`void`
