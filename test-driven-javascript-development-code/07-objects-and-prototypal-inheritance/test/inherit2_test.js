/*jslint indent: 2, onevar: false, nomen: false*/
/*globals TestCase, assertEquals*/
TestCase("Inherit2Test", {
  "test super should call method of same name on protoype":
  function () {
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

    function LoudPerson(name) {
      Person.call(this, name);
    }

    LoudPerson.inherit2(Person, {
      getName: function () {
        return this._super().toUpperCase();
      },

      speak: function () {
        return this._super() + "!!!";
      }
    });

    var np = new LoudPerson("Chris");

    assertEquals("CHRIS", np.getName());
    assertEquals("Hello!!!", np.speak());
  }
});
