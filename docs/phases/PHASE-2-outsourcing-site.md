# PHASE 2 — BMS Lab as an IT outsourcing company (`/outsourcing/`)

*Created 2026-10-07. Owner: Orchestrator session. Status: in progress.*

## Problem

BMS Lab currently presents itself only through one product (the Digital Twin landing at `/`).
The business wants to also sell **IT outsourcing / outstaffing / AI engineering** services to
international (US, UK, EU, Gulf) and local clients, positioned next to the global players
(Accenture, TCS, Infosys, Cognizant, Wipro, HCLTech, Capgemini, EPAM, IBM Consulting,
Globant, Endava; BPO: Teleperformance, Concentrix, TaskUs, TELUS Digital) and the Uzbekistan
ecosystem (IT Park, outsource.gov.uz). The page must feel premium — "wow" animations.

## Solution

A second page in the same Vite project: `outsourcing/index.html` → URL `/outsourcing/`.
The existing Digital Twin landing (`/`) is untouched and is shown on the new page as the
**flagship in-house case** ("we build our own AI product — proof we ship").

## Implementation decisions

- Multi-page Vite: `build.rollupOptions.input = { main: 'index.html', outsourcing: 'outsourcing/index.html' }`.
  nginx `try_files $uri $uri/` already serves `/outsourcing/`.
- Own entry `src/outsourcing/main.ts`, own styles `src/outsourcing/styles/*.css`, own modules
  `src/outsourcing/modules/*.ts`. Reuse `src/config.ts` (CONTACT, BRAND, botStart) and
  `src/utils/dom.ts` — do not duplicate contacts. Reuse the Manrope fonts in `public/fonts/`.
- Libraries: only what is installed — GSAP (+ScrollTrigger), Lenis. No new runtime deps.
- **Dark, premium theme** (navy `#0f172a`-ish base → near-black), brand accents cyan `#22d3ee`
  and indigo `#6b7cf0` from `src/styles/tokens.css`. Logo: `public/logos/bms-wordmark-light.svg`.
- Languages: **EN (default)**, UZ (Latin), RU — switcher in header, dictionary in
  `src/outsourcing/i18n.ts` (typed, one key set for all three), `?lang=` + localStorage (try/catch).
- No fabricated facts: numeric claims that are business facts (team size, projects delivered)
  live in `src/outsourcing/config.ts` marked `// TODO confirm with business`. Use honest,
  commitment-style numbers (e.g. "48 h to first proposal", "2 weeks to a working team",
  "4–5 h daily overlap with EU", "GMT+5"). Do not name the global companies as clients/partners;
  do not use their logos. A comparison block may compare *models* ("Global enterprise vendor"
  vs "Freelancers" vs "BMS Lab"), not named companies.

## Sections (order)

1. **Header** — logo, nav (Services, Models, Process, Cases, Why Uzbekistan, Contact), lang switch, CTA "Book a call". Glass blur on scroll, hides on scroll down / shows on up.
2. **Hero (WOW)** — full screen. Interactive canvas **dot-globe** (rotating sphere of dots, Tashkent highlighted, animated glowing arcs to London, Berlin, New York, Dubai, Seoul, Riyadh), drag/mouse parallax. Headline revealed word-by-word/char-by-char ("Engineering teams from Tashkent. Built for the world." style), sub-line, 2 CTAs (magnetic buttons), live **time-zone strip** (Tashkent / London / Berlin / New York / Dubai clocks, real time).
3. **Logos/tech marquee** — infinite marquee of tech stack (TypeScript, React, Node.js, Python, Go, Java, .NET, Flutter, Kotlin, Swift, PostgreSQL, AWS, Azure, GCP, Kubernetes, Docker, OpenAI/LLMs…) as styled text pills, two rows opposite directions, speeds up with scroll velocity.
4. **Stats** — animated counters (config-driven).
5. **Services** — pinned horizontal-scroll track on desktop (vertical stack on mobile): Custom software, Web & mobile, AI & LLM engineering, Dedicated teams / outstaffing, QA & test automation, DevOps & cloud, UI/UX design, BPO & support desk (24/7). Cards with 3D tilt + cursor-follow glow.
6. **Engagement models** — Dedicated team · Staff augmentation (outstaffing) · Fixed-scope project · AI pilot in 30 days. Toggle/tabs with animated indicator.
7. **AI-native delivery ("software factory")** — Idea → Research → PRD → Vertical slices → AI-assisted build → 4-layer verification → Review → Deploy → Observe. SVG path that draws itself on scroll with nodes lighting up.
8. **Flagship case: BMS Lab Digital Twin** — our own product: expert knowledge → AI twin answering with source proof, "board of directors" of AI advisors. Animated mock card. Link to `/`.
9. **Industries** — Fintech, E-commerce, Healthcare, EdTech, Logistics, Government/GovTech, Telecom — grid with hover reveal.
10. **Why Uzbekistan / Why BMS Lab** — GMT+5 overlap, cost efficiency vs Western rates, IT Park residency benefits (link https://outsource.gov.uz), multilingual teams (EN/RU/UZ), NDA & IP transfer, security. Comparison table: Global enterprise vendor vs Freelancers vs BMS Lab (speed, cost, flexibility, AI-native, senior attention).
11. **Process / first 14 days** — step timeline.
12. **FAQ** — accordion (5–6 Qs: pricing models, IP, NDA, time zones, how fast we start, trial).
13. **Final CTA + contact** — big gradient text, contact form (no backend: on submit build a `mailto:` to CONTACT.email with the fields, plus Telegram link via `botStart('outsourcing')`), phone, email, address from `src/config.ts`.
14. **Footer**.

Global wow layer: custom cursor (dot + ring, grows on links; disabled on touch), scroll
progress bar, preloader/intro (≤1.2 s, counter 0→100 then curtain reveal), section reveal
animations, noise/grain overlay + soft animated gradient blobs, smooth scroll (Lenis).

## Acceptance criteria

1. `npm run build` passes (tsc strict, no `any`, no ts-ignore) and emits both `dist/index.html` and `dist/outsourcing/index.html`.
2. `/` (existing Digital Twin landing) is unchanged visually and functionally.
3. `/outsourcing/` renders all 14 sections in EN; UZ and RU switch every visible string; choice persists across reload.
4. Hero globe animates at ≥ 50 fps on a laptop, pauses when off-screen (IntersectionObserver) and when tab hidden; is crisp on HiDPI (devicePixelRatio capped at 2).
5. `prefers-reduced-motion: reduce` → no preloader, no globe rotation (static render), no pinned horizontal scroll, no custom cursor; all content visible.
6. Responsive at 390 / 768 / 1280 / 1920 px: no horizontal page scroll, readable type, services become vertical on < 1024 px, nav becomes burger menu.
7. Zero console errors/warnings on load and while scrolling the whole page.
8. Accessibility: semantic landmarks, one `h1`, buttons are `<button>`, focus-visible styles, `lang` attr updates on switch, images/svg decorative ones `aria-hidden`, color contrast AA for body text.
9. Contact form validates required fields (name, email, message) with inline errors and opens a prefilled `mailto:`.
10. SEO: title, description, canonical `https://bmslab.uz/outsourcing/`, OG tags (reuse `/og-image.png`), JSON-LD `Organization` with `ProfessionalService`.
11. Link from the existing landing? **Out of scope** for now (do not edit `/`).

## Out of scope

Backend for the form, CMS, blog, real client logos/testimonials, replacing `/`, deploy.

## Further notes

- Numbers / claims to confirm with business: see `src/outsourcing/config.ts`.
- If business approves, the outsourcing page can become `/` and the product move to `/digital-twin/` (one config change + nginx) — separate decision.
