# Eko Couture — That Ajayi Website

A premium landing page for a high-end Nigerian fashion stylist that blends polished scroll-driven animations with an AI-powered fashion assistant. This repository contains a production-ready frontend (React + Vite + Tailwind) focused on an engaging, animated brand experience and an optional MERN auth backend for secure admin/user features.

---

## Table of contents

- [What this website does](#what-this-website-does)
- [Key features](#key-features)
- [Tech stack](#tech-stack)
- [How it works (high-level flow)](#how-it-works-high-level-flow)
- [Quick start (run locally)](#quick-start-run-locally)
- [Backend (optional)](#backend-optional)
- [Deployment](#deployment)
- [Tests](#tests)
- [Where to customize](#where-to-customize)
- [Contributing & notes](#contributing--notes)
- [Credits & license](#credits--license)
- [Contact](#contact)

---

## What this website does

- Visually-rich, responsive landing page for a fashion stylist / brand:
  - Animated hero and section transitions using GSAP and Framer Motion for smooth, attention-grabbing scroll interactions.
  - Modern UI components and accessible patterns via Radix + Tailwind CSS.
  - Client-side routing for multi-section navigation (React Router).

- AI fashion assistant:
  - Let visitors ask styling questions or request outfit suggestions.
  - Powered by a GenAI integration (`@google/genai`) to generate personalized fashion recommendations, copy, or creative ideas.
  - Designed to augment the stylist’s catalogue and help visitors explore looks or request styling tips.

- Optional content & media management (via backend):
  - Includes a `mern-auth-backend` subproject that implements a MERN-style backend for authentication, uploads, and admin tasks.
  - Backend features: access & refresh tokens, email verification, password reset, file uploads (Cloudinary), and admin user management.

- Developer tooling & testing:
  - Built with Vite, TypeScript, Playwright, and Vitest for fast development and reliable testing.
  - Production-ready build scripts and preview support.

---

## Key features (summary)

- Animated, scroll-driven landing page (GSAP + Framer Motion)  
- AI fashion assistant (Google GenAI integration)  
- Responsive layout with Tailwind CSS utilities  
- Client-side routing (React Router)  
- Optional MERN backend for secure auth, uploads, and email workflows  
- End-to-end testing (Playwright) and unit tests (Vitest)

---

## Tech stack

- Frontend: React, Vite, TypeScript, Tailwind CSS, GSAP, Framer Motion, Radix UI  
- AI: `@google/genai` (GenAI integration for the assistant)  
- Networking: axios  
- Backend (optional): Node.js, Express, MongoDB (Mongoose), JWT auth, Cloudinary, Nodemailer  
- Testing: Playwright, Vitest, Testing Library

---

## How it works (high-level flow)

1. Visitor opens the landing page — GSAP & Framer Motion animate the hero and content during scroll.  
2. Visitor interacts with the AI fashion assistant (text input / prompts). The assistant calls the GenAI integration and returns styling suggestions to the UI.  
3. When using the backend, images and content can be uploaded and managed via Cloudinary; admin and auth features are protected with JWT + refresh tokens and email verification.  
4. Client-side (React) handles UI interactions; sensitive operations (uploads, email, tokens) should be routed to the backend when enabled.

---

## Quick start (run locally)

### Frontend

1. Clone the repo:
   ```bash
   git clone https://github.com/cimess/that-ajayi-website.git
   cd that-ajayi-website
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start dev server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
5. Preview production build:
   ```bash
   npm run preview
   ```

---

## Backend (optional)

The backend lives in `mern-auth-backend`. It provides secure admin functionality and media uploads.

1. Change directory:
   ```bash
   cd mern-auth-backend
   ```
2. Copy environment example and set secrets:
   ```bash
   cp .env.example .env
   # Edit .env with MONGODB_URI, JWT secrets, CLOUDINARY, email settings, etc.
   ```
3. Install and run:
   ```bash
   npm install
   npm run dev
   ```

Note: See `mern-auth-backend/README.md` for full environment variable details and security notes (refresh tokens, email verification flows).

---

## Deployment

- Frontend: build with `npm run build` and deploy to static hosts (Vercel, Netlify, or S3 + CloudFront).  
- Backend (if used): deploy to a Node-capable host (Heroku, DigitalOcean, Render, Azure) and configure environment variables for DB and third-party services (Cloudinary, email provider).

Security note: For production, route AI calls and secret-involving operations through server-side endpoints when possible to avoid exposing API keys in the browser.

---

## Tests

- Unit & component tests:
  ```bash
  npm run test
  ```
- End-to-end tests (Playwright):
  - See `playwright.config.ts` and the `playwright-report` directory for results and configuration.

---

## Where to customize

- AI assistant prompts & model settings: check the AI wrapper(s) to modify prompt templates, model parameters, or to route AI calls via the backend.  
- Animations: tweak GSAP timelines and Framer Motion components located in `components/` and `pages/`.  
- Styles & design tokens: update Tailwind config, CSS variables, and component styles to match brand guidelines.  
- Assets & uploads: use the backend or configure direct Cloudinary integration for media management.

---

## Contributing & notes

- The repository includes an optional MERN backend scaffold (`mern-auth-backend/README.md`) for admin and upload functionality.  
- If you want screenshots, usage examples, or a direct README update in the repo, tell me which changes you want and I can prepare a commit or PR.  
- Please ask for permission before using any copyrighted assets found in this repo.

---

## Credits & license

- Built with: React, Vite, Tailwind, GSAP, Framer Motion, Radix, and Google GenAI.  
- it free to use but have to ask permision first so i make new friends with you 

---

## Contact

- Maintainer: cimess  
- Repo: https://github.com/cimess/that-ajayi-website

---
