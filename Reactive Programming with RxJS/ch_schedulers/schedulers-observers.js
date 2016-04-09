/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
var arr = [];
for (var i=0; i<1000; i++) {
  arr.push(i);
}
Rx.Observable.from(arr).subscribe();
var timeStart = Date.now();
Rx.Observable.from(arr).subscribe(
  function onNext() {},
  function onError() {},
  function onCompleted() {
    console.log('Total time: ' + (Date.now() - timeStart) + 'ms');
  });
var timeStart = Date.now();
Rx.Observable.from(arr, null, null, Rx.Scheduler.default).subscribe(
  function onNext() {},
  function onError() {},
  function onCompleted() {
    console.log('Total time: ' + (Date.now() - timeStart) + 'ms');
  });
arr
  .groupBy(function(value) {
    return value % 2 === 0;
  })
  .map(function(value) {
    return value.observeOn(Rx.Scheduler.default);
  })
  .map(function(groupedObservable) {
    return expensiveOperation(groupedObservable);
  });
