# Minimal makefile for Sphinx documentation
#

# You can set these variables from the command line, and also
# from the environment for the first two.
SPHINXOPTS    ?=
SPHINXBUILD   ?= sphinx-build
SOURCEDIR     = source
BUILDDIR      = build

# Put it first so that "make" without argument is like "make help".
help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

.PHONY: help Makefile

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
%: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)
        # deploying to root
	echo "Copying file to root directory"
	cp -R $(BUILDDIR)/html/* .

jslib:
	echo "Copying over jslib - in case you develop locally"
	cp ../snackabra-jslib/snackabra.js snackabra-jslib
	cp ../snackabra-jslib/snackabra.js.map snackabra-jslib
	cp ../snackabra-jslib/snackabra.d.ts snackabra-jslib
	cp ../snackabra-sdk/server/src/index.ts snackabra-jslib/snackabra-server.ts
	cp ../snackabra-sdk/server/src/index.js snackabra-jslib/snackabra-server.js
	cp ../snackabra-sdk/server/src/index.d.ts snackabra-jslib/snackabra-server.d.ts
