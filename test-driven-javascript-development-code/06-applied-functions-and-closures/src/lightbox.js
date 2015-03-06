/*jslint indent: 2, browser: true, onevar: false, plusplus: false*/
/*globals ajax, lightboxController*/

// Pseudo-code: Won't run
var tddjs = {
  lightbox: {
    open: function () {
      ajax.loadFragment(this.url, {
        target: this.create()
      });

      return false;
    },

    close: function () { /* ... */ },
    destroy: function () { /* ... */ },

    create: function () {
      /* Create or return container */
    }
  },

  anchorLightbox: function (anchor, options) {
    var lb = Object.create(tddjs.lightbox);
    lb.url = anchor.href;
    lb.title = anchor.title || anchor.href;
    Object.extend(lb, options);

    anchor.onclick = lb.open.bind(lb);

    return lb;
  }
};

(function () {
  var anchors = document.getElementsByTagName("a");
  var regexp = /(^|\s)lightbox(\s|$)/;

  for (var i = 0, l = anchors.length; i < l; i++) {
    if (regexp.test(anchors[i].className)) {
      tddjs.anchorLightbox(anchors[i]);
    }
  }
}());

(function () {
  var anchors = document.getElementsByTagName("a");
  var controller = Object.create(lightboxController);
  var regexp = /(^|\s)lightbox(\s|$)/;

  for (var i = 0, l = anchors.length; i < l; i++) {
    if (regexp.test(anchors[i].className)) {
      (function (anchor) {
        anchor.onclick = function () {
          controller.open(anchor);
          return false;
        };
      }(anchors[i]));
    }
  }
}());
