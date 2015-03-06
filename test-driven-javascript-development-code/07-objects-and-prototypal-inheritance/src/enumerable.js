/*jslint indent: 2*/
var enumerable = {
  /* ... */

  reject: function (callback) {
    var result = [];

    this.forEach(function (item) {
      if (!callback(item)) {
        result.push(item);
      }
    });

    return result;
  }
};
