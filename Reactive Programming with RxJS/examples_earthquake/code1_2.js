/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
var quakes = Rx.DOM.jsonpRequest({
    url: QUAKE_URL,
    jsonpCallback: 'eqfeed_callback'
  })
  .flatMap(function(result) {
    return Rx.Observable.from(result.response.features);
  })
  .map(function(quake) {
    return {
      lat: quake.geometry.coordinates[1],
      lng: quake.geometry.coordinates[0],
      size: quake.properties.mag * 10000
    };
  });
quakes.subscribe(function(quake) {
  L.circle([quake.lat, quake.lng], quake.size).addTo(map);
});
