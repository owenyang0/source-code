/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
Rx.Scheduler.default.schedule(
  function sayHi(scheduler) {
    console.log('Hello (scheduled) World!');
  });
Rx.Scheduler.default.scheduleWithRelative(
  2000, /* 2 seconds from now */
  function sayDelayedHi() {
    console.log('Hello (delayed) World!');
  });
