/*jslint indent: 2, browser: true, eqeqeq: false*/
/*globals tddjs*/
(function () {
  if (typeof tddjs == "undefined" ||
      typeof document == "undefined") {
    return;
  }

  var chat = tddjs.namespace("chat");

  if (!chat.formController ||
      !document.getElementsByTagName) {
    return;
  }

  function handleSubmit(event) {
    event.preventDefault();
    var input = this.view.getElementsByTagName("input")[0];

    if (!input.value) {
      return;
    }

    this.model.notify("message", {
      user: this.model.currentUser,
      message: input.value
    });

    input.value = "";
  }

  chat.messageFormController = Object.create(chat.formController);
  chat.messageFormController.handleSubmit = handleSubmit;
}());
