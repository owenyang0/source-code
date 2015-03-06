/*jslint indent: 2, nomen: false*/
/*globals Circle*/
function Sphere(radius) {
  Circle.call(this, radius);
}

Sphere.inherit2(Circle, {
  area: function () {
    return 4 * this._super();
  }
});
