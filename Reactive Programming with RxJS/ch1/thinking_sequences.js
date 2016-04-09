/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
document.body.addEventListener('click', function(e) {
  console.log(e.clientX, e.clientY);
});
var clicks = 0;
document.addEventListener('click', function registerClicks(e) {
  if (clicks < 10) {
    if (e.clientX > window.innerWidth / 2) {
      console.log(e.clientX, e.clientY);
      clicks += 1;
    }
  } else {
    document.removeEventListener('click', registerClicks);
  }
});
Rx.Observable.fromEvent(document, 'click')
  .filter(function(c) { return c.clientX > window.innerWidth / 2; })
  .take(10)
  .subscribe(function(c) { console.log(c.clientX, c.clientY) })
