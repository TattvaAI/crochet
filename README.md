# The Studio

A premium, editorial website for a bespoke crochet commission business.

Built for one real goal: a gift buyer arrives from an Instagram Reel,
and within four seconds the page has told them this is expensive,
this is real, and this is worth waiting for.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # strict TS
```

Deploys to Vercel with no configuration. It will also deploy to
Netlify, Cloudflare Pages, or any static host that can run a Next.js
build.

### Dev and build never collide

`next dev` writes to `.next-dev`, `next build` writes to `.next`.

This is deliberate. Running a production build while the dev server is
running used to overwrite the dev server's chunks and produce
`Cannot find module './611.js'` on every page — two compilers writing
to one directory. They are now separated, so you can leave the dev
server running and build freely.

If you ever see a stale-cache error, stop the dev server and run
`npm run dev` again; it regenerates from scratch.

### Verification

```bash
npm run verify            # typecheck + validation + date logic
npm run check:all         # runtime, interactive, form, a11y/slop audit
```

Run these against a running dev server. They catch the classes of bug
a build alone will not: console errors, hydration failures, forms that
silently no-op, and design regressions.

---

## Fonts are self-hosted

`public/fonts/*.woff2` — Latin subset, 79 KB total for all three files.

There is no `@import` to Google Fonts anywhere. A blocking request to
`fonts.googleapis.com` measured **5.1 seconds** on this machine and sat
directly on the critical path to first paint. That is the exact
network a visitor in a small Indian town is on, where your Instagram
audience actually is.

After self-hosting: **224 ms** first contentful paint on the homepage,
zero external requests. `next/font` handles preload, `font-display:
swap`, and fallback metrics, so there is no invisible text and no
layout shift.

---

## The four files that matter

You do not need to read the rest of the codebase. Almost everything
you will ever want to change lives in these four places.

### 1. `src/lib/site.ts` — the brand

```ts
name: 'Croch-it',
wordmark: 'CROCH—IT',
email: 'studio@crochit.com',
instagram: 'https://instagram.com/crochit',
```

Change these values and the entire site updates. The brand name is
read from here everywhere — it is not hardcoded anywhere else.

Currency rates also live here. `INR` is the base; the other three are
derived from `rate`. **Update the rates quarterly** or the site will
quietly quote stale prices to international visitors.

### 2. `src/content/tiers.ts` — the pricing ladder

Three tiers, and the ordering is the whole strategy:

| Tier | Price | Working time | Personalisation |
|------|-------|--------------|-----------------|
| `atelier` | ₹35,000 – ₹90,000 | 14 weeks | Custom pattern, fibre, dimensions, names |
| `heritage` | ₹12,000 – ₹22,000 | 6 weeks | Fibre, colourway, one name or date |
| `gift` | ₹4,500 – ₹9,000 | 3 days | Monogram only |

**The `days` value drives the date calculator automatically.** If you
change a lead time, the "Commission by" dates update with it. There is
no second place to edit.

Read the note in this file about the personalisation rule — it is the
reason the ladder works.

### 3. `src/content/work.ts` — the work, process, fibre, testimonials

Every piece, every process step, every material, every testimonial and
every FAQ answer. The `note` on each piece is the editorial voice in
action — read a few before you write yours.

### 4. `public/` — your photographs

```
public/
  work/       moss-granny.jpg, seafoam-square.jpg, ...
  process/    enquiry.jpg, pattern.jpg, making.jpg, ...
  about/      maker.jpg
```

**Drop a file at the path listed in the content file and it appears
site-wide.** If the file is missing or fails to load, the page renders
a tonal tile instead of a broken image — so you can deploy now and swap
in photography over the next few months without anything breaking.

The current images are generated placeholders. Delete them as you
replace them.

---

## Setting up the enquiry form to actually send email

The form works out of the box and logs submissions to the server
console. To receive real email, set three environment variables:

```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxx
ENQUIRY_TO_EMAIL=you@yourdomain.com
ENQUIRY_FROM_EMAIL=Croch-it <hello@yourdomain.com>
```

That is all. The delivery code is a single function — `deliver()` in
`src/app/actions.ts` — and it is deliberately isolated so you can swap
in Postmark, a Google Sheet, a Notion database, or WhatsApp without
touching the form or the validation.

**If the send fails, the user is told.** It never shows a false
success. That is the single most important behaviour in the form.

---

## Architecture, and why it is deliberately small

Your brief specified a large stack. Here is what I actually used, and
what I left out.

**Used:**

- Next.js 15, App Router, React 19, TypeScript strict
- Tailwind CSS v4 with a custom token layer
- Framer Motion, used sparingly (see motion budget below)
- Zod for all form validation
- Vercel for hosting

**Deliberately not used:** PostgreSQL, Drizzle, Redis, Inngest,
tRPC, TanStack Query, Zustand, Nuqs, LiteLLM, LangGraph, pgvector,
Docker, Kubernetes, Turborepo, OpenTelemetry, Sentry, PostHog, shadcn/ui.

Not because those are bad tools. Because a six-page brochure site that
sells handmade blankets has no server state, no auth, no multi-tenant
data model, no background jobs, and no AI features. Adding a database
to store eleven enquiries a week is not engineering, it is
avoidance. The rule in your own brief — *add complexity only when
measurable product value exists* — cuts the other way here.

What that buys you: **147 kB of JavaScript on the heaviest page,
~103 kB shared, and every page prerendered to static HTML.** It will
load instantly on a phone in rural India, which is where a meaningful
share of your buyers are.

### The one deliberate exception to static export

There is no `output: 'export'`. Every page is a Server Component with
no runtime data dependency, so they all prerender to static HTML
anyway — but leaving the server enabled gives the enquiry form a
working Server Action. A true static export would have forced the
form onto a third-party endpoint and handed a third party your leads.
Not a trade worth making for one form.

### State

The only client state is the currency preference (localStorage) and the
date calculator. Both are component-local. There is no store, no
cache layer, and no state library, because there is no state to manage.
If you ever add a client portal, that is when `Zustand` and
`TanStack Query` start earning their place.

---

## The motion budget

Every animation on this site: a slow fade, a rise of at most 24px, or
a masked line reveal. That is the whole budget.

- No bouncing. No parallax. No scroll-jacking.
- Nothing moves more than 24px.
- Durations are 1s or slower.

This is not a limitation, it is the design. Luxury reads as
unhurried; a site that animates like a product launch page reads as a
template, however good the template is.

`prefers-reduced-motion` is fully respected — the site renders
instantly with no motion for visitors who have asked for that at the
OS level.

---

## Design system

Defined once, in `src/app/globals.css` under `@theme`.

- **Ground** `#f4f1ea` — warm paper, sampled from undyed wool
- **Ink** `#1a1714` — near-black, warm
- **Accent** `#7d2b23` — madder root, used on roughly 2% of any page
- **Display type** Instrument Serif — large, high contrast, editorial
- **Text type** Inter — small, generous line-height, quiet

There is no gold, no gradient, no purple-to-blue, no glassmorphism, no
card floating in space, and no rounded pills anywhere in the codebase.
If something looked like that, it would be a bug.

### The stitch library

`src/components/stitch.tsx` holds six hand-authored SVG motifs built
from real crochet geometry — shell, herringbone, cable rib, granny
stripe, chain loop, popcorn. They are the section dividers, the
bullets, and the background texture.

This is what makes the site read as crochet before a word is read. If
you change the identity, change this file first.

---

## Accessibility

- Skip-to-content link
- Every form field has a `<label>`, with `aria-invalid` and
  `aria-describedby` on error
- Details/summary accordions are native and keyboard-operable
- Visible focus rings in the accent colour
- All motifs are `aria-hidden` decoration
- Colour contrast meets AA on the ground/ink pairing
- Works fully with JavaScript disabled — the form posts, the accordions
  open, prices render in INR by default

---

## Before you go live

1. Replace the placeholder name and contact details in `src/lib/site.ts`
2. Put your real photographs in `public/`
3. Set the three email environment variables
4. Buy the domain and set up `hello@yourdomain.com`
5. Re-read the copy on `/commission` — the pricing arguments only
   work if they are true for your business
6. Check the currency rates

## And the thing that matters more than the website

Ask every satisfied client for a review **and** a detailed photo set,
and build the request into your fulfilment email. Those case studies
will outperform anything on this site, and they are the only part of
the marketing you own that a competitor cannot copy.
