/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
function makeRow(props) {
  var row = document.createElement('tr');
  var time = (new Date(props.time)).toString();

  row.id = props.net + props.code;

  [props.place, props.mag, time].forEach(function(text) {
    var cell = document.createElement('td');
    cell.textContent = text;
    row.appendChild(cell);
  });

  return row;
}

function initialize() {
  var QUAKE_URL = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/' +
    'summary/all_day.geojsonp';

  var quakes = Rx.Observable
    .interval(5000)
    .flatMap(function() {
      return Rx.DOM.jsonpRequest({
        url: QUAKE_URL,
        jsonpCallback: 'eqfeed_callback'
      });
    })
    .flatMap(function(result) {
      return Rx.Observable.from(result.response.features);
    })
    .distinct(function(quake) { return quake.properties.code; })
    .publish().refCount();

  quakes.subscribe(function(quake) {
    var coords = quake.geometry.coordinates;
    var size = quake.properties.mag * 10000;

    L.circle([coords[1], coords[0]], size).addTo(map);
  });

  var table = document.getElementById('quakes_info');
  quakes
    .pluck('properties')
    .map(makeRow)
    .bufferWithTime(500) // (1)
    .filter(function(rows) { return rows.length > 0; } // (2))
    .map(function(rows) {
      var fragment = document.createDocumentFragment();
      rows.forEach(function(row) {
        fragment.appendChild(row); // (3)
      });
      return fragment;
    })
    .subscribe(function(fragment) {
      table.appendChild(fragment); // (4)
    });
}

Rx.DOM.ready().subscribe(initialize);
