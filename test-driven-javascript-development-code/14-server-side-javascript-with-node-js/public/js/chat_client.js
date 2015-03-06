(function () {
  if (typeof tddjs == "undefined" ||
      typeof document == "undefined") {
    return;
  }

  var c = tddjs.namespace("chat");

  if (!document.getElementById || !tddjs ||
      !c.userFormController || !c.messageListController ||
      !c.messageFormController) {
    alert("Browser is not supported");
    return;
  }

  var model = Object.create(tddjs.ajax.cometClient);
  model.url = "/comet";

  var userForm = document.getElementById("userForm");
  var userController = Object.create(c.userFormController);
  userController.setModel(model);
  userController.setView(userForm);

  userController.observe("user", function (user) {
    var messages = document.getElementById("messages");
    var messagesController = Object.create(c.messageListController);
    messagesController.setModel(model);
    messagesController.setView(messages);

    var mForm = document.getElementById("messageForm");
    var messageFormController = Object.create(c.messageFormController);
    messageFormController.setModel(model);
    messageFormController.setView(mForm);

    model.connect();
  });
}());
