/*jslint indent: 2*/
if (!String.prototype.trim) {
  String.prototype.trim = function trim() {
    return this.replace(/^\s+|\s+$/g, "");
  };
}
