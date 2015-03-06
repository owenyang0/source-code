/*jslint indent: 2, onevar: false*/
/*globals fakeXMLHttpRequest, assertNotUndefined, Clock, assertException, TestCase, assertFalse, assertSame, assert, assertObject, assertFunction, assertEquals, assertNoException, tddjs, stubFn*/
(function () {
  var ajax = tddjs.ajax;

  TestCase("CometClientTest", {
    "test should be object": function () {
      assertObject(ajax.cometClient);
    },

    "test should have dispatch method": function () {
      var client = Object.create(ajax.cometClient);

      assertFunction(client.dispatch);
    }
  });

  TestCase("CometClientDispatchTest", {
    setUp: function () {
      this.client = Object.create(ajax.cometClient);
      this.client.observers = { notify: stubFn() };
      this.ajaxCreate = ajax.create;
      this.xhr = Object.create(fakeXMLHttpRequest);
      ajax.create = stubFn(this.xhr);
    },

    tearDown: function () {
      ajax.create = this.ajaxCreate;
    },

    "test dispatch should notify observers": function () {
      this.client.dispatch({ someEvent: [{ id: 1234 }] });

      var args = this.client.observers.notify.args;
      assert(this.client.observers.notify.called);
      assertEquals("someEvent", args[0]);
      assertEquals({ id: 1234 }, args[1]);
    },

    "test should not throw if no observers": function () {
      this.client.observers = null;

      assertNoException(function () {
        this.client.dispatch({ someEvent: [{}] });
      }.bind(this));
    },

    "test should not throw if notify undefined": function () {
      this.client.observers = {};

      assertNoException(function () {
        this.client.dispatch({ someEvent: [{}] });
      }.bind(this));
    },

    "test should not throw if data is not provided": function () {
      assertNoException(function () {
        this.client.dispatch();
      }.bind(this));
    },

    "test should not throw if event is null": function () {
      assertNoException(function () {
        this.client.dispatch({ myEvent: null });
      }.bind(this));
    },

    "test should not dispatch badly formed data": function () {
      this.client.url = "/my/url";
      this.client.dispatch = stubFn();

      this.client.connect();
      this.xhr.complete(200, "OK");

      assertFalse(this.client.dispatch.called);
    }
  });

  TestCase("CometClientObserveTest", {
    setUp: function () {
      this.client = Object.create(ajax.cometClient);
    },

    "test should remember observers": function () {
      var observers = [stubFn(), stubFn()];
      this.client.observe("myEvent", observers[0]);
      this.client.observe("myEvent", observers[1]);
      var data = { myEvent: [{}] };

      this.client.dispatch(data);

      assert(observers[0].called);
      assertSame(data.myEvent[0], observers[0].args[0]);
      assert(observers[1].called);
      assertSame(data.myEvent[0], observers[1].args[0]);
    }
  });

  TestCase("CometClientConnectTest", {
    setUp: function () {
      this.client = Object.create(ajax.cometClient);
      this.client.url = "/my/url";
      this.ajaxPoll = ajax.poll;
      this.ajaxCreate = ajax.create;
      this.xhr = Object.create(fakeXMLHttpRequest);
      ajax.create = stubFn(this.xhr);
    },

    tearDown: function () {
      ajax.poll = this.ajaxPoll;
      ajax.create = this.ajaxCreate;
      Clock.reset();
    },

    "test connect should start polling": function () {
      ajax.poll = stubFn({});

      this.client.connect();

      assert(ajax.poll.called);
      assertEquals("/my/url", ajax.poll.args[0]);
    },

    "test should not connect if connected": function () {
      ajax.poll = stubFn({});
      this.client.connect();
      ajax.poll = stubFn({});

      this.client.connect();

      assertFalse(ajax.poll.called);
    },

    "test connect should throw error if no url exists": function () {
      this.client.url = null;
      ajax.poll = stubFn({});

      assertException(function () {
        this.client.connect();
      }.bind(this), "TypeError");
    },

    "test should dispatch data from request": function () {
      var data = { topic: [{ id: "1234" }],
                   otherTopic: [{ name: "Me" }] };
      this.client.dispatch = stubFn();

      this.client.connect();
      this.xhr.complete(200, JSON.stringify(data));

      assert(this.client.dispatch.called);
      assertEquals(data, this.client.dispatch.args[0]);
    },

    "test should provide custom header": function () {
      this.client.connect();

      assertNotUndefined(this.xhr.headers["X-Access-Token"]);
    },

    "test should pass token on following request": function () {
      this.client.connect();
      var data = { token: 1267482145219 };

      this.xhr.complete(200, JSON.stringify(data));
      Clock.tick(1000);

      var headers = this.xhr.headers;
      assertEquals(data.token, headers["X-Access-Token"]);
    }
  });

  TestCase("CometClientNotifyTest", {
    setUp: function () {
      this.ajaxPost = ajax.post;
      ajax.post = stubFn();
      this.client = Object.create(ajax.cometClient);
      this.client.url = "/url";
    },

    tearDown: function () {
      ajax.post = this.ajaxPost;
    },

    "test should call ajax.post": function () {
      this.client.notify("topic", {});

      assert(ajax.post.called);
    },

    "test should POST to the correct URL": function () {
      this.client.notify("topic", {});

      assertEquals(this.client.url, ajax.post.args[0]);
    },

    "test should throw exception for missing url": function () {
      this.client.url = null;

      assertException(function () {
        this.client.notify("topic", {});
      }.bind(this), "TypeError");
    },

    "test should throw exception for missing message": function () {
      assertException(function () {
        this.client.notify("topic");
      }.bind(this), "TypeError");
    },

    "test should POST data in correct format": function () {
      var expected = JSON.stringify({
        topic: "message",
        data: {}
      });

      this.client.notify("message", {});

      assertEquals(JSON.parse(expected), JSON.parse(ajax.post.args[1].data));
    }
  });
}());
