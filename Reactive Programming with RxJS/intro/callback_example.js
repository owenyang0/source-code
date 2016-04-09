/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
function B(callback) {
  // Do operation that takes some time
  callback('Done!');
}

function A(message) {
  console.log(message);
}

// Execute `B` with `A` as a callback
B(A);
