/*jslint indent: 2, onevar: false*/
/*globals TestCase, assertEquals, assertTrue, Circle, Sphere*/
TestCase("SphereTest", {
  "test spheres are circles in 3D": function () {
    var radius = 6;
    var sphere = new Sphere(radius);

    assertTrue(sphere instanceof Sphere);
    assertTrue(sphere instanceof Circle);
    assertTrue(sphere instanceof Object);
    assertEquals(12, sphere.diameter());
  },

  "test should calculate sphere area": function () {
    var sphere = new Sphere(3);

    assertEquals(113, Math.round(sphere.area()));
  }
});
