/*jslint indent: 2*/
/*globals assert, testCase*/
testCase("strftime test", {
  setUp: function () {
    this.date = new Date(2009, 9, 2, 22, 14, 45);
  },

  "test format specifier %Y": function () {
    assert("%Y should return full year",
           Date.formats.Y(this.date) === 2009);
  },

  "test format specifier %m": function () {
    assert("%m should return month",
           Date.formats.m(this.date) === "10");
  },

  "test format specifier %d": function () {
    assert("%d should return date",
           Date.formats.d(this.date) === "02");
  },

  "test format specifier %y": function () {
    assert("%y should return year as two digits",
           Date.formats.y(this.date) === "09");
  },

  "test format shorthand %F": function () {
    assert("%F should be shortcut for %Y-%m-%d",
           Date.formats.F === "%Y-%m-%d");
  }
});
