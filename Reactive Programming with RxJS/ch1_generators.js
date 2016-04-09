/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
function* fib() {
  var a = 0, b = 1, t;

  while(true) {
    t = a;
    a = b;
    b += t;
    yield a;
  }
}

var fibonacci = fib(); // Nothing happens yet

console.log(fibonacci.next()); // { done: false, value: 1 }
console.log(fibonacci.next()); // { done: false, value: 1 }
console.log(fibonacci.next()); // { done: false, value: 2 }
console.log(fibonacci.next()); // { done: false, value: 3 }
console.log(fibonacci.next()); // { done: false, value: 5 }
console.log(fibonacci.next()); // { done: false, value: 8 }
