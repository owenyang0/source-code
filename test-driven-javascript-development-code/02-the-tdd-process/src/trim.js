/*jslint indent: 2*/
String.prototype.trim = function () {
  return this.replace(/^\s+|\s+$/, "");
};
