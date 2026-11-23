# Alpha Delta Veterinary Clinic

A static, responsive single-page clinic site with a premium blue visual identity, animated hero, service carousel, accessible navigation, and a separate glass-navigation demo.

## Run locally

Open `index.html` in a modern browser. No build step, package installation, or database is required. For reliable video playback and local asset loading, serve this folder using a static HTTP server.

## Current page functionality

- Responsive navigation with mobile toggle, keyboard access, and visible focus styles.
- Home, About Us, and Services content, including six service cards and carousel controls.
- Native “Coming Soon” dialog on the current calls to action.
- Hero background video with playback control and reduced-motion handling.
- Scroll-driven hero effects use GSAP and ScrollTrigger from a CDN; primary content remains visible if those scripts fail to load.
- Main styles/scripts: `css/style.css` and `js/main.js`. Standalone navigation demo: `menu-bars/glass-navbar.html`, with adjacent CSS and JS.

There is **no appointment form** on the current page. The navigation demo is separate from the clinic site.

## Before launch

Confirm the clinic's approved address, phone, hours, emergency instructions, service copy, and media rights. Add a canonical URL and production social-sharing URL/image once the public domain and preferred share asset are known.

This is a static frontend: it has no backend, appointment intake, availability checking, or appointment storage.
