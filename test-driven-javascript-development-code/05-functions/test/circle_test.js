/*jslint indent: 2, onevar: false, undef: false*/
/*globals TestCase, assertEquals, adder, assertNaN*/
var circle = {
  radius: 6,

  diameter: function () {
    return this.radius * 2;
  }
};

TestCase("CircleTest", {
  "test should implicitly bind to object": function () {
    assertEquals(12, circle.diameter());
  },

  "test implicit binding to the global object": function () {
    var myDiameter = circle.diameter;
    assertNaN(myDiameter());

    // WARNING: Never ever rely on implicit globals
    // This is just an example
    radius = 2;
    assertEquals(4, myDiameter());
  },

  "test should call radius on anonymous object": function () {
    assertEquals(10, circle.diameter.call({ radius: 5 }));
  }
});
