/*jslint indent: 2, eqeqeq: false, onevar: false*/
/*globals tddjs*/
tddjs.noop = function () {};

(function () {
  var ajax = tddjs.namespace("ajax");

  if (!ajax.create) {
    return;
  }

  function isSuccess(transport) {
    var status = transport.status;

    return (status >= 200 && status < 300) ||
      status == 304 ||
      (tddjs.isLocal() && !status);
  }

  function requestComplete(options) {
    var transport = options.transport;

    if (isSuccess(transport)) {
      if (typeof options.success == "function") {
        options.success(transport);
      }
    } else {
      if (typeof options.failure == "function") {
        options.failure(transport);
      }
    }

    if (typeof options.complete == "function") {
      options.complete(transport);
    }
  }

  function setData(options) {
    if (options.data) {
      options.data = tddjs.util.urlParams(options.data);

      if (options.method == "GET") {
        var hasParams = options.url.indexOf("?") >= 0;
        options.url += hasParams ? "&" : "?";
        options.url += options.data;
        options.data = null;
      }
    } else {
      options.data = null;
    }
  }

  function defaultHeader(transport, headers, header, val) {
    if (!headers[header]) {
      transport.setRequestHeader(header, val);
    }
  }

  function setHeaders(options) {
    var headers = options.headers || {};
    var transport = options.transport;

    tddjs.each(headers, function (header, value) {
      transport.setRequestHeader(header, value);
    });

    if (options.method == "POST" && options.data) {
      defaultHeader(transport, headers,
                    "Content-Type",
                    "application/x-www-form-urlencoded");

      defaultHeader(transport, headers,
                    "Content-Length", options.data.length);
    }

    defaultHeader(transport, headers,
                  "X-Requested-With", "XMLHttpRequest");
  }

  // Public methods

  function request(url, options) {
    if (typeof url != "string") {
      throw new TypeError("URL should be string");
    }

    options = tddjs.extend({}, options);
    options.url = url;
    setData(options);

    var transport = tddjs.ajax.create();
    options.transport = transport;
    transport.open(options.method || "GET", options.url, true);
    setHeaders(options);

    transport.onreadystatechange = function () {
      if (transport.readyState == 4) {
        requestComplete(options);
        transport.onreadystatechange = tddjs.noop;
      }
    };

    transport.send(options.data);
  }

  ajax.request = request;

  function get(url, options) {
    options = tddjs.extend({}, options);
    options.method = "GET";
    ajax.request(url, options);
  }

  ajax.get = get;

  function post(url, options) {
    options = tddjs.extend({}, options);
    options.method = "POST";
    ajax.request(url, options);
  }

  ajax.post = post;
}());
