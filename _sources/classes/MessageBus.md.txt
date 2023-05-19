[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / MessageBus

# Class: MessageBus

SB simple events (mesage bus) class

## Table of contents

### Constructors

- [constructor](MessageBus.md#constructor)

### Properties

- [bus](MessageBus.md#bus)

### Methods

- [publish](MessageBus.md#publish)
- [subscribe](MessageBus.md#subscribe)
- [unsubscribe](MessageBus.md#unsubscribe)

## Constructors

### constructor

• **new MessageBus**()

## Properties

### bus

• **bus**: `Dictionary`<`any`\> = `{}`

## Methods

### publish

▸ **publish**(`event`, `...args`): `void`

Publish

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `...args` | `unknown`[] |

#### Returns

`void`

___

### subscribe

▸ **subscribe**(`event`, `handler`): `void`

Subscribe. 'event' is a string, special case '*' means everything
 (in which case the handler is also given the message)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `handler` | `CallableFunction` |

#### Returns

`void`

___

### unsubscribe

▸ **unsubscribe**(`event`, `handler`): `void`

Unsubscribe

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `handler` | `CallableFunction` |

#### Returns

`void`
