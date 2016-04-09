/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
var Rx = require('rx');

// This Observable object will propagate the string to all its listeners, once.
var subject = Rx.Observable.return('Hello there!');

var listener1 = subject.subscribe(function(msg) {
  console.log('Listener 1 received: ' + msg);
});

var listener2 = subject.subscribe(function(msg) {
  console.log('Listener 2 received: ' + msg);
});
