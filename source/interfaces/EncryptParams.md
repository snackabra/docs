[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / EncryptParams

# Interface: EncryptParams

This is eseentially web standard type AesGcmParams, but with properties being
optional - they'll be filled in at the "bottom layer" if missing (and if
needed).

## Table of contents

### Properties

- [additionalData](EncryptParams.md#additionaldata)
- [iv](EncryptParams.md#iv)
- [name](EncryptParams.md#name)
- [tagLength](EncryptParams.md#taglength)

## Properties

### additionalData

• `Optional` **additionalData**: `BufferSource`

___

### iv

• `Optional` **iv**: `ArrayBuffer`

___

### name

• `Optional` **name**: `string`

___

### tagLength

• `Optional` **tagLength**: `number`
