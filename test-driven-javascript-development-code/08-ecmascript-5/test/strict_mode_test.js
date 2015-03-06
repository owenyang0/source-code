/*jslint indent: 2, onevar: false, nomen: false*/
/*globals TestCase, assertEquals*/
TestCase("StrictModeTest", {
  "test repeated identifiers in parameters": function () {
    // Syntax error in ES5 strict mode
    function es3VsEs5(a, a, a) {
      "use strict";
      return a;
    }

    // true in ES3
    assertEquals(6, es3VsEs5(2, 3, 6));
  }
});

function switchArgs(a, b) {
  "use strict";
  var c = b;
  b = a;
  a = c;

  return [].slice.call(arguments);
}

TestCase("ArgumentsParametersTest", {
  "test should switch arguments": function () {
    // Passes on ES5 strict mode
    assertEquals([3, 2], switchArgs(2, 3));

    // Passes on ES3
    // assertEquals([2, 3], switchArgs(2, 3));
  }
});
