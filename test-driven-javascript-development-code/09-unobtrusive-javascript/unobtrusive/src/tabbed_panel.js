/*jslint indent: 2, onevar: false, eqeqeq: false, browser: true, regexp: false*/
/*globals tddjs*/
(function () {
  if (typeof document == "undefined" ||
     !document.getElementById) {
    return;
  }

  var dom = tddjs.dom;
  var ol = document.getElementById("news-tabs");

  function getPanel(element) {
    if (!element || typeof element.href != "string") {
      return null;
    }

    var target = element.href.replace(/.*#/, "");
    var panel = document.getElementsByName(target)[0];

    while (panel && panel.tagName.toLowerCase() != "div") {
      panel = panel.parentNode;
    }

    return panel;
  }

  try {
    var controller = tddjs.ui.tabController.create(ol);
    dom.addClassName(ol.parentNode, "js-tabs");

    controller.onTabChange = function (curr, prev) {
      dom.removeClassName(getPanel(prev), "active-panel");
      dom.addClassName(getPanel(curr), "active-panel");
    };

    controller.activateTab(ol.getElementsByTagName("a")[0]);
  } catch (e) {}
}());
