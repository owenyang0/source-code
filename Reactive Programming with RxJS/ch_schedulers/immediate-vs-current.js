/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
console.log('Before subscription');

Rx.Observable.range(1, 5)
  .do(function(a) {
    console.log('Processing value', a);
  })
  .map(function(value) { return value * value; })
  .subscribe(function(value) { console.log('Emitted', value); });

console.log('After subscription');
console.log('Before subscription');
Rx.Observable.range(1, 5)
  .do(function(value) {
    console.log('Processing value', value);
  })
  .observeOn(Rx.Scheduler.default)
  .map(function(value) { return value * value; })
  .subscribe(function(value) { console.log('Emitted', value); });
console.log('After subscription');

// Be careful: the code below will freeze your environment!
Rx.Observable.return(10).repeat().take(1)
  .subscribe(function(value) {
    console.log(value);
  });
var scheduler = Rx.Scheduler.currentThread;
Rx.Observable.return(10, scheduler).repeat().take(1)
  .subscribe(function(value) {
    console.log(value);
  });

function scheduleTasks(scheduler) {
    var leafAction = () => console.log("----leafAction.");
    var innerAction = () => {
        console.log("--innerAction start.");
        scheduler.schedule(leafAction);
        console.log("--innerAction end.");
    };
    var outerAction = () => {
        console.log("outer start.");
        scheduler.schedule(innerAction);
        console.log("outer end.");
    };
    scheduler.schedule(outerAction);
}

function CurrentThreadExample() {
    scheduleTasks(Rx.Scheduler.currentThread);
    /*Output:
    outer start.
    outer end.
    --innerAction start.
    --innerAction end.
    ----leafAction.
    */
}

function ImmediateExample() {
    scheduleTasks(Rx.Scheduler.immediate);
    /*Output:
    outer start.
    --innerAction start.
    ----leafAction.
    --innerAction end.
    outer end.
    */
}

CurrentThreadExample()


