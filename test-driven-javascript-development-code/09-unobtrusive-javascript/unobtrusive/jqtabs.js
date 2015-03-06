jQuery.fn.tabs = function () {
  jQuery(this).
    addClass("js-tabs").
    find("> ol:first a").
    live("click", function () {
      var a = jQuery(this);
      a.parents("ol").find("a").removeClass("active-tab");
      a.addClass("active-tab");

      jQuery("[name="+this.href.replace(/^.*#/, "") + "]").
        parents("div").
        addClass("active-panel").
        siblings("div.section").
        removeClass("active-panel");
  });

  return this;
};
