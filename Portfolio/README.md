# CS1303: Full Stack Development — Assignment 1
## Personal Portfolio Website (Pure HTML5 & CSS3)

**Author:** HarshaVardhan Reddy Kunam  
**Roll No:** 241100XX | **Department:** Computer Science and Engineering  
**Institution:** National Institute of Technology, Warangal  

---

### 1. Design Rationale
The portfolio is designed with a modern "Developer Dashboard" aesthetic, reflecting a backend engineering focus. It features a deep dark theme (`#07090e`), glassmorphism (`backdrop-filter: blur(16px)`), subtle neon cyan/indigo gradients (`#38bdf8` to `#6366f1`), and clean typography using Google Fonts (*Inter*, *Outfit*, and *Fira Code*). Icons are rendered using scalable inline SVG vectors for optimal rendering on high-DPI displays.

### 2. Layout Technique Justification
- **CSS Grid**: Utilized for multi-column component containers including the Projects grid (`repeat(auto-fit, minmax(340px, 1fr))`), Skills grid, and Achievements section. Grid was selected because it handles 2D layout alignment gracefully, allowing cards to wrap automatically without manual percentage calculations.
- **Flexbox**: Employed for 1D alignments including the navigation bar (`justify-content: space-between`), timeline items, skill chips, action buttons, and contact items. Flexbox ensures vertical centering and responsive distribution across varying content lengths.

### 3. Responsive Breakpoints & Accessibility
The site is built with a mobile-first mindset, tested across three key viewports using pure CSS3 without external frameworks or JavaScript:
- **Desktop (>1024px)**: 1200px max-width container with clean single-column hero and about grids.
- **Tablet (≤768px)**: Converts navbar to a full-screen drawer menu via the pure CSS checkbox hack (`.nav-toggle:checked ~ .nav-links`).
- **Mobile (≤480px)**: Adjusts section padding, stacks action buttons vertically, and resizes touch targets to at least 44px for accessibility.

**Accessibility Standards (WCAG AA):**
- Single `<h1>` tag for document hierarchy with strict `<h2>` and `<h3>` section ordering.
- Explicit `<label for="...">` matching all form `<input>` IDs.
- Semantic HTML tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- Contrast ratios exceeding 4.5:1 for body text.

### 4. Known Limitations & Academic Integrity Disclosure
- **Known Limitations**: Implemented strictly using 100% Pure HTML5 and CSS3 (zero JavaScript). Complex interactive features such as dynamic client-side state filtering or AJAX form submissions are intentionally reserved for subsequent course assignments as specified in the CS1303 problem statement.
- **Academic Integrity Statement (Section 6 Compliance)**: This portfolio is an individual submission. In compliance with Section 6 of the CS1303 Academic Integrity Policy, AI coding tools were used solely for debugging small CSS layout snippets, validating HTML semantics, and reviewing code formatting. No full solution boilerplate was auto-generated.
