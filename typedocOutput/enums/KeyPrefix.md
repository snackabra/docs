[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / KeyPrefix

# Enumeration: KeyPrefix

class 'SBCrypto', below, provides a class with wrappers for subtle crypto, as well as
some SB-specific utility functions.

Typically a public jsonwebkey (JWK) will look something like this in json string format:

                       "{\"crv\":\"P-384\",\"ext\":true,\"key_ops\":[],\"kty\":\"EC\",
                       \"x\":\"9s17B4i0Cuf_w9XN_uAq2DFePOr6S3sMFMA95KjLN8akBUWEhPAcuMEMwNUlrrkN\",
                       \"y\":\"6dAtcyMbtsO5ufKvlhxRsvjTmkABGlTYG1BrEjTpwrAgtmn6k25GR7akklz9klBr\"}"

A private key will look something like this:

                      "{\"crv\":\"P-384\",
                      \"d\":\"KCJHDZ34XgVFsS9-sU09HFzXZhnGCvnDgJ5a8GTSfjuJQaq-1N2acvchPRhknk8B\",
                      \"ext\":true,\"key_ops\":[\"deriveKey\"],\"kty\":\"EC\",
                      \"x\":\"rdsyBle0DD1hvp2OE2mINyyI87Cyg7FS3tCQUIeVkfPiNOACtFxi6iP8oeYt-Dge\",
                      \"y\":\"qW9VP72uf9rgUU117G7AfTkCMncJbT5scIaIRwBXfqET6FYcq20fwSP7R911J2_t\"}"

These are elliptic curve keys, we use P-384 (secp384r1). Mostly you will just
be using the 'class SB384' object, and all the details are handled.

The main (EC) RFC is 7518 (https://datatracker.ietf.org/doc/html/rfc7518#section-6.2),
supervised by IESG except for a tiny addition of one parameter ("ext") that is 
supervised by the W3C Crypto WG (https://w3c.github.io/webcrypto/#ecdsa).

EC in JWK has a number of parameters, but for us the only required ones are:

 crv: the curve (P-384 in this case)
 x: the x coordinate of the public key
 y: the y coordinate of the public key
 d: the private key (if it's a private key)
 kty: the key type (EC in this case)
 ext: the 'extractable' flag
 key_ops: (optional) permitted the key operations

All these components are implied except for x, y, and d. Various ways of encoding
(eg either just 'd', or just 'x', or 'x,y', or 'd,x', or 'd,x,y') are handled
using a prefix system on the keys when represented as a single (base62) string.

Starting with 'P' means public, 'X' means private.

 "PNk4": public key; x and y are present, the rest implied [KeyPrefix.SBPublicK+ey]
 "PNk2": public key, compressed, y is even
 "PNK3": public key, compressed, y is odd

 "Xj34": private key: x, y, d are present, the rest implied [KeyPrefix.SBPrivateKey]
 "Xj32": private key, compressed, has x and d, y is even
 "Xj33": private key, compressed, has x and d, y is odd

 "XjZx": private key, "dehydrated"; only d is present, x needed from other source (and y is even)

The fourth character encoded in enum KeySubPrefix below. Note that we encode using
base62 'externally', but 'x', 'y', and 'd' internally are in base64.

Keys default to being compressed.

For the AES key, we don't have an internal format; properties would include:

 "k": the key itself, encoded as base64
 "alg": "A256GCM"
 "key_ops": ["encrypt", "decrypt"]
 "kty": "oct"

Only the "k" property is required, the rest are implied, so it's trivial to track.
Whenever on the wire A256GCM would just require base62 encoding (into 43 characters).

The above (3-letter) prefixes we've generated randomly to hopefully avoid
collisions with other formats. For 2/3/4 we follow common (wire) formats.
There aren't conventions for what we're calling 'dehydrated' keys (they sort of
appear in crypto currency wallets).

The above in combination with Channels:
   
- private key: always d, x, ySign
- public key: always x, ySign
- channel key: same as public key

channelId: can be derived from (channel) public key (from x,y)

when you join a channel, you can join w public key of channel, or channelId;
if you join just with channelId, you need channel server (to fetch public key)

special format: dehydrated private key: just d (x through some other means)

## Table of contents

### Enumeration Members

- [SBDehydratedKey](KeyPrefix.md#sbdehydratedkey)
- [SBPrivateKey](KeyPrefix.md#sbprivatekey)
- [SBPublicKey](KeyPrefix.md#sbpublickey)

## Enumeration Members

### SBDehydratedKey

• **SBDehydratedKey** = ``"XjZ"``

___

### SBPrivateKey

• **SBPrivateKey** = ``"Xj3"``

___

### SBPublicKey

• **SBPublicKey** = ``"PNk"``
