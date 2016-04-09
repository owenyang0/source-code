/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
var drawnQuakes = [];
window.eqfeed_callback = function(response) {
  var quakes = response.features.filter(function(quake) {
    return drawnQuakes.indexOf(quake.properties.code) === -1;
  });

  quakes.forEach(function(quake) {
    var coords = quake.geometry.coordinates;
    var size = quake.properties.mag * 10000;

    L.circle([coords[1], coords[0]], size).addTo(map);
    drawnQuakes.push(quake.properties.code);
  });
};

setInterval(function() {
  loadJSONP(QUAKE_URL);
}, 5000);
