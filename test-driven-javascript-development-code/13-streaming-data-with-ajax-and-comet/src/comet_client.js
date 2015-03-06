/*jslint indent: 2, plusplus: false, eqeqeq: false, onevar: false*/
/*globals tddjs*/
(function () {
  if (typeof tddjs == "undefined") {
    return;
  }

  var ajax = tddjs.namespace("ajax");
  var util = tddjs.namespace("util");

  if (!ajax.poll || !util.observable) {
    return;
  }

  function dispatch(data) {
    var observers = this.observers;

    if (!observers || typeof observers.notify != "function") {
      return;
    }

    tddjs.each(data, function (topic, events) {
      var length = events && events.length;

      for (var i = 0; i < length; i++) {
        observers.notify(topic, events[i]);
      }
    });
  }

  function observe(topic, observer) {
    if (!this.observers) {
      this.observers = Object.create(util.observable);
    }

    this.observers.observe(topic, observer);
  }

  function connect() {
    if (!this.url) {
      throw new TypeError("client url is null");
    }

    var headers = {
      "Content-Type": "application/json",
      "X-Access-Token": ""
    };

    if (!this.poller) {
      this.poller = ajax.poll(this.url, {
        success: function (xhr) {
          try {
            var data = JSON.parse(xhr.responseText);
            headers["X-Access-Token"] = data.token;
            this.dispatch(data);
          } catch (e) {}
        }.bind(this),

        headers: headers
      });
    }
  }

  function notify(topic, data) {
    if (!this.url) {
      throw new TypeError("url is null");
    }

    if (!data) {
      throw new TypeError("data is null");
    }

    ajax.post(this.url, {
      data: JSON.stringify({
        topic: topic,
        data: data
      })
    });
  }

  ajax.cometClient = {
    dispatch: dispatch,
    observe: observe,
    notify: notify,
    connect: connect
  };
}());
