/*jslint indent: 2*/
var fibonacci = (function () {
  var cache = {};

  function fibonacci(x) {
    if (x < 2) {
      return 1;
    }

    if (!cache[x]) {
      cache[x] = fibonacci(x - 1) + fibonacci(x - 2);
    }

    return cache[x];
  }

  return fibonacci;
}());
