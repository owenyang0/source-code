/*jslint indent: 2, onevar: false*/
/*globals assertEquals*/
var testMethods = {
  "test dots and brackets should behave identically":
  function () {
    var value = "value";
    var obj = { prop: value };

    assertEquals(obj.prop, obj["prop"]);
  }
};

// Grab the test
var name = "test dots and brackets should behave identically";
var testMethod = testMethods[name];

// Mix dot and bracket notation to get number of expected
// arguments for the test method
var argc = testMethods[name].length;
