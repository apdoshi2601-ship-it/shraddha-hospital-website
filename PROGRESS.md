# Shraddha Hospitals — Progress Tracker

## Current State (Mar 24, 2026)
- **Live:** https://shraddha-hospitals-production.up.railway.app
- **Branch:** `nextjs-platform` (active development)
- **Railway Project:** `e98d8d7c-1404-44c1-8a1d-21d4ed9149fa`

---

## Completed

### Phase 0 — Scaffold & Port (Mar 20)
- [x] Next.js 14 + Tailwind + TypeScript scaffold
- [x] All 12 original HTML sections ported to React components
- [x] Neon PostgreSQL setup (17 tables)
- [x] 9 doctors, 8 specialities, 18 insurance partners seeded
- [x] Original static site preserved in `_original/`

### Phase 1 — Live Booking (Mar 20)
- [x] `/book` page with multi-step booking flow
- [x] Doctor calendar with date picker
- [x] Slot availability (recurring + one-time schedules, subtracts booked)
- [x] Appointment creation with auto patient upsert + token generation
- [x] Visiting doctor banner with upcoming visit dates
- [x] 5 API routes for doctors + appointments

### Phase 2 — OPD Queue (Mar 20)
- [x] `/queue` page with real-time display
- [x] SSE stream (5s polling, 30s heartbeat, 5min auto-reconnect)
- [x] Priority queue ordering (priority patients served first)
- [x] `/admin/queue-control` — create queues, add walk-ins, advance patients
- [x] 5 API routes for queue management

### Phase 2.5 — Real Assets Integration (Mar 24)
- [x] Merged apdoshi's `main` branch into `nextjs-platform` (unrelated histories)
- [x] Copied 15 doctor photos → `public/images/doctors/`
- [x] Copied 30 insurance logos → `public/images/insurance/`
- [x] Copied 4 gallery photos → `public/images/gallery/`
- [x] Copied 4 spine hub photos → `public/images/spine-hub/`
- [x] Updated Doctors component: icon placeholders → real photos, added 6 new doctors (15 total)
- [x] Updated Insurance component: text pills → real logo images, categorized (Insurers/TPAs/Govt)
- [x] Overhauled Spine Hub: Dr. Himanshu profile card, credentials, expertise tags, 7 conditions, stats bar, fellowship programme with 3 alumni photos
- [x] Updated Hero: hospital building photo replaces logo card
- [x] Updated About: front-view building photo
- [x] Deployed to Railway

---

## Pending

### Database — Seed New Doctors
- [ ] Seed 6 new doctors into Neon (Sanika, Prajakta, Appasaheb, Shantanu, Chaitanya, Prafulla)
- [ ] These doctors show on homepage but NOT in `/book` booking flow yet

### Phase 3 — Prescription Explainer
- [ ] Google Cloud Vision OCR for prescription images
- [ ] Claude Haiku for plain-language explanation
- [ ] Upload UI + result display

### Phase 4 — Symptom Navigator + Cost Estimator
- [ ] Symptom → speciality → doctor recommendation flow
- [ ] Procedure cost lookup with insurance coverage display

### Phase 5 — Vani + Recovery
- [ ] Vani voice AI integration (phone-based appointment booking)
- [ ] Post-surgery recovery tracker with weekly milestones
- [ ] Digital discharge summaries

### Other
- [ ] Gallery section (images available in `public/images/gallery/`, component not built)
- [ ] Marathi language support
- [ ] GSAP + Lenis scroll animations
- [ ] Lighthouse optimization
