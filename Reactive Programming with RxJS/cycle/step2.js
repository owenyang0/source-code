/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
var Cycle = require('@cycle/core');
var CycleDOM = require('@cycle/dom');
var CycleJSONP = require('@cycle/jsonp');
var Rx = Cycle.Rx;
var h = CycleDOM.h;

function searchRequest(responses) {
  return responses.DOM.select('.search-field').events('input')
    .debounce(300)
    .map(function(e) { return e.target.value })
    .filter(function(value) { return value.length > 2 })
    .map(function(search) { return API_URL + search });
}

function vtreeElements(results) {
  return h('div', [
    h('h1', 'Wikipedia Search '),
    h('input', {className: 'search-field', attributes: {type: 'text'}}),
    h('hr'),
    h('div', results.map(function(result) {
      return h('div', [
        h('a', { href: WIKI_URL + result.title }, result.title)
      ]);
    }))
  ]);
}

function main(responses) {
  return {
    DOM: Rx.Observable.just(CycleDOM.h('span', 'Hey there!')),
    JSONP: searchRequest(responses)
  };
}

var drivers = {
  DOM: CycleDOM.makeDOMDriver('#container'),
  JSONP: CycleJSONP.makeJSONPDriver()
};

Cycle.run(main, drivers);
