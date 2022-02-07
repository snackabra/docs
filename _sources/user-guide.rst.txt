
.. _introduction:

============================================
Appendix B: Privacy.App Chat Room User Guide
============================================

Here we will only give you a brief tour of this chat service; once you
are on the service itself, there's also a 'Guide' tab that gives you a
quick start - below we go into details.

You can use these personal chat rooms as you like. To invite somebody
just send them a link - they don't need to members, or 'sign up', or
give us their email, or any such nonsense.  They just need to go to
the link and you will both be in a chat room (you can have up to 300
participants in any room).

All chatting occurs in 'Rooms', and all rooms have one 'owner', and an
owner has to be a Member. To invite somebody to any of your Rooms, you
just send them a link - use the 'Copy Link' for any room below to copy
the unique URL for that room to the clipboard.

When you join the room, you will probably join as 'Owner' which also
gives you some special features.  Any messages in the Room by the
Owner are surrounded by a green line.

A room is a unique web address, a 'URL', and will look something like
this:

::

  https://s.privacy.app/hkUkHY6wm-ZXmIyhCt1v4NBK-o1PV4GyKBnl7U8KaYgoe1Yi150ptDnVUmkboFOL

Every room has a unique address, nobody will 'find' it unless you've
shared it with them. (In fact, the room above is a real room, it's one
of our support chat rooms - feel free to drop by and say 'hi'. But
don't share any information about yourself!  It's an 'open mike'.)

The 'first' guest that joins gets a special status as 'verified
guest' - that way you can share the room with somebody and have them
join it right away.

Note that you can always join your own rooms as a 'Guest', just make
sure to use another browser or 'private/incognito' tab, and go to the
Room.

The most important (and different) part of this chat service is that
any guest that joins will receive cryptographic keys that are
stored locally in your browser. Any guest needs to take
care of these keys themselves - but if they lose them they can always
join again and get new keys. More details in the 'Guide' on the chat
service; we are also hoping to put together an introductory video for
you. There is no username or password part of this system (because
that is inherently insecure), and you and your guests are fully
empowered to manage your cryptographic keys yourself (because that way
there is no way for us to read your messages or see any pictures
you're sharing etc). The simplest way is to export the keys to a
file - it can be stored on your phone, your computer, on a USB - and
then import it to any device and browser where you want to continue
chatting.

Note that only Members can store their keys online (the 'cloud'),
meaning, our servers.  Your guests can't, because we have no way to
authenticate them - that's why you have your Yubikey and membership
number.

In a room there are two ways to send a message: normally, and as a
'whisper'. A 'whisper' can only be read by the Owner (Member), nobody
else, ever. However, other guests in the room can see that you have
whispered something (the Owner can disable this).  A reply to a
whisper is similarly only readable by the other guest; that way you
can always have a 'side conversation', just like you would in a large
room!

All messages are encrypted, but anybody that has the web address to
the room can join, and read the messages as well Therefore there is an
important feature called 'Lock Down', from your 'Admin' menu you can
enable Lock Down mode on any room. Once locked down, all communication
is encrypted with new keys, and any guest has to be approved first by
the Owner.

If you are very concerned about security and privacy, then as
Owner of a locked down room, you can re-generate your own message
keys, and also re-generate ('roll') the room's end-to-end encryption
keys. If you do that, you now need to keep track of your own room
keys, even as a Member - because at this point we are not keeping any
of the keys for the room. If you are a very advanced user, you can
generate your own keys for this purpose (SECP384R1, you can manually
edit your export/import file, keys are in JWK format).

A (very) brief note on terms of use: As an Owner, you are
responsible for what happens in any room you create. You decide what
is appropriate and what is not, and you control who has access to the
Room, and you have ultimate control over any content that is
shared. The Magnusson Institute, who owns and manages all services on
Privacy.App, is not responsible for the contents of any rooms, as long
as it is <u>legal</u> under applicable United States laws - and
<u>only</u> US laws. We are a service for US residents and we will
only accept US jurisdictional oversight. We will not accept any
<u>illegal</u> activities, and we expect the Owner to enforce that,
and to contact us as needed. Details are explained elsewhere.

