/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
document.body.addEventListener('mousemove', function(e) {
  console.log(e.clientX, e.clientY);
});
var halfWidth = innerWidth / 2;
var halfHeight = innerHeight / 2;
document.addEventListener('mousemove', function mouseCoords(e) {
  var x = e.clientX, y = e.clientY;
  if (x > halfWidth) {
    console.log('Mouse pointer on the right');
  } else {
    console.log('Mouse pointer on the left');
  }
});
var allMoves = Rx.Observable.fromEvent(document, 'mousemove')
  .map(function(e) {
    return { x: e.clientX, y: e.clientY };
  });

var rightSide = allMoves.filter(function(c) { return c.x > halfWidth });
var leftSide = allMoves.filter(function(c) { return c.x < halfWidth });

rightSide.subscribe(function() {
  console.log('Mouse pointer on the right');
});

leftSide.subscribe(function() {
  console.log('Mouse pointer on the left');
});
function isOnUpperSide(coord) {
  return coord.y < halfHeight;
}

var upperLeft = leftSide.filter(isOnUpperSide);
var upperRight = rightSide.filter(isOnUpperSide);

upperLeft.subscribe(function() {
  console.log('Mouse pointer on the upper left');
});

upperRight.subscribe(function() {
  console.log('Mouse pointer on the upper right');
});
upperLeft.merge(upperRight).subscribe(function() {
  console.log('Mouse pointer on the upper side');
});
