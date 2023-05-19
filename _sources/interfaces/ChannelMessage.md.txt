[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / ChannelMessage

# Interface: ChannelMessage

for example the incoming message will look like this (after decryption)

**`Example`**

```ts
 {
   "encrypted":false,
   "contents":"Hello from test04d!",
   "sign":"u7zAM-1fNLZjmuayOkwWvXTBGqMEimOuzp1DJGX4ECg",
   "image":"",
   "imageMetaData":{},
   "sender_pubKey":
       {
         "crv":"P-384","ext":true,"key_ops":[],"kty":"EC",
         "x":"edqHd4aUn7dGsuDMQxtvzuw-Q2N7l77HBW81KvWj9qtzU7ab-sFHUBqogg2PKihj",
         "y":"Oqp27bXL4RUcAHpWUEFHZdyEuhTo8_8oyTsAKJDk1g_NQOA0FR5Sy_8ViTTWS9wT"
       },
   "sender_username":"TestBot",
   "image_sign":"3O0AYKthtWWYUX3AWDmdU4kTR49UyNyaA937CfKtcQw",
   "imageMetadata_sign":"4LmewpsH6TcRhHYQLivd4Ce87SI1AJIaezhJB5sdD7M"
 }
 ```

## Table of contents

### Properties

- [\_id](ChannelMessage.md#_id)
- [channelID](ChannelMessage.md#channelid)
- [contents](ChannelMessage.md#contents)
- [control](ChannelMessage.md#control)
- [encrypted\_contents](ChannelMessage.md#encrypted_contents)
- [id](ChannelMessage.md#id)
- [image](ChannelMessage.md#image)
- [imageMetaData](ChannelMessage.md#imagemetadata)
- [imageMetadata\_sign](ChannelMessage.md#imagemetadata_sign)
- [image\_sign](ChannelMessage.md#image_sign)
- [keys](ChannelMessage.md#keys)
- [motd](ChannelMessage.md#motd)
- [ready](ChannelMessage.md#ready)
- [roomLocked](ChannelMessage.md#roomlocked)
- [sender\_pubKey](ChannelMessage.md#sender_pubkey)
- [sender\_username](ChannelMessage.md#sender_username)
- [sign](ChannelMessage.md#sign)
- [system](ChannelMessage.md#system)
- [text](ChannelMessage.md#text)
- [timestamp](ChannelMessage.md#timestamp)
- [timestampPrefix](ChannelMessage.md#timestampprefix)
- [type](ChannelMessage.md#type)
- [user](ChannelMessage.md#user)
- [verificationToken](ChannelMessage.md#verificationtoken)

## Properties

### \_id

• `Optional` **\_id**: `string`

___

### channelID

• `Optional` **channelID**: `string`

___

### contents

• `Optional` **contents**: `string`

___

### control

• `Optional` **control**: `boolean`

___

### encrypted\_contents

• `Optional` **encrypted\_contents**: [`EncryptedContents`](EncryptedContents.md)

___

### id

• `Optional` **id**: `string`

___

### image

• `Optional` **image**: `string`

___

### imageMetaData

• `Optional` **imageMetaData**: `ImageMetaData`

___

### imageMetadata\_sign

• `Optional` **imageMetadata\_sign**: `string`

___

### image\_sign

• `Optional` **image\_sign**: `string`

___

### keys

• `Optional` **keys**: [`ChannelKeyStrings`](ChannelKeyStrings.md)

___

### motd

• `Optional` **motd**: `string`

___

### ready

• `Optional` **ready**: `boolean`

___

### roomLocked

• `Optional` **roomLocked**: `boolean`

___

### sender\_pubKey

• `Optional` **sender\_pubKey**: `JsonWebKey`

___

### sender\_username

• `Optional` **sender\_username**: `string`

___

### sign

• `Optional` **sign**: `string`

___

### system

• `Optional` **system**: `boolean`

___

### text

• `Optional` **text**: `string`

___

### timestamp

• `Optional` **timestamp**: `number`

___

### timestampPrefix

• `Optional` **timestampPrefix**: `string`

___

### type

• `Optional` **type**: [`ChannelMessageTypes`](../modules.md#channelmessagetypes)

___

### user

• `Optional` **user**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_id?` | `JsonWebKey` |
| `name` | `string` |

___

### verificationToken

• `Optional` **verificationToken**: `string`
