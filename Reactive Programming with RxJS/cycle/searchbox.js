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
var Rx = Cycle.Rx;
var h = CycleDOM.h;
var a;

function searchBox(responses) {
  var props$ = responses.props$;
  var apiUrl$ = props$.map(function (props) {
    return props['apiUrl'];
  }).first();

  var vtree$ = Rx.Observable.just(
    h('div', { className: 'search-field' }, [
      h('input', { type: 'text' })
    ]));

  var searchQuery$ = apiUrl$.flatMap(function (apiUrl) {
    return responses.DOM.select('.search-field').events('input')
      .debounce(300)
      .map(function (e) { return e.target.value; })
      .filter(function (value) { return value.length > 3; })
      .map(function (searchTerm) { return apiUrl + searchTerm; });
  });

  return {
    DOMTree: vtree$,
    JSONPQuery: searchQuery$
  };
}

module.exports = searchBox; // Export it as a module
