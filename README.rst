Welcome to ``snackabra/docs``
================================

``snackabra`` is awesome.

.. code-block:: pycon

    >>> from cryptography.fernet import Fernet
    >>> # Put this somewhere safe!
    >>> key = Fernet.generate_key()
    >>> f = Fernet(key)
    >>> token = f.encrypt(b"A really secret message. Not for prying eyes.")
    >>> token
    b'...'
    >>> f.decrypt(token)
    b'A really secret message. Not for prying eyes.'

If you are interested in learning more about the field of cryptography, we
recommend `Crypto 101, by Laurens Van Houtven`_ and `The Cryptopals Crypto
Challenges`_.

Installation
------------
You can install ``cryptography`` with ``pip``:

.. code-block:: console

    $ pip install cryptography

See :doc:`Installation <installation>` for more information.

.. _cryptography-layout:

