# Shraddha Hospitals — Patient Platform

## What This Is
Website + patient platform for **Shraddha Institute of Spine & Orthopaedic Superspeciality (SISOS)**, Sangli, Maharashtra. Not just a marketing site — a full patient engagement platform with live booking, queue management, and AI-powered tools.

## Quick Start
```bash
cd "/Users/chaithanyadonda/Documents/Claude Folder/Revamp/Projects/shraddha-hospitals"
npm run dev  # → http://localhost:3000
```

## Tech Stack
| Layer | Tool |
|-------|------|
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS |
| Database | Neon PostgreSQL (`blue-base-86661203`) |
| DB Client | `@neondatabase/serverless` |
| Icons | Lucide React |
| Animation | GSAP + Lenis (planned) |

## Database (Neon)
- **Project:** `blue-base-86661203`
- **Branch:** `main` (`br-raspy-feather-ang1a84v`)
- **Connection:** `.env.local` → `DATABASE_URL`

### Tables (17 total)
| Table | Purpose |
|-------|---------|
| `doctors` | 9 doctors seeded (4 resident, 4 visiting, 1 director) |
| `specialities` | 8 specialities seeded |
| `doctor_specialities` | Junction table |
| `patients` | Phone+OTP auth |
| `staff` | Admin/receptionist |
| `doctor_schedules` | Recurring (resident) + one-time (visiting) |
| `schedule_overrides` | Holiday/cancellation handling |
| `appointments` | Core booking record |
| `opd_queues` | Daily queue per doctor per session |
| `queue_tokens` | Individual patient tokens |
| `prescriptions` | OCR + AI explanation |
| `radiology_reports` | X-ray/MRI AI explanation |
| `procedures` | For cost estimator |
| `insurance_partners` | 18 partners seeded |
| `insurance_coverage` | Procedure-insurance mapping |
| `recovery_plans` | Post-surgery tracker |
| `recovery_milestones` | Weekly milestones |
| `discharge_summaries` | Digital discharge |

### Doctor IDs (for reference)
- Dr. G.S. Kulkarni (Director): `0a9ebeb3-b7c5-4578-8daf-4a73a82572da`
- Dr. Himanshu Kulkarni (Spine): `0ff06e7b-752e-4d66-8b32-994982e39634`
- Dr. Namdev Gorgile: `e0b02b0b-328a-454c-822f-b10ac28fa19e`
- Dr. Surendra Patil (Visiting): `3ca6bdff-074e-4de1-a52d-c30c0557cb05`
- Dr. Kailas Patil (Visiting): `73c88d88-a84d-4fb6-8d39-6b14018e32eb`
- Dr. Kapil Saoji (Visiting): `cc78d1f4-31e1-4609-963b-dd3c37cde6fd`
- Dr. Akshay Kulkarni: `c30790c7-0413-40df-b23e-6fe6d6ba7d46`
- Dr. Wasim Kazi (Visiting): `0d7f5de2-af95-491e-a054-00adce8e28ad`
- Dr. Nikhil Patil: `6a0abb57-fdfe-449c-8f1e-ce958cd6b7bf`

## Cloned From
- **GitHub:** https://github.com/apdoshi2601-ship-it/shraddha-hospital-website
- **Original static site:** `_original/` folder (index.html, style.css, script.js, assets)

## Design System
- **Brand color:** `#7B2240` (burgundy) — carried from original site
- **Typography:** Cormorant Garamond (display) + Inter (body) — Google Fonts via next/font
- **Style:** Warm healthcare — NOT dark theme (per Revamp CLAUDE.md L1 exception for healthcare)
- **Animation:** Clinical/trust style (200-400ms, subtle)
- **Mobile CTA bar:** Call | WhatsApp | Book — NON-NEGOTIABLE

## Feature Phases
| Phase | Features | Status |
|-------|----------|--------|
| 0 | Next.js scaffold + all HTML sections ported + DB setup | **DONE** |
| 1 | Live Doctor Calendar + Booking | **DONE** |
| 2 | Live OPD Queue + Priority Reservation (SSE) | **DONE** |
| 3 | Prescription Explainer (OCR + Claude AI) | — |
| 4 | Symptom Navigator + Cost Estimator | — |
| 5 | Vani Integration + Recovery Tracker | — |

## Homepage Sections (ported from original)
1. Header (TopBar + Nav + Mobile menu)
2. Hero (badge, headline, CTAs, trust items, stat card)
3. Stats (animated counters)
4. About (hospital history, features checklist)
5. Specialities (8 cards with doctor attribution)
6. **Patient Tools** (NEW — 6 feature cards highlighting platform capabilities)
7. Doctors (2 featured + 7 grid)
8. Spine Hub (5 conditions, educational)
9. Testimonials (3 reviews + Google rating bar)
10. Insurance (18 partners)
11. Appointment (form + WhatsApp/Call/Emergency channels)
12. Contact (address, timings, directions, map)
13. Footer
14. WhatsApp Float + Mobile CTA Bar

## API Routes
- `GET /api/doctors` — All active doctors
- `GET /api/doctors/[slug]` — Single doctor profile
- `GET /api/doctors/[slug]/slots?date=YYYY-MM-DD` — Available time slots (handles recurring + one-time schedules, subtracts booked)
- `GET /api/doctors/upcoming-visits` — Next 5 visiting specialist dates
- `POST /api/appointments` — Create appointment (validates slot availability, auto-generates token, upserts patient)
- `GET /api/appointments?phone=X` — Patient's appointment history
- `GET /api/queue` — All active queues today
- `POST /api/queue` — Create queue for doctor+session (admin)
- `GET /api/queue/[id]` — Queue detail with all tokens
- `PATCH /api/queue/[id]` — Update queue status (active/paused/completed)
- `POST /api/queue/[id]/tokens` — Add walk-in patient (supports priority flag)
- `POST /api/queue/[id]/advance` — Next patient (priority-first ordering)
- `GET /api/queue/sse` — Server-Sent Events stream (5s polling, 30s heartbeat, 5min auto-close+reconnect)

## Key Decisions
- **Auth:** Phone + OTP only (no passwords). Optional for core features, required for records.
- **Queue real-time:** SSE (Server-Sent Events) — simpler than WebSockets, auto-reconnects.
- **Visiting doctors:** `schedule_type: 'one_time'` with `specific_date`. Admin sets each visit manually.
- **AI:** Claude Haiku for prescription/report explanations. Google Cloud Vision for OCR.
- **Marathi support:** Planned via language switcher + translated AI responses.

## Contacts
- Emergency: +91 96377 11122
- OPD: Mon-Sat, 10 AM - 1 PM & 6 PM - 7 PM
- WhatsApp: wa.me/919637711122
- Address: Kolhapur-Sangli Highway, Opp. Konduskar Kia, Dattanagar, Sangli 416416
