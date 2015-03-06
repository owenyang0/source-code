/*jslint indent: 2, onevar: false*/
/*globals TestCase, assertEquals, assertTrue, assertFalse,assertException, assertNoException, tddjs*/
TestCase("ObservableAddObserverTest", {
  setUp: function () {
    this.observable = Object.create(tddjs.util.observable);
  },

  "test should store functions": function () {
    var observers = [function () {}, function () {}];

    this.observable.observe("event", observers[0]);
    this.observable.observe("event", observers[1]);

    assertTrue(this.observable.hasObserver("event", observers[0]));
    assertTrue(this.observable.hasObserver("event", observers[1]));
  },

  "test should throw for uncallable observer": function () {
    var observable = this.observable;

    assertException(function () {
      observable.observe("event", {});
    }, "TypeError");
  }
});

TestCase("ObservableHasObserverTest", {
  setUp: function () {
    this.observable = Object.create(tddjs.util.observable);
  },

  "test should return false when no observers": function () {
    assertFalse(this.observable.hasObserver(function () {}));
  }
});

TestCase("ObservableNotifyObserversTest", {
  setUp: function () {
    this.observable = Object.create(tddjs.util.observable);
  },

  "test should call all observers": function () {
    var observer1 = function () {
      observer1.called = true;
    };

    var observer2 = function () {
      observer2.called = true;
    };

    this.observable.observe("event", observer1);
    this.observable.observe("event", observer2);

    this.observable.notify("event");

    assertTrue(observer1.called);
    assertTrue(observer2.called);
  },

  "test should pass through arguments": function () {
    var actual;

    this.observable.observe("event", function () {
      actual = arguments;
    });

    this.observable.notify("event", "String", 1, 32);

    assertEquals(["String", 1, 32], actual);
  },

  "test should notify all even when some fail": function () {
    var observer1 = function () {
      throw new Error("Oops");
    };

    var observer2 = function () {
      observer2.called = true;
    };

    this.observable.observe("event", observer1);
    this.observable.observe("event", observer2);

    this.observable.notify("event");

    assertTrue(observer2.called);
  },

  "test should call observers in the order they were added": function () {
    var calls = [];

    var observer1 = function () {
      calls.push(observer1);
    };

    var observer2 = function () {
      calls.push(observer2);
    };

    this.observable.observe("event", observer1);
    this.observable.observe("event", observer2);

    this.observable.notify("event");

    assertEquals(observer1, calls[0]);
    assertEquals(observer2, calls[1]);
  },

  "test should not fail if no observers": function () {
    var observable = this.observable;

    assertNoException(function () {
      observable.notify("event");
    });
  },

  "test should notify relevant observers only": function () {
    var calls = [];

    this.observable.observe("event", function () {
      calls.push("event");
    });

    this.observable.observe("other", function () {
      calls.push("other");
    });

    this.observable.notify("other");

    assertEquals(["other"], calls);
  }
});
