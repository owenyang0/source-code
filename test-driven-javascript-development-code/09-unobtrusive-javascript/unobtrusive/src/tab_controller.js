/*jslint indent: 2, browser: true, eqeqeq: false, onevar: false*/
/*globals tddjs, window*/
(function () {
  var dom = tddjs.dom;

  function create(element) {
    if (!element || typeof element.className != "string") {
      throw new TypeError("element is not an element");
    }

    dom.addClassName(element, "js-tab-controller");
    var tabs = Object.create(this);

    element.onclick = function (event) {
      tabs.handleTabClick(event || window.event || {});
    };

    element = null;

    return tabs;
  }

  function handleTabClick(event) {
    var target = event.target || event.srcElement;

    while (target && target.nodeType != 1) {
      target = target.parentNode;
    }

    this.activateTab(target);
  }

  function activateTab(element) {
    if (!element || !element.tagName ||
        element.tagName.toLowerCase() != this.tabTagName) {
      return;
    }

    var className = "active-tab";
    dom.removeClassName(this.prevTab, className);
    dom.addClassName(element, className);
    var previous = this.prevTab;
    this.prevTab = element;

    this.onTabChange(element, previous);
  }

  tddjs.namespace("ui").tabController = {
    create: create,
    handleTabClick: handleTabClick,
    activateTab: activateTab,
    onTabChange: function (anchor, previous) {},
    tabTagName: "a"
  };
}());
