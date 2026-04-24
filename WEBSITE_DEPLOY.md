# Vitality Wellness MedSpa — Public Website Deployment Guide

## Overview

Two separate systems, two separate domains:

| System        | Domain (example)                   | What it does                        |
|---------------|-------------------------------------|-------------------------------------|
| Public Website | `www.vitalitywellmedspa.com`        | Patient-facing: booking, services, portal |
| CRM / Staff    | `crm.vitalitywellmedspa.com`        | Staff-only: patients, appointments, reports |

The website talks to the CRM via the `/api/public/...` routes added to the CRM server.

---

## Step 1 — Run the database migration

Before launching, run the patient portal migration on your PostgreSQL database:

```bash
psql $DATABASE_URL -f vitality-crm/server/src/db/migration_patient_portal.sql
```

This adds `password_hash`, `portal_enabled`, and `last_login` columns to the `patients` table.

---

## Step 2 — Update the CRM server environment

In `vitality-crm/server/.env`, add your website's domain to `CLIENT_URL`:

```env
CLIENT_URL=https://crm.vitalitywellmedspa.com,https://www.vitalitywellmedspa.com
```

Redeploy or restart the CRM server.

---

## Step 3 — Configure the website environment

Copy `.env.example` to `.env` and fill in:

```env
# CRM backend API (public routes only)
VITE_API_URL=https://crm.vitalitywellmedspa.com/api/public

# Link to the staff CRM (shows as "Staff ↗" in navbar)
VITE_CRM_URL=https://crm.vitalitywellmedspa.com

# Stripe publishable key (for gift card payments)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Optional: Google Maps embed API key (for Contact page map)
VITE_GOOGLE_MAPS_KEY=
```

---

## Step 4 — Install dependencies & build

```bash
cd vitality-website
npm install
npm run build
```

The production build outputs to `vitality-website/dist/`.

---

## Step 5 — Deploy

### Option A: Vercel (recommended — free tier available)
```bash
npm install -g vercel
vercel --prod
# Set environment variables in the Vercel dashboard
```

### Option B: Netlify
```bash
npm run build
# Drag the dist/ folder into Netlify, or use netlify-cli
# Set environment variables in Netlify dashboard
```

### Option C: Deploy alongside the CRM on Railway/Render
- Create a new service pointing to `vitality-website/`
- Build command: `npm run build`
- Publish directory: `dist`
- Add a `vite.config.js` rewrite rule for SPA routing

---

## Step 6 — Enable Stripe (Gift Cards)

1. Create a Stripe account at stripe.com
2. Install the Stripe JS library in the website
3. Add your publishable key to `.env`
4. Implement Stripe Elements in `src/pages/GiftCards.jsx` (marked with TODO comment)
5. The gift card API route in the CRM already accepts `stripe_payment_intent_id`

---

## API Endpoints (Public — no staff auth required)

| Method | Path                               | Description                        |
|--------|-------------------------------------|------------------------------------|
| GET    | /api/public/services                | All active services with pricing   |
| GET    | /api/public/providers               | Active providers (for booking)     |
| GET    | /api/public/availability            | Available time slots               |
| POST   | /api/public/register                | New patient registration           |
| POST   | /api/public/login                   | Patient login (returns JWT)        |
| GET    | /api/public/me                      | Get patient profile (JWT required) |
| POST   | /api/public/appointments            | Book appointment (JWT required)    |
| GET    | /api/public/appointments            | Patient's appointments (JWT req.)  |
| PUT    | /api/public/appointments/:id/cancel | Cancel appointment (JWT required)  |
| POST   | /api/public/gift-cards              | Purchase a gift card               |
| POST   | /api/public/contact                 | Submit contact form                |

---

## Development (local)

Run both systems at the same time:

```bash
# Terminal 1 — CRM Server
cd vitality-crm/server
npm run dev   # starts on port 3001

# Terminal 2 — CRM Client (optional)
cd vitality-crm/client
npm run dev   # starts on port 5173

# Terminal 3 — Public Website
cd vitality-website
npm run dev   # starts on port 5174 (proxies /api → localhost:3001)
```

The website's `vite.config.js` already proxies `/api` calls to the CRM server in development.
