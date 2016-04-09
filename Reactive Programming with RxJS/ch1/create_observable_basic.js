/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
var observable = Rx.Observable.create(function(observer) {
  observer.onNext('Simon');
  observer.onNext('Jen');
  observer.onNext('Sergi');
  observer.onCompleted(); // We are done
});

var observer = Rx.Observer.create(
  function onNext(x) { console.log('Next: ' + x); },
  function onError(err) { console.log('Error: ' + err); },
  function onCompleted() { console.log('Completed'); }
);

observable.subscribe(observer);
