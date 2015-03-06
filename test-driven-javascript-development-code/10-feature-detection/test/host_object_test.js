/*jslint indent: 2, onevar: false, browser: true*/
/*globals TestCase, assertException, assertEquals, ActiveXObject*/
TestCase("HostObjectTest", {
  "test IE host object behavior": function () {
    var xhr = new ActiveXObject("Microsoft.XMLHTTP");

    assertException(function () {
      if (xhr.open) {
        // Expectation: property exists
        // Reality: exception is thrown
      }
    });

    assertEquals("unknown", typeof xhr.open);

    var element = document.createElement("div");
    assertEquals("unknown", typeof element.offsetParent);

    assertException(function () {
      var parent = element.offsetParent;
    });
  }
});
