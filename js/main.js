(function () {
  var section = document.querySelector(".services-section");
  if (!section) return;

  var targets = Array.prototype.slice.call(section.querySelectorAll("[data-services-reveal]"));
  if (!targets.length) return;

  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  if (!("IntersectionObserver" in window)) return;

  section.classList.add("services-animations-ready");
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      entry.target.classList.toggle("is-services-visible", entry.isIntersecting);
    });
  }, { threshold: 0, rootMargin: "0px 0px -10% 0px" });

  targets.forEach(function (target) { observer.observe(target); });
})();

/* --- Next original inline script --- */

(function () {
  var track = document.querySelector(".services-track");
  if (!track) return;

  var slides = Array.prototype.slice.call(track.querySelectorAll(".service-slide"));
  var dots = Array.prototype.slice.call(document.querySelectorAll("[data-service-dot]"));
  var prev = document.querySelector("[data-service-prev]");
  var next = document.querySelector("[data-service-next]");
  if (!slides.length || !prev || !next) return;

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var currentPage = 0;
  var raf = 0;

  function pageSize() {
    if (!slides[0].offsetWidth) return 1;
    var gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;
    return Math.max(1, Math.floor((track.clientWidth + gap) / (slides[0].offsetWidth + gap)));
  }

  function pageCount() {
    return Math.ceil(slides.length / pageSize());
  }

  function slidePosition(index) {
    var slide = slides[index];
    var position = slide.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
    return Math.max(0, Math.min(position, track.scrollWidth - track.clientWidth));
  }

  function syncControls() {
    var closest = 0;
    var distance = Infinity;
    slides.forEach(function (slide, index) {
      var delta = Math.abs(slidePosition(index) - track.scrollLeft);
      if (delta < distance) { closest = index; distance = delta; }
    });

    var size = pageSize();
    var pages = pageCount();
    currentPage = Math.min(Math.floor(closest / size), pages - 1);
    dots.forEach(function (dot, index) {
      dot.hidden = index >= pages;
      dot.setAttribute("aria-current", index === currentPage ? "true" : "false");
    });
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
  }

  function goToPage(page) {
    currentPage = Math.max(0, Math.min(page, pageCount() - 1));
    var index = Math.min(currentPage * pageSize(), slides.length - 1);
    track.scrollTo({ left: slidePosition(index), behavior: reduceMotion ? "auto" : "smooth" });
    syncControls();
  }

  prev.addEventListener("click", function () { goToPage(currentPage - 1); });
  next.addEventListener("click", function () { goToPage(currentPage + 1); });
  dots.forEach(function (dot, index) {
    dot.addEventListener("click", function () { goToPage(index); });
  });
  track.addEventListener("scroll", function () {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(syncControls);
  }, { passive: true });
  track.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") { event.preventDefault(); goToPage(currentPage - 1); }
    if (event.key === "ArrowRight") { event.preventDefault(); goToPage(currentPage + 1); }
  });
  window.addEventListener("resize", syncControls);
  syncControls();
})();

/* --- Next original inline script --- */

(function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  var container = document.getElementById("hero");
  var mainCard = document.getElementById("main-card");
  var mockup = document.getElementById("mockup");
  if (!container || !mainCard || !mockup) return;
  var reducedMotionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotionPreference.matches) return;
  document.documentElement.classList.add("gsap-enabled");
  gsap.registerPlugin(ScrollTrigger);

  var METRIC_VALUE = 100;
  var RING_CIRCUMFERENCE = 402;
  var ringProgress = { value: 0 };
  var reduceMotion = reducedMotionPreference.matches;
  var raf = 0;

  // 1. Mouse interaction: card sheen follows the pointer, phone tilts toward it.
  window.addEventListener("mousemove", function (e) {
    if (window.scrollY > window.innerHeight * 2) return;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(function () {
      var rect = mainCard.getBoundingClientRect();
      mainCard.style.setProperty("--mouse-x", (e.clientX - rect.left) + "px");
      mainCard.style.setProperty("--mouse-y", (e.clientY - rect.top) + "px");
      if (reduceMotion) return;
      var xVal = (e.clientX / window.innerWidth - 0.5) * 2;
      var yVal = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(mockup, { rotationY: xVal * 12, rotationX: -yVal * 12, ease: "power3.out", duration: 1.2 });
    });
  });

  // 2. Cinematic scroll timeline
  var isMobile = window.innerWidth < 768;

  gsap.context(function () {
    gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
    gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
    gsap.set(".hero-logo", { autoAlpha: 0, y: 30, scale: 0.9 });
    gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
    gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });
    gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

    var introTl = gsap.timeline({ delay: 0.3 });
    introTl
      .to(".hero-logo", { duration: 1.2, autoAlpha: 1, y: 0, scale: 1, ease: "expo.out" }, 0)
      .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" }, 0)
      .to(".text-days", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

    var scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=7000",
        pin: true,
        scrub: 1,
        anticipatePin: 1
      }
    });

    scrollTl
      .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
      .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
      .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
      .fromTo(".mockup-scroll-wrapper",
        { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
        { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8")
      .fromTo(".phone-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 }, "-=1.5")
      .to(ringProgress, {
        value: METRIC_VALUE,
        duration: 2,
        ease: "power3.inOut",
        onUpdate: function () {
          var value = Math.round(ringProgress.value);
          gsap.set(".progress-ring", { strokeDashoffset: RING_CIRCUMFERENCE * (1 - ringProgress.value / 100) });
          document.querySelector(".counter-val").textContent = value;
          if (value >= 100) document.querySelector(".progress-ring").classList.add("is-complete");
        }
      }, "-=1.2")
      .fromTo(".floating-badge", { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 }, "-=2.0")
      .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
      .fromTo(".card-right-text", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
      .to({}, { duration: 2.5 })
      .set(".hero-text-wrapper", { autoAlpha: 0 })
      .set(".cta-wrapper", { autoAlpha: 1 })
      .to({}, { duration: 1.5 })
      .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
        scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05
      })
      .to(".hero-video-layer", { autoAlpha: 0, duration: 1.2, ease: "power2.out" }, "<")
      .to(".main-card", {
        width: isMobile ? "92vw" : "85vw",
        height: isMobile ? "92vh" : "85vh",
        borderRadius: isMobile ? "32px" : "40px",
        ease: "expo.inOut",
        duration: 1.8
      }, "pullback")
      .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
      .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 })
      .set(".main-card", { autoAlpha: 0 })
      .addLabel("about");
  }, container);

  window.addEventListener("load", function () { ScrollTrigger.refresh(); });

  // Placeholder links are intentionally inert until real destinations exist.
  document.querySelectorAll('a[href="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); });
  });
})();

/* --- Next original inline script --- */

(function () {
  var hero = document.getElementById("hero");
  var video = document.getElementById("heroVideo");
  var control = document.querySelector(".hero-video-control");
  if (!hero || !video || !control) return;

  var playIcon = control.querySelector(".hero-video-play-icon");
  var pauseIcon = control.querySelector(".hero-video-pause-icon");
  var label = control.querySelector(".hero-video-control-label");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var userPaused = reduceMotion.matches;
  var heroVisible = true;

  function syncControl(isPlaying) {
    control.hidden = false;
    playIcon.hidden = isPlaying;
    pauseIcon.hidden = !isPlaying;
    control.setAttribute("aria-pressed", String(!isPlaying));
    control.setAttribute("aria-label", isPlaying ? "Pause hero background video" : "Play hero background video");
    control.title = isPlaying ? "Pause background video" : "Play background video";
    label.textContent = isPlaying ? "Pause motion" : "Play motion";
  }

  function syncPlayback() {
    if (userPaused || !heroVisible || document.hidden) {
      video.pause();
      if (userPaused) syncControl(false);
      return;
    }
    var playRequest = video.play();
    if (playRequest && typeof playRequest.catch === "function") {
      playRequest.catch(function () { syncControl(false); });
    }
  }

  control.addEventListener("click", function () {
    userPaused = !video.paused;
    syncPlayback();
  });

  video.addEventListener("play", function () { syncControl(true); });
  video.addEventListener("pause", function () { syncControl(false); });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      heroVisible = entries.some(function (entry) { return entry.isIntersecting; });
      syncPlayback();
    }, { threshold: 0.05 });
    observer.observe(hero);
  }

  document.addEventListener("visibilitychange", syncPlayback);
  if (reduceMotion.addEventListener) {
    reduceMotion.addEventListener("change", function (event) {
      if (event.matches) userPaused = true;
      syncPlayback();
    });
  }

  syncPlayback();
})();

/* --- Next original inline script --- */

(function () {
  var nav = document.querySelector(".main-glass-nav");
  if (!nav) return;

  var toggle = nav.querySelector(".main-nav-toggle");
  var links = Array.from(nav.querySelectorAll(".main-nav-link"));
  var navList = nav.querySelector(".main-nav-list");
  var indicator = nav.querySelector(".main-nav-indicator");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var aboutScroll = null;
  var navSpyFrame = 0;
  var pendingNavigation = null;
  var pendingNavigationTimer = 0;

  function moveIndicator() {
    var active = links.find(function (link) { return link.getAttribute("aria-current") === "page"; });
    if (!active || !indicator) return;
    var listRect = navList.getBoundingClientRect();
    var activeRect = active.getBoundingClientRect();
    if (!listRect.width || !activeRect.width) return;
    indicator.style.width = activeRect.width + "px";
    indicator.style.height = activeRect.height + "px";
    indicator.style.transform = "translate(" + (activeRect.left - listRect.left) + "px, " + (activeRect.top - listRect.top) + "px)";
  }

  function getAboutScroll() {
    var trigger = getHeroTrigger();
    if (!trigger) return null;
    var aboutPosition = trigger.labelToScroll("about");
    return Number.isFinite(aboutPosition) ? aboutPosition : null;
  }

  function getHeroTrigger() {
    if (!window.ScrollTrigger) return null;
    return ScrollTrigger.getAll().find(function (item) {
      return item.trigger && item.trigger.id === "hero";
    }) || null;
  }

  function setActive(id) {
    links.forEach(function (link) {
      if (link.getAttribute("href") === "#" + id) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    moveIndicator();
  }

  function clearPendingNavigation() {
    pendingNavigation = null;
    window.clearTimeout(pendingNavigationTimer);
    pendingNavigationTimer = 0;
  }

  function updateActive() {
    navSpyFrame = 0;
    var services = document.getElementById("services");
    if (pendingNavigation && Math.abs(window.scrollY - pendingNavigation.position) > 48) return;
    if (pendingNavigation) clearPendingNavigation();
    var trigger = getHeroTrigger();
    aboutScroll = getAboutScroll();
    if (trigger && window.scrollY >= trigger.start && window.scrollY < trigger.end) {
      setActive(aboutScroll !== null && window.scrollY >= aboutScroll - 2 ? "about" : "hero");
    } else if (services && window.scrollY >= services.offsetTop - window.innerHeight * 0.35) {
      setActive("services");
    } else if (aboutScroll !== null && window.scrollY >= aboutScroll) {
      setActive("about");
    } else {
      setActive("hero");
    }
  }

  function scheduleActiveUpdate() {
    if (navSpyFrame) return;
    navSpyFrame = window.requestAnimationFrame(updateActive);
  }

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) requestAnimationFrame(moveIndicator);
  });

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      var id = link.getAttribute("href").slice(1);
      var target = id === "about" ? document.querySelector(".cta-wrapper") : document.getElementById(id);
      if (!target) return;
      event.preventDefault();

      var destination = id === "hero" ? 0 : (id === "about" ? getAboutScroll() : null);
      if (destination === null) {
        destination = target.getBoundingClientRect().top + window.scrollY;
      }
      clearPendingNavigation();
      pendingNavigation = { id: id, position: destination };
      pendingNavigationTimer = window.setTimeout(function () {
        clearPendingNavigation();
        updateActive();
      }, 10000);
      setActive(id);
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      history.replaceState(null, "", "#" + id);

      window.scrollTo({ top: destination, behavior: reducedMotion.matches ? "auto" : "smooth" });
    });
  });

  document.addEventListener("click", function (event) {
    if (!nav.contains(event.target)) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  });

  window.addEventListener("scroll", scheduleActiveUpdate, { passive: true });
  ["wheel", "touchstart"].forEach(function (eventName) {
    window.addEventListener(eventName, function () {
      if (!pendingNavigation) return;
      clearPendingNavigation();
      scheduleActiveUpdate();
    }, { passive: true });
  });
  window.addEventListener("scrollend", function () {
    if (!pendingNavigation) return;
    clearPendingNavigation();
    scheduleActiveUpdate();
  });
  window.addEventListener("resize", updateActive);
  window.addEventListener("resize", moveIndicator);
  window.addEventListener("load", updateActive);
  window.addEventListener("load", moveIndicator);
  if (window.ResizeObserver) {
    var navResizeObserver = new ResizeObserver(moveIndicator);
    navResizeObserver.observe(navList);
    links.forEach(function (link) { navResizeObserver.observe(link); });
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveIndicator);
  if (window.ScrollTrigger) ScrollTrigger.addEventListener("refresh", scheduleActiveUpdate);
  updateActive();
  moveIndicator();
  requestAnimationFrame(function () { requestAnimationFrame(moveIndicator); });
})();

/* --- Next original inline script --- */

(function () {
  var dialog = document.getElementById("coming-soon-dialog");
  if (!dialog || typeof dialog.showModal !== "function") return;

  document.querySelectorAll("[data-coming-soon]").forEach(function (button) {
    button.addEventListener("click", function () { dialog.showModal(); });
  });

  dialog.querySelector("[data-close-coming-soon]").addEventListener("click", function () {
    dialog.close();
  });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });
})();
