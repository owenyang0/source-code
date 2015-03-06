/*jslint indent: 2, eqeqeq: false*/
/*globals TestCase, assertEquals, tddjs, enumerable*/
TestCase("EnumerableTest", {
  "test should add enumerable methods to arrays":
  function () {
    tddjs.extend(Array.prototype, enumerable);

    var even = [1, 2, 3, 4].reject(function (i) {
      return i % 2 == 1;
    });

    assertEquals([2, 4], even);
  }
});
