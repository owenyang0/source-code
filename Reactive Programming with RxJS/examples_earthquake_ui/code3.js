/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
var codeLayers = {};
var quakeLayer = L.layerGroup([]).addTo(map);
var identity = Rx.helpers.identity; //(1)

function isHovering(element) {
  var over = Rx.DOM.mouseover(element).map(identity(true)); //(2)
  var out = Rx.DOM.mouseout(element).map(identity(false)); //(3)

  return over.merge(out); //(4)

}

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
  .distinct(function(quake) { return quake.properties.code; });

  quakes.subscribe(function(quake) {
    var coords = quake.geometry.coordinates;
    var size = quake.properties.mag * 10000;

    var circle = L.circle([coords[1], coords[0]], size).addTo(map);
    quakeLayer.addLayer(circle);
    codeLayers[quake.id] = quakeLayer.getLayerId(circle);
  });

  var table = document.getElementById('quakes_info');
  quakes
    .pluck('properties')
    .map(makeRow)
    .bufferWithTime(500)
    .filter(function(rows) { return rows.length > 0; })
    .map(function(rows) {
      var fragment = document.createDocumentFragment();
      rows.forEach(function(row) {
        fragment.appendChild(row);
      });
      return fragment;
    })
    .subscribe(function(fragment) {
      var row = fragment.firstChild; // Get row from inside the fragment
      var circle = quakeLayer.getLayer(codeLayers[row.id]); // (5)

      isHovering(row).subscribe(function(hovering) { // (6)
        circle.setStyle({ color: hovering ? '#ff0000' : '#0000ff' });
      });

      Rx.DOM.click(row).subscribe(function() { // (7)
        map.panTo(circle.getLatLng());
      });

      table.appendChild(fragment);
    })
}

Rx.DOM.ready().subscribe(initialize);
