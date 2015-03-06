/*jslint indent: 2, onevar: false*/
/*globals TestCase, assertEquals*/
TestCase("ArrayTest", {
  "test array splice should modify array": function () {
    var arr = [1, 2, 3, 4, 5];
    var result = arr.splice(2, 3);

    assertEquals([1, 2], arr);
  },

  "test array splice should return removed items":
  function () {
    var arr = [1, 2, 3, 4, 5];
    var result = arr.splice(2, 3);

    assertEquals([3, 4, 5], result);
  }
});
