# Rajkumar Raja — Personal Portfolio Website

Production-ready, modern, high-converting personal portfolio website built with **Vite**, **React 18+**, **Tailwind CSS**, and **Lucide React** for **Rajkumar Raja**, an Odoo Developer (v16–v19) & Full-Stack Web Developer based in Coimbatore, Tamil Nadu, India.

---

## 🚀 Key Features & Architectural Highlights

### 1. Visual Design System & Themes
- **Default Dark Mode:** Architectural Deep Obsidian Slate (`#0b0d14`) & Warm Amber-Gold (`#e5a93c` / `#f59e0b`).
- **Alabaster Light Mode (`#faf9f6`):** Clean, crisp alternative persisted in `localStorage`.
- **Architectural Grid Backdrop:** Subtle ambient radial glows overlaid on a `44px × 44px` architectural coordinate grid.
- **Fluid Typography:** Responsive scale across mobile (`320px+`), tablet (`768px+`), laptop (`1024px+`), and large desktop (`1440px+`) with zero horizontal overflow (`overflow-x-hidden`).
- **Strict Content Compliance:** Verified complete absence of forbidden terminology.

### 2. Sticky Glassmorphic Header (`Navbar`)
- Monogram badge (`RR`), Rajkumar Raja branding, and live availability indicator.
- Smooth-scrolling section links (`About`, `Projects`, `Skills`, `Contact`).
- Theme toggle and "Hire Me" call-to-action button.
- Mobile drawer navigation with keyboard `Escape` handling and accessible touch targets (min `44×44px`).

### 3. Hero Section & Interactive Portrait Stage
- 12-column desktop split (`7 cols` copy | `5 cols` portrait stage).
- Proof metrics strip: `v16–v19` (Odoo ERP Stack), `21+ Apps` (Live Web & ERP), `Full-Stack` (Python, OWL & React).
- Prominent `1:1` circular portrait (`clamp(240px, 28vw, 330px)`) framed in a warm gold bezel (`#e5a93c`) with dark outer track (`#110e1b`) and rotating dual accent arcs (cyan `#22d3ee` and magenta `#d946ef`).
- **Click-to-Change Photo Feature (`useRef` + `FileReader` + `localStorage`):** Click the portrait, camera badge, or upload button to upload custom photos saved directly to browser storage, with a one-click Reset option.

### 4. Experience & Education Timeline (`#about`)
- Hands-on technical narrative covering Odoo v16–v19 ORM, Python controllers, QWeb/XML views, REST APIs, OWL JS, React JS, and Shopify Liquid CRO audits.
- 2×2 specification definition card (`<dl>`).
- Work experience at **Bambus Technologies LLP** (`Jan 2024 – Present`, Coimbatore, TN).
- Bachelor of Engineering (B.E.) from **Knowledge Institute of Technology** (`Graduated: 2021`).

### 5. Projects Showcase (`#projects`)
- **Strict Category Order:** `All Projects` → `Odoo` → `React` → `HTML & CSS`.
- **6-Card Initial View:** 6 initial cards with responsive "Show More Projects (X more)" and "Show Less Projects" toggle (resets automatically when switching categories).
- **Custom 16:9 Architectural SVG UI Previews:** Custom SVG interfaces on each of the 21 cards.
- **Odoo Architecture & Code Modal:** Interactive modal with architectural breakdown, production-ready Python/Liquid code snippets, syntax styling, and one-click copy button.
- **External Links:** Direct live demo and GitHub repository links for web and React projects.

### 6. Categorized Technical Skills (`#skills`)
- 5 comprehensive skill groups:
  1. Odoo & ERP Development
  2. Odoo Core Modules
  3. Languages & Frameworks
  4. E-Commerce & SEO
  5. Databases, APIs & Tools

### 7. Validated Contact Section & Footer (`#contact`)
- Email card (`rajkumarrajaco@gmail.com`) with instant copy feedback.
- Phone card (`+91 95147 58427`).
- Location card (`Coimbatore, Tamil Nadu, India`).
- Verified links to LinkedIn and GitHub.
- Validated contact form with inline error alerts and accessible `aria-live` confirmation status.
- Dynamic copyright and smooth-scrolling "Back to top ↑" action.

---

## 🛠️ Tech Stack

- **Framework:** React 18+ (Vite 5)
- **Styling:** Tailwind CSS 3
- **Icons:** Lucide React
- **Architecture:** Component-driven, semantic HTML5 landmarks, WCAG 2.1 touch & accessibility standards

---

## 📦 Getting Started

### Development
\`\`\`bash
npm run dev
\`\`\`

### Production Build
\`\`\`bash
npm run build
\`\`\`

### Preview Production Build
\`\`\`bash
npm run preview
\`\`\`
