/*jslint indent: 2, onevar: false*/
/*globals YUI*/
YUI({
  combine: true,
  timeout: 10000
}).use("node", "console", "test", function (Y) {
  var assert = Y.Assert;

  var strftimeTestCase = new Y.Test.Case({
    // test case name - if not provided, one is generated
    name: "Date.prototype.strftime Tests",

    setUp: function () {
      this.date = new Date(2009, 9, 2, 22, 14, 45);
    },

    tearDown: function () {
      delete this.date;
    },

    "test %Y should return full year": function () {
      var year = Date.formats.Y(this.date);

      assert.isNumber(year);
      assert.areEqual(2009, year);
    },

    "test %m should return month": function () {
      var month = Date.formats.m(this.date);

      assert.isString(month);
      assert.areEqual("10", month);
    },

    "test %d should return date": function () {
      assert.areEqual("02", Date.formats.d(this.date));
    },

    "test %y should return year as two digits": function () {
      assert.areEqual("09", Date.formats.y(this.date));
    },

    "test %F should act as %Y-%m-%d": function () {
      assert.areEqual("2009-10-02", this.date.strftime("%F"));
    }
  });

  //create the console
  var r = new Y.Console({
    newestOnTop : false,
    style: 'block'
  });

  r.render("#testReport");
  Y.Test.Runner.add(strftimeTestCase);
  Y.Test.Runner.run();
});
