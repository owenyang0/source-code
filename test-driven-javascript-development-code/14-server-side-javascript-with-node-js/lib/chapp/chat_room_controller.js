/*jslint indent: 2, onevar: false*/
/*globals require, module*/
require("function-bind");

var chatRoomController = {
  create: function (request, response) {
    return Object.create(this, {
      request: { value: request },
      response: { value: response }
    });
  },

  post: function () {
    var body = "";

    this.request.addListener("data", function (chunk) {
      body += chunk;
    });

    this.request.addListener("end", function () {
      var data = JSON.parse(decodeURI(body)).data;

      this.chatRoom.addMessage(
        data.user, data.message
      ).then(function () {
        this.response.writeHead(201);
        this.response.end();
      }.bind(this));
    }.bind(this));
  },

  get: function () {
    var id = this.request.headers["x-access-token"] || 0;
    var wait = this.chatRoom.waitForMessagesSince(id);

    wait.then(function (messages) {
      this.respond(201, {
        message: messages,
        token: messages[messages.length - 1].id
      });
    }.bind(this));
  },

  respond: function (status, data) {
    var strData = JSON.stringify(data) || "{}";

    this.response.writeHead(status, {
      "Content-Type": "application/json",
      "Content-Length": strData.length
    });

    this.response.write(strData);
    this.response.end();
  }
};

module.exports = chatRoomController;
