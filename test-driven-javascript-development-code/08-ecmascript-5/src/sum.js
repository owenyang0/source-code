/*jslint indent: 2, plusplus: false*/
function sum(numbers) {
  "use strict";
  var total = 0;

  for (i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }

  return total;
}
