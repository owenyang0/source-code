/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/

function Producer() {
  this.listeners = [];
}

Producer.prototype.add = function(listener) {
  this.listeners.push(listener);
};

Producer.prototype.remove = function(listener) {
  var index = this.listeners.indexOf(listener);
  this.listeners.splice(index, 1);
};

Producer.prototype.notify = function(message) {
  this.listeners.forEach(function(listener) {
    listener.update(message);
  });
};

// Any object with an 'update' method would work.
var listener1 = {
  update: function(message) {
    console.log('Listener 1 received:', message);
  }
};

var listener2 = {
  update: function(message) {
    console.log('Listener 2 received:', message);
  }
};

var notifier = new Producer();
notifier.add(listener1);
notifier.add(listener2);
notifier.notify('Hello there!');


