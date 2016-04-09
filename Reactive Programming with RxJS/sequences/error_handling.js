/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
function getJSON(arr) {
  return Rx.Observable.from(arr).map(function(str) {
    var parsedJSON = JSON.parse(str);
    return parsedJSON;
  });
}

getJSON([
  '{"1": 1, "2": 2}',
  '{"success: true}', // Invalid JSON string
  '{"enabled": true}'
]).subscribe(
  function(json) {
    console.log('Parsed JSON: ', json);
  },
  function(err) {
    console.log(err.message);
  }
);
function getJSON(arr) {
  if (!arr) {
    return Rx.Observable.throw(new Error('A parameter was expected.'));
  }

  return Rx.Observable.from(arr).map(function(str) {
    var parsedJSON = JSON.parse(str);
    return parsedJSON;
  });
}

getJSON().subscribe(
  function(json) {
    console.log('Parsed JSON: ', json);
  },
  function(e) {
    console.log('ERROR', e.message);
  }
);
function getJSON(arr) {
  return Rx.Observable.from(arr).map(function(str) {
    var parsedJSON = JSON.parse(str);
    return parsedJSON;
  });
}

var caught = getJSON(['{"1": 1, "2": 2}', '{"1: 1}']).catch(
  Rx.Observable.return({
    error: 'There was an error parsing JSON'
  })
);

caught.subscribe(
  function(json) {
    console.log('Parsed JSON: ', json);
  },
  // Because we catch errors now, `onError` will not be executed
  function(e) {
    console.log('ERROR', e.message);
  }
);

// This will try to retrieve the remote URL up to 5 times.
Rx.DOM.get('/products').retry(5)
  .subscribe(
    function(xhr) { console.log(xhr); },
    function(err) { console.error('ERROR: ', err); }
  );
