/*jslint indent: 2*/
/*globals TestCase, assertEquals*/
(function () {
  String.prototype.trim =
    String.prototype.replace.curry(/^\s+|\s+$/g, "");

  TestCase("CurryTest", {
    "test should trim spaces": function () {
      var str = "   some spaced string   ";

      assertEquals("some spaced string", str.trim());
    }
  });
}());
