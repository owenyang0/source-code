/*jslint indent: 2, browser: true, onevar: false, eqeqeq: false*/
/*globals tddjs*/
(function () {
  if (typeof tddjs == "undefined" ||
      typeof document == "undefined" ||
      !document.createElement) {
    return;
  }

  var element = document.createElement("dl");

  if (!element.appendChild ||
      typeof element.innerHTML != "string") {
    return;
  }

  element = null;
  var chat = tddjs.namespace("chat");

  function setModel(model) {
    model.observe("message", this.addMessage.bind(this));
  }

  function setView(element) {
    element.className = "js-chat";
    this.view = element;
  }

  function addMessage(message) {
    if (this.prevUser != message.user) {
      var user = document.createElement("dt");
      user.innerHTML = "@" + message.user;
      this.view.appendChild(user);
      this.prevUser = message.user;
    }

    var msg = document.createElement("dd");
    msg.innerHTML = message.message.replace(/</g, "&lt;");
    this.view.appendChild(msg);
    this.view.scrollTop = this.view.scrollHeight;
  }

  chat.messageListController = {
    setModel: setModel,
    setView: setView,
    addMessage: addMessage
  };
}());
