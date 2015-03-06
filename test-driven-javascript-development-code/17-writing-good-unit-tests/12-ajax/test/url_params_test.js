/*jslint indent: 2, onevar: false*/
/*globals TestCase, assertEquals, tddjs*/
TestCase("UrlParamsTest", {
  "test should encode object as string":
  function () {
    var object = { field1: "$13", field2: "Lots of data!" };
    var expected = "field1=%2413&field2=Lots%20of%20data!";
    expected = expected.split("&").sort();

    var actual = tddjs.util.urlParams(object).split("&").sort();

    assertEquals(expected, actual);
  },

  "test should return empty string for no arguments":
  function () {
    var actual = tddjs.util.urlParams();

    assertEquals("", actual);
  },

  "test should return empty string for null":
  function () {
    var actual = tddjs.util.urlParams(null);

    assertEquals("", actual);
  }
});
