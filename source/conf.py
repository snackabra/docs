# Snackabra Documentation Sphinx File
# Copyright (c) Magnusson Institute
#
# (full sphinx conf docs:
#  https://www.sphinx-doc.org/en/master/usage/configuration.html)

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#

# import os
# import sys
# sys.path.insert(0, os.path.abspath('../snackabra-pylib/src/snackabra'))


# -- Project information -----------------------------------------------------

project = 'snackabra'
copyright = '2019-2022, Magnusson Institute'
author = 'Magnusson Institute'

# The full version, including alpha/beta/rc tags
release = '0.5.0'


# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
    'sphinxcontrib.blockdiag',
    'sphinxcontrib.seqdiag',
    'sphinx.ext.graphviz',
    'sphinx.ext.autodoc',
    'sphinx.ext.autosummary',
    'sphinx.ext.napoleon', # google-style python autodoc
    'sphinx_js'
]

# Fontpath for blockdiag (truetype font)
# ... TODO .. needed?
# ... yes or control is ugly ...
# blockdiag_fontpath = '/usr/share/fonts/truetype/ipafont/ipagp.ttf'

# seqdiag_fontpath = '/System/Library/Fonts/HelveticaNeue.ttc'
seqdiag_fontpath = '/System/Library/Fonts/Noteworthy.ttc'

# doesn't have an effect?
# blockdiag_transparency = False
blockdiag_transparency = True

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = []

# sphinx-js path to snackabra-javascript library
js_source_path = '../../snackabra-jslib/src'

# -- Options for HTML output -------------------------------------------------

# Our pick for Snackabra
html_theme = 'furo'

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']

# allows embedded images to be opened to full size
html_scaled_image_link = True

# per: https://docs.readthedocs.io/en/stable/guides/adding-custom-css.html
html_css_files = [
    'css/custom.css',
    ]

