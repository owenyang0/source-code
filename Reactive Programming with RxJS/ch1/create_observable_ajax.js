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
  function(x) { console.log('Next: ' + x); }, //onNext
  function(err) { console.log('Error: ' + err); }, // onError
  function() { console.log('Completed'); } // onComplete
);

observable.subscribe(observer);
function get(url) {
  return Rx.Observable.create(function(observer) {
    // Make a traditional Ajax request
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      if (req.status == 200) {
        // If the status is 200, meaning there have been no problems,
        // Yield the result to listeners and complete the sequence
        observer.onNext(req.response);
        observer.onCompleted();
      }
      else {
        // Otherwise, signal to listeners that there has been an error
        observer.onError(new Error(req.statusText));
      }
    };

    req.onerror = function() {
      observer.onError(new Error("Unknown Error"));
    };

    req.send();
  });
}

// Create an Ajax Observable
var test = get('/api/contents.json');
// Subscribe an Observer to it
test.subscribe(
  function onNext(x) { console.log('Result: ' + x); },
  function onError(err) { console.log('Error: ' + err); },
  function onCompleted() { console.log('Completed'); }
);
