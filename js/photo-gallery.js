(function () {
  "use strict";

  var gallery = document.querySelector(".photo-gallery");
  if (!gallery) return;

  var toggle = gallery.querySelector(".photo-gallery-toggle");
  var back = gallery.querySelector(".photo-gallery-back");
  var grid = gallery.querySelector(".photo-gallery-grid");
  if (!toggle || !back || !grid) return;

  function setExpanded(expanded) {
    gallery.dataset.expanded = String(expanded);
    grid.hidden = !expanded;
    toggle.hidden = expanded;
    toggle.setAttribute("aria-expanded", String(expanded));
    back.hidden = !expanded;
    toggle.setAttribute("aria-label", expanded ? "Close clinic photo gallery" : "Open clinic photo gallery");
    if (!expanded) toggle.focus();
  }

  toggle.addEventListener("click", function () { setExpanded(true); });
  back.addEventListener("click", function () { setExpanded(false); });

  document.addEventListener("keydown", function (event) {
    if (!gallery.matches('[data-expanded="true"]')) return;
    if (event.key === "Escape") {
      setExpanded(false);
      return;
    }
    if (event.key === "Tab" && event.shiftKey && document.activeElement === back) {
      event.preventDefault();
      var lastImage = grid.querySelector("figure:last-child img");
      if (lastImage) lastImage.focus();
    }
  });

  document.addEventListener("pointerdown", function (event) {
    if (gallery.dataset.expanded === "true" && !gallery.contains(event.target)) setExpanded(false);
  });
})();