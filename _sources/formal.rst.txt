
.. _formal:

================
Formal Treatment
================

This section is currently a *start* to a formal treatment of the
snackabra design - this is early.  The reality of the ~3 year
development period has been to begin with a simple implementation
using readily available building blocks, then iterating with input
from internal discussions combined with progressively deeper research
into academic work. We expect this to continue for some time, and we
continue to appreciate any and all inputs, critiques, and pointers to
relevant work.

Within the scope of tentative steps, we begin not with the core room
(group) chat service, but with the storage service. This is for two
reasons: firstly we have more confidence that any issues that arise
with chat messaging can be addressed, given the large amount of work
done in this space, whereas for the storage service, it feels like we
are breaking some new ground, which is always worrisome. Probably for
that reason, the storage design has attracted more initial interest
and questions, which is the second reason to prioritize it.


Photos and Files (Blobs)
------------------------

For a new group chat service to be a credible alternative to the
myriad existing alternatives, it needs these basic features: text chat
(either one-to-one or group) and photo sharing (again, either
one-to-one or group). Seen from a more abstract view, a minimal
messaging fabric needs to be able to exchange simple (text) messages,
as well as arbitrary blobs of data. We picked photos first for reasons
explained elsewhere.

For the purposes of this section, we will refer to any blob of data
as :math:`\mathcal{M}`. [#f201]_  Small messages (next section) are
referred to as :math:`\mathcal{m}`. [#f202]_  
Consider Alice wants to send :math:`\mathcal{M}` to Bob:

.. seqdiag::

    seqdiag {
      Bob; Alice; Storage;

      // defaults
      default_fontsize = 18;  // default is 11
      // autonumber = True;
      default_note_color = lightblue;

      // also available:
      // edge_length = 300;  // default value is 192
      // span_height = 80;  // default value is 40
      activation = none; // Do not show activity line
      span_height = 20;  // default value is 40

      Alice -> Storage [label = "[1] First hash"];
      Storage ->> Alice [label = "[2] Encryption params"];
      Alice -> Storage [label = "[3] Second"];
      Storage ->> Alice [label = "[4] Verification"];
      Alice -> Bob [label = "[5] Manifest"];
    }

1. Alice creates a partial hash :math:`\mathfrak{H}_1(\mathcal{M})`.
   :math:`\mathfrak{H}_1` and :math:`\mathfrak{H}_2` are decompositions
   :math:`\mathfrak{H}(\mathcal{M}) = \mathfrak{H}_1(\mathcal{M}) | \mathfrak{H}_2(\mathcal{M})`.
   Alice sends this to the storage server, which returns a nonce :math:`\mathcal{iv}` and salt :math:`\mathcal{s}`.

2. The server mantains a mapping :math:`\mathcal{T}'(h)\longmapsto\langle\mathcal{iv},\mathcal{s}\rangle` which
   relates *half* of the hash of the full plaintext to enryption parameters;
   if the values existed already, they are returned, otherwise, they are created on the fly (and saved and returned).  [#f203]_
   This is the point where deduplication occurs: any attempts to upload an identical message
   will always result in the same encryption parameters.

3. Alice next generates an encryption key :math:`\mathcal{k}=\mathcal{K}(\mathfrak{H}_2(\mathcal{M}), \mathcal{s})` from
   the second half of the hash of the plaintext message (and salted), then
   generates the cryptotext of the message :math:`\mathcal{C}=\mathscr{E}(\mathcal{k},\mathcal{iv}|\mathcal{M})`,
   and then constructs a new hash of the encrypted message :math:`\mathcal{c}=\mathcal{H}(\mathcal{C})`.
   Alice sends the full encrypted message :math:`\mathcal{C}` to the server.

4. The storage server maintains a second mapping :math:`\mathcal{T}''(c)\longmapsto\langle\mathcal{v},\mathcal{C}\rangle`,
   which simply relates a hash of the encrypted contents to the contents, as well as a random
   verification identifier :math:`\mathcal{v}`, which is returned only if the server receives the full encrypted message.

5. At this point Alice has collected the full "manifest":
   :math:`\langle\mathcal{H}(\mathcal{C}),\mathcal{k},\mathcal{iv},\mathcal{s},\mathcal{v}\rangle`,
   which can be sent to Bob.

When Bob wants to fetch the object, Bob sends :math:`\langle\mathcal{H}(\mathcal{C}),\mathcal{v}\rangle` to the
storage server which first confirms correct :math:`\mathcal{T}''(c)\longmapsto\langle\mathcal{v}\rangle` and then returns
:math:`\mathcal{C}`. Bob then has :math:`\mathcal{M}` from :math:`\mathcal{D}(\mathcal{C},\mathcal{k},\mathcal{iv},\mathcal{s})`.

The storage server (obviously) never sees :math:`\mathcal{M}`. Furthermore, it doesn't track an explicit relationship
between :math:`\mathcal{M}` and :math:`\mathcal{C}` in any manner. [#f204]_

Now, consider another user, Charles, who independently uploads the same object
to share with some other party. The above process will play out the same, and the resulting
:math:`\langle\mathcal{H}(\mathcal{C}),\mathcal{k},\mathcal{iv},\mathcal{s},\mathcal{v}\rangle` will end up
being identical. Thus, re-uploading or sharing (copying and distributing the manifest) results
in the exact same data.

An outside adversary cannot determine what objects have been shared: all
they can do is go through the above process and abort at some point, but
won't learn anything: they won't receive the full manifest until all steps
are completed, and at no point will the server act differently than if it
had never seen the object.

The manifest is portable outside the system: it doesn't matter if the manifest was
shared within a chat room (see next section), or in some other manner (SMS, emailed,
copied to file across flash USB, etc). Regardless of how Bob receives the manifest,
Bob can ask for :math:`\mathcal{C}` and can perform :math:`\mathcal{D}(\mathcal{C},\mathcal{k},\mathcal{iv},\mathcal{s})`.

Deduplication will occur at step "1" and "3": when the server receives :math:`\mathcal{C}` it calculates
:math:`\mathcal{c}=\mathcal{H}(\mathcal{C})`, and if it has already seen it, it returns the stored value
:math:`\mathcal{T}''(c)\longmapsto\langle\mathcal{v},\mathcal{C}\rangle`, otherwise it
generates a new :math:`\mathcal{v}` (and stores and returns it). Regardless, it goes through the
motions of "storing" :math:`\mathcal{C}`, which will in effect be a no-op if it had already stored it.

The final result is a :math:`\mathcal{T}''(c)\longmapsto\langle\mathcal{v},\mathcal{C}\rangle` storage system,
that will only respond if you already have :math:`\mathcal{v}`, which you can only have if you either
went through the above steps yourself, or somebody else did and gave you the results. And of course
the resulting :math:`\mathcal{C}` is of no use to you without :math:`\langle\mathcal{k},\mathcal{iv},\mathcal{s}\rangle`.


.. _blob_future_design:

------------------------
Future Design Directions
------------------------

The above design is the current one, which results in a few issues. In
this section we summarize the current next-generation design candidate.
First we present the future direction, then we discuss how it improves
upon the characteristics of the current design.

To the above servers, we add two OPRF endpoints,
:math:`\mathcal{OPRF_1}` whic can be reached by anybody
and :math:`\mathcal{OPRF_2}` that is only accessible by
the storage server.

1. Alice creates a hash :math:`\mathfrak{H}(\mathcal{M})`.
   Alice sends this to :math:`\mathcal{OPRF_1}`,
   which returns a secret :math:`\mathcal{r}` which Alice first recombines (xor)
   with :math:`\mathfrak{H}(\mathcal{M})`, and derives
   nonce :math:`\mathcal{iv}` and salt :math:`\mathcal{s}`.
   Alice now constructs encryption key :math:`\mathcal{k}=\mathcal{K}(\mathfrak{x}\oplus\mathfrak{H}(\mathcal{M}), \mathcal{s})`. [#f205]_

2. This step is no longer needed - :math:`\mathcal{OPRF_1}`
   ensures that any clients with the same message :math:`\mathcal{M}` end up with the same encryption :math:`\mathcal{k}` and
   nonce :math:`\mathcal{iv}`, without revealing anything about :math:`\mathcal{M}` 
   to the :math:`\mathcal{OPRF_1}` server. It is this characteristic
   of :math:`\mathcal{OPRF_1}` which yields deduplication.

3. Alice next generates the cryptotext of the message :math:`\mathcal{C}=\mathscr{E}(\mathcal{k},\mathcal{iv}|\mathcal{M})`.
   Alice sends the full encrypted message :math:`\mathcal{C}` to the server.

4. The storage server receives :math:`\mathcal{C}` and generates a pseudo-random
   verification identifier :math:`\mathcal{v}`, returning the identifier
   once it's fully received :math:`\mathcal{C}`. The server maintains
   a mapping :math:`\mathfrak{H}(\mathcal{v}|\mathcal{C})\longmapsto\langle\mathcal{v}|\mathcal{C}\rangle`.
   Note that this constitutes a simple content-based hash storage.
   The pseudo-random verification identifier 
   is generated from :math:`\mathcal{OPRF_2(\mathcal{H}(\mathcal{C}))}`,
   assuring that identical :math:`\mathcal{C}` blobs will end up
   with the same name, however that name cannot easily be
   guessed even with access to :math:`\mathcal{C}`.

5. Once Alice receives :math:`\mathcal{v}`, Alice can construct a (final) name
   hash :math:`\mathcal{c}=\mathcal{H}(\mathcal{v}|\mathcal{C})`.
   At this point Alice has collected the full "manifest": 
   :math:`\langle\mathcal{c},\mathcal{k},\mathcal{iv},\mathcal{s}\rangle`,
   which can be sent to Bob.

When Bob wants to fetch the object, Bob sends
:math:`\mathcal{c}` to the
storage server which returns :math:`\mathcal{v}|\mathcal{C}`. Bob can
strip :math:`\mathcal{v}` and has :math:`\mathcal{M}` from
:math:`\mathcal{D}(\mathcal{C},\mathcal{k},\mathcal{iv},\mathcal{s})`.

Note: brute force attacks against either
:math:`\mathcal{OPRF_1}` or
:math:`\mathcal{OPRF_2}` are not economical, since an
upload operation can only be initiated by spending a storage token
from the ledger server.

The characteristics of the current design are all retained, with these
improvements:

* The storage server only needs to retain a single, trivially simple, mapping
  :math:`\mathfrak{H}(\mathcal{v}|\mathcal{C})\longmapsto\langle\mathcal{v}|\mathcal{C}\rangle`.
  Since it no longer needs a verification "step" for :math:`\mathcal{v}`,
  this "blob" store is now fully CDN-compatible, which is a significant
  improvement in both performance, cost efficiency, and privacy.
  Furthermore, since this final mapping is a pure content-based addressing
  scheme, it can be trivially mirrored to systems such as IPFS.

* The storage server does *not* need to ever see even a prefix of
  :math:`\mathcal{H}(\mathcal{M})`. This means that even if the storage
  server is compromised, an adversary cannot trivially confirm
  what objects have ever been shared.
  
* Deduplication is accomplished through the two uses of :math:`\mathcal{OPRF}`.
  Notably, this approach simplifies some operational tasks.
  If there is a fear of system compromise, then the secrets of both 
  :math:`\mathcal{OPRF_1}` and :math:`\mathcal{OPRF_2}`
  can be trivially rotated - for example every two weeks. Thus, deduplication
  occurs only within timing windows, which should yield the bulk
  of any deduplication efficacy. This way, an adversary who gains
  complete control of the storage server as well as :math:`\mathcal{OPRF_2}`
  can at most initiate a brute force attack against objects
  shared in the current window (and even then only tell *if*
  that object had been shared at all, not how often or by whom etc).

* To emphasize: with this design, the *only* state the storage server needs
  to maintain is :math:`\mathfrak{H}(\mathcal{v}|\mathcal{C})\longmapsto\langle\mathcal{v}|\mathcal{C}\rangle`,
  nothing else, and no need for any authentication or verification steps.
  All information needed to *find* the object and decrypt it
  is contained in the manifest, which is shared through room chat
  control messages.

Currently, implementation of this approach is pending adding
OPRF to the snackabra core library, since it is not (yet) a part
of the web crypto API standard. [#f206]_


.. _ledger_formal:

Ledger
------

For a conversational (and more complete) exposition of how the Ledger
currently works, see :ref:`Storage Ledger Server <ledgerserver>`. Note
also that this (slightly more) formal presentation presuposes the
next-generation usage of OPRF() functions (see :ref:`this discussion
<blob_future_design>`).  The Ledger complements the flow of uploading
and sharing files and documents (blobs), thus make sure to have read those
sections first.

A global ledger :math:`\mathfrak{D_1}\mathcal{(a)}\mapsto\mathcal{b}`
maintains account balance :math:`\mathcal{b}` for every account
:math:`\mathcal{a}`. Balance is a positive integer that defaults to
zero (ergo all possible accounts 'exist'), corresponding to bytes of
storage.  Account is either a :term:`Room Name`, or one of two
reserved account names that correspond to two special accounts:
:math:`\mathcal{B_g}` is the global budget for the service, and
:math:`\mathcal{B_s}` is the total spent so far.

Every :term:`Room` maintains a budget :math:`\mathcal{B_r}` that was assigned
to it at creation by taking an initial budget from :math:`\mathcal{B_g}` and adding
it to both :math:`\mathcal{B_s}` and  :math:`\mathcal{B_r}`. [#f208]_

When a client uploads an item :math:`\mathcal{M}`, it first needs to
calculate what :math:`\mathcal{|C|}` will become. [#f207]_
It first requests from the room to spend
:math:`\mathcal{s = |C|}` bytes out of the Room balance :math:`\mathcal{B_r}`.

If approved, the Room :math:`\mathcal{r}` requests an identifier
:math:`\mathcal{t}` (elsewhere called :term:`<TID>`) from the Ledger. [#f209]_ This is a random
token generated by the Ledger which maintains
:math:`\mathfrak{D_2}\mathcal{h(t)}\mapsto\langle\mathcal{s,
u}\rangle` where :math:`\mathcal{h()}` is a hash function, :math:`\mathcal{s}` is the size and
:math:`\mathcal{u}` is a boolean indicating if this has been 'spent'
or not.  Essentially, we are generating a local cryptocurrency token
of sorts, that can be traded for an upload of :math:`\mathcal{s}` bytes.

The Room never shares :math:`\mathcal{t}` with the Client, instead it
returns
:math:`\mathcal{T=}\mathfrak{E}\mathcal{(}\langle\mathcal{h(t), R(t),
R(h(t)}\mathcal{)}\rangle` where :math:`\mathfrak{E}\mathcal{()}` is
encrypted into a magical token :math:`\mathcal{T}` such that only the
Storage server can untangle it. :math:`\mathcal{R()}` is encryption
using the :term:`LEDGER_KEY` for future garbage collection.
      
The Client can now do the actual upload of :math:`\mathcal{v|C}`, sending
along with it :math:`\mathcal{T}`. 



Rooms, Chats, Groups
--------------------

For a conversational exposition of how Rooms work, see the
:ref:`Technical Overview <overview>`.

To be written, we're saving the formal treatment for this for last, since
it's quite conventional. 






|
|

------------------


.. rubric:: Footnotes

.. [#f201] In this section we will largely follow the nomenclature in 
	   *Message-Locked Encryption and Secure Deduplication*;
	   Mihir Bellare, Sriram Keelveedhi, Thomas Ristenpart;
	   Full version, original version in Eurocrypt 2013.

.. [#f202] You can think about it as follows: think of a generic
	   message as being :math:`\mathfrak{m}` with size
	   :math:`\vert\mathfrak{m}\vert`.
           We wish to distinguish between "small" and "large"
	   :math:`\mathfrak{m}`. That's an engineering and
           cost analysis question. Given a boundary :math:`\mathfrak{S}`,
           then messages where :math:`\vert\mathfrak{m}\vert < \mathfrak{S}`
	   are treated as :math:`\mathcal{m}` otherwise
	   :math:`\mathcal{M}`. The smaller objects :math:`\mathcal{m}`
           are replicated wherever they are used, and the
	   larger :math:`\mathcal{M}` are essentially
	   *converted into a reference* and embedded inside a
	   new :math:`\mathcal{m}`. That conversion includes
	   handling deduplication.
		 
.. [#f203] There is a race condition if multiple parties are trying to
	   create a new entry in this mapping at the same time.
	   To address this, the underlying primitive should be a
	   *compare-and-exchange*-style operation, where a new
	   nonce and salt are always generated, and are then
	   atomically compared with existing storage, which should
	   default to zero if not allocated: ergo, if there's a zero
	   (unallocated), write the new values, otherwise, return
	   the old ones. This would also reduce timing differences,
	   since the overhead of generating enryption parameters
	   is *always* carried, but optionally discarded.
           
.. [#f204] Note that this is slightly different from the current
           implementation, and is a (believed) improvement: current
	   code (soon to be updated) creates a concatenation of
	   partial hash of the plaintext with partial hash of
	   the encrypted. The problem this creates is that an
	   adversary that is able to gain full access to the storage
	   server at some point in time could look for the existence
	   of matches to known plaintext messages by simply inspecting
	   the first half. In this revised design, a storage server
	   has the option of clearing the mapping of
	   :math:`\mathcal{T}'(h)\longmapsto\langle\mathcal{iv},\mathcal{s}\rangle`
	   at any time: sharing manifests and retrieving encrypted
	   messages would be unaffected, to the detriment of reduced
	   effectiveness of deduplication. This allows for a form of
	   forward privacy (on the aggregate): for example, a storage
	   server configured to reset this mapping every week
	   could only leverage deduplication within each distinct
	   weekly period, but conversely an adversary that could
	   completely compromise the system would only be able to
	   determine if a given plaintext message was uploaded
	   and shared by anybody in the past week.

.. [#f205] The final xor operation with
           :math:`\mathfrak{H}(\mathcal{M})` exists to protect for the case where the
           :math:`\mathcal{OPRF_1}` server has been compromised.

.. [#f206] A concern is that OPRF is not yet an accepted IETF
	   standard. Latest draft is here https://www.ietf.org/id/draft-irtf-cfrg-voprf-09.html
	   and current (Draft 9) reference implementations
	   are here https://github.com/cfrg/draft-irtf-cfrg-voprf.
	   So far in snackabra design, we have avoided using any functions
	   that triggers the necessity of including libraries
	   or even major sections of code. The advantages of improving
	   the blob storage system with OPRF might outweigh those
	   concerns, but we have not made a final decision.
	   
.. [#f208] The Room balance is actually simply a local cached value that
	   matches whatever the balance is for the room according to the
	   Ledger server. The Room 'copy' of the balance serves as a synchronization
	   primitive, allowing the Ledger server to not have to worry
	   about that - the Ledger server can fullfil account balance
	   changes in any order. Similarly, this naturally protects against
	   various abuse and DDOS scenarios.

.. [#f207] Because of the very specific padding requirements, this is
           predictable.

.. [#f209] Note that :term:`<TID>` and :term:`verification` are different.

