/*jslint indent: 2, eqeqeq: false, onevar: false*/
/*globals require, module*/
var http = require("http");
var url = require("url");
var crController = require("chapp/chat_room_controller");
var chatRoom = require("chapp/chat_room");
var paperboy = require("node-paperboy");

var room = Object.create(chatRoom);

module.exports = http.createServer(function (req, res) {
  if (url.parse(req.url).pathname == "/comet") {
    var controller = crController.create(req, res);
    controller.chatRoom = room;
    controller[req.method.toLowerCase()]();
  } else {
    var delivery = paperboy.deliver("public", req, res);

    delivery.otherwise(function () {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write("<h1>Nothing to see here, move along</h1>");
      res.close();
    });
  }
});
