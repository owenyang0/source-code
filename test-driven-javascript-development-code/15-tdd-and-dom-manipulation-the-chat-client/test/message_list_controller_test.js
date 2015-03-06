/*jslint indent: 2, onevar: false*/
/*globals tddjs, stubFn, TestCase, assert, assertObject, assertFunction, assertSame, assertEquals, assertClassName*/
(function () {
  var listController = tddjs.chat.messageListController;

  function messageListControllerSetUp() {
    /*:DOC element = <dl></dl> */

    this.controller = Object.create(listController);
    this.model = { observe: stubFn() };
  }

  TestCase("MessageListControllerTest", {
    "test should be object": function () {
      assertObject(listController);
    },

    "test should have setModel method": function () {
      assertFunction(listController.setModel);
    }
  });

  TestCase("MessageListControllerSetModelTest", {
    setUp: messageListControllerSetUp,

    "test should observe model's message channel": function () {
      this.controller.setModel(this.model);

      assert(this.model.observe.called);
      assertEquals("message", this.model.observe.args[0]);
      assertFunction(this.model.observe.args[1]);
    },

    "test should observe with bound addMessage": function () {
      var stub = this.controller.addMessage = stubFn();

      this.controller.setModel(this.model);
      this.model.observe.args[1]();

      assert(stub.called);
      assertSame(this.controller, stub.thisValue);
    }
  });

  TestCase("MessageListControllerSetViewTest", {
    setUp: messageListControllerSetUp,

    "test should set class to js-chat": function () {
      this.controller.setView(this.element);

      assertClassName("js-chat", this.element);
    }
  });

  TestCase("MessageListControllerAddMessageTest", {
    setUp: function () {
      messageListControllerSetUp.call(this);
      this.controller.setModel(this.model);
      this.controller.setView(this.element);
    },

    "test should add dt element with @user": function () {
      this.controller.setModel(this.model);
      this.controller.setView(this.element);

      this.controller.addMessage({
        user: "Eric",
        message: "We are trapper keeper"
      });

      var dts = this.element.getElementsByTagName("dt");
      assertEquals(1, dts.length);
      assertEquals("@Eric", dts[0].innerHTML);
    },

    "test should add dd element with message": function () {
      this.controller.addMessage({
        user: "Theodore",
        message: "We are one"
      });

      var dds = this.element.getElementsByTagName("dd");
      assertEquals(1, dds.length);
      assertEquals("We are one", dds[0].innerHTML);
    },

    "test should escape HTML in messages": function () {
      this.controller.addMessage({
        user: "Dr. Evil",
        message: "<script>window.alert('p4wned!');</script>"
      });

      var expected = "&lt;script&gt;window.alert('p4wned!');" +
        "&lt;/script&gt;";
      var dd = this.element.getElementsByTagName("dd")[0];
      assertEquals(expected, dd.innerHTML);
    },

    "test should not repeat same user dt's": function () {
      this.controller.addMessage({
        user: "Kyle",
        message: "One-two-three not it!"
      });

      this.controller.addMessage({
        user: "Kyle",
        message: ":)"
      });

      var dts = this.element.getElementsByTagName("dt");
      var dds = this.element.getElementsByTagName("dd");
      assertEquals(1, dts.length);
      assertEquals(2, dds.length);
    },

    "test should scroll element down": function () {
      var element = {
        appendChild: stubFn(),
        scrollHeight: 1900
      };

      this.controller.setView(element);
      this.controller.addMessage({ user:"me",message:"Hey" });

      assertEquals(1900, element.scrollTop);
    }
  });
}());
