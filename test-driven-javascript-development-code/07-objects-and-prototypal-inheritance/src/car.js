/*jslint indent: 2*/
/*globals console*/
var car = {
  model: {
    year: "1998",
    make: "Ford",
    model: "Mondeo"
  },

  color: "Red",
  seats: 5,
  doors: 5,
  accessories: ["Air condition", "Electric Windows"],

  drive: function () {
    console.log("Vroooom!");
  }
};
