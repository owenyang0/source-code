/*jslint indent: 2, onevar: false*/
/*globals require, exports, process*/
var testCase = require("nodeunit").testCase;
var chatRoom = require("chapp/chat_room");
var all = require("node-promise/promise").all;
var Promise = require("node-promise/promise").Promise;
var stub = require("stub");
require("function-bind");

function chatRoomSetup() {
  this.room = Object.create(chatRoom);
}

testCase(exports, "chatRoom", {
  "should be event emitter": function (test) {
    test.isFunction(chatRoom.addListener);
    test.isFunction(chatRoom.emit);
    test.done();
  }
});

testCase(exports, "chatRoom.addMessage", {
  setUp: chatRoomSetup,

  "should require username": function (test) {
    var promise = this.room.addMessage(null, "message");

    promise.then(function () {}, function (err) {
      test.isNotNull(err);
      test.inherits(err, TypeError);
      test.done();
    });
  },

  "should require message": function (test) {
    var promise = this.room.addMessage("cjno");

    promise.then(function () {}, function (err) {
      test.isNotNull(err);
      test.inherits(err, TypeError);
      test.done();
    });
  },

  "should not require a callback": function (test) {
    test.noException(function () {
      this.room.addMessage();
      test.done();
    }.bind(this));
  },

  "should call callback with new object": function (test) {
    var txt = "Some message";

    this.room.addMessage("cjno", txt).then(function (msg) {
      test.isObject(msg);
      test.isNumber(msg.id);
      test.equals(msg.message, txt);
      test.equals(msg.user, "cjno");
      test.done();
    });
  },

  "should assign unique ids to messages": function (test) {
    var room = this.room;
    var messages = [];

    var collect = function (msg) {
      messages.push(msg);
    };

    var add = all(room.addMessage("u", "a").then(collect),
                  room.addMessage("u", "b").then(collect));
          
    add.then(function () {
      test.notEquals(messages[0].id, messages[1].id);
      test.done();
    });
  },

  "should return a promise": function (test) {
    var result = this.room.addMessage("cjno", "message");

    test.isObject(result);
    test.isFunction(result.then);
    test.done();
  },

  "should emit 'message' event": function (test) {
    var message;

    this.room.addListener("message", function (m) {
      message = m;
    });

    this.room.addMessage("cjno", "msg").then(function (m) {
      test.same(m, message);
      test.done();
    });
  }
});

testCase(exports, "chatRoom.getMessagesSince", {
  setUp: chatRoomSetup,

  "should get messages since given id": function (test) {
    var room = this.room;
    var user = "cjno";

    room.addMessage(user, "msg").then(function (first) {
      room.addMessage(user, "msg2").then(function (second) {
        room.getMessagesSince(first.id).then(function (msgs) {
          test.isArray(msgs);
          test.same(msgs, [second]);
          test.done();
        });
      });
    });
  },

  "should get empty array when no messages": function (test) {
    var room = this.room;
    var user = "cjno";

    room.getMessagesSince(0).then(function (msgs) {
      test.isArray(msgs);
      test.same(msgs, []);
      test.done();
    });
  }
});

testCase(exports, "chatRoom.waitForMessagesSince", {
  setUp: chatRoomSetup,

  "should yield existing messages": function (test) {
    var promise = new Promise();
    promise.resolve([{ id: 43 }]);
    this.room.getMessagesSince = stub(promise);

    this.room.waitForMessagesSince(42).then(function (m) {
      test.same([{ id: 43 }], m);
      test.done();
    });
  },

  "should add listener when no messages": function (test) {
    this.room.addListener = stub();
    var promise = new Promise();
    promise.resolve([]);
    this.room.getMessagesSince = stub(promise);

    this.room.waitForMessagesSince(0);

    process.nextTick(function () {
      test.equals(this.room.addListener.args[0], "message");
      test.isFunction(this.room.addListener.args[1]);
      test.done();
    }.bind(this));
  },

  "new message should resolve waiting": function (test) {
    var user = "cjno";
    var msg = "Are you waiting for this?";

    this.room.waitForMessagesSince(0).then(function (msgs) {
      test.isArray(msgs);
      test.equals(msgs.length, 1);
      test.equals(msgs[0].user, user);
      test.equals(msgs[0].message, msg);
      test.done();
    });

    process.nextTick(function () {
      this.room.addMessage(user, msg);
    }.bind(this));
  },

  "should clear listener when done waiting": function (test) {
    var user = "cjno";
    var msg = "Are you waiting for this?";

    this.room.waitForMessagesSince(0).then(function (msgs) {
      test.equals(this.room.listeners("message").length, 0);
      test.done();
    }.bind(this));

    process.nextTick(function () {
      this.room.addMessage(user, msg);
    }.bind(this));
  }
});
