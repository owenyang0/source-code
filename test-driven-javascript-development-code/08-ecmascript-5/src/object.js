/*jslint indent: 2, onevar: false, plusplus: false, eqeqeq: false*/
if (!Object.seal && Object.getOwnPropertyNames &&
    Object.getOwnPropertyDescriptor &&
    Object.defineProperty && Object.preventExtensions) {
  Object.seal = function (object) {
    var properties = Object.getOwnPropertyNames(object);
    var desc, prop;

    for (var i = 0, l = properties.length; i < l; i++) {
      prop = properties[i];
      desc = Object.getOwnPropertyDescriptor(object, prop);

      if (desc.configurable) {
        desc.configurable = false;
        Object.defineProperty(object, prop, desc);
      }
    }

    Object.preventExtensions(object);

    return object;
  };
}

if (!Object.create && Object.defineProperties) {
  Object.create = function (object, properties) {
    function F() {}
    F.prototype = object;
    var obj = new F();

    if (typeof properties != "undefined") {
      Object.defineProperties(obj, properties);
    }

    return obj;
  };
}
