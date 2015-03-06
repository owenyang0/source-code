/*jslint indent: 2, onevar: false*/
/*globals TestCase, assertEquals, Circle*/
TestCase("ObjectCreateTest", {
  "test sphere should inherit from circle":
  function () {
    var circle = {
      radius: 6,

      area: function () {
        return this.radius * this.radius * Math.PI;
      }
    };

    var sphere = Object.create(circle);

    sphere.area = function () {
      return 4 * circle.area.call(this);
    };

    assertEquals(452, Math.round(sphere.area()));
  },

  "test should create more spheres based on existing":
  function () {
    var circle = new Circle(6);
    var sphere = Object.create(circle);

    sphere.area = function () {
      return 4 * circle.area.call(this);
    };

    var sphere2 = Object.create(sphere);
    sphere2.radius = 10;

    assertEquals(1257, Math.round(sphere2.area()));
  }
});
