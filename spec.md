# DevPortfolio Pro

## Current State
New project — no existing application files.

## Requested Changes (Diff)

### Add
- Full personal portfolio website with all required sections
- Bootstrap 5.3 CDN integration
- Custom CSS with CSS variables, keyframe animations, glassmorphism effects
- Vanilla JS for interactions (scroll reveal, counters, filters, slider, accordion, scroll-to-top)
- Contact form layout ready for Node.js/MongoDB/Nodemailer backend

### Modify
N/A

### Remove
N/A

## Implementation Plan

### Sections
1. **Navbar** — Rounded floating navbar container, smooth scroll links, mobile hamburger
2. **Hero** — Full-height with animated morph blob shapes, name/title, CTA buttons, animated stats counters
3. **About** — Two-column layout, profile image placeholder, bio text, downloadable resume button
4. **Skills** — Animated progress bars that trigger on scroll, categorized by Frontend/Backend/Tools
5. **Resume/Timeline** — Vertical timeline with experience and education entries
6. **Portfolio** — Filter buttons (All, Web, Mobile, Design), project cards with hover overlay showing title/links
7. **Testimonials** — Auto-sliding carousel/slider with client quotes and avatars
8. **Services** — Icon + title + description cards with float animation and glassmorphism
9. **FAQ** — Bootstrap accordion with custom styling
10. **Contact** — Form with name, email, subject, message fields; ready for backend endpoint
11. **Footer** — Social links (GitHub, LinkedIn, Twitter, Instagram), quick nav, copyright

### Extras
- Scroll-to-top floating button with progress indicator
- Scroll reveal animations using IntersectionObserver
- Smooth scrolling via CSS scroll-behavior
- Portfolio filter functionality
- Hero stats counter animation

### File Structure
- `src/frontend/index.html` — main HTML
- `src/frontend/public/assets/css/style.css` — custom CSS
- `src/frontend/public/assets/js/main.js` — custom JS
- `src/frontend/public/assets/images/` — image placeholders

### Backend
Minimal Motoko backend — contact form submissions stored as messages (name, email, subject, message, timestamp). Query to retrieve messages (admin).
