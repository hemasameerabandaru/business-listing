# Business Listing Platform

A mini business listing platform built with Next.js 14 (App Router), Tailwind CSS, and TypeScript.

## Features & Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Data:** In-memory JSON store (Resets on server restart as per requirements)

## SEO & Rendering Strategies
### Server-Side Rendering (SSR)
Used on the **Business Detail Page** (`/business/[slug]`).
- **Why:** To ensure search engines always crawl the most up-to-date details.
- **Implementation:** Fetches data with `cache: 'no-store'`.
- **Structured Data:** Includes JSON-LD (Schema.org) for `LocalBusiness`.

### Incremental Static Regeneration (ISR)
Used on the **Homepage** (`/`).
- **Why:** The homepage lists many businesses. Generating it statically improves performance, but we need it to update when new businesses are added.
- **Implementation:** Uses `export const revalidate = 60;`.

### API Design
Internal API routes (`/app/api/businesses`) handle CRUD operations:
- **GET:** List businesses.
- **POST:** Add a new business.
- **PUT:** Update a business.
- **DELETE:** Remove a business.

## Setup Instructions
1. **Install Dependencies:**
   ```bash
   npm install