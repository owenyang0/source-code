/*jslint indent: 2, eqeqeq: false, onevar: false, forin: true*/
/*global module, require*/
var sinon = (function () {
  function wrapMethod(object, property, method) {
    if (!object) {
      throw new TypeError("Should wrap property of object");
    }

    if (typeof method != "function") {
      throw new TypeError("Method wrapper should be function");
    }

    var wrappedMethod = object[property];
    var type = typeof wrappedMethod;

    if (!!wrappedMethod && type != "function") {
      throw new TypeError("Attempted to wrap " + type + " as function");
    }

    object[property] = method;

    method.restore = function () {
      object[property] = wrappedMethod;
    };

    return method;
  }

  function extend(target) {
    for (var i = 1, l = arguments.length; i < l; i += 1) {
      for (var prop in arguments[i]) {
        if (arguments[i].hasOwnProperty(prop)) {
          target[prop] = arguments[i][prop];
        }
      }
    }

    return target;
  }

  function create(proto) {
    if (Object.create) {
      return Object.create(proto);
    } else {
      var F = function () {};
      F.prototype = proto;
      return new F();
    }
  }

  function deepEqual(a, b) {
    if (typeof a != "object" || typeof b != "object") {
      return a === b;
    }

    if (a === b) {
      return true;
    }

    if (Object.prototype.toString.call(a) == "[object Array]") {
      if (a.length !== b.length) {
        return false;
      }

      for (var i = 0, l = a.length; i < l; i += 1) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }

      return true;
    }

    var prop, aLength = 0, bLength = 0;

    for (prop in a) {
      aLength += 1;

      if (!deepEqual(a[prop], b[prop])) {
        return false;
      }
    }

    for (prop in b) {
      bLength += 1;
    }

    if (aLength != bLength) {
      return false;
    }

    return true;
  }

  function test(callback) {
    return function () {
      var fakes = [];
      var exception, result;
      var realArgs = Array.prototype.slice.call(arguments);
      var args = [function () {
        fakes.push(sinon.stub.apply(sinon, arguments));
        return fakes[fakes.length - 1];
      }, function () {
        fakes.push(sinon.mock.apply(sinon, arguments));
        return fakes[fakes.length - 1];
      }];

      try {
        result = callback.apply(this, realArgs.concat(args));
      } catch (e) {
        exception = e;
      }

      for (var i = 0, l = fakes.length; i < l; i += 1) {
        if (!exception) {
          if (typeof fakes[i].verify == "function") {
            try {
              fakes[i].verify();
            } catch (ex) {
              exception = ex;
            }
          }
        }

        if (typeof fakes[i].restore == "function") {
          fakes[i].restore();
        }
      }

      if (exception) {
        throw exception;
      }

      return result;
    };
  }

  return {
    wrapMethod: wrapMethod,
    extend: extend,
    create: create,
    deepEqual: deepEqual,
    test: test
  };
}());

if (typeof module == "object" && typeof require == "function") {
  module.exports = sinon;
  module.exports.spy = require("sinon/spy");
  module.exports.stub = require("sinon/stub");
  module.exports.mock = require("sinon/mock");
}

/* @depend ../sinon.js */
/*jslint indent: 2, eqeqeq: false, onevar: false*/
/*global module, require, sinon*/
(function (sinon) {
  var commonJSModule = typeof module == "object" && typeof require == "function";
  var spyCall;

  if (!sinon && commonJSModule) {
    sinon = require("sinon");
  }

  if (!sinon) {
    return;
  }

  function spy(object, property, func) {
    var method = object[property];
    return sinon.wrapMethod(object, property, spy.create(method));
  }

  sinon.extend(spy, (function () {
    var slice = Array.prototype.slice;

    function create(func) {
      if (typeof func != "function") {
        throw new TypeError("spy needs a function to spy on");
      }

      function proxy() {
        return proxy.invoke(func, this, slice.call(arguments));
      }

      sinon.extend(proxy, spy);
      delete proxy.create;
      sinon.extend(proxy, func);

      return proxy;
    }

    function invoke(func, thisObj, args) {
      if (!this.calls) {
        this.calls = [];
      }

      var call = spyCall.create(thisObj, args);

      try {
        call.returnValue = func.apply(thisObj, args);
      } catch (e) {
        call.exception = e;
        throw e;
      } finally {
        this.calls.push(call);
      }

      return call.returnValue;
    }

    function getCall(i) {
      return this.calls && this.calls[i];
    }

    function called() {
      return this.callCount() > 0;
    }

    function callCount() {
      return this.calls && this.calls.length || 0;
    }

    function matchAnyCall(proxy, method, args) {
      if (!proxy.calls) {
        return false;
      }

      var spyCall;

      for (var i = 0, l = proxy.calls.length; i < l; i += 1) {
        spyCall = proxy.calls[i];

        if (spyCall[method].apply(spyCall, args)) {
          return true;
        }
      }

      return false;
    }

    function calledOn(thisObj) {
      return matchAnyCall(this, "calledOn", arguments);
    }

    function calledWith() {
      return matchAnyCall(this, "calledWith", arguments);
    }

    function calledWithExactly() {
      return matchAnyCall(this, "calledWithExactly", arguments);
    }

    function threw(error) {
      return matchAnyCall(this, "threw", arguments);
    }

    return {
      create: create,
      called: called,
      calledOn: calledOn,
      calledWith: calledWith,
      calledWithExactly: calledWithExactly,
      threw: threw,
      /* TODO:
         returned: returned,
         alwaysCalledOn: alwaysCalledOn,
         alwaysCalledWith: alwaysCalledWith,
         alwaysCalledWithExactly: alwaysCalledWithExactly,
         alwaysThrew: alwaysThrew,
       */
      callCount: callCount,
      getCall: getCall,
      invoke: invoke
    };
  }()));

  spyCall = (function () {
    function calledOn(thisObj) {
      return this.thisObj === thisObj;
    }

    function calledWith() {
      for (var i = 0, l = arguments.length; i < l; i += 1) {
        if (!sinon.deepEqual(arguments[i], this.args[i])) {
          return false;
        }
      }

      return true;
    }

    function calledWithExactly() {
      return arguments.length == this.args.length &&
               this.calledWith.apply(this, arguments);
    }

    function returned(value) {
      return this.returnValue === value;
    }

    function threw(error) {
      if (typeof error == "undefined" || !this.exception) {
        return !!this.exception;
      }

      if (typeof error == "string") {
        return this.exception.name == error;
      }

      return this.exception === error;
    }

    function create(thisObj, args, returnValue) {
      var proxyCall = sinon.create(spyCall);
      delete proxyCall.create;
      proxyCall.thisObj = thisObj;
      proxyCall.args = args;
      proxyCall.returnValue = returnValue;

      return proxyCall;
    }

    return {
      create: create,
      calledOn: calledOn,
      calledWith: calledWith,
      calledWithExactly: calledWithExactly,
      returned: returned,
      threw: threw
    };
  }());

  if (commonJSModule) {
    module.exports = spy;
  } else {
    sinon.spy = spy;
    sinon.spyCall = spyCall;
  }
}(typeof sinon == "object" && sinon || null));

/**
 * @depend ../sinon.js
 * @depend spy.js
 */
/*jslint indent: 2, eqeqeq: false, onevar: false*/
/*global module, require, sinon*/
(function (sinon) {
  var commonJSModule = typeof module == "object" && typeof require == "function";

  if (!sinon && commonJSModule) {
    sinon = require("sinon");
  }

  if (!sinon) {
    return;
  }

  function stub(object, property, func) {
    if (!!func && typeof func != "function") {
      throw new TypeError("Custom stub should be function");
    }

    var wrapper;

    if (func) {
      wrapper = sinon.spy && sinon.spy.create ? sinon.spy.create(func) : func;
    } else {
      wrapper = stub.create();
    }

    if (!object || !property) {
      return sinon.stub.create();
    }

    return sinon.wrapMethod(object, property, wrapper);
  }

  sinon.extend(stub, (function () {
    function create() {
      function functionStub() {
        if (functionStub.exception) {
          throw functionStub.exception;
        }

        return functionStub.returnValue;
      }

      if (sinon.spy) {
        functionStub = sinon.spy.create(functionStub);
      }

      sinon.extend(functionStub, stub);

      return functionStub;
    }

    function returns(value) {
      this.returnValue = value;

      return this;
    }

    function throwsException(error, message) {
      if (typeof error == "string") {
        this.exception = new Error(message);
        this.exception.name = error;
      } else if (!error) {
        this.exception = new Error();
      } else {
        this.exception = error;
      }

      return this;
    }

    return {
      create: create,
      returns: returns,
      throwsException: throwsException
    };
  }()));

  if (commonJSModule) {
    module.exports = stub;
  } else {
    sinon.stub = stub;
  }
}(typeof sinon == "object" && sinon || null));

/**
 * @depend ../sinon.js
 * @depend stub.js
 */
/*jslint indent: 2, eqeqeq: false, onevar: false, nomen: false*/
/*global module, require, sinon*/
(function (sinon) {
  var commonJSModule = typeof module == "object" && typeof require == "function";

  if (!sinon && commonJSModule) {
    sinon = require("sinon");
  }

  if (!sinon) {
    return;
  }

  function fail(message) {
    var error = new Error(message);
    error.name = this.failException || sinon.assert.failException;
    throw error;
  }

  function verifyIsStub(method) {
    if (typeof method != "function") {
      this.fail(method + " is not a function");
    }

    if (typeof method.called != "function") {
      this.fail(method + " is not stubbed");
    }
  }

  function failAssertion(object, msg) {
    var failMethod = object.fail || sinon.assert.fail;
    failMethod.call(object, msg);
  }

  function assertCalled(method) {
    verifyIsStub.call(this, method);

    if (!method.called()) {
      failAssertion(this, method + " was not called as expected");
    }
  }

  function assertCalledOn(thisObj, method) {
    verifyIsStub.call(this, method);

    if (!method.calledOn(thisObj)) {
      failAssertion(this, method + " was not called with " + thisObj + " as this");
    }
  }

  function assertCalledWith(method) {
    verifyIsStub.call(this, method);
    var args = Array.prototype.slice.call(arguments, 1);

    if (!method.calledWith.apply(method, args)) {
      failAssertion(this, method + " was not called with arguments " + args.join());
    }
  }

  function assertCalledWithExactly(method) {
    verifyIsStub.call(this, method);
    var args = Array.prototype.slice.call(arguments, 1);

    if (!method.calledWithExactly.apply(method, args)) {
      failAssertion(this, method + " was not called with exact arguments " + args.join());
    }
  }

  function assertThrew(method, exception, message) {
    verifyIsStub.call(this, method);

    if (!method.threw(exception, message)) {
      failAssertion(this, method + " did not throw exception");
    }
  }

  function assertCallCount(count, method) {
    verifyIsStub.call(this, method);

    if (method.callCount() != count) {
      failAssertion(this, method + " was not called " + count + " times");
    }
  }

  function expose(target, prefix, includeFail) {
    if (!target) {
      throw new TypeError("target is null or undefined");
    }

    var addPrefix = typeof prefix == "undefined" ? true : !!prefix;

    var name = function (prop) {
      if (!addPrefix) {
        return prop;
      }

      return "assert" + prop.substring(0, 1).toUpperCase() + prop.substring(1);
    };

    for (var assert in this) {
      if (!/^(fail|expose)/.test(assert)) {
        target[name(assert)] = this[assert];
      }
    }

    if (typeof includeFail == "undefined" || !!includeFail) {
      target.fail = this.fail;
      target.failException = this.failException;
    }

    return target;
  }

  sinon.assert = {
    fail: fail,
    failException: "AssertError",
    called: assertCalled,
    calledOn: assertCalledOn,
    calledWith: assertCalledWith,
    calledWithExactly: assertCalledWithExactly,
    threw: assertThrew,
    callCount: assertCallCount,
    expose: expose
  };
}(typeof sinon == "object" && sinon || null));

/**
 * @depend ../sinon.js
 * @depend stub.js
 */
/*jslint indent: 2, eqeqeq: false, onevar: false, nomen: false*/
/*global module, require, sinon*/
(function (sinon) {
  var commonJSModule = typeof module == "object" && typeof require == "function";

  if (!sinon && commonJSModule) {
    sinon = require("sinon");
  }

  if (!sinon) {
    return;
  }

  function mock(object) {
    if (!object) {
      return sinon.expectation.create("Anonymous mock");
    }

    return mock.create(object);
  }

  sinon.mock = mock;

  sinon.extend(mock, function () {
    function create(object) {
      if (!object) {
        throw new TypeError("object is null");
      }

      var mockObject = sinon.extend({}, mock);
      mockObject.object = object;
      delete mockObject.create;

      return mockObject;
    }

    function expects(method) {
      if (!method) {
        throw new TypeError("method is falsy");
      }

      if (!this.expectations) {
        this.expectations = {};
        this.proxies = [];
      }

      if (!this.expectations[method]) {
        this.expectations[method] = [];
        var mock = this;

        sinon.wrapMethod(this.object, method, function () {
          return mock.invokeMethod(method, this, arguments);
        });

        this.proxies.push(method);
      }

      var expectation = sinon.expectation.create(method);
      this.expectations[method].push(expectation);

      return expectation;
    }

    function each(collection, callback) {
      if (!collection) {
        return;
      }

      for (var i = 0, l = collection.length; i < l; i += 1) {
        callback(collection[i]);
      }
    }

    function restore() {
      var object = this.object;

      each(this.proxies, function (proxy) {
        if (typeof object[proxy].restore == "function") {
          object[proxy].restore();
        }
      });
    }

    function verify() {
      var expectations = this.expectations || {};
      var exception;

      try {
        each(this.proxies, function (proxy) {
          each(expectations[proxy], function (expectation) {
            expectation.verify();
          });
        });
      } catch (e) {
        exception = e;
      }

      this.restore();

      if (exception) {
        throw exception;
      }

      return true;
    }

    function invokeMethod(method, thisObj, args) {
      var expectations = this.expectations && this.expectations[method];
      var length = expectations && expectations.length || 0;

      for (var i = 0; i < length; i += 1) {
        if (!expectations[i].met()) {
          return expectations[i].apply(thisObj, args);
        }
      }

      return expectations[length - 1].apply(thisObj, args);
    }

    return {
      create: create,
      expects: expects,
      restore: restore,
      verify: verify,
      invokeMethod: invokeMethod
    };
  }());

  function err(message) {
    var exception = new Error(message);
    exception.name = "ExpectationError";

    throw exception;
  }

  sinon.expectation = (function () {
    function create(methodName) {
      var expectation = sinon.extend(sinon.stub.create(), sinon.expectation);
      delete expectation.create;
      expectation.method = methodName;

      return expectation;
    }

    var _invoke = sinon.spy.invoke;

    function invoke(func, thisObj, args) {
      this.verifyCallAllowed(thisObj, args);

      return _invoke.apply(this, arguments);
    }

    function atLeast(num) {
      if (typeof num != "number") {
        throw new TypeError("'" + num + "' is not number");
      }

      if (!this.limitsSet) {
        this.maxCalls = null;
        this.limitsSet = true;
      }

      this.minCalls = num;

      return this;
    }

    function atMost(num) {
      if (typeof num != "number") {
        throw new TypeError("'" + num + "' is not number");
      }

      if (!this.limitsSet) {
        this.minCalls = null;
        this.limitsSet = true;
      }

      this.maxCalls = num;

      return this;
    }

    function never() {
      return this.exactly(0);
    }

    function once() {
      return this.exactly(1);
    }

    function twice() {
      return this.exactly(2);
    }

    function thrice() {
      return this.exactly(3);
    }

    function exactly(num) {
      if (typeof num != "number") {
        throw new TypeError("'" + num + "' is not a number");
      }

      this.atLeast(num);
      return this.atMost(num);
    }

    function timesInWords(times) {
      if (times == 1) {
        return "once";
      } else if (times == 2) {
        return "twice";
      } else if (times == 3) {
        return "thrice";
      }

      return times + " times";
    }

    function receivedMinCalls(expectation) {
      var hasMinLimit = typeof expectation.minCalls == "number";
      return !hasMinLimit || expectation.callCount() >= expectation.minCalls;
    }

    function receivedMaxCalls(expectation) {
      if (typeof expectation.maxCalls != "number") {
        return false;
      }

      return expectation.callCount() == expectation.maxCalls;
    }

    function verifyCallAllowed(thisObj, args) {
      if (receivedMaxCalls(this)) {
        this.failed = true;
        err(this.method + " already called " + timesInWords(this.maxCalls));
      }

      if ("expectedThis" in this && this.expectedThis !== thisObj) {
        err(this.method + " called with " + thisObj + " as thisObj, expected " +
            this.expectedThis);
      }

      if (!("expectedArguments" in this)) {
        return true;
      }

      if (!args || args.length === 0) {
        err(this.method + " received no arguments, expected " +
            this.expectedArguments.join());
      }

      if (args.length < this.expectedArguments.length) {
        err(this.method + " received too few arguments (" + args.join() +
            "), expected " + this.expectedArguments.join());
      }

      if (this.expectsExactArgCount && args.length != this.expectedArguments.length) {
        err(this.method + " received too many arguments (" + args.join() +
            "), expected " + this.expectedArguments.join());
      }

      for (var i = 0, l = this.expectedArguments.length; i < l; i += 1) {
        if (!sinon.deepEqual(this.expectedArguments[i], args[i])) {
          err(this.method + " received wrong arguments (" + args.join() +
              "), expected " + this.expectedArguments.join());
        }
      }
    }

    function met() {
      return !this.failed && receivedMinCalls(this);
    }

    var slice = Array.prototype.slice;

    function withArgs() {
      this.expectedArguments = slice.call(arguments);
      return this;
    }

    function withExactArgs() {
      withArgs.apply(this, arguments);
      this.expectsExactArgCount = true;
      return this;
    }

    function on(thisObj) {
      this.expectedThis = thisObj;
      return this;
    }

    function verify() {
      if (!this.met()) {
        err(this.method + " expected to be called " + timesInWords(this.minCalls) +
            ", but was called " + timesInWords(this.callCount()));
      }

      return true;
    }

    return {
      minCalls: 1,
      maxCalls: 1,
      create: create,
      invoke: invoke,
      atLeast: atLeast,
      atMost: atMost,
      never: never,
      once: once,
      twice: twice,
      thrice: thrice,
      exactly: exactly,
      met: met,
      verifyCallAllowed: verifyCallAllowed,
      withArgs: withArgs,
      withExactArgs: withExactArgs,
      on: on,
      verify: verify
    };
  }());

  if (commonJSModule) {
    module.exports = mock;
  } else {
    sinon.mock = mock;
  }
}(typeof sinon == "object" && sinon || null));

sinon.assert.expose(this, true, false);
