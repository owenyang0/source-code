/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
var input = document.getElementById('inputY');
var keyups = Rx.Observable.fromEvent(input, 'keyup').map(function(e) {
  return e.target.value;
})
.distincUntilChanged()
.filter(function(text) {
  return (/^\w+$/).test(text);
});

keyups.subscribe(function(text) { console.log(text); });
//
var input = document.getElementById('input');
var keyups = Rx.Observable.fromEvent(input, 'keyup');

var inputValues = keyups.map(function(e) {
  return e.target.value;
}).distincUntilChanged();

var filteredValues = inputValues.filter(function(text) {
  return (/^\w+$/).test(text);
});

// keyups.subscribe(function(event) { console.log(event.key); });
// inputValues.subscribe(function(text) { console.log(text); });
filteredValues.subscribe(function(text) { console.log(text); });
