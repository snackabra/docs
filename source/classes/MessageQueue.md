[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / MessageQueue

# Class: MessageQueue\<T\>

***************************************************************************************************

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Constructors

- [constructor](MessageQueue.md#constructor)

### Methods

- [close](MessageQueue.md#close)
- [dequeue](MessageQueue.md#dequeue)
- [drain](MessageQueue.md#drain)
- [enqueue](MessageQueue.md#enqueue)
- [isEmpty](MessageQueue.md#isempty)

## Constructors

### constructor

• **new MessageQueue**\<`T`\>(): [`MessageQueue`](MessageQueue.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

[`MessageQueue`](MessageQueue.md)\<`T`\>

## Methods

### close

▸ **close**(`reason?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `reason?` | `string` |

#### Returns

`void`

___

### dequeue

▸ **dequeue**(): `Promise`\<``null`` \| `T`\>

#### Returns

`Promise`\<``null`` \| `T`\>

___

### drain

▸ **drain**(`reason?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `reason?` | `string` |

#### Returns

`Promise`\<`void`\>

___

### enqueue

▸ **enqueue**(`item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `T` |

#### Returns

`void`

___

### isEmpty

▸ **isEmpty**(): `boolean`

#### Returns

`boolean`
