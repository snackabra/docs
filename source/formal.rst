
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


Photos and Files
----------------

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

5. At this point Alice has collected the full "manifest": :math:`\langle\mathcal{H}(\mathcal{C}),\mathcal{k},\mathcal{iv},\mathcal{s},\mathcal{v}\rangle`,
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



Rooms, Chats, Groups
--------------------

To be written.


Ledger
------

To be written.


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

	   
	   
