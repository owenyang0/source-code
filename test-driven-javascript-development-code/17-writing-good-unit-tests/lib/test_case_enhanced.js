/*jslint indent: 2, onevar: false, eqeqeq: false*/
/*global TestCase*/
function testCaseEnhanced(name, tests) {
  var testMethods = {};
  var property;

  for (var testName in tests) {
    property = tests[testName];

    if (typeof property == "function" &&
      !/^(setUp|tearDown)$/.test(testName)) {
      testName = "test " + testName;
    }

    testMethods[testName] = property;
  }

  return TestCase(name, testMethods);
}
