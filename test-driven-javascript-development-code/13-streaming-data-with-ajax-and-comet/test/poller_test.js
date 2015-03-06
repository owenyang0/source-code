/*jslint indent: 2, onevar: false*/
/*globals TestCase, assert, assertEquals, assertSame, assertObject, assertFunction, assertException, assertFalse, tddjs, stubFn, fakeXMLHttpRequest, Clock, stubDateConstructor*/
(function () {
  var ajax = tddjs.ajax;

  TestCase("PollerTest", {
    setUp: function () {
      this.ajaxCreate = ajax.create;
      this.xhr = Object.create(fakeXMLHttpRequest);
      ajax.create = stubFn(this.xhr);
      this.ajaxRequest = ajax.request;

      this.poller = Object.create(ajax.poller);
      this.poller.url = "/url";
    },

    tearDown: function () {
      ajax.create = this.ajaxCreate;
      ajax.request = this.ajaxRequest;
      Clock.reset();
    },

    "test should be object": function () {
      assertObject(ajax.poller);
    },

    "test should define a start method":
    function () {
      assertFunction(ajax.poller.start);
    },

    "test start should throw exception for missing URL":
    function () {
      var poller = Object.create(ajax.poller);

      assertException(function () {
        poller.start();
      }, "TypeError");
    },

    "test start should make XHR request": function () {
      this.poller.start();

      assert(this.xhr.open.called);
    },

    "test should schedule new request when complete": function () {
      this.poller.start();
      this.xhr.complete();
      this.xhr.send = stubFn();
      Clock.tick(1000);

      assert(this.xhr.send.called);
    },

    "test should not make new request until 1000ms passed": function () {
      this.poller.start();
      this.xhr.complete();
      this.xhr.send = stubFn();
      Clock.tick(990);

      assertFalse(this.xhr.send.called);
    },

    "test should configure request interval": function () {
      this.poller.interval = 350;
      this.poller.start();
      this.xhr.complete();
      this.xhr.send = stubFn();

      Clock.tick(340);
      assertFalse(this.xhr.send.called);

      Clock.tick(10);
      assert(this.xhr.send.called);
    },

    "test should pass headers to request": function () {
      this.poller.headers = {
        "Header-One": "1",
        "Header-Two": "2"
      };

      this.poller.start();

      var actual = this.xhr.headers;
      var expected = this.poller.headers;
      assertEquals(expected["Header-One"],
                   actual["Header-One"]);
      assertEquals(expected["Header-Two"],
                   actual["Header-Two"]);
    },

    "test should pass success callback": function () {
      this.poller.success = stubFn();

      this.poller.start();
      this.xhr.complete();

      assert(this.poller.success.called);
    },

    "test should pass failure callback": function () {
      this.poller.failure = stubFn();

      this.poller.start();
      this.xhr.complete(400);

      assert(this.poller.failure.called);
    },

    "test should pass complete callback": function () {
      this.poller.complete = stubFn();

      this.poller.start();
      this.xhr.complete();

      assert(this.poller.complete.called);
    },

    "test should re-request immediately after long request": function () {
      this.poller.interval = 500;
      this.poller.start();
      var ahead = new Date().getTime() + 600;
      stubDateConstructor(new Date(ahead));
      ajax.request = stubFn();

      this.xhr.complete();
      Clock.tick(0);

      assert(ajax.request.called);
    },

    "test should add cache buster to URL": function () {
      var date = new Date();
      var ts = date.getTime();
      stubDateConstructor(date);
      this.poller.url = "/url";

      this.poller.start();

      assertEquals("/url?" + ts, this.xhr.open.args[1]);
    },

    "test should append cache buster to URL with query parameter": function () {
      var date = new Date();
      var ts = date.getTime();
      stubDateConstructor(date);
      this.poller.url = "/url?id=312";

      this.poller.start();

      assertEquals("/url?id=312&" + ts, this.xhr.open.args[1]);
    }
  });

  TestCase("PollTest", {
    setUp: function () {
      this.request = ajax.request;
      this.create = Object.create;
      ajax.request = stubFn();
    },

    tearDown: function () {
      ajax.request = this.request;
      Object.create = this.create;
    },

    "test should call start on poller object": function () {
      var poller = { start: stubFn() };
      Object.create = stubFn(poller);

      ajax.poll("/url");

      assert(poller.start.called);
    },

    "test should set url property on poller object": function () {
      var poller = ajax.poll("/url");

      assertSame("/url", poller.url);
    },

    "test should set headers property on poller object": function () {
      var options = { headers: {} };

      var poller = ajax.poll("/url", options);

      assertSame(options.headers, poller.headers);
    },

    "test should set success callback on poller object": function () {
      var options = { success: function () {} };

      var poller = ajax.poll("/url", options);

      assertSame(options.success, poller.success);
    },

    "test should set failure callback on poller object": function () {
      var options = { failure: function () {} };
      var poller = ajax.poll("/url", options);

      assertSame(options.failure, poller.failure);
    },

    "test should set complete callback on poller object": function () {
      var options = { complete: function () {} };
      var poller = ajax.poll("/url", options);

      assertSame(options.complete, poller.complete);
    },

    "test should set interval on poller object": function () {
      var options = { interval: 230 };
      var poller = ajax.poll("/url", options);

      assertSame(options.interval, poller.interval);
    }
  });
}());
