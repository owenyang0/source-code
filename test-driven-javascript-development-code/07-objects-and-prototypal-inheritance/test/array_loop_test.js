/*jslint indent: 2, onevar: false, plusplus: false*/
/*globals TestCase, assertEquals*/
TestCase("ArrayLoopTest", {
  "test looping should iterate over all items":
  function () {
    var array = [1, 2, 3, 4, 5, 6];
    var result = [];

    // Standard for-loop
    for (var i = 0, l = array.length; i < l; i++) {
      result.push(array[i]);
    }

    assertEquals("123456", result.join(""));
  },

  "test for-in loop should iterate over all items":
  function () {
    var array = [1, 2, 3, 4, 5, 6];
    var result = [];

    for (var i in array) {
      if (array.hasOwnProperty(i)) {
        result.push(array[i]);
      }
    }

    assertEquals("123456", result.join(""));
  }
});
