/*jslint indent: 2*/
function Circle(radius) {
  if (!(this instanceof Circle)) {
    return new Circle(radius);
  }

  this.radius = radius;
}

(function (p) {
  function diameter() {
    return this.radius * 2;
  }

  function circumference() {
    return this.diameter() * Math.PI;
  }

  function area() {
    return this.radius * this.radius * Math.PI;
  }

  p.diameter = diameter;
  p.circumference = circumference;
  p.area = area;
}(Circle.prototype));
