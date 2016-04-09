/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
var onNext = Rx.ReactiveTest.onNext; // (1)
var onCompleted = Rx.ReactiveTest.onCompleted;
var subscribe = Rx.ReactiveTest.subscribe;

var scheduler = new Rx.TestScheduler(); // (2)

var quakes = scheduler.createHotObservable( // (3)
  onNext(100, { properties: 1 }),
  onNext(300, { properties: 2 }),
  onNext(550, { properties: 3 }),
  onNext(750, { properties: 4 }),
  onNext(1000, { properties: 5 }),
  onCompleted(1100)
);

QUnit.test("Test quake buffering", function(assert) { // (4)
  var results = scheduler.startScheduler(function() { // (5)
    return quakeBatches(scheduler)
  }, {
    created: 0,
    subscribed: 0,
    disposed: 1200
  });

  var messages = results.messages; // (6)
  console.log(results.scheduler === scheduler);

  assert.equal( // (7)
    messages[0].toString(),
    onNext(501, [1, 2]).toString()
  );

  assert.equal(
    messages[1].toString(),
    onNext(1001, [3, 4, 5]).toString()
  );

  assert.equal(
    messages[2].toString(),
    onCompleted(1100).toString()
  );
});
function quakeBatches(scheduler) {
  return quakes.pluck('properties')
    .bufferWithTime(500, null, scheduler || null)
    .filter(function(rows) {
      return rows.length > 0;
    });
}

var onNext = Rx.ReactiveTest.onNext;
QUnit.test("Test value order", function(assert) {
  var scheduler = new Rx.TestScheduler();
  var subject = scheduler.createColdObservable(
    onNext(100, 'first'),
    onNext(200, 'second'),
    onNext(300, 'third')
  );

  var result = '';
  subject.subscribe(function(value) { result = value });

  scheduler.advanceBy(100);
  assert.equal(result, 'first');

  scheduler.advanceBy(100);
  assert.equal(result, 'second');

  scheduler.advanceBy(100);
  assert.equal(result, 'third');
});
/*
quakes
  .pluck('properties')
  .map(makeRow)
  .bufferWithTime(500)
  .filter(function(rows) { return rows.length > 0; })
  .map(function(rows) {
    var fragment = document.createDocumentFragment();
    rows.forEach(function(row) {
      fragment.appendChild(row);
    });
    return fragment;
  })
  .subscribe(function(fragment) {
    table.appendChild(fragment);
  });
*/
