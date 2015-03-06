/*jslint indent: 2, browser: true, eqeqeq: false, onevar: false*/
/*globals tddjs*/
(function () {
  if (typeof tddjs == "undefined") {
    return;
  }

  var ajax = tddjs.namespace("ajax");

  if (!ajax.request || !Object.create) {
    return;
  }

  function start() {
    if (!this.url) {
      throw new TypeError("Must specify URL to poll");
    }

    var poller = this;
    var interval = 1000;
    var requestStart = new Date().getTime();

    if (typeof this.interval == "number") {
      interval = this.interval;
    }

    var sep = this.url.indexOf("?") < 0 ? "?" : "&";

    ajax.request(this.url + sep + requestStart, {
      complete: function () {
        var elapsed = new Date().getTime() - requestStart;
        var remaining = interval - elapsed;

        setTimeout(function () {
          poller.start();
        }, Math.max(0, remaining));

        if (typeof poller.complete == "function") {
          poller.complete();
        }
      },

      headers: poller.headers,
      success: poller.success,
      failure: poller.failure
    });
  }

  ajax.poller = {
    start: start
  };

  function poll(url, options) {
    var poller = Object.create(ajax.poller);
    poller.url = url;
    options = options || {};
    poller.headers = options.headers;
    poller.success = options.success;
    poller.failure = options.failure;
    poller.complete = options.complete;
    poller.interval = options.interval;
    poller.start();

    return poller;
  }

  ajax.poll = poll;
}());
