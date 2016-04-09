/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
var Cycle = require('@cycle/core');
var CycleDOM = require('@cycle/dom') //(1)
var Rx = Cycle.Rx;

function main(responses) { //(2)
  return {
    DOM: Rx.Observable.just(CycleDOM.h('span', 'Hi there!'))
  };
}

var drivers = {
  DOM: CycleDOM.makeDOMDriver('#container') //(3)
};

Cycle.run(main, drivers); //(4)