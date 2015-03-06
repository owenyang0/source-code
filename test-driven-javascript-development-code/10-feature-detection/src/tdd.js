/*jslint indent: 2, onevar: false, plusplus: false, eqeqeq: false, nomen: false*/
/*globals document, window*/
var tddjs = (function () {
  function namespace(string) {
    var object = this;
    var levels = string.split(".");

    for (var i = 0, l = levels.length; i < l; i++) {
      if (typeof object[levels[i]] == "undefined") {
        object[levels[i]] = {};
      }

      object = object[levels[i]];
    }

    return object;
  }

  return {
    namespace: namespace
  };
}());

tddjs.uid = (function () {
  var id = 0;

  function uid(object) {
    if (typeof object.__uid != "number") {
      object.__uid = id++;
    }

    return object.__uid;
  }

  return uid;
}());

tddjs.iterator = (function () {
  function iterator(collection) {
    var index = 0;
    var length = collection.length;

    function next() {
      var item = collection[index++];
      next.hasNext = index < length;

      return item;
    }

    next.hasNext = index < length;

    return next;
  }

  return iterator;
}());

tddjs.isOwnProperty = (function () {
  var hasOwn = Object.prototype.hasOwnProperty;

  if (typeof hasOwn == "function") {
    return function (object, property) {
      return hasOwn.call(object, property);
    };
  } else {
    // Provide an emulation if you can live with possibly
    // inaccurate results
  }
}());

tddjs.each = (function () {
  // Returns an array of properties that are not exposed
  // in a for-in loop
  function unEnumerated(object, properties) {
    var length = properties.length;

    for (var i = 0; i < length; i++) {
      object[properties[i]] = true;
    }

    var enumerated = length;

    for (var prop in object) {
      if (tddjs.isOwnProperty(object, prop)) {
        enumerated -= 1;
        object[prop] = false;
      }
    }

    if (!enumerated) {
      return;
    }

    var needsFix = [];

    for (i = 0; i < length; i++) {
      if (object[properties[i]]) {
        needsFix.push(properties[i]);
      }
    }

    return needsFix;
  }

  var oFixes = unEnumerated({},
    ["toString", "toLocaleString", "valueOf",
     "hasOwnProperty", "isPrototypeOf",
     "constructor", "propertyIsEnumerable"]);

  var fFixes = unEnumerated(
    function () {}, ["call", "apply", "prototype"]);

  if (fFixes && oFixes) {
    fFixes = oFixes.concat(fFixes);
  }

  var needsFix = { "object": oFixes, "function": fFixes };

  return function (object, callback) {
    if (typeof callback != "function") {
      throw new TypeError("callback is not a function");
    }

    // Normal loop, should expose all enumerable properties
    // in conforming browsers
    for (var prop in object) {
      if (tddjs.isOwnProperty(object, prop)) {
        callback(prop, object[prop]);
      }
    }

    // Loop additional properties in non-conforming browsers
    var fixes = needsFix[typeof object];

    if (fixes) {
      var property;

      for (var i = 0, l = fixes.length; i < l; i++) {
        property = fixes[i];

        if (tddjs.isOwnProperty(object, property)) {
          callback(property, object[property]);
        }
      }
    }
  };
}());

tddjs.extend = (function () {
  function extend(target, source) {
    target = target || {};

    if (!source) {
      return target;
    }

    tddjs.each(source, function (prop, val) {
      target[prop] = val;
    });

    return target;
  }

  return extend;
}());

tddjs.isHostMethod = (function () {
  function isHostMethod(object, property) {
    var type = typeof object[property];

    return type == "function" ||
           (type == "object" && !!object[property]) ||
           type == "unknown";
  }

  return isHostMethod;
}());

tddjs.isEventSupported = (function () {
  var TAGNAMES = {
    select: "input",
    change: "input",
    submit: "form",
    reset: "form",
    error: "img",
    load: "img",
    abort: "img"
  };

  function isEventSupported(eventName) {
    var tagName = TAGNAMES[eventName];
    var el = document.createElement(tagName || "div");
    eventName = "on" + eventName;
    var isSupported = (eventName in el);

    if (!isSupported) {
      el.setAttribute(eventName, "return;");
      isSupported = typeof el[eventName] == "function";
    }

    el = null;

    return isSupported;
  }

  return isEventSupported;
}());

tddjs.isCSSPropertySupported = (function () {
  var element = document.createElement("div");

  function isCSSPropertySupported(property) {
    return typeof element.style[property] == "string";
  }

  return isCSSPropertySupported;
}());

(function () {
  var dom = tddjs.namespace("dom");
  var _addEventHandler;

  if (!Function.prototype.call) {
    return;
  }

  function normalizeEvent(event) {
    event.preventDefault = function () {
      event.returnValue = false;
    };

    event.target = event.srcElement;
    // More normalization

    return event;
  }

  if (tddjs.isHostMethod(document, "addEventListener")) {
    _addEventHandler = function (element, event, listener) {
      element.addEventListener(event, listener, false);
    };
  } else if (tddjs.isHostMethod(document, "attachEvent")) {
    _addEventHandler = function (element, event, listener) {
      element.attachEvent("on" + event, function () {
        var event = normalizeEvent(window.event);
        listener.call(element, event);

        return event.returnValue;
      });
    };
  } else {
    return;
  }

  function mouseenter(el, listener) {
    var current = null;

    _addEventHandler(el, "mouseover", function (event) {
      if (current !== el) {
        current = el;
        listener.call(el, event);
      }
    });

    _addEventHandler(el, "mouseout", function (e) {
      var target = e.relatedTarget || e.toElement;

      try {
        if (target && !target.nodeName) {
          target = target.parentNode;
        }
      } catch (exp) {
        return;
      }

      if (el !== target && !dom.contains(el, target)) {
        current = null;
      }
    });
  }

  var custom = dom.customEvents = {};

  if (!tddjs.isEventSupported("mouseenter") &&
      tddjs.isEventSupported("mouseover") &&
      tddjs.isEventSupported("mouseout")) {
    custom.mouseenter = mouseenter;
  }

  dom.supportsEvent = function (event) {
    return tddjs.isEventSupported(event) || !!custom[event];
  };

  function addEventHandler(element, event, listener) {
    if (dom.customEvents && dom.customEvents[event]) {
      return dom.customEvents[event](element, listener);
    }

    return _addEventHandler(element, event, listener);
  }

  dom.addEventHandler = addEventHandler;
}());
