.. _personal_server:

============
Installation
============

An objective with the design from the outset is that anybody should be
able to cobble together a server that a "static" room UI, with loaded
keys, can connect to. Setting aside more complex features like image
sharing or video streaming, the core code needed to get any single
*one* room up and running again with all its participants is
relatively simple.

We plan for complete open source release of all clients, chat
backends, and CLI for administrative commands, etc that we
develop. We're proud to say that much of this is now available.

If you wish to run your own basic snackabra environment, here are the
building blocks:

* Core server for running rooms:
  https://github.com/snackabra/snackabra-roomserver

* To manage any shared photos or file yourself, you need a storage server:
  https://github.com/snackabra/snackabra-storageserver

* The "landing" page is the (static) web client:
  https://github.com/snackabra/snackabra-webclient

* There's a (native swift) iOS app as well:
  https://github.com/snackabra/snackabra-ios

* For command line operations you'll need the python library, ``pip install snackabra`` or:
  https://github.com/snackabra/snackabra-pylib

* This one is coming soon!
  https://github.com/snackabra/snackabra-cli




  
