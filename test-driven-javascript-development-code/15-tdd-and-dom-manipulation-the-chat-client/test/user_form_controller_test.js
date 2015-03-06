/*jslint indent: 2, onevar: false*/
/*globals tddjs, stubFn, TestCase, assert, assertObject, assertFunction, assertClassName, assertSame, assertEquals, assertFalse*/
(function () {
  var userController = tddjs.chat.userFormController;
  var dom = tddjs.namespace("dom");

  function userFormControllerSetUp() {
    /*:DOC element = <form>
        <fieldset>
          <label for="username">Username</label>
          <input type="text" name="username" id="username">
          <input type="submit" value="Enter">
        </fieldset>
      </form> */

    this.controller = Object.create(userController);
    dom.addEventHandler = stubFn();
    this.event = { preventDefault: stubFn() };
  }

  TestCase("UserFormControllerTest", {
    "test should be object": function () {
      assertObject(userController);
    },

    "test should have setView method": function () {
      assertFunction(userController.setView);
    }
  });

  TestCase("UserFormControllerSetViewTest", {
    setUp: userFormControllerSetUp,

    "test should add js-chat class": function () {
      this.controller.setView(this.element);

      assertClassName("js-chat", this.element);
    },

    "test should handle submit event": function () {
      this.controller.setView(this.element);

      assert(dom.addEventHandler.called);
      assertSame(this.element, dom.addEventHandler.args[0]);
      assertEquals("submit", dom.addEventHandler.args[1]);
      assertFunction(dom.addEventHandler.args[2]);
    },

    "test should handle event with bound handleSubmit": function () {
      var stub = this.controller.handleSubmit = stubFn();

      this.controller.setView(this.element);
      dom.addEventHandler.args[2]();

      assert(stub.called);
      assertSame(this.controller, stub.thisValue);
    }
  });

  TestCase("UserFormControllerHandleSubmitTest", {
    setUp: function () {
      userFormControllerSetUp.call(this);
      this.input = this.element.getElementsByTagName("input")[0];
      this.model = {};
      this.controller.setModel(this.model);
      this.controller.setView(this.element);
    },

    "test should prevent event default action": function () {
      this.controller.handleSubmit(this.event);

      assert(this.event.preventDefault.called);
    },

    "test should set model.currentUser": function () {
      this.input.value = "cjno";

      this.controller.handleSubmit(this.event);

      assertEquals("cjno", this.model.currentUser);
    },

    "test should notify observers of username": function () {
      this.input.value = "Bullrog";
      var observer = stubFn();

      this.controller.observe("user", observer);
      this.controller.handleSubmit(this.event);

      assert(observer.called);
      assertEquals("Bullrog", observer.args[0]);
    },

    "test should remove class when successful": function () {
      this.input.value = "Sharuhachi";

      this.controller.handleSubmit(this.event);

      assertEquals("", this.element.className);
    },

    "test should not notify observers of empty username": function () {
      var observer = stubFn();
      this.controller.observe("user", observer);

      this.controller.handleSubmit(this.event);

      assertFalse(observer.called);
    }
  });
}());
