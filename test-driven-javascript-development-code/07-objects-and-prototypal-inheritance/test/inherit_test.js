/*jslint indent: 2, onevar: false, nomen: false*/
/*globals TestCase, assertTrue, assertEquals, _super*/
function Person(name) {
  this.name = name;
}

Person.prototype = {
  constructor: Person,

  getName: function () {
    return this.name;
  },

  speak: function () {
    return "Hello";
  }
};

TestCase("FunctionInheritTest", {
  "test should link prototypes": function () {
    var SubFn = function () {};
    var SuperFn = function () {};
    SubFn.inherit(SuperFn);

    assertTrue(new SubFn() instanceof SuperFn);
  },

  "test should set up link to super": function () {
    var SubFn = function () {};
    var SuperFn = function () {};
    SubFn.inherit(SuperFn);

    assertEquals(SuperFn.prototype, SubFn.prototype._super);
  },

  "test should access super method with helper": function () {
    function LoudPerson(name) {
      this._super.constructor.call(this, name);
    }

    LoudPerson.inherit(Person);

    LoudPerson.prototype.getName = function () {
      return _super(this, "getName").toUpperCase();
    };

    LoudPerson.prototype.say = function (words) {
      return _super(this, "speak", words) + "!!!";
    };

    var np = new LoudPerson("Chris");

    assertEquals("CHRIS", np.getName());
    assertEquals("Hello!!!", np.say("Hello"));
  }
});
