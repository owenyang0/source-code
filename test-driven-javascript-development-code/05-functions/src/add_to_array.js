/*jslint indent: 2, onevar: false*/
function addToArray() {
  var targetArr = arguments[0]; 
  arguments.slice = Array.prototype.slice;
  var add = arguments.slice(1);

  return targetArr.concat(add);
}
