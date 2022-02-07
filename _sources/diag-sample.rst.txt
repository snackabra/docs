=======================
Sphinx Diagram Examples
=======================

This is for internal use :-) as we figure out how to use
some of the diagram / figure tools.

Below  example of *inline* sequence diagram support in Sphinx!


Block/Seq/NW Diagrams
---------------------


Sequence Diagrams
~~~~~~~~~~~~~~~~~

Basic one:

.. seqdiag::

    seqdiag {
      // Use note (put note on rightside)
      browser -> webserver [note = "request\nGET /"];
      browser <- webserver;

      // Use leftnote and rightnote
      browser -> webserver [leftnote = "send request"];
      browser <- webserver [rightnote = "send response"];
    }

Testing. Again. Again. Again.

Block Diagrams
~~~~~~~~~~~~~~

.. blockdiag::

    blockdiag admin {
      index [label = "List of FOOs"];
      add [label = "Add FOO"];
      add_confirm [label = "Add FOO (confirm)"];
      edit [label = "Edit FOO"];
      edit_confirm [label = "Edit FOO (confirm)"];
      show [label = "Show FOO"];
      delete_confirm [label = "Delete FOO (confirm)"];

      index -> add  -> add_confirm  -> index;
      index -> edit -> edit_confirm -> index;
      index -> show -> index;
      index -> delete_confirm -> index;
    }

And some more:

.. blockdiag::

    blockdiag {
      // standard node shapes
      box [shape = box];
      square [shape = square];
      roundedbox [shape = roundedbox];
      dots [shape = dots];

      circle [shape = circle];
      ellipse [shape = ellipse];
      diamond [shape = diamond];
      minidiamond [shape = minidiamond];

      note [shape = note];
      mail [shape = mail];
      cloud [shape = cloud];
      actor [shape = actor];

      beginpoint [shape = beginpoint];
      endpoint [shape = endpoint];

      box -> square -> roundedbox -> dots;
      circle -> ellipse -> diamond -> minidiamond;
      note -> mail -> cloud -> actor;
      beginpoint -> endpoint;

      // node shapes for flowcharts
      condition [shape = flowchart.condition];
      database [shape = flowchart.database];
      terminator [shape = flowchart.terminator];
      input [shape = flowchart.input];

      loopin [shape = flowchart.loopin];
      loopout [shape = flowchart.loopout];

      condition -> database -> terminator -> input;
      loopin -> loopout;
    }

And more:

.. blockdiag::

    blockdiag {
       // Set boder-style, backgroun-color and text-color to nodes.
       A [style = dotted];
       B [style = dashed];
       C [color = pink, style = "3,3,3,3,15,3"]; //dashed_array format style
       D [color = "#888888", textcolor="#FFFFFF"];

       // Set border-style and color to edges.
       A -> B [style = dotted];
       B -> C [style = dashed];
       C -> D [color = "red", style = "3,3,3,3,15,3"]; //dashed_array format style

       // Set numbered-badge to nodes.
       E [numbered = 99];

       // Set background image to nodes (and erase label).
       F [label = "", background = "_static/python-logo.gif"];
       G [label = "", background = "http://blockdiag.com/en/_static/python-logo.gif"];
       H [icon = "_static/help-browser.png"];
       I [icon = "http://blockdiag.com/en/_static/internet-mail.png"];

       // Set arrow direction to edges.
       E -> F [dir = none];
       F -> G [dir = forward];
       G -> H [dir = back];
       H -> I [dir = both];

       // Set width and height to nodes.
       K [width = 192]; // default value is 128
       L [height = 64]; // default value is 40

       // Use thick line
       J -> K [thick]
       K -> L;
    }
   
More examples of block diagrams here: http://blockdiag.com/en/blockdiag/examples.html

Lots of sequence diagram examples: http://blockdiag.com/en/seqdiag/examples.html#seqdiag-sample-diagrams

We can also inline simple network diagrams: http://blockdiag.com/en/nwdiag/nwdiag-examples.html

As well as packet diagrams: http://blockdiag.com/en/nwdiag/packetdiag-examples.html#structure-of-tcp-header

And activity diagrams: http://blockdiag.com/en/actdiag/examples.html


Graphviz
--------

Here's an example using graphviz (more here: https://graphviz.org/gallery/ )

Digraph
~~~~~~~

.. graphviz::

   digraph PhiloDilemma {
   layout=neato
   node [shape=box];  bec3; rel3; bec2; rel2; acq2; acq3; bec1; rel1; acq1;
   node [shape=circle,fixedsize=true,width=0.9];  hu3; th3; ri3; ea3; hu2; th2; ri2; ea2; hu1; th1; ri1; ea1;
   ri3->acq2;
   ri3->acq3;
   hu3->acq3;
   bec3->hu3;
   th3->bec3;
   rel3->th3;
   rel3->ri3;
   ea3->rel3;
   acq3->ea3;
   ri2->acq1;
   ri2->acq2;
   hu2->acq2;
   bec2->hu2;
   th2->bec2;
   rel2->th2;
   rel2->ri2;
   ea2->rel2;
   acq2->ea2;
   ri1->acq3;
   ri1->acq1;
   hu1->acq1;
   bec1->hu1;
   th1->bec1;
   rel1->th1;
   rel1->ri1;
   ea1->rel1;
   acq1->ea1;

   overlap=false
   label="PetriNet Model PhiloDilemma\nExtracted from ConceptBase and layed out by Graphviz "
   fontsize=12;
   }


Process Graph
~~~~~~~~~~~~~

.. graphviz::

   graph G {
	   layout=neato
	   run -- intr;
	   intr -- runbl;
	   runbl -- run;
	   run -- kernel;
	   kernel -- zombie;
	   kernel -- sleep;
	   kernel -- runmem;
	   sleep -- swap;
	   swap -- runswap;
	   runswap -- new;
	   runswap -- runmem;
	   new -- runmem;
	   sleep -- runmem;
   }

