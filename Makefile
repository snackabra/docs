# Minimal makefile for Sphinx documentation of snackabra-jslib,
# (c) 2016-2023, Magnusson Institute

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

%: Makefile jslib
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)
	echo "Copying file to root directory"
	cp -R $(BUILDDIR)/html/* .

clean:
	rm -rf $(BUILDDIR)/*

# https://gitlab.acceleratxr.com/composerjs/typedoc-plugin-sphinx
jslib:
	npx typedoc --plugin typedoc-plugin-markdown --entryDocument jslib2.md --out typedocOutput ./snackabra-jslib/snackabra.ts
	cp typedocOutput/modules.md source
	cp -R typedocOutput/classes typedocOutput/interfaces source
