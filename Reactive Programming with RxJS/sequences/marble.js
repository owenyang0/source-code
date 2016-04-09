/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
Rx.Observable.range(1, 3);
var a = Rx.Observable.interval(200).map(function(i) {
  return 'A' + i;
});
var b = Rx.Observable.interval(100).map(function(i) {
  return 'B' + i;
});

Rx.Observable.merge(a, b).subscribe(function(x) {
  console.log(x);
});

// Item:  0
// Item:  1
// Item:  2
// Item:  1
// Item:  3
// Item:  2
// ...
//
//
var avg = Rx.Observable.range(0, 5)
  .reduce(function(prev, cur) {
    return {
      sum: prev.sum + cur,
      count: prev.count + 1
    };
  }, { sum: 0, count: 0 })
  .map(function(o) {
    return o.sum / o.count;
  });

var subscription = avg.subscribe(function(x) {
  console.log('Average is: ', x);
});
var avg = Rx.Observable.interval(1000)
  .scan(function (prev, cur) {
    return {
      sum: prev.sum + cur,
      count: prev.count + 1
    };
  }, { sum: 0, count: 0 })
  .map(function(o) {
    return o.sum / o.count;
  });

var subscription = avg.subscribe( function (x) {
  console.log(x);
});
