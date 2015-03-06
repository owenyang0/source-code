/*jslint indent: 2*/
/*globals assert, testCase*/
testCase("String trim test", {
  "test trim should remove leading white-space":
  function () {
    assert("should remove leading white-space",
           "a string" === "   a string".trim());
  },

  "test trim should remove trailing white-space":
  function () {
    assert("should remove trailing white-space",
           "a string" === "a string   ".trim());
  }
});
