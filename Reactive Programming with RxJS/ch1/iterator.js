/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
function iteratorFromArray(arr) {
  this.cursor = 0;
  this.array = arr;
}

iteratorFromArray.prototype.next = function() {
  while (this.cursor < this.array.length) {
    return this.array[this.cursor++];
  }
};

iteratorFromArray.prototype.hasNext = function() {
  return this.cursor < this.array.length - 1;
};
var consumer = new iteratorFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

console.log(consumer.next(), consumer.hasNext()); // 1 true
console.log(consumer.next(), consumer.hasNext()); // 2 true
console.log(consumer.next(), consumer.hasNext()); // 3 true
function iterateOnMultiples(arr, divisor) {
  this.cursor = 0;
  this.array = arr;
  this.divisor = divisor || 1;
}

iterateOnMultiples.prototype.next = function() {
  while (this.cursor < this.array.length) {
    var value = this.array[this.cursor++];
    if (value % this.divisor === 0) {
      return value;
    }
  }
};

iterateOnMultiples.prototype.hasNext = function() {
  var cur = this.cursor;
  while (cur < this.array.length) {
    if (this.array[cur++] % this.divisor === 0) {
      return true;
    }
  }
  return false;
};

var consumer = new iterateOnMultiples([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3);

console.log(consumer.next(), consumer.hasNext()); // 3 true
console.log(consumer.next(), consumer.hasNext()); // 6 true
console.log(consumer.next(), consumer.hasNext()); // 9 false

function* evenGenerator(array, divisor) {
  var cursor = 0;

  while (cursor < array.length) {
    var value = array[cursor++];
    if (value % divisor === 0) {
      yield value;
    }
  }
}

var gen = evenGenerator([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3);

console.log(gen.next().value); // 3
console.log(gen.next().value); // 6
console.log(gen.next().value); // 9
console.log(gen.next().done);  // true
