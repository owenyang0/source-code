/*jslint indent: 2, browser: true, eqeqeq: false*/
/*globals tddjs*/
(function () {
  if (typeof encodeURIComponent == "undefined") {
    return;
  }

  function urlParams(object) {
    if (!object) {
      return "";
    }

    var pieces = [];

    tddjs.each(object, function (prop, val) {
      pieces.push(encodeURIComponent(prop) + "=" +
                  encodeURIComponent(val));
    });

    return pieces.join("&");
  }

  tddjs.namespace("util").urlParams = urlParams;
}());
