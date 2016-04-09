/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
var counter = Rx.Observable.interval(1000);

var subscription1 = counter.subscribe(function(i) {
  console.log('Subscription 1:', i);
});

var subscription2 = counter.subscribe(function(i) {
  console.log('Subscription 2:', i);
});

setTimeout(function() {
  console.log('Canceling subscription2!');
  subscription2.dispose();
}, 2000);
var p = new Promise(function(resolve, reject) {
  window.setTimeout(resolve, 5000);
});

p.then(function() {
  console.log('Potential side effect!');
});

var subscription = Rx.Observable.fromPromise(p).subscribe(function(msg) {
  console.log('Observable resolved!');
});
subscription.dispose();
