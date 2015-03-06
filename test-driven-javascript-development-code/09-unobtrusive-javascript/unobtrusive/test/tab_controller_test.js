/*jslint indent: 2, browser: true*/
/*globals TestCase, tddjs, assertException, assertObject, assertClassName, assertNoMatch, assertNoException, assertSame*/
(function () {
  var tabController = tddjs.ui.tabController;

  // All test cases can share this setUp
  function setUp() {
    /*:DOC += <ol id="tabs">
          <li><a href="#news">News</a></li>
          <li><a href="#sports">Sports</a></li>
          <li><a href="#economy">Economy</a></li>
        </ol>*/

    this.tabs = document.getElementById("tabs");
  }

  TestCase("TabControllerCreateTest", {
    setUp: setUp,

    "test should fail without element": function () {
      assertException(function () {
        tabController.create();
      }, "TypeError");
    },

    "test should fail without element class": function () {
      assertException(function () {
        tabController.create({});
      }, "TypeError");
    },

    "should return object": function () {
      var controller = tabController.create(this.tabs);

      assertObject(controller);
    },

    "test should add js-tabs class name to element":
    function () {
      var tabs = tabController.create(this.tabs);

      assertClassName("js-tab-controller", this.tabs);
    }

    // Test for event handlers, explained later
  });

  TestCase("TabbedControllerActivateTabTest", {
    setUp: function () {
      setUp.call(this);
      this.controller = tabController.create(this.tabs);
      this.links = this.tabs.getElementsByTagName("a");
      this.lis = this.tabs.getElementsByTagName("li");
    },

    "test should not fail without anchor": function () {
      var controller = this.controller;

      assertNoException(function () {
        controller.activateTab();
      });
    },

    "test should mark anchor as active": function () {
      this.controller.activateTab(this.links[0]);

      assertClassName("active-tab", this.links[0]);
    },

    "test should deactivate previous tab": function () {
      this.controller.activateTab(this.links[0]);
      this.controller.activateTab(this.links[1]);

      assertNoMatch(/(^|\s)active-tab(\s|$)/, this.links[0]);
      assertClassName("active-tab", this.links[1]);
    },

    "test should not activate unsupported element types":
    function () {
      this.controller.activateTab(this.links[0]);
      this.controller.activateTab(this.lis[0]);

      assertNoMatch(/(^|\s)active-tab(\s|$)/, this.lis[0]);
      assertClassName("active-tab", this.links[0]);
    },

    "test should fire onTabChange": function () {
      var actualPrevious, actualCurrent;
      this.controller.activateTab(this.links[0]);
      this.controller.onTabChange = function (curr, prev) {
        actualPrevious = prev;
        actualCurrent = curr;
      };

      this.controller.activateTab(this.links[1]);

      assertSame(actualPrevious, this.links[0]);
      assertSame(actualCurrent, this.links[1]);
    }
  });
}());
