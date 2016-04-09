/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
function onClick1(e) {
  console.log('Listener 1 has been called');
}

function onClick2() {
  console.log('Listener 2 has been called');
}

var notifier = document.body;
notifier.addEventListener('click', onClick1);
notifier.addEventListener('click', onClick2);
