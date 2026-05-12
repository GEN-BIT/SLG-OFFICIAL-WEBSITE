# Saint Laurent Gaseke TSS — Official Website

> **Technical Secondary School | Gicumbi District, Northern Province, Rwanda**
>
> Accredited by the Rwanda TVET Board (RTB) and Ministry of Education (MINEDUC)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Live Pages](#live-pages)
3. [File Structure](#file-structure)
4. [Tech Stack](#tech-stack)
5. [Features](#features)
6. [Semantic HTML5 Structure](#semantic-html5-structure)
7. [CSS Architecture](#css-architecture)
8. [JavaScript Functionality](#javascript-functionality)
9. [Responsive Design](#responsive-design)
10. [Theme System](#theme-system)
11. [SEO and Accessibility](#seo-and-accessibility)
12. [How to Deploy](#how-to-deploy)
13. [Browser Support](#browser-support)
14. [School Information](#school-information)
15. [Credits](#credits)

---

## Project Overview

This is the complete, production-ready official website for **Saint Laurent Gaseke Technical Secondary School (SLG TSS)**, located in Gicumbi District, Northern Province, Rwanda.

The website was built from scratch using **pure HTML5, CSS3 (Flexbox and Grid), and Vanilla JavaScript** with no backend required. It is fully responsive, accessible, and includes a built-in **three-theme switcher** (Light, Dark, Warm Brown).

The site showcases the school's four TVET Level 4 programs, student projects, accreditation details, and a working contact and enrollment form with JavaScript validation.

---

## Live Pages

| Page | File | Purpose |
| --- | --- | --- |
| Home | `index.html` | Hero banner, programs overview, news, stats, director message |
| About Us | `about.html` | School history, timeline, mission, vision, values, leadership |
| Programs | `services.html` | All four TVET programs with curriculum, details and enroll CTA |
| Gallery | `gallery.html` | Twenty-four real images organised by department with filter |
| Contact | `contact.html` | Contact cards, map, validated form, admission requirements |

---

## File Structure

```text
SLG_TSS_Website/
│
├── index.html          # Home page
├── about.html          # About Us page
├── services.html       # Programs and Services page
├── gallery.html        # Gallery and Projects page
├── contact.html        # Contact and Enrollment page
│
├── shared.css          # Shared base: tokens, header, nav, footer, themes
├── index.css           # Home page specific styles
├── about.css           # About page specific styles
├── services.css        # Services page specific styles
├── gallery.css         # Gallery page specific styles
├── contact.css         # Contact page specific styles
├── print.css           # Print stylesheet for clean printed output
│
├── theme.js            # Theme switcher with localStorage persistence
├── school_gate.jpg     # Hero background — actual school gate photo
├── favicon.png         # Browser tab icon (SLG crest)
│
└── README.md           # This file
```

---

## Tech Stack

| Technology | Details | Purpose |
| --- | --- | --- |
| HTML5 | Semantic elements | Page structure and content |
| CSS3 | Custom Properties, Flexbox, Grid | Layout, styling, theming |
| JavaScript | Vanilla ES5 and ES6 | Interactivity, validation, themes |
| Google Fonts | Playfair Display and Source Sans 3 | Typography |
| Bootstrap Icons | Version 1.11 via CDN | UI icons throughout all pages |
| Open Graph | Meta tags | Social media and WhatsApp previews |

> No backend required. No frameworks, no build tools, no Node.js.
> Open `index.html` directly in any browser and everything works immediately.

---

## Features

### Design

- Professional navy and gold color palette matching the school identity
- Playfair Display serif headings for an editorial, institutional feel
- Source Sans 3 body text for clean readability
- School gate photo as hero background with a subtle dark overlay
- Consistent card system, section headings, pills and badges throughout
- Smooth hover animations on all cards, buttons and nav links

### Fully Responsive

- Mobile-first layout built with CSS Grid and Flexbox
- Collapsible hamburger navigation on small screens
- Program cards stack to a single column on mobile
- Gallery adjusts from three columns to two columns to one column
- Stats strip, contact cards and footer all reflow correctly
- Breakpoints at `576px`, `768px`, `992px` and `1200px`

### Three-Theme System

- Light Mode — default clean professional appearance
- Dark Mode — deep navy backgrounds with glowing gold accents
- Warm Brown — sepia and parchment tones for a warm classic feel
- Theme preference saved to `localStorage` and persists across all pages
- Applied instantly with zero flash on page load

### All Pages Include

- Sticky navigation bar with active page highlighting
- Breadcrumb trails on all inner pages
- Sidebar with quick navigation, stats, accreditation and contact info
- Call to Action banner on every page
- WhatsApp floating button fixed to the bottom-left
- Back-to-top button that appears after scrolling 400 pixels
- Scroll progress bar along the top of the page

### Programs Page

- Tab interface switching between SOD, ETE, ELE and BDC departments
- Full curriculum list for each department
- Program info box showing duration, certificate level, practical percentage and graduate count
- Community services offered by each department
- Hash-based deep-linking such as `services.html#ete` to open a specific tab

### Gallery Page

- Twenty-four real photos with six images per department sourced from Unsplash
- Filter buttons to show one department or all departments at once
- Hover zoom effect on all gallery images
- Department-specific color-coded ribbons and chips on each card
- Featured completed projects table with impact summary

### Contact and Enrollment Form

- Full JavaScript validation with individual per-field error messages
- Live validation on blur that checks each field as you leave it
- Email format validation using a regular expression
- Phone number format validation
- Clear success and error feedback messages shown to the user
- Form resets cleanly after successful submission
- Admission requirements checklist
- Office hours table in the sidebar

### Print Support

- `print.css` hides navigation, floating buttons and sidebar when printing
- Links display their full URL in printed output
- Cards and sections avoid breaking across page boundaries
- Gallery prints at two-column width
- Clean footer with school contact details appears on print

---

## Semantic HTML5 Structure

Every page uses correct HTML5 semantic elements for accessibility and SEO:

```html
<body>
  <div class="top-ribbon">           <!-- Announcement ribbon -->
  <header class="site-header">       <!-- School branding and contacts -->
  <nav class="main-nav"
       role="navigation"
       aria-label="Main navigation"> <!-- Primary site navigation -->
  <main id="main-content">           <!-- Main page content area -->
    <section aria-labelledby="...">  <!-- Named content sections -->
      <article>                       <!-- Individual news items -->
      <aside>                         <!-- Sidebar widgets -->
    </section>
  </main>
  <footer class="site-footer"
          role="contentinfo">        <!-- Site footer -->
</body>
```

### Accessibility Features

- All `<nav>` elements carry a descriptive `aria-label`
- The active page link has `aria-current="page"` set
- Tab panel buttons use `role="tab"` and `aria-selected`
- All images have descriptive `alt` attributes
- Every form field has an associated `<label>` element
- Back-to-top button has `aria-label` and `title`
- WhatsApp button carries both `aria-label` and `title`

---

## CSS Architecture

### Token System

All colors, shadows and radii are defined as CSS Custom Properties in `:root` inside `shared.css`:

```css
:root {
  --c-navy:      #0C2340;                    /* Primary dark navy */
  --c-gold:      #BF9B30;                    /* Brand gold */
  --c-gold-pale: #F9F3E1;                    /* Light gold backgrounds */
  --c-bg:        #F4F6F9;                    /* Page background */
  --c-card:      #FFFFFF;                    /* Card backgrounds */
  --c-border:    #DDE3EC;                    /* Border color */
  --shadow-sm:   0 2px 10px rgba(12,35,64,.09);
}
```

### Theme Overrides

Dark and brown themes override the variables using a `[data-theme]` attribute selector:

```css
[data-theme="dark"] {
  --c-bg:   #0F1220;
  --c-card: #1A1E2E;
  /* all color tokens redefined for dark mode */
}

[data-theme="brown"] {
  --c-bg:   #F5ECD8;
  --c-card: #FFFAF3;
  /* warm sepia tokens redefined */
}
```

### Layout Using CSS Grid and Flexbox

```css
/* Two-column page layout */
.layout {
  display: grid;
  grid-template-columns: 1fr 296px;
  gap: 32px;
}

/* Gallery image grid */
.gal-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

/* Stats strip */
.stats-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
```

### Media Queries and Breakpoints

| Breakpoint | Screen Width | Layout Change |
| --- | --- | --- |
| Small | Below 576px | Single column, smaller hero text |
| Medium | Below 768px | CTA stacks vertically, 2-column gallery |
| Large | Below 992px | Sidebar stacks below main, contacts hidden |
| Extra Large | 1200px and above | Full two-column layout with sidebar |

---

## JavaScript Functionality

### 1 — Theme Switcher

```javascript
// Apply saved theme before first paint to prevent any flash
applyTheme(localStorage.getItem('slg-theme') || 'light');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('slg-theme', theme);
}
```

### 2 — Active Navigation Link

```javascript
var path = window.location.pathname.split('/').pop();
navLinks.forEach(function (a) {
  if (a.getAttribute('href') === path) {
    a.classList.add('active');
  }
});
```

### 3 — Programs Tab Switcher

```javascript
function switchTab(id, btn) {
  document.querySelectorAll('.prog-panel').forEach(function (p) {
    p.classList.remove('active');
  });
  document.getElementById('panel-' + id).classList.add('active');
  // Also reads URL hash so services.html#ete opens the ETE tab directly
}
```

### 4 — Gallery Department Filter

```javascript
filterBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    var dept = this.getAttribute('data-filter');
    deptSections.forEach(function (sec) {
      sec.style.display =
        (dept === 'all' || sec.dataset.dept === dept) ? '' : 'none';
    });
  });
});
```

### 5 — Contact Form Validation

```javascript
function validateField(id) {
  var val = document.getElementById(id).value.trim();
  if (id === 'femail') {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      return setError('femail', 'Please enter a valid email address.');
    }
  }
  // First name, last name and message length are also validated
}

// Checks on blur and re-checks on input if field is already flagged
field.addEventListener('blur', function () { validateField(id); });
field.addEventListener('input', function () {
  if (field.classList.contains('is-invalid')) { validateField(id); }
});
```

### 6 — Scroll Utilities

```javascript
window.addEventListener('scroll', function () {
  // Back-to-top button appears after 400px of scrolling
  btt.style.display = window.scrollY > 400 ? 'flex' : 'none';
  // Scroll progress bar tracks reading position
  var pct = (window.scrollY /
    (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = pct + '%';
});
```

---

## Responsive Design

The site was designed mobile-first and tested across all common breakpoints:

| Device | Screen Width | Outcome |
| --- | --- | --- |
| iPhone SE | 375px | Single column, hamburger menu active |
| iPhone 14 | 390px | Full mobile layout working correctly |
| Android Mid-range | 412px | All components stack cleanly |
| iPad | 768px | Two-column layout begins |
| iPad Pro | 1024px | Full sidebar visible |
| Desktop | 1280px and above | Full layout with hero stat panel |

---

## Theme System

The theme switcher is fixed to the bottom-right corner on every page. Click it to open a panel with three choices.

| Theme | Background | Text Color | Accent Color |
| --- | --- | --- | --- |
| Light (default) | `#F4F6F9` | `#111827` | Gold `#BF9B30` |
| Dark | `#0F1220` | `#EDF2FF` | Gold `#D4A840` |
| Warm Brown | `#F5ECD8` | `#2A1205` | Amber `#B8750A` |

The chosen theme is stored in `localStorage` under the key `slg-theme` and applied before the first paint on every page load so no flash of the wrong theme is visible.

---

## SEO and Accessibility

Every page includes a full set of meta tags:

```html
<!-- Standard SEO meta -->
<meta name="description" content="Page description here"/>
<meta name="keywords" content="TVET Rwanda, technical school Gicumbi..."/>
<meta name="robots" content="index, follow"/>
<link rel="canonical" href="https://slgaseke-tss.rw/page.html"/>

<!-- Open Graph tags for WhatsApp and Facebook link previews -->
<meta property="og:title" content="Page Title | SLG TSS"/>
<meta property="og:description" content="Page description here"/>
<meta property="og:image" content="school_gate.jpg"/>

<!-- Twitter Card tags -->
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="Page Title | SLG TSS"/>
```

---

## How to Deploy

### Option 1 — Open Locally Without a Server

```bash
unzip SLG_TSS_Website.zip
# Then double-click index.html to open in your browser
```

### Option 2 — Upload to Web Host via FTP or cPanel

1. Upload all files from the ZIP to your `public_html` folder
2. Confirm that `school_gate.jpg`, `favicon.png`, all `.css` and `.js` files share the same folder as the HTML files
3. Visit your domain name — the site is live

### Option 3 — GitHub Pages

```bash
git init
git add .
git commit -m "Initial commit — SLG TSS Website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/slg-tss.git
git push -u origin main
```

Then open the repository on GitHub, go to **Settings > Pages**, and select the `main` branch as the source.

### Option 4 — Netlify Drag and Drop

1. Visit [netlify.com](https://netlify.com) and sign in
2. Drag the unzipped project folder onto the Netlify deploy area
3. The site goes live in seconds with a free HTTPS URL

> **Important:** Always keep all files in the same folder. Separating HTML files from their matching CSS or image files will cause the site to display incorrectly.

---

## Browser Support

| Browser | Support Level |
| --- | --- |
| Google Chrome 90 and above | Full support |
| Mozilla Firefox 88 and above | Full support |
| Microsoft Edge 90 and above | Full support |
| Safari 14 and above | Full support |
| Opera 76 and above | Full support |
| Chrome for Android | Full support |
| Safari on iOS 14 and above | Full support |
| Internet Explorer | Not supported |

---

## School Information

| Detail | Value |
| --- | --- |
| School Name | Saint Laurent Gaseke Technical Secondary School |
| Short Name | SLG TSS |
| Type | TVET — Technical and Vocational Education and Training |
| Level | TVET Level 4 |
| Location | Gicumbi District, Northern Province, Rwanda |
| Programs Offered | Software Development, Electrical Technology, Electronics, Building Construction |
| Program Duration | Three years each |
| Accreditation | Rwanda TVET Board (RTB) and Ministry of Education (MINEDUC) |
| Total Graduates | Five hundred and above |
| Years in Operation | Twenty years and above |
| Phone | +250 781 234 567 |
| General Email | <info@slgaseke-tss.rw> |
| Admissions Email | <admissions@slgaseke-tss.rw> |
| Student Intake | February and September every year |

---

## Credits

| Resource | Usage | Website |
| --- | --- | --- |
| Google Fonts | Playfair Display and Source Sans 3 typefaces | [fonts.google.com](https://fonts.google.com) |
| Bootstrap Icons | All UI icons used throughout the site | [icons.getbootstrap.com](https://icons.getbootstrap.com) |
| Unsplash | Gallery department photos, free to use | [unsplash.com](https://unsplash.com) |
| Rwanda TVET Board | Accreditation body reference | [rtb.gov.rw](https://rtb.gov.rw) |
| MINEDUC Rwanda | Ministry of Education reference | [mineduc.gov.rw](https://www.mineduc.gov.rw) |

---

## License

This website was built exclusively for **Saint Laurent Gaseke Technical Secondary School**.
All content, design and code is the property of SLG TSS.
Redistribution or commercial use without written permission is not permitted.

---

*Shaping Rwanda's Technical Workforce — Gicumbi District, Northern Province, Rwanda*
