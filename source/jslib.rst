==================
Javascript Library
==================

`The core of SB is implemented in snackabra.ts, targeting ES2022.
This section documents the JS (translated) version. Please note:
any current published version is Alpha of upcoming 0.5.0 and should
not be used for sensitive or production use (or if you do use it as
such: caveat emptor). We will signal production-ready use by versioning
it as 1.0.x (published to npmjs).`

All core capababilities of the SB design is intended to be encapsulated
in this library. Design objectives include:

* No external dependencies (no other libraries)
* No dependencies on the DOM object 
* Pure asynchronous (eg no 'await')
* Clean es2022 code
* Zero errors/warnings on tsc 'strict' setting
* Minimum "forced typecasting"
* DRY extendable / abstract OOP implementation

Installation / Development
--------------------------

Install with:

``npm i -g snackabra``

Git repository: https://github.com/snackabra/snackabra-jslib.git

Note: in SB version 0.5.0, most core SB client and server
logic is being refactored into this library. If you're looking
at this prior to release of 0.5.0 (link above), then the latest
(in progress) version underlying this documentation is here:

https://github.com/384co/snackabra-docs/blob/main/snackabra-jslib/snackabra.js


Main 384 Identity Class
-----------------------

.. js:autoclass:: SB384
   :members:




Snackabra Class
---------------

.. js:autoclass:: Snackabra


Messagebus Class
----------------

.. js:autoclass:: MessageBus
   :members:

Crypto Class
------------

.. js:autoclass:: SBCrypto
   :members:


SB Message Class
----------------

.. js:autoclass:: SBMessage
   :members:

SB File Class
-------------

.. js:autoclass:: SBFile
   :members:


Channel Class
-------------

.. js:autoclass:: Channel
   :members:

SB Socket Class
---------------

.. js:autoclass:: ChannelSocket
   :members:

SB Storage Class
----------------

.. js:autoclass:: StorageApi

Channel API Class
-----------------

.. js:autoclass:: ChannelApi


IndexedKV Class
---------------

.. js:autoclass:: IndexedKV




Utilities
---------

These are a set common operations, that typically are supported by the
web api, but where we want to ensure specific behavior.


Format Related
==============

.. js:autofunction:: arrayBufferToBase64

.. js:autofunction:: base64ToArrayBuffer

.. js:autofunction:: encodeB64Url

.. js:autofunction:: decodeB64Url

.. js:autofunction:: str2ab

.. js:autofunction:: ab2str

.. js:autofunction:: cleanBase32mi


Crypto Helpers
==============

.. js:autofunction:: importPublicKey

.. js:autofunction:: simpleRand256

.. js:autofunction:: simpleRandomString

.. js:autofunction:: getRandomValues

.. js:autofunction:: packageEncryptDict


SB "Wire" Format Helpers
========================

.. js:autofunction:: assemblePayload

.. js:autofunction:: extractPayload



SB-specific Helpers
===================

.. js:autofunction:: jsonParseWrapper

.. js:autofunction:: partition


Testing Related
===============

.. js:autofunction:: compareBuffers


                  
                  


                  
      
                  
      
