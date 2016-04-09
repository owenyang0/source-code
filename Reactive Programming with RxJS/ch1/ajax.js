/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
function XHRObservable(url) {
  return Rx.Observable.create(function(observer) {
    var oXHR = new XMLHttpRequest();
    oXHR.open("GET", url, true);
    oXHR.onreadystatechange = function (oEvent) {
      if (oXHR.readyState === 4) {
        if (oXHR.status === 200) {
          observer.onNext(oXHR);
          observer.onComplete();
        } else {
          observer.onError(oXHR.statusText);
        }
      }
    };
    oXHR.send(null);
  });
}

XHRObservable('/products').subscribe(
  function onNext(xhr) { console.log(xhr); },
  function onError(err) { console.error(err); }
);
Rx.DOM.get('/api/contents.json').subscribe(
  function onNext(data) { console.log(data.response); },
  function onError(err) { console.error(err); }
);
