# Alpha Delta Veterinary Clinic

A responsive, single-page veterinary clinic landing page (Home, Services, About Us, Book Appointment, Contact) with a premium blue healthcare design, scroll-scrubbed hero media, and an appointment-request form that opens a WhatsApp draft for the visitor to review and send.

## Run locally

Open `index.html` in a modern browser. No build step, package installation, server, or database is required for this static preview.

## What works

- Responsive navigation (mobile menu, keyboard-operable, visible focus).
- Home / Services / About Us / Book Appointment / Contact sections.
- Appointment-request form with client-side validation and preserved input on error.
- On valid submission, builds a WhatsApp click-to-chat draft for `+971 50 190 5318` (`971501905318`) and opens it in a new tab. The visitor must review and tap **Send**; this is an appointment **request**, not a confirmed booking.
- Scroll-scrubbed hero video support: activates when a real `src` is added to `#heroVideo`; shows a poster placeholder otherwise and honors `prefers-reduced-motion`.

## Content and assets to replace before launch

All clinic details, hours, service copy, team/facility photos, and the hero video are **sample placeholders** (marked with a "Sample" badge or placeholder text). Supplied so far:
- WhatsApp number: `+971 50 190 5318` (international format `971501905318`).

Still needed from the clinic:
- Verified address, phone, hours, and emergency instructions.
- Approved service list and About Us copy.
- Licensed/owned hero video (`assets/video.mp4`) and poster image; update `#heroVideo` and its `poster`.
- Verified trust claims (licenses, accreditations, ratings) before publishing.

## Scope notes

This is a static frontend only. There is no backend, database, automatic WhatsApp sending, availability checking, or appointment storage. Automatic messaging or persistent bookings require a new approved architecture (Phase 3+)."# adk-veterinary-website" 
