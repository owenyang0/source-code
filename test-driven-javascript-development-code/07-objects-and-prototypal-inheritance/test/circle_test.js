/*jslint indent: 2, onevar: false*/
/*globals TestCase, assertEquals, assertTrue, Circle, assert, circle*/
TestCase("CircleTest", {
  "test inspect objects": function () {
    var circ = new Circle(6);
    var circ2 = { radius: 6 };

    assertTrue(circ instanceof Object);
    assertTrue(circ instanceof Circle);
    assertTrue(circ2 instanceof Object);

    assertEquals(Circle, circ.constructor);
    assertEquals(Object, circ2.constructor);
  },

  "test should create another object of same kind":
  function () {
    var circle = new Circle(6);
    var circle2 = new circle.constructor(9);

    assertEquals(circle.constructor, circle2.constructor);
    assertTrue(circle2 instanceof Circle);
  },

  "test should inherit properties from Circle.prototype":
  function () {
    var circle = new Circle(6);

    assertEquals(12, circle.diameter());
  },

  "test constructor is Object when prototype is overridden":
  function () {
    function Circle() {}
    Circle.prototype = {};

    assertEquals(Object, new Circle().constructor);
  },

  "test calling prototype without 'new' returns undefined":
  function () {
    var circle = Circle(6);

    assert(circle instanceof Circle);
    assertEquals("undefined", typeof radius);
  },

  "test should create circle object with function":
  function () {
    var circ = circle(6);
    assertEquals(6, circ.radius());

    circ.radius(12);
    assertEquals(12, circ.radius());
    assertEquals(24, circ.diameter());
  }
});
