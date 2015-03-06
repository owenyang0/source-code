/*jslint indent: 2, onevar: false*/
/*globals TestCase, assertEquals, tddjs*/
TestCase("PropertyEnumerationTest", {
  "test should enumerate shadowed object properties":
  function () {
    var object = {
      // Properties with DontEnum on Object.prototype
      toString: "toString",
      toLocaleString: "toLocaleString",
      valueOf: "valueOf",
      hasOwnProperty: "hasOwnProperty",
      isPrototypeOf: "isPrototypeOf",
      propertyIsEnumerable: "propertyIsEnumerable",
      constructor: "constructor"
    };

    var result = [];

    tddjs.each(object, function (property) {
      result.push(property);
    });

    assertEquals(7, result.length);
  },

  "test should enumerate shadowed function properties":
  function () {
    var object = function () {};

    // Additional properties with DontEnum on
    // Function.prototype
    object.prototype = "prototype";
    object.call = "call";
    object.apply = "apply";

    var result = [];

    tddjs.each(object, function (property) {
      result.push(property);
    });

    assertEquals(3, result.length);
  }
});
