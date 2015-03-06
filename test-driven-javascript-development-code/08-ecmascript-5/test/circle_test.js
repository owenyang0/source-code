/*jslint indent: 2, onevar: false, nomen: false*/
/*globals TestCase, assertEquals, Circle, assert, assertException, assertFalse*/
TestCase("CircleTest", {
  "test Object.create backed constructor": function () {
    var circle = new Circle(3);

    assert(circle instanceof Circle);
    assertEquals(6, circle.diameter);

    circle.radius = 6;
    assertEquals(12, circle.diameter);

    delete circle.radius;
    assertEquals(6, circle.radius);
  },

  "test omitting new when creating circle": function () {
    var circle = Circle(3);

    assert(circle instanceof Circle);
    assertEquals(6, circle.diameter);
  },

  "test using a custom create method": function () {
    var circle = Object.create({}, {
      diameter: {
        get: function () {
          return this.radius * 2;
        }
      },

      circumference: { /* ... */ },
      area: { /* ... */ },

      create: {
        value: function (radius) {
          var circ = Object.create(this, {
            radius: { value: radius }
          });

          return circ;
        }
      }
    });

    var myCircle = circle.create(3);

    assertEquals(6, myCircle.diameter);
    assert(circle.isPrototypeOf(myCircle));

    // circle is not a function
    assertException(function () {
      assertFalse(myCircle instanceof circle);
    });
  }
});
