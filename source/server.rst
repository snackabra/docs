================
Snackabra Server
================



Server Development
==================


The sdk supports Deno, Miniflare, Cloudflare, and Workerd.

::

   yarn install

SDK requires a pre-release of 'jslib' 0.6.0, which is not yet
published to NPM. When yarn asks, just pick the latest version that
it shows you. Next you need to clone the repo and build it
locally, or you can use one of the pre-built versions in the
``setup`` directory - again just pick the highest ''0.5.x'' version
that's included.

Note that you might want to know about ''yarn link''.

::

   # optional, if you're making your own changes
   tsc -w


Ledger Key
----------

Some of the setups below will require a "LEDGER_KEY" (an RSA-OAEP key,
in 'jwk' format). You will need to generate that and copy-paste where instructed.

If you are running Node v15 or higher the mint_keys.js
script will mint and store them locally:

::

   # Node 15+
   node ./setup/mint_keys.js
   # this should generate two files:
   # my_private_key
   # my_public_key


You can also generate these in any modern browser:
open javascript / developer console and enter the following Javascript:

::

   let keyPair = await window.crypto.subtle.generateKey(
     {
       name: "RSA-OAEP",
       modulusLength: 4096,
       publicExponent: new Uint8Array([1, 0, 1]),
       hash: "SHA-256"
     },
     true,
     ["encrypt", "decrypt"]
   );
   let my_private_key = await window.crypto.subtle.exportKey("jwk", keyPair.privateKey);
   let my_public_key = await window.crypto.subtle.exportKey("jwk", keyPair.publicKey);
   JSON.stringify(my_public_key);

(See https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey#rsa_key_pair_generation)


You should get something like:

::

   '{"alg":"RSA-OAEP-256","e":"AQAB","ext":true,"key_ops":["encrypt"],"kty":"RSA","n":"mOmu ....

Don't forget to store the full / private key
somewhere secure: ``JSON.stringify(my_private_key)``.

The resulting string (include the quotes) is the string you enter as your "LEDGER_KEY"
as needed in the below instructions (nota bene: the public key) - eg it'll go into a ``.env``
file for local environments, or put into a server secrets manager, etc.


Webclient
---------

If you want to connect an app like ''snackabra-webclient'' to the servers you spin
up per the below instructions, make sure to direct them to your ''localhost''.
For example for webclient you currently need the following in ''.env'' (see the
webclient README for details):

::

   REACT_APP_CHANNEL_SERVER=http://localhost:4000
   REACT_APP_SHARD_SERVER=http://localhost:4000
   REACT_APP_CHANNEL_SERVER_WS=ws://localhost:4000


-------------------
Install (miniflare)
-------------------

For details see https://miniflare.dev/

Setup is similar as to the full-fledged Cloudflare setup (below):

::

   # copy the template 'toml' file for miniflare
   cp setup/template.miniflare.wrangler.toml miniflare.wrangler.toml


Generate LEDGER_KEY as above instructions, and create a local file ``.env``
that includes it.

Then setup packages and run:

::
   
      yarn install
      yarn miniflare


It should fire up on ''http://127.0.0.1:4000'' and ''ws://127.0.0.1:4000''.



--------------
Install (deno)
--------------

TODO.


-----------------
Install (workerd)
-----------------

_(as of 2/8/2023, on Mac M1.  this is only partiallly working,
so it is paused for the moment.  we can either dig in deep,
or wait for either an update and more documentation from
Cloudlfare, or for Miniflare 3.0.0 to get released)_

2/8/2023: a few things that are problematic now:

* getting 'better-sqlite' to install
* getting pre-release of Miniflare 3.0.0 to install

Make sure you have latest xCode fully installed, here we are using 14.1

Note, workerd configuration file is documented here:
https://github.com/cloudflare/workerd/blob/main/src/workerd/server/workerd.capnp

::
   # below we assume you're "dev" directory is at "~/dev"
   cd "~/dev"

   # need workerd from cloudflare
   # currently i clone it at same level of this repo:
   git clone https://github.com/cloudflare/workerd.git

   # to build workerd you need bazel:
   brew install bazel

   # then you need the specific version of bazel for workerd,
   # at time of writing bazel 6.0.0 will be installed but
   # workerd needs 5.3.0:
   cd "/opt/homebrew/Cellar/bazel/6.0.0/libexec/bin"
   curl -fLO https://releases.bazel.build/5.3.0/release/bazel-5.3.0-darwin-arm64
   chmod +x bazel-5.3.0-darwin-arm64

   # this will require recent/latest clang etc:
   cd "~/dev/workerd"
   bazel build --config=thin-lto //src/workerd/server:workerd

   # Note that the binary will land in bazel-bin/src/workerd/server/workerd
   export "PATH=$PATH:/Users/<YOUR_USER_ID>/dev/workerd/bazel-bin/src/workerd/server"

   # now some Yarn stuff
   cd ~/dev/sdk-dev
   # i prefer this global, we'll use wrangler later
   yarn global add wrangler
   # get the other stuff needed locally
   yarn install

   # make sure jslib is available and is the latest
   cd ~/dev/snackabra-jslib
   git pull

   # check you have a recent typescript, i am on 4.9.5


Build and Run (workerd)
-----------------------

::

   # open two terminals

   # terminal 1:
   cd ~/dev/sdk-dev/src
   tsc --watch

   # terminal 2:
   cd ~/dev/sdk-dev
   yarn start

Compile (workerd)
-----------------

::

   cd ~/dev/sdk-dev
   yarn build


--------------------
Install (Cloudflare)
--------------------

The current room server requires a domain name and a Cloudflare (CF)
account. Currently, a free CF account is _almost_ sufficient, but
"durable objects" are not available yet on the free plans, so that
sets a minimum of $5/month to host a personal server (*).

* Set up a domain (we will call it "example.com") that you control.
  You will need to be able to change the nameservers to be Cloudflare.

* Set up a free account with CF: https://dash.cloudflare.com/sign-up -
  use your domain in the signup process.

* Go to the "workers" section and pick a name for your worker on
  CF, we'll call it "example" here. That sets up a subdomain on
  "workers.dev", e.g. "example.workers.dev."  Later you can set
  up "routes" from own domain.

* Click on the "Free" button, you need to upgrade to the
  "Pay-as-you-go" plan.

Now you have the account(s) set up. You might need to check email for
when any nameservers have propagated.

Next set up the CF command line environment, the "Wrangler CLI", we
use "yarn" in general but the personal server code is pure JS and
does not need any node packages. Follow instructions at
https://developers.cloudflare.com/workers/cli-wrangler/ -
at time of writing:

::

   # install the CLI:
   yarn global add @cloudflare/wrangler
   # authenticate your CLI:
   wrangler login
   # copy the template 'toml' file
   cp setup/template.cloudflare.wrangler.toml cloudflare.wrangler.toml

The 'login' will open a web page to confirm that your CLI is allowed
to administrate your CF account.

In the above 'wrangler.toml' file, you will need to add your 'Account
ID' from the dashboard. Next, you will need a few "KV Namespaces". You
can do that with the CLI:

::

   wrangler kv:namespace create "MESSAGES_NAMESPACE"
   wrangler kv:namespace create "KEYS_NAMESPACE"
   wrangler kv:namespace create "LEDGER_NAMESPACE"
   wrangler kv:namespace create "IMAGES_NAMESPACE"
   wrangler kv:namespace create "RECOVERY_NAMESPACE"


For each of them, you need to copy-paste the corresponding 'id' to
your ```wrangler.toml``` file.

Before you deploy, you need to enable "Durable Objects" for your
account.  On your "Workers" dashboard there is currently a link
"Durable Objects is now generally available!" - click that.(**)

Finally, you need to make a tiny change to your copy of
the server code, providing a 'secret'. This is essentially a simple
auth token that your server will request every time you create a new
room, or migrate a room over from somewhere else.

::

   wrangler secret put SERVER_SECRET<enter>

It will prompt you to enter the secret.

And next you will need the ledger key from above:

::

   wrangler secret put LEDGER_KEY<enter>

(The LEDGER_KEY string should look something like
``'{"key_ops":["encrypt"],"ext":true,"kty":"RSA","n":"6WeMtsPoblahblahU3rmDUgsc","e":"AQAB","alg":"RSA-OAEP-256"}'``).

Now you should be able to start your server:

::

   wrangler publish

And point a client to it!


(*) We are not affiliated with Cloudflare, we're just fans.

Log into the Cloudflare dashboard > Workers > Durable Objects


