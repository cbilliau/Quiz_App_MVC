# Webpack experiment

**Quiz App**

Originally a single js file which was later split into three modules as an assignment.

**Webpack** - mvc.js is defined as the 'entry' location for webpack. mvc.js assisgns a var to each 'require()' function that accepts the question and variables.js files.

Each of the variables.js and questions.js requires the use of a 'modules.export' at the end of each file in order to allow mvc.js to use the data on the at file.

**File Descriptions**

**mvc.js** - contains the MVC pattern used to control quiz flow, generate views, and define how quiz is played.

**questions.js** - contains the QUESTIONS array holding all question objects.

**variables.js** - contains the variables identifying all the view elements in jQuery.

**index.html** - placeholder for classes and IDs.
