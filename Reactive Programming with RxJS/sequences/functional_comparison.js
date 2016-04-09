/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
var Rx = require("rx");
var logValue = function(val) { console.log(val) };

var arr = [1, 2, 3];

var m = arr.map(function(x) {
  return x * 3;
});

var f = m.filter(function(x) {
  return x % 2 !== 0;
});

var seq = Rx.Observable.range(1, 3);

var m = seq.map(function(x) {
  return x * 3;
});

var f = m.filter(function(x) {
  return x % 2 !== 0;
});

var src = [1, 2, 3, 4, 5];
var upper = src.map(function(name) {
  return name * 2;
});

upper.forEach(logValue);
var src = Rx.Observable.range(1, 5);
var upper = src.map(function(name) {
  return name * 2;
});

upper.subscribe(logValue);

console.log("FILTER");

var isEven = (function(val) { return val % 2 !== 0; });

var src = [1, 2, 3, 4, 5];
var even = src.filter(isEven);

even.forEach(logValue);
var src = Rx.Observable.range(1, 5);
var even = src.filter(isEven);

even.subscribe(logValue);

console.log("REDUCE");

var src = [1, 2, 3, 4, 5];
var sum = src.reduce(function(a, b) {
    return a + b;
});

console.log(sum);
var src = Rx.Observable.range(1, 5);
var sum = src.reduce(function(acc, x) {
  return acc + x;
});

sum.subscribe(logValue);
function concatAll(source) {
  return source.reduce(function(a, b) {
    return a.concat(b);
  });
}
concatAll([[0, 1, 2], [3, 4, 5], [6, 7, 8]]);
// [0, 1, 2, 3, 4, 5, 6, 7, 8]
var src = Rx.Observable.range(1, 5);
var sum = src.scan(function(x, acc) { // Inverted reduce parameters
  return acc + x;
});

sum.subscribe(function(val) {
  console.log('Next: ' + val);
});

// Next: 1
// Next: 3
// Next: 6
// Next: 10
// Next: 15
