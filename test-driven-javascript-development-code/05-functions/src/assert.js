/*jslint indent: 2, plusplus: false, evil: true*/
function assert(message, expr) {
  if (arguments.length < 2) {
    throw new Error("Provide message and value to test");
  }

  if (!arguments[1]) {
    throw new Error(arguments[0]);
  }

  assert.count++;

  return true;
}

assert.count = 0;
