/*jslint indent: 2, nomen: false, onevar: false, eqeqeq: false*/
/*globals tddjs*/
if (!Function.prototype.inherit) {
  (function () {
    function F() {}

    Function.prototype.inherit = function (superFn) {
      F.prototype = superFn.prototype;
      this.prototype = new F();
      this.prototype.constructor = this;
      this.prototype._super = superFn.prototype;
    };
  }());
}

if (!Function.prototype.inherit2) {
  (function () {
    function F() {}

    Function.prototype.inherit2 = function (superFn, methods) {
      F.prototype = superFn.prototype;
      this.prototype = new F();
      this.prototype.constructor = this;

      var subProto = this.prototype;

      tddjs.each(methods, function (name, method) {
        // Wrap the original method
        subProto[name] = function () {
          var returnValue;
          var oldSuper = this._super;
          this._super = superFn.prototype[name];

          try {
            returnValue = method.apply(this, arguments);
          } catch (e) {
            throw e;
          } finally {
            this._super = oldSuper;
          }

          return returnValue;
        };
      });
    };
  }());
}

function _super(object, methodName) {
  var method = object._super && object._super[methodName];

  if (typeof method != "function") {
    return;
  }

  // Remove the first two arguments (object and method)
  var args = Array.prototype.slice.call(arguments, 2);

  // Pass the rest of the arguments along to the super
  return method.apply(object, args);
}
