/*jslint indent: 2, plusplus: false, onevar: false*/
/*globals tddjs*/
(function () {
  var dom = tddjs.namespace("dom");
  var cache = {};

  function contains(element, child) {
    if (!child || !element) {
      return false;
    }

    var elementId = tddjs.uid(element);

    if (!cache[elementId]) {
      cache[elementId] = {};
    }

    if (cache[elementId][tddjs.uid(child)]) {
      return true;
    }

    var ids = [];

    while (child && child !== element) {
      ids.push(tddjs.uid(child));
      child = child.parentNode;
    }

    var result = !!child;

    for (var i = 0, l = ids.length; i < l; i++) {
      cache[elementId][ids[i]] = result;
    }

    return result;
  }

  dom.contains = contains;
}());
