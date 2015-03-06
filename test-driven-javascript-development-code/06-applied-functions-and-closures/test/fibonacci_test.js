/*jslint indent: 2*/
/*globals TestCase, assertEquals, fibonacci*/
TestCase("FibonacciTest", {
  "test calculate high fib value with memoization":
  function () {
    var fibonacciFast = fibonacci.memoize();

    assertEquals(1346269, fibonacciFast(30));
  }
});
