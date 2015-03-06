function mixin (target) {
    Array.prototype.slice.call(arguments, 1).forEach(function (object) {
        Object.keys(object).forEach(function (property) {
            target[property] = object[property];
        });
    });

    return target;
}

var sys = require("sys");
var assert = mixin({}, require("assert"), require("assert-extras"));
var testCase = require("test_case");

assert.isFunction(testCase);

assert.throws(function () {
    testCase();
});

assert.throws(function () {
    testCase({});
});

assert.throws(function () {
    testCase({}, "test case name");
});

assert.throws(function () {
    testCase({}, "test case name", "");
});

assert.doesNotThrow(function () {
    testCase({}, "test case name", {});
});

var suite = {};

var func = function () {
    func.called = true;
    func.thisObj = this;
    func.args = arguments;
};

testCase(suite, "some suite", {
    "some test": func
});

assert.deepEqual(Object.keys(suite), ["some suite some test"]); 

var test = suite["some suite some test"];

testCase(suite, "other suite", {
    setUp: function () {},
    tearDown: function () {}
});

assert.strictEqual(suite["some suite some test"], test);
assert.isUndefined(suite.setUp);
assert.isUndefined(suite.tearDown);

var arg = { id: 13 };
test(arg);

assert.ok(func.called);
assert.notStrictEqual(func.thisObj, suite);
assert.deepEqual(Array.prototype.slice.call(func.args), [arg]);

var setUp = function () {
    setUp.called = true;
    setUp.thisObj = this;
};

var tearDown = function () {
    tearDown.called = true;
    tearDown.thisObj = this;
};

func.called = false;

testCase(suite, "third", {
    setUp: setUp,
    tearDown: tearDown,
    test: func
});

var done = function () { done.called = true; };
var ctx = { done: done };
suite["third test"](ctx);

assert.ok(setUp.called);
assert.ok(!tearDown.called);
assert.ok(func.called);
assert.isUndefined(done.called);

ctx.done();

assert.ok(tearDown.called);
assert.ok(done.called);

func = function () {
    throw new Error();
};

tearDown.called = false;

testCase(suite, "fourth", {
    tearDown: tearDown,
    test: func
});

assert.doesNotThrow(function () {
    suite["fourth test"]({});
});

assert.ok(tearDown.called);

assert.isFunction(require("nodeunit").testCase);

sys.puts("test-testCase OK");
