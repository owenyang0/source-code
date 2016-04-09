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

var MAIN_URL = 'https://en.wikipedia.org';
var WIKI_URL = MAIN_URL + '/wiki/';
var API_URL = MAIN_URL + '/w/api.php?' +
  'action=query&list=search&format=json&srsearch=';

var h = CycleDOM.h;
var SearchBox = require('./searchbox'); //(1)

function main(responses) {
  var wpSearchBox = SearchBox({ //(2)
    DOM: responses.DOM,
    props$: Rx.Observable.just({
      apiUrl: API_URL
    })
  });

  var searchDOM$ = wpSearchBox.DOMTree; //(3)
  var searchResults$ = responses.JSONP
    .filter(function(res$) {
      return res$.request.indexOf(API_URL) === 0;
    })
    .concatAll()
    .pluck('query', 'search')
    .startWith([]);

  return {
    JSONP: wpSearchBox.JSONPQuery, //(4)
    DOM: Rx.Observable.combineLatest( //(5)
      searchDOM$, searchResults$, function(tree, links) {
        return h('div', [
          h('h1', 'Wikipedia Search '),
          tree,
          h('hr'),
          h('div', links.map(function(link) {
            return h('div', [
              h('a', { href: WIKI_URL + link.title }, link.title)
            ]);
          }))
        ]);
      })
  };
}

Cycle.run(main, {
  DOM: CycleDOM.makeDOMDriver('#container'),
  JSONP: CycleJSONP.makeJSONPDriver()
});

