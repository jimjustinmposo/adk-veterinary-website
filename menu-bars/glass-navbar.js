(function () {
  const nav = document.querySelector('.glass-nav');
  const list = nav.querySelector('.nav-list');
  const track = nav.querySelector('.track');
  const indicator = nav.querySelector('.indicator');
  const links = [...nav.querySelectorAll('.nav-link')];
  let active = links[0];
  let lockUntil = 0;

  function moveIndicator() {
    // offsetLeft/offsetWidth ignore hover/press transforms, so the pill never drifts.
    // The link's offsetParent is the list, and the list sits inside the track.
    const x = list.offsetLeft + active.offsetLeft;
    indicator.style.width = active.offsetWidth + 'px';
    indicator.style.transform = 'translateX(' + x + 'px)';
  }

  function setActive(link) {
    if (link === active) return;
    links.forEach(l => l.removeAttribute('aria-current'));
    link.setAttribute('aria-current', 'page');
    active = link;
    moveIndicator();
  }

  // initial position (no animation on first paint)
  indicator.style.transition = 'none';
  moveIndicator();
  requestAnimationFrame(() => requestAnimationFrame(() => (indicator.style.transition = '')));

  // follow size changes (mobile label expand, window resize, font load)
  const ro = new ResizeObserver(moveIndicator);
  links.forEach(l => ro.observe(l));
  ro.observe(track);
  // re-sync when a mobile label finishes expanding/collapsing
  nav.addEventListener('transitionend', e => {
    if (e.target.classList.contains('label')) moveIndicator();
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveIndicator);
  window.addEventListener('resize', moveIndicator);
  window.addEventListener('load', moveIndicator);

  // click: ripple + set active + smooth scroll
  links.forEach(link => {
    link.addEventListener('click', e => {
      const rect = link.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const r = document.createElement('span');
      r.className = 'ripple';
      r.style.width = r.style.height = size + 'px';
      r.style.left = (e.clientX - rect.left - size / 2) + 'px';
      r.style.top = (e.clientY - rect.top - size / 2) + 'px';
      link.appendChild(r);
      r.addEventListener('animationend', () => r.remove());

      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        lockUntil = Date.now() + 800; // ignore scroll-spy while smooth scrolling
        setActive(link);
        target.scrollIntoView({ behavior: 'smooth' });
        history.replaceState(null, '', link.getAttribute('href'));
      }
    });
  });

  // scroll spy
  const spy = new IntersectionObserver(entries => {
    if (Date.now() < lockUntil) return;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const link = links.find(l => l.getAttribute('href') === '#' + entry.target.id);
        if (link) setActive(link);
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });
  links.forEach(l => {
    const sec = document.querySelector(l.getAttribute('href'));
    if (sec) spy.observe(sec);
  });

  // glass gets stronger after scrolling
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // arrow-key navigation
  nav.addEventListener('keydown', e => {
    const i = links.indexOf(document.activeElement);
    if (i < 0) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); links[(i + 1) % links.length].focus(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); links[(i - 1 + links.length) % links.length].focus(); }
  });
})();
