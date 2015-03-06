/*jslint indent: 2, onevar: false*/
/*globals TestCase, assertEquals, assertFalse*/
TestCase("ObjectPropertyTest", {
  "test setting property shadows property on prototype":
  function () {
    var object1 = {};
    var object2 = {};

    // Both objects inherit Object.prototype.toString
    assertEquals(object1.toString, object2.toString);

    var chris = {
      name: "Chris",

      toString: function () {
        return this.name;
      }
    };

    // chris object defines a toString property which is
    // not the same object as object1 inherits from
    // Object.prototype
    assertFalse(object1.toString === chris.toString);

    // Deleting the custom property unshadows the
    // inherited Object.prototype.toString
    delete chris.toString;
    assertEquals(object1.toString, chris.toString);
  }
});
