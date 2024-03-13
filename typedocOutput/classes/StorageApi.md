[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / StorageApi

# Class: StorageApi

StorageAPI

## Table of contents

### Constructors

- [constructor](StorageApi.md#constructor)

### Methods

- [fetchData](StorageApi.md#fetchdata)
- [getStorageServer](StorageApi.md#getstorageserver)
- [storeData](StorageApi.md#storedata)
- [getData](StorageApi.md#getdata)
- [getObjectKey](StorageApi.md#getobjectkey)
- [getPayload](StorageApi.md#getpayload)
- [padBuf](StorageApi.md#padbuf)

## Constructors

### constructor

• **new StorageApi**(`stringOrPromise`): [`StorageApi`](StorageApi.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stringOrPromise` | `string` \| `Promise`\<`string`\> |

#### Returns

[`StorageApi`](StorageApi.md)

## Methods

### fetchData

▸ **fetchData**(`handle`): `Promise`\<[`SBObjectHandle`](../interfaces/SBObjectHandle.md)\>

This assumes you have a complete SBObjectHandle. Note that if you only have
the 'id' and 'verification' fields, you can reconstruct / request the rest.
The current interface will return both nonce, salt, and encrypted data.

Not that fetchData will prioritize checking with the storageServer in the
handle, if present. Next, it will always check localhost at port 3841 if a
local mirror is running. After that, it may or may not check one or several
possible servers.

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | [`SBObjectHandle`](../interfaces/SBObjectHandle.md) |

#### Returns

`Promise`\<[`SBObjectHandle`](../interfaces/SBObjectHandle.md)\>

Promise<ArrayBuffer | string> - the shard data

Note that this returns a handle, which is the same handle but might be
updated (for example iv, salt filled in). Server will be updated with
whatever server 'worked', etc.

The returned shard contents is referenced by 'data' in the handle. It's
stored as a 'weakref', meaning, you can hang on to the handle as your
'cache', and use ''getData()'' to safely retrieve the data.

___

### getStorageServer

▸ **getStorageServer**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

___

### storeData

▸ **storeData**(`contents`, `budgetSource`): `Promise`\<[`SBObjectHandle`](../interfaces/SBObjectHandle.md)\>

Store 'contents' as a shard, returns an object handle. Note that 'contents' can be
anything, and is always packaged as a payload before storing.

#### Parameters

| Name | Type |
| :------ | :------ |
| `contents` | `any` |
| `budgetSource` | [`SBStorageToken`](../interfaces/SBStorageToken.md) \| [`SBChannelHandle`](../interfaces/SBChannelHandle.md) \| [`Channel`](Channel.md) |

#### Returns

`Promise`\<[`SBObjectHandle`](../interfaces/SBObjectHandle.md)\>

___

### getData

▸ **getData**(`handle`): `undefined` \| `ArrayBuffer`

Convenience wrapper for object handles: returns the data if it's present,
returns null if it's not, and throws an error if the handle is invalid.

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | [`SBObjectHandle`](../interfaces/SBObjectHandle.md) |

#### Returns

`undefined` \| `ArrayBuffer`

___

### getObjectKey

▸ **getObjectKey**(`fileHashBuffer`, `salt`): `Promise`\<`CryptoKey`\>

Derives the encryption key for a given object (shard).

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileHashBuffer` | `BufferSource` |
| `salt` | `ArrayBuffer` |

#### Returns

`Promise`\<`CryptoKey`\>

___

### getPayload

▸ **getPayload**(`handle`): `any`

Convenience wrapper for object handles: returns the payload.

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | [`SBObjectHandle`](../interfaces/SBObjectHandle.md) |

#### Returns

`any`

___

### padBuf

▸ **padBuf**(`buf`): `ArrayBuffer`

Pads object up to closest permitted size boundaries;
currently that means a minimum of 4KB and a maximum of
of 1 MB, after which it rounds up to closest MB.

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `ArrayBuffer` |

#### Returns

`ArrayBuffer`
