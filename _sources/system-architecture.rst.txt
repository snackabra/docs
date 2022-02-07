===================
System Architecture
===================

To both future-proof as well as take advantage of what we’ve learned
over the past 10-20 years in the area of *implementing and *operating*
a messaging and document sharing service. To give a full accounting of
the background to the following considerations is beyond the scope;
here we will only provide a summary of experiences feeding into
these. Hence, the following includes blanket assertions without citing
backing references; we’re happy to discuss and debate any or all of
these in separate communications.

This section will include only cursory explanations of any major
concepts of modern (internet) system architectures; we will try to use
the "correct" (most widely used) names for any technologies or
architecture decisions, to facilitate for a reader to inform
themselves elsewhere.

.. _computing:

Computing
---------

We have clients and backend(s). For clients our baseline is simply a
modern web browser. The core of the client chat application is
Javascript. [#f151]_ The communication with backends is over
asynchronous HTTPS and WebSockets. The entry ("landing page") backend
delivers a single-page web app (‘SPA’) after which it operates an
asynchronous API.

For backend computing, we’re targeting light-weight edge [#152]_
computing as the most modern approach, sometimes referred to as
"edge-native."  We will assume this to be in the form of minimalist
Javascript containers implementing a subset of the standard web
API. [#153]_ As these are a variation of the (old) general concept of
“computational node,” we will refer to them as “worker nodes”, or
“workers” for short.

We will further assume these workers come in two flavors:
:term:`addressable worker` and :term:`non-addressable worker`:

* Non-addressable workers are the "conventional" form of “PaaS” cloud
  computing, brought to the edge. [#154]_ They can be reached over the
  network (obviously) but only in a *general* sense: when the client
  connects to “chat.example.com”, it ends up connecting to *some*
  container that loads on *some* server, with the same container code
  every time. The underlying infrastructure can scale up and down the
  number of servers it needs to run the number of containers needed to
  serve the number of (and load from) clients. [#155]_
  Furthermore, a non-addressable worker does not have local storage;
  any state needed is accessed from a separate (:term:`KV_global`) service such
  as a key-value store API.

* A non-addressable worker does not have an addressable global
  identity: a client has no control over what specific container or
  server it connects to. In contrast, an addressable worker is a
  specific instance of a worker, and all clients requesting *that*
  worker will all get to the same one instance. If no instance is
  running, the infrastructure will start one, and handle any data race
  or location issues transparently. In this manner, an addressable
  worker can have 'local’ storage (in addition to ‘global’), since it
  doesn’t move (at least not as much). We refer to this as
  :term:`KV_local` (not to be confused with the *client* :term:`Local Storage`).
  With local worker storage now

  possible, an addressable worker can now provide storage with both
  stronger consistency models and higher performance, since there is
  now a ‘locality’. Furthermore, an addressable worker can offer
  real-time interfaces for a group of clients. We will assume and take
  advantage of both of these benefits, specifically we will assume
  that clients can connect to an addressable worker with websockets.

The chat system is implemented using a mixture of addressable and
non-addressable workers - typically any direct participation in a
"room" (rooms are introduced below) is done through a websocket to an
addressable worker, and any API calls that either can tolerate
asynchronicity and/or do not have strong consistency requirements are
directed at non-addressable workers

Furthermore, several administrative functions are done elsewhere, in
two forms: an online identity provider (IDP) that we refer to as the
"SSO", and offline functions we refer to as “CLI”. The design attempts
to leave as little information and vulnerability as possible in the
SSO. The CLI is assumed to be offline (gap aired) when not actively
used for specific purposes; furthermore we strive for these to be
“batch” oriented as much as possible.

.. _storage:

Storage
-------

For storage we will assume both global and local key-value storage. We
will make minimum assumptions on features; for searches we will only
need "prefix" storage queries. [#156]_ We will also assume that
the value can either be a string or a binary object. [#157]_

The global key-value storage system we will refer to as :term:`KV_global`,
and the local (for an addressable worker, see above) as :term:`KV_local`:

* We will aim to design for high tolerance of loose memory coherency
  in :term:`KV_global`, including eventual consistency. The size limits of
  individual values will (currently) determine the largest document
  that can be shared. [#158]_

* We will require a fairly strict consistency model for
  :term:`KV_local`. The design can handle value size limits down to 32KB.

We will design our keys to be friendly towards any hashing
mechanism. Reading a specific item in a KV system can generally be
done in constant time; choice of only requiring a prefix search is
that this can also be implemented in constant time [#159]_, allowing the design to scale
arbitrarily.

Finally, (browser) clients require use of **local_storage**, [#160]_
if that is unreliable, that user needs to export/import to a local
file system (local to their computer/device).

.. _cloudflare:

Cloudflare
----------

Our reference implementation is primarily built on Cloudflare
products, and should be relatively easy to self-host. The reason is
that, from what we can tell, Cloudflare currently has the simplest to
use implementation of the next-generation "best practices" that we
outline above. To the extent any of this is unique to Cloudflare, we
would not expect that to remain the case.

* Their edge computing solution ("Cloudflare Workers") is the
  “correct” approach of best practice cloud computing today, namely, a
  language-native smallest possible container with dynamic (native)
  code generation interpreter. In the case of Javascript, the v8
  (Google Chrome) language virtual machine has a concept of an
  *Isolate*, which implements full JS interpreter isolation (with
  separate heap, garbage collector, etc). This gives it a *tiny*
  memory footprint (and close to instant startup times). With native
  hardware x86-64 support in the v8 runtime dynamic code-generating
  compiler, it’s also high-performance in code execution. We use
  Cloudflare Workers for “**workers**.”

  * “Introducing Cloudflare Workers"
    https://blog.cloudflare.com/introducing-cloudflare-workers

  * “Cloud Computing without Containers”
    https://blog.cloudflare.com/cloud-computing-without-containers

    More detailed presentation by Kenton Varda:
    https://www.infoq.com/presentations/cloudflare-v8

    Some in-depth internals that walks through implementation details of internals:
    https://v8.dev/docs/embed
    https://v8.dev/blog/embedded-builtins
    https://www.youtube.com/watch?v=lqE4u8s8Iik

* Cloudflare recently introduced "Unique Durable Objects", or “Durable
  Object Workers” (:term:`Durable Object`). These correspond to what we above call
  “*addressable workers*” including both strong (transactional)
  consistency in their :term:`KV_local` storage, as well as support for
  websockets. [#161]_  (Out of habit we
  will sometimes refer to this as :term:`Durable Object`.)

* Workers Durable Objects Beta: A New Approach to Stateful Serverless
  https://blog.cloudflare.com/introducing-workers-durable-objects
  Durable Objects: Easy, Fast, Correct — Choose three
  https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three

* Cloudflare workers have easy access to their KV system, :term:`KV_global`.
  https://developers.cloudflare.com/workers/runtime-apis/kv


.. rubric:: Footnotes

.. [#f02] Concept of "Owner" is explained :ref:`here <owner definition>`.

.. [#f151] In our case we are using React Native for the UI, but the
	   core of the client-side MiChat code will be a Javascript
	   library that can be added to various contexts, including a
	   minimalist (static, local) html file.

.. [#f152] As opposed to ‘cloud computing’ which was the preceding
	   generation of architecture.

.. [#f153] In this context, something like a Docker image is, in fact,
	   Heavy. We assume a subset since that’s the smart thing to
	   do: full api support starts getting heavy.

.. [#f154] Edge computing is where the backend/server code is running
	   inside, or very near, the network: for example in an
	   Internet Exchange Point or even on a Mobile Base
	   Station. It would include any computing platform that the
	   operator of the chat service considers trusted. Thus, for
	   example, it would probably not include a consumer home
	   router, unless the instance of the service was operated by
	   its owner. See also :ref:`micro-federation <micro-federation>`

.. [#f155] The textbook pioneer of this model was Google App Engine,
	     though their initial choice for container language was
	     Python. By having a standardized language and API, the
	     exact same lightweight container can be used for all
	     customers and all applications, with dramatic benefits.

.. [#f156] The core concept of key-value store (also called ‘key-value
	   database’) is a generic ‘key’ which then maps to some
	   object (value). It’s akin to a hash table. By having a flat
	   addressing scheme and no metadata (in its simplest form),
	   it can be made both scalable, reliable, and fast.

.. [#f157] We will manage multi-part objects ourselves, see ‘wire
	   protocol’ below.

.. [#f158] In the case of images, the client code will down-sample /
          reduce the image size until it fits into 80% of the limit
	  (which currently translates to 20MB image/photo size
	  max). It will only store unmodified image (with metadata)
	  if that fits into 20MB (binary).

.. [#f159] Technically O(m) where ‘m’ is the length of the prefix. So
	   we should note that the design will only ever perform
	   fixed-length / bounded prefix queries; in current
	   implementation <64 bytes.

.. [#f160] https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/local

.. [#f161] Not surprisingly, Cloudflare anticipated that chat rooms
	   would be an excellent use case:
	   https://github.com/cloudflare/workers-chat-demo



