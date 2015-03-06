/*jslint indent: 2, onevar: false, plusplus: false, eqeqeq: false*/
if (typeof Array.prototype.sum == "undefined") {
  Array.prototype.sum = function () {
    var sum = 0;

    for (var i = 0, l = this.length; i < l; i++) {
      sum += this[i];
    }

    return sum;
  };
}

