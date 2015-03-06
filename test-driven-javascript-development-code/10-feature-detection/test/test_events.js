/*jslint indent: 2, browser: true, eqeqeq: false, plusplus: false, onevar: false*/
/*globals alert, addEventHandler, tddjs*/
(function () {
  if (!document.getElementById || !tddjs.dom ||
      !tddjs.dom.addEventHandler) {
    alert("Browser not supported");
    return;
  }

  function randomColorComponent() {
    var num = Math.floor(Math.random() * 256).toString(16);
    return num.length == 1 ? "0" + num : num;
  }

  function randomColor(e) {
    if (this.style) {
      this.style.color = "#" + randomColorComponent() +
        randomColorComponent() +
        randomColorComponent();
    }

    e.preventDefault();
  }

  var events = ["click", "mouseover", "focus", "blur"];
  var element;

  for (var i = 0, l = events.length; i < l; i++) {
    element = document.getElementById(events[i]);

    if (element && tddjs.isEventSupported(events[i])) {
      tddjs.dom.addEventHandler(element, events[i], randomColor);
    }
  }
}());
