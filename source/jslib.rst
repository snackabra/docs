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


SB384
-----

Most classes in SB are rooted in SB384. It encapsulates the core of an 
"identifier" in SB, namely a (384-bit) global :term:`Channel Name`, derived
from the :term:`Owner Key` of that object - typically either a :term:`channel`
or a :term:`object`. Most of the properties (see getters below) are various
perspectives and formats on this identity.


.. js:autoclass:: SB384
   :members:


Snackabra (Server) Class
------------------------

.. _Snackabra:

The SB class is the orchestrator, in particular it tracks one or more channels
connecting to one or more SB servers.

.. js:autoclass:: Snackabra
   :members:


Channels
--------

Channels (aka "Rooms") are the core communication primitive in SB.

SB Message Class
================

.. _SBMessage:

.. js:autoclass:: SBMessage
   :members:

Channel Class
=============

.. js:autoclass:: Channel
   :members:

Channel Socket Class
====================

Channel "sockets" are the synchronous communication interface to channels.

.. js:autoclass:: ChannelSocket
   :members:

Channel API Class
=================

The channel "API" class is the asynchronous interface to channels.

.. js:autoclass:: ChannelApi
   :members:



Storage
-------

SB Storage Class
================

.. js:autoclass:: StorageApi
   :members:


SB File Class
=============

.. js:autoclass:: SBFile
   :members:


Sample usage:

::
   
   const SB = new Snackabra(sb_config)
   SB.create(
     'password',
     (new Identity())).then((channelId) => {
       SB.connect(
         channelId,
         (m: ChannelMessage) => { console.log(`got message: ${m}`)}
       ).then((c) => c.ready).then((c) => {
         c.userName = "TestBot" // optional
         (new SBMessage(c, "Hello Message!")).send().then((c) => { console.log(`sent! (${c})`) })
      })
    })
  }



Utilities and Helpers
---------------------

These are a set common operations, that typically are supported by the
web api, but where we want to ensure specific behavior.


IndexedKV Class
===============

.. js:autoclass:: IndexedKV
   :members:

Crypto Class
============

.. js:autoclass:: SBCrypto
   :members:


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


                  
                  


                  
      
                  
      
