/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
var codeLayers = {};
var just = Rx.helpers.just;
var quakeLayer = L.layerGroup([]).addTo(map);
var locationInput = document.getElementById('locationFilter');

function makeRow(props) {
  var row = document.createElement('tr');
  var time = (new Date(props.time)).toString();

  row.id = props.net + props.code;

  [props.place, props.mag, time].forEach(function(text) {
    var cell = document.createElement('td');
    cell.textContent = text;
    row.appendChild(cell);
  });

  var mouseOver = Rx.DOM.mouseover(row).map(just(true));
  var mouseOut = Rx.DOM.mouseout(row).map(just(false));
  var isHovering = mouseOver.merge(mouseOut);

  var circle = quakeLayer.getLayer(codeLayers[row.id]);

  isHovering.subscribe(function(isHovering) {
    circle.setStyle({ color: isHovering ? '#ff0000' : '#0000ff' });
  });

  Rx.DOM.click(row).subscribe(function() {
    map.panTo(circle.getLatLng());
  });

  return row;
}
var open = Rx.Observer.create(function(e) {
  console.info('socket open');
});

// an observer for when the socket is about to close
var close = Rx.Observer.create(function() {
  console.log('socket is about to close');
});

function initialize() {
  var socket = Rx.DOM.fromWebSocket('ws://127.0.0.1:8080', null, open, close);

  var table = document.getElementById('quakes_info');
  var keyups = Rx.DOM.keyup(locationInput)
    .map(function(e) { return e.target.value; })
    .filter(function(text) { return text.length > 2; });

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

  var quakesGeo = quakes.map(function(quake) {
    return {
      id: quake.properties.net + quake.properties.code,
      lat: quake.geometry.coordinates[1],
      lng: quake.geometry.coordinates[0],
      mag: quake.properties.mag
    };
  })
.bufferWithTime(2000)
.filter(function(quakes) { return quakes.length > 0; });

  quakesGeo.subscribe(function(quakes) {
    console.log("value", quakes);
    quakes.forEach(function(quake) {
      var circle = L.circle([quake.lat, quake.lng], quake.mag * 10000);
      quakeLayer.addLayer(circle);
      codeLayers[quake.id] = quakeLayer.getLayerId(circle);
    });

    socket.onNext(JSON.stringify(quakes));
  });

  socket.subscribe( function(message) {
    console.log(JSON.parse(message.data));
  })

  quakes
  .pluck('properties')
  .map(makeRow)
  .subscribe(function(row) { table.appendChild(row); });
}

Rx.DOM.ready().subscribe(initialize);
