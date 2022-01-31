# Snackabra Documentation Sphinx File
# Copyright (c) Magnusson Institute

project = 'snackabra'
copyright = '2019-2022, Magnusson Institute'
author = 'Magnusson Institute'

# The full version, including alpha/beta/rc tags
release = '0.3'

extensions = ['sphinxcontrib.blockdiag', 'sphinxcontrib.seqdiag']

templates_path = ['_templates']

exclude_patterns = []

html_theme = 'furo'

html_static_path = ['docs/_static']
