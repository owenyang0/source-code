/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
Rx.Observable.fromEvent(document, 'click')
  .filter(function(c) { return c.clientX > innerWidth / 2; })
  .take(10)
  .subscribe(function(c) { return console.log(c.clientX, c.clientY); });
