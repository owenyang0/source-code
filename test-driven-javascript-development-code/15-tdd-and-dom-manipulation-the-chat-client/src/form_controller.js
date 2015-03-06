/*jslint indent: 2, onevar: false, eqeqeq: false*/
/*globals tddjs*/
(function () {
  if (typeof tddjs == "undefined") {
    return;
  }

  var dom = tddjs.dom;
  var chat = tddjs.namespace("chat");

  if (!dom || !dom.addEventHandler ||
      !Function.prototype.bind) {
    return;
  }

  function setView(element) {
    element.className = "js-chat";
    var handler = this.handleSubmit.bind(this);
    dom.addEventHandler(element, "submit", handler);
    this.view = element;
  }

  function setModel(model) {
    this.model = model;
  }

  chat.formController = {
    setView: setView,
    setModel: setModel
  };
}());
