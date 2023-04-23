
|
|

.. image:: _static/snackabra.svg
   :height: 100px
   :width: 100px
   :align: center
   :alt: The 'michat' Pet Logo

=========
Snackabra
=========

Snackabra is a from-scratch implementation of many-to-many
conversation and document sharing.  It is made up of a set of designs,
reference implementations, and a reference service.  It is intended to
address a number of concerns and constraints with present systems. For
motivation and design principles, see the :ref:`general discussion
<discussion>` section.

To jump into the technical details, you might want to start with a
:ref:`slightly technical introduction <introduction>` and then dig
into :ref:`more detailed overview <overview>`. If you're a member of
public server such https://Privacy.App then you might be looking for a
short :ref:`user manual <userGuide>` instead.

Snackabra [#f02]_ is open source (https://github.com/snackabra).
If you would like to contribute or help out with the snackabra
project, please feel free to :ref:`reach out to us <contact>`.

This is work in progress, there's much left to do. Design was begun in
2020 and implementation was begun in 2021, and first public release
was in February, 2022. So please be patient if and when we need to
change (sometimes fundamental) things.  Until there are (many) more
miles on this design and implementation, you should *not* rely on it
for critical information: make sure you have independent backups of
anything important.  We will "signal" that we think the system is
"pretty solid" by kicking the version number to "1.0.0". 
[#f04]_


.. toctree::
   :hidden:
   :maxdepth: 3

   introduction
   overview
   system-architecture
   discussion
   formal
   install
   contact
   glossary
   future
   references
   license
   jslib
   modules
   server
   pylib
   appendix-a-crypto.rst
   user-guide
   (ignore) <diag-sample>
   motivation
   updated-glossary

|

.. note::

   References to the "Institute" or “MI” (or sometimes “us/our”) refers
   to the https://Magnusson.Institute - which is funding the
   development of snackabra as part of a (paid) membership package of
   privacy services (see http://Privacy.App). References to "Members"
   refer to either such users, or users of an equivalent public hosting
   of snackabra.


----------------

.. rubric:: Footnotes

.. [#f02] "SNACKABRA" is pronounced "snack" and then the first part of
	 "abracadabra". Accent is on the second "a" (the first "a" in
	 "abracadabra"). It's as easy to use as having a snack. And
	 it's magical.

.. [#f03] Though bear in mind that the :ref:`license language
          <license>` will never cease to apply: this is provided "as is".

.. [#f04] The "canary function" for all of snackabra is @psm's
	  personal twitter (https://twitter.com/petersmagnusson).
	  You can DM at any time to ask if there are any court orders
	  or similar constraints in effect of any sort that impact the integrity
	  of any parts of the design, implemtation, or operation of snackabra. @psm
	  will reply if he is not aware. If you don't know what
	  this footnote means, don't worry about it.

----------------

**LICENSE**

Copyright (c) 2016-2021 Magnusson Institute, All Rights Reserved.

"Snackabra" is a registered trademark

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Affero General Public License for more details.

Licensed under GNU Affero General Public License
https://www.gnu.org/licenses/agpl-3.0.html
