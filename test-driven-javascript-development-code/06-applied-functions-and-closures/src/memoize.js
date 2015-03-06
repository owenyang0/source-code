/*jslint indent: 2, onevar: false*/
if (!Function.prototype.memoize) {
  Function.prototype.memoize = function () {
    var cache = {};
    var func = this;
    var join = Array.prototype.join;

    return function () {
      var key = join.call(arguments);

      if (!(key in cache)) {
        cache[key] = func.apply(this, arguments);
      }

      return cache[key];
    };
  };
}
