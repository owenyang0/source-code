/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
function wait(time, callback) {
  console.log('Starting async task');
  setTimeout(callback, time);
}

wait(1000, function() {
  console.log('Async task finished!');
});
var Rx = require('rx'); // Load RxJS
var fs = require('fs'); // Load Node.js Filesystem module

// Create an Observable from the readdir method
var readdir = Rx.Observable.fromNodeCallback(fs.readdir);

// Send a delayed message
var source = readdir('/Users/sergi');

var subscription = source.subscribe(
  function(res) { console.log('List of directories: ' + res); },
  function(err) { console.log('Error: ' + err); },
  function() { console.log('Done!'); });
