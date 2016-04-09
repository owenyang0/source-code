/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
var Cycle = require('@cycle/core');
var Rx = Cycle.Rx;
var CycleDOM = require('@cycle/dom');
var CycleJSONP = require('@cycle/jsonp');

var makeJSONPDriver = CycleJSONP.makeJSONPDriver;
var makeDOMDriver = CycleDOM.makeDOMDriver;
var h = CycleDOM.h;

var MAIN_URL = 'https://en.wikipedia.org';
var WIKI_URL = MAIN_URL + '/wiki/';
var API_URL = MAIN_URL + '/w/api.php?' +
  'action=query&list=search&format=json&srsearch=';

function intent(JSONP) {
  return JSONP.filter(function(res$) {
      return res$.request.indexOf(API_URL) === 0;
    })
    .concatAll()
    .pluck('query', 'search');
}

function model(actions) {
  return actions.startWith([]);
}

function view(state) {
  return state.map(function(linkArray) {
    return h('div', [
      h('h1', 'Wikipedia Search '),
      h('input', {className: 'search-field', attributes: {type: 'text'}}),
      h('hr'),
      h('div', linkArray.map(function(link) {
        return h('div', [
          h('a', { href: WIKI_URL + link.title }, link.title)
        ]);
      }))
    ]);
  });
}

function userIntent(DOM) {
  return DOM.select('.search-field').events('input')
    .debounce(300)
    .map(function(e) { return e.target.value })
    .filter(function(value) { return value.length > 2 })
    .map(function(search) { return API_URL + search });
}

function main(responses) {
  return {
    DOM: view(model(intent(responses.JSONP))),
    JSONP: userIntent(responses.DOM)
  };
}

Cycle.run(main, {
  DOM: CycleDOM.makeDOMDriver('#container'),
  JSONP: CycleJSONP.makeJSONPDriver()
});
