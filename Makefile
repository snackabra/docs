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
	cp ../snackabra-jslib/browser.mjs snackabra-jslib/snackabra.js
	cp ../snackabra-jslib/src/snackabra.js.map snackabra-jslib/snackabra.js.map
	cp ../snackabra-jslib/src/snackabra.d.ts snackabra-jslib/snackabra.d.ts
	