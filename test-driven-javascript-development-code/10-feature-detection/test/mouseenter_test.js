/*jslint indent: 2, onevar: false, eqeqeq: false, browser: true*/
/*globals tddjs, console, alert*/
(function () {
  var dom = typeof tddjs == "object" && tddjs.dom;
  var log;

  if (typeof console == "object" && console.log) {
    log = function (msg) {
      console.log(msg);
    };
  } else {
    log = function (msg) {
      alert(msg);
    };
  }

  if (!dom || !document.getElementById) {
    log("Browser not supported");
    return;
  }

  if (dom.addEventHandler && dom.supportsEvent("mouseenter")) {
    var element = document.getElementById("main");

    tddjs.dom.addEventHandler(element, "mouseenter", function (e) {
      log("Enter!");
    });
  } else {
    log("tddjs.dom.addEventHandler not available");
  }
}());
