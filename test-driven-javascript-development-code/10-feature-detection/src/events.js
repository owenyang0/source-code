/*jslint indent: 2, browser: true, eqeqeq: false*/
/*globals window, tddjs*/
function addEventHandler(element, type, listener) {
  if (tddjs.isHostMethod(element, "addEventListener")) {
    element.addEventListener(type, listener, false);
  } else if (tddjs.isHostMethod(element, "attachEvent") &&
             listener.call) {
    element.attachEvent("on" + type, function () {
      return listener.call(element, window.event);
    });
  } else {
    // Possibly fall back to DOM0 event properties or abort
  }
}
