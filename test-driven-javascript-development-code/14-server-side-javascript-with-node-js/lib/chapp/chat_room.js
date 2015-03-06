/*jslint indent: 2, onevar: false, eqeqeq: false, plusplus: false*/
/*globals require, module, process*/
require("function-bind");
var Promise = require("node-promise/promise").Promise;
var EventEmitter = require("events").EventEmitter;
var id = 0;

var chatRoom = Object.create(EventEmitter.prototype);

chatRoom.addMessage = function (user, message) {
  var promise = new Promise();

  process.nextTick(function () {
    var err = null;

    if (!user) {
      err = new TypeError("user is null");
    }

    if (!message) {
      err = new TypeError("message is null");
    }

    var data;

    if (!err) {
      if (!this.messages) {
        this.messages = [];
      }

      var id = this.messages.length + 1;
      data = { id: id, user: user, message: message };
      this.messages.push(data);
      this.emit("message", data);
      promise.resolve(data);
    }

    if (err) {
      promise.reject(err, true);
    }
  }.bind(this));

  return promise;
};

chatRoom.getMessagesSince = function (id) {
  var promise = new Promise();

  process.nextTick(function () {
    promise.resolve((this.messages || []).slice(id));
  }.bind(this));

  return promise;
};

chatRoom.waitForMessagesSince = function (id) {
  var promise = new Promise();

  this.getMessagesSince(id).then(function (messages) {
    if (messages.length > 0) {
      promise.resolve(messages);
    } else {
      var listener = function (message) {
        promise.resolve([message]);
        this.removeListener("message", listener);
      }.bind(this);

      this.addListener("message", listener);
    }
  }.bind(this));

  return promise;
};

module.exports = chatRoom;
