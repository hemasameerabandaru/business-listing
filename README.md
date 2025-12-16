
# Mini Business Listing Platform

A modern, SEO-optimized business directory application built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. This platform allows users to browse businesses, search/filter listings, and manage business entries (Create, Read, Update, Delete) using an internal API with in-memory storage.

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Tech Stack](#-tech-stack)
3. [Software Requirements](#-software-requirements)
4. [Installation & Setup](#-installation--setup)
5. [Running the Project](#-running-the-project)
6. [Project Structure](#-project-structure)
7. [API Documentation](#-api-documentation)
8. [Technical Decisions (Architecture, SSR, ISR, SEO)](#-technical-decisions)
9. [Features & Usage](#-features--usage)
10. [Performance & Accessibility](#-performance--accessibility)

---

## 📖 Project Overview

The goal of this project is to demonstrate a scalable, performance-oriented frontend architecture. The application features:
* **Dynamic Business Listings:** Real-time fetching of business data.
* **Search & Filtering:** Client-side filtering by business name and category.
* **Business Management:** A full CRUD (Create, Read, Update, Delete) system.
* **SEO Optimization:** Unique meta tags, JSON-LD structured data, and Open Graph tags for social sharing.

---

## 🛠 Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Data Handling:** Internal Next.js API Routes (In-memory mock database)
* **Icons:** (Add your icon library here, e.g., Heroicons/Lucide-React)

---

## 💻 Software Requirements

Before running this project locally, ensure you have the following software installed on your machine:

1.  **Node.js**: Version **18.17.0** or later is required for Next.js App Router.
    * *Check version:* `node -v`
    * *Download:* [Node.js Official Site](https://nodejs.org/)
2.  **Package Manager**: `npm` (comes with Node), `yarn`, or `pnpm`.
    * *Check version:* `npm -v`
3.  **Git**: For version control (optional for running, required for cloning).
    * *Check version:* `git --version`
4.  **Code Editor**: Visual Studio Code (recommended) with the **ESLint** and **Tailwind CSS IntelliSense** extensions.

---

## ⚙️ Installation & Setup

Follow these steps to get the development environment running:

**Step 1: Clone the repository**
Open your terminal or command prompt and run:
```bash
git clone [https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git](https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git)

```

**Step 2: Navigate to the project directory**

```bash
cd YOUR-REPO-NAME

```

**Step 3: Install Dependencies**
This will install Next.js, React, Tailwind, and all necessary packages.

```bash
npm install
# or
yarn install
# or
pnpm install

```

---

🚀 Running the Project**Development Mode**
To start the local development server with hot-reloading (changes appear instantly):

```bash
npm run dev

```

* Open your browser and navigate to: `http://localhost:3000`
* The API will be available at: `http://localhost:3000/api/businesses`

**Production Build**
To verify the production build (simulating how it runs on Vercel):

```bash
npm run build
npm start

```

---

📂 Project StructureThis project follows the idiomatic Next.js **App Router** structure:

```
├── src/
│   ├── app/
│   │   ├── api/                  # Internal API Routes
│   │   │   └── businesses/       # CRUD Endpoints
│   │   ├── business/             # Dynamic Business Detail Pages
│   │   │   └── [slug]/           # Dynamic Route (e.g., /business/tech-sol)
│   │   ├── register/             # Business Registration Page
│   │   ├── favicon.ico           # Site Icon
│   │   ├── globals.css           # Global Tailwind Directives
│   │   ├── layout.tsx            # Root Layout (Navbar/Footer)
│   │   └── page.tsx              # Homepage (Listing Page)
│   ├── components/               # Reusable UI Components
│   │   ├── BusinessCard.tsx      # Listing Card
│   │   ├── SearchFilter.tsx      # Search Bar & Dropdown
│   │   └── Navbar.tsx            # Navigation Header
│   ├── types/                    # TypeScript Interfaces (Business, APIResponse)
│   └── utils/                    # Helper functions (API calls, formatters)
├── public/                       # Static Assets (Images, fonts)
├── next.config.js                # Next.js Configuration
├── tailwind.config.ts            # Tailwind Configuration
├── tsconfig.json                 # TypeScript Configuration
└── README.md                     # Documentation

```

---

📡 API DocumentationSince no external database is used, the application uses an **in-memory** array located in the API route handlers.
*Note: Data will reset if the server restarts.*

### Base URL: `/api/businesses`| Method | Endpoint | Description |

| **GET** | `/api/businesses` | Fetches all available businesses. |
| **POST** | `/api/businesses` | Creates a new business listing. |
| **GET** | `/api/businesses/[id]` | Fetches a single business by ID or Slug. |
| **PUT** | `/api/businesses/[id]` | Updates an existing business. |
| **DELETE** | `/api/businesses/[id]` | Removes a business from the list. |

---

🧠 Technical DecisionsThis section outlines the architectural choices made to meet the assignment requirements for Performance, SEO, and Scalability.

1. SSR (Server-Side Rendering) vs. ISR (Incremental Static Regeneration)* **SSR (Business Detail Pages):** * *Implementation:* The dynamic route `/business/[slug]` uses Server-Side Rendering.
* *Reasoning:* Business details (like descriptions or contact info) are critical for SEO. Fetching this data on the server ensures that search engine bots receive the fully populated HTML page immediately, rather than waiting for client-side JavaScript. This also ensures the metadata (title, description) is accurate for social sharing.


* **ISR (Homepage):**
* *Implementation:* The homepage `/` uses `revalidate` (ISR).
* *Reasoning:* The main list of businesses does not change every second. ISR allows the page to be cached as static HTML for fast load times but automatically regenerates in the background (e.g., every 60 seconds) when new businesses are added. This provides the speed of a static site with the freshness of a dynamic one.



2. SEO Strategy* **Meta Tags:** Every page includes dynamic `title` and `meta description` tags relevant to the content.
* **Structured Data (JSON-LD):** The Business Detail page injects a `script` tag with `application/ld+json`. This provides Google with strict Schema.org data ("LocalBusiness"), helping the site appear in rich results (snippets).
* **Semantic HTML:** Usage of correct tags (`<main>`, `<article>`, `<h1>`) ensures accessibility and better indexing.

3. Image Optimization* The project uses the `next/image` component instead of standard `<img>` tags.
* This automatically handles lazy loading, resizing, and serving images in modern formats (like WebP) to improve Core Web Vitals scores.

---

🔍 Features & Usage1. **Browse Listings:**
* Visit the homepage to see the grid of businesses.
* Images are optimized and load lazily.


2. **Search & Filter:**
* Use the **Search Bar** to filter businesses by name.
* Use the **Category Dropdown** to filter by industry (e.g., Technology, Food, Health).
* *Note:* URL query parameters are updated to allow sharing of filtered results.


3. **Add a Business:**
* Click the **"Add Your Business"** button.
* Fill out the form (Name, Description, Category, Image URL).
* Upon submission, the data is POSTed to the internal API and the list is updated.


4. **Edit/Delete (Admin Features):**
* Navigate to a Business Detail page.
* Click **Edit** to modify details (PUT request).
* Click **Delete** to remove the listing (DELETE request).



---

⚡ Performance & Accessibility* **Lighthouse Score:** The app is optimized to achieve high scores (90+) in Performance, Accessibility, and SEO.
* **Accessibility:** * All images have `alt` text.
* Interactive elements have proper `aria-labels` and focus states.
* Color contrast ratios adhere to WCAG standards.


* **Responsive Design:** Fully responsive layout that adapts to Mobile, Tablet, and Desktop using Tailwind's utility classes.

