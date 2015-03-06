/*jslint indent: 2*/
/*globals TestCase, assertEquals, sum*/
TestCase("SumTest", {
  "test should sum numbers": function () {
    assertEquals(15, sum(1, 2, 3, 4, 5));
    assertEquals(15, sum.apply(null, [1, 2, 3, 4, 5]));
  }
});
