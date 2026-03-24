# Shraddha Hospitals — Patient Platform

Website + patient platform for **Shraddha Institute of Spine & Orthopaedic Superspeciality (SISOS)**, Sangli, Maharashtra.

**Live:** https://shraddha-hospitals-production.up.railway.app

## Features

- **Homepage** — 14 sections with real doctor photos, insurance logos, spine hub with fellowship programme
- **Booking System** (`/book`) — Live doctor calendar, slot availability, appointment creation with token assignment
- **OPD Queue** (`/queue`) — Real-time queue display with Server-Sent Events, priority reservation
- **Admin Panel** (`/admin/queue-control`) — Queue management, walk-in addition, patient advancement

## Tech Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **Database:** Neon PostgreSQL (17 tables, 9 doctors seeded)
- **Hosting:** Railway

## Getting Started

```bash
npm install
npm run dev  # → http://localhost:3000
```

Requires `.env.local` with `DATABASE_URL` pointing to a Neon PostgreSQL database.

## Deploy

```bash
railway up --detach
```

## Branches

- `main` — Static site (apdoshi) + raw assets
- `nextjs-platform` — Next.js patient platform (active development)

## Team

- **apdoshi** — Static site, raw assets (doctor photos, insurance logos, hospital images)
- **ChDo17** — Next.js platform, database, booking/queue systems
