# Yuva Mitra — Official Website

Public-facing website for **Yuva Mitra**, a secular non-profit organization working with rural and tribal communities since 1995 to create people-led, sustainable change through water conservation, sustainable agriculture, health, education, and livelihood development.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Components](#components)
- [Data Layer](#data-layer)
- [Assets](#assets)
- [API](#api)
- [SEO & Sitemap](#seo--sitemap)
- [Scripts](#scripts)
- [Environment & Deployment](#environment--deployment)

---

## Project Overview

The Yuva Mitra website serves as the primary digital presence for the organization. It covers:

- Organization history, leadership, advisory board, and trustees
- Program portfolio across Water, Agriculture, Livelihood, and Health & Education
- Individual program detail pages with rich content, image galleries, and lightbox
- Annual reports and financial disclosures
- Donation page
- Contact and careers pages
- SEO-ready XML sitemap

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| UI Framework | React | 19 |
| Build Tool | Vite | 8 |
| Styling | Tailwind CSS (v4 via Vite plugin) | 4.2 |
| Routing | React Router DOM | 7 |
| Animation | Framer Motion | 12 |
| Smooth Scroll | Lenis | 1 |
| Icons | Lucide React + React Icons | latest |
| Contact API | PHP | — |
| Package Manager | npm | — |

> Tailwind CSS v4 is configured entirely through the `@tailwindcss/vite` plugin — there is no separate `tailwind.config.js`.

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd yuva--public

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Starts the Vite dev server at `http://localhost:5173` with hot module replacement.

### Production Build

```bash
npm run build
```

Output is placed in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Project Structure

```
yuva--public/
├── api/
│   └── contact.php              # Server-side contact form handler
├── public/
│   ├── sitemap.xml              # SEO sitemap
│   ├── favicon.svg
│   ├── icons.svg
│   ├── assets/Images/           # Static public images (SDG icons, maps)
│   └── images/                  # Hero images served statically
├── src/
│   ├── App.jsx                  # Root component
│   ├── App.css                  # Global styles
│   ├── main.jsx                 # React entry point
│   ├── routes/
│   │   └── Approutes.jsx        # All application routes
│   ├── pages/                   # Page-level components
│   ├── components/              # Reusable UI components
│   │   └── layouts/             # Layout shell + Navbar + Footer + Banners
│   ├── data/
│   │   └── ProgramData.jsx      # All program content and metadata
│   └── assets/
│       ├── Images/              # Imported image assets
│       └── logos/               # Brand logos
├── index.html
├── vite.config.js
├── package.json
├── composer.json                # PHP dependencies (for contact API)
└── eslint.config.js
```

---

## Pages & Routes

All routes are nested under `MainLayout` (Navbar + Footer wrapper).

| Route | Page | Description |
|---|---|---|
| `/` | `Home` | Landing page with hero, about, impact, programs, SDG, partners |
| `/about/about-yuva-mitra` | `AboutYuvaMitra` | Organization overview |
| `/about/our-history` | `OurHistory` | Timeline and milestones |
| `/about/advisory-board` | `AdvisoryBoard` | Advisory board members |
| `/about/trustees` | `Trustees` | Board of trustees |
| `/about/leadership-team` | `Ourteam` | Staff and leadership |
| `/programs` | `AllPrograms` | Full program listing |
| `/programs/category/:category` | `AllPrograms` | Filtered by category (`water`, `livelihood`, `health`, `agriculture`) |
| `/programs/details/:slug` | `ProgramDetail` | Individual program detail with gallery |
| `/resources/financials` | `Financials` | Annual reports and financial documents |
| `/donate` | `Donate` | Donation page |
| `/contact` | `Contact` | Contact form and details |
| `/careers` | `Careers` | Job openings |
| `/privacy-policy` | `PrivacyPolicy` | Privacy policy |

---

## Components

### Layout (`src/components/layouts/`)

| File | Purpose |
|---|---|
| `MainLayout.jsx` | Root shell — renders Topbar, Navbar, `<Outlet />`, Footer |
| `Topbar.jsx` | Top utility bar (contact info, social links) |
| `Navbar.jsx` | Main navigation with dropdowns |
| `Footer.jsx` | Footer with logo, programs, contact, social links, sitemap link |
| `BreadCrumb.jsx` | Breadcrumb navigation for inner pages |

**Page Banners** (`src/components/layouts/Banners/`):

Each inner page has a dedicated hero banner component:
`AboutBanner`, `AdvisoryBanner`, `AllProgramsBanner`, `CareerBanner`, `ContactBanner`, `DonateBanner`, `FinancialsBanner`, `OurHistoryBanner`, `OurteamBanner`, `PrivacyPolicyBanner`, `TrusteesBanner`

### Section Components (`src/components/`)

| Component | Description |
|---|---|
| `Hero.jsx` | Auto-sliding hero carousel with 3 slides, animated headings |
| `AboutSection.jsx` | About Yuva Mitra two-column layout (image + text) |
| `OurVisionMision.jsx` | Vision and mission cards |
| `OurWorkSection.jsx` | Program category overview cards |
| `ImpactSection.jsx` | Animated impact statistics counter |
| `ReachSection.jsx` | India map showing geographic reach |
| `SdgCommitmentSection.jsx` | UN Sustainable Development Goals alignment |
| `StoriesOfChangeSection.jsx` | Community stories / testimonials |
| `AnnualReportsSection.jsx` | Annual report covers with download links |
| `DonateSaveSection.jsx` | Donation CTA banner |
| `FundingPartnersSection.jsx` | Partner and funder logos |
| `SearchBar.jsx` | Program search input |
| `BackToTopButton.jsx` | Floating scroll-to-top button |
| `ScrollTotop.jsx` | Route-change scroll reset utility |

---

## Data Layer

### `src/data/ProgramData.jsx`

Central data file exporting the `programs` array. Each program object contains:

```js
{
  id: Number,
  slug: String,           // URL slug for /programs/details/:slug
  title: String,
  shortTitle: String,
  category: String,
  categorySlug: String,   // 'water' | 'livelihood' | 'health' | 'agriculture'
  categoryColor: String,
  image: ImportedImage,
  excerpt: String,
  overview: String,
  projectInfo: String[],  // Funder, duration, location metadata
  sections: [             // Rich content blocks
    {
      heading: String,
      type: 'text' | 'list' | 'image' | 'mixed' | 'gallery',
      content: String | String[] | ImportedImage | ImportedImage[] | { list, images }
    }
  ],
  tags: String[]
}
```

**Section types:**

| Type | Renders as |
|---|---|
| `text` | Paragraph(s) |
| `list` | Bulleted list |
| `image` | Full-width image(s) |
| `mixed` | List + images combined |
| `gallery` | Masonry grid with lightbox (portal-based) |

---

## Assets

```
src/assets/Images/
├── Programs/
│   ├── gallery/          # Program-specific gallery images (e.g. atalBhujal1–11.webp)
│   └── *.webp / *.png    # Program hero and section images
├── annual-reports/       # Annual report cover images (2019–2024)
├── Ourteam/              # Team member photos
├── Trustees/             # Trustee photos
├── Partners-logos/       # Funder and partner logos
├── Sdg/                  # UN SDG goal icons
└── *.webp / *.png        # General site images (hero, about, impact bg, etc.)
```

All images in `src/assets/` are imported directly into components and processed by Vite. Images in `public/` are served as-is.

---

## API

### `api/contact.php`

Handles the contact form submission server-side. The frontend `Contact` page posts form data to this endpoint. PHP dependencies are managed via `composer.json`.

---

## SEO & Sitemap

`public/sitemap.xml` is a standard XML sitemap covering all public routes. It is served statically at `/sitemap.xml` and linked from the footer.

To update the sitemap after adding new pages, edit `public/sitemap.xml` and update the `<loc>` entries with the correct production domain.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (HMR, localhost:5173) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint across the project |

---

## Environment & Deployment

- The project is a **static SPA** built with Vite. The `dist/` output can be deployed to any static host (Netlify, Vercel, Apache, Nginx, etc.).
- For client-side routing to work on a server, configure a **catch-all redirect** to `index.html`.

**Example Nginx config:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Example Apache `.htaccess`:**
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ /index.html [L]
```

- The `api/contact.php` file requires a **PHP-capable server** (Apache/Nginx with PHP-FPM). If deploying the frontend to a static host, the contact API must be hosted separately or replaced with a serverless function.

---

## Organization

**Yuva Mitra Foundation**
Mitrangan Campus, Ghoti - Sinnar Highway,
Harsule Shivar, Lonarwadi, Pincode - 422103
Taluka-Sinnar, District - Nashik, Maharashtra, India

📞 +91 9527402400
📧 admin@yuvamitra.org
🌐 [yuvamitra.org](https://www.yuvamitra.org)
