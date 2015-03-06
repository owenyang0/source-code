/*jslint indent: 2*/
function haphazardMethod(obj) {
  // Function is not evaluated as strict code

  with (obj) {
    // Not allowed in strict
  }
}

function es5FriendlyMethod() {
  "use strict";

  // Local scope is evaluated as strict code
}
