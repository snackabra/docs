========================
Appendix A: Cryptography
========================


We have strived for the entire design to rely on only a small number
of cryptographic primitives, chosen for being modern, broadly used,
and with good support in Javascript (both browsers and Node), Python,
and Rust.

*To be written - this appendix is intended to be a primer on the
primitives that we are using, and a guide to further reading. For now,
we've included key links to JS, Python, and Rust implementations.*


ECDH
----

Public key pairs:

| https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#ecdh
| https://cryptography.io/en/latest/hazmat/primitives/asymmetric/ec/
| https://datatracker.ietf.org/doc/html/rfc6090
| https://github.com/mozilla/application-services/blob/main/components/support/rc_crypto/src/agreement.rs

RSA
---

Public-key pairs; SECG curve 3841;  OAEP (4096)

| https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#rsa-oaep
| https://cryptography.io/en/latest/hazmat/primitives/asymmetric/rsa/
| https://github.com/mozilla/application-services/blob/main/components/support/rc_crypto/src/aead.rs
| https://datatracker.ietf.org/doc/html/rfc3447

AES
---

A256GCM; symmetric keys;  authenticated (AEAD)

| https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#aes-gcm
| https://cryptography.io/en/latest/hazmat/primitives/symmetric-encryption/
| https://github.com/mozilla/application-services/blob/components/support/rc_crypto/src/aead.rs
| https://csrc.nist.gov/publications/detail/sp/800-38d/final
  

|
|
