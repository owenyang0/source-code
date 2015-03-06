/*jslint indent: 2*/
/*globals TestCase, assertFunction*/
TestCase("StrftimeTest", {
  "test should be method on date objects": function () {
    assertFunction(new Date().strftime);
  }
});
