/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
var WebSocketServer = require('ws').Server;
var Twit = require('twit');
var Rx = require('rx');

var T = new Twit({
  consumer_key: 'rFhfB5hFlth0BHC7iqQkEtTyw',
  consumer_secret: 'zcrXEM1jiOdKyiFFlGYFAOo43Hsz383i0cdHYYWqBXTBoVAr1x',
  access_token: '14343133-nlxZbtLuTEwgAlaLsmfrr3D4QAoiV2fa6xXUVEwW9',
  access_token_secret: '57Dr99wECljyyQ9tViJWz0H3obNG3V4cr5Lix9sQBXju1'
});

/*

function onConnect(ws) {
  console.log('Client connected on localhost:8080');
}

var Server = new WebSocketServer({ port: 8080 });
Rx.Observable.fromEvent(Server, 'connection').subscribe(onConnect);

*/

function onConnect(ws) {
  console.log('Client connected on localhost:8080');

  var stream = T.stream('statuses/filter', {
    track: 'earthquake',
    locations: []
  });

  Rx.Observable.fromEvent(stream, 'tweet').subscribe(function(tweetObject) {
    ws.send(JSON.stringify(tweetObject), function(err) {
      if (err) {
        console.log('There was an error sending the message');
      }
    });
  });

  /*
  var onMessage = Rx.Observable.fromEvent(ws, 'message')
    .subscribe(function(quake) {
      quake = JSON.parse(quake);
      console.log(quake);
    });
  */
  Rx.Observable
    .fromEvent(ws, 'message')
    .flatMap(function(quakesObj){
      quakesObj = JSON.parse(quakesObj);
      return Rx.Observable.from(quakesObj.quakes);
    })
    .scan([], function(boundsArray, quake) { //(1)
      var bounds = [ //(2)
        quake.lng - 0.3, quake.lat - 0.15,
        quake.lng + 0.3, quake.lat + 0.15
      ].map(function(coordinate) {
        coordinate = coordinate.toString();
        return coordinate.match(/\-?\d+(\.\-?\d{2})?/)[0];
      });

      boundsArray.concat(bounds);
      return boundsArray.slice(Math.max(boundsArray.length - 50, 0)); //(3)
    })
    .subscribe(function(boundsArray) { //(4)
      stream.stop();
      stream.params.locations = boundsArray.toString();
      stream.start();
    });
}

var Server = new WebSocketServer({ port: 8080 });
Rx.Observable.fromEvent(Server, 'connection').subscribe(onConnect);
