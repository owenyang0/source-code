/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
Rx.Observable
  .from(['Adrià', 'Jen', 'Sergi'])
  .subscribe(
    function onNext(x) { console.log('Next: ' + x); },
    function onError(err) { console.error('Error: ' + err); },
    function onCompleted() { console.log('Completed'); }
  );

var names = Rx.Observable.from(['Adrià', 'Jen', 'Sergi']);

names.subscribe(function(x) {
  console.log('Next: ' + x);
});
