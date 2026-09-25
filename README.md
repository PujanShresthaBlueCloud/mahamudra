# Mahamudra — meditation retreat booking site

A Next.js (App Router) + TypeScript + Tailwind + Prisma project for a
meditation retreat center: a public site with three home page carousels,
a database-backed registration flow, and a clean frontend/backend split.

## File structure

```
mahamudra-crm/
├── prisma/
│   ├── schema.prisma          # Program, Teacher, Testimonial, Registration, ContactMessage
│   └── seed.ts                 # sample data for all three carousels
├── src/
│   ├── app/                    # FRONTEND — pages & routing (App Router)
│   │   ├── layout.tsx           # root layout: fonts, Navbar, Footer
│   │   ├── page.tsx             # Home (3 carousels)
│   │   ├── about-us/page.tsx
│   │   ├── registration/page.tsx
│   │   ├── code-of-conduct/page.tsx
│   │   ├── support-us/page.tsx
│   │   ├── contact-us/page.tsx
│   │   └── api/                 # BACKEND — HTTP layer
│   │       ├── registrations/route.ts
│   │       └── contact/route.ts
│   ├── components/              # FRONTEND — presentational + client components
│   │   ├── layout/               Navbar.tsx, Footer.tsx
│   │   ├── home/                 HeroSection.tsx + 3 carousels
│   │   ├── forms/                 RegistrationForm.tsx, ContactForm.tsx
│   │   └── ui/                    Carousel.tsx, Button.tsx, SectionHeading.tsx
│   ├── server/                  # BACKEND — the only code allowed to import Prisma
│   │   ├── db.ts                 Prisma client singleton
│   │   └── services/              program / content / registration / contact services
│   ├── lib/                     # shared: zod validation schemas, cn() helper
│   └── types/                   # lightweight types passed from server → client components
├── tailwind.config.ts
└── package.json
```

## How the frontend/backend separation works

- **`src/server/*` is the backend.** It's the only place `@prisma/client`
  is imported. Nothing under `src/components` ever touches Prisma directly.
- **`src/app/api/*/route.ts`** is the HTTP boundary — client components
  call these with `fetch()`, never the database directly.
- **Server Components** (`app/page.tsx`, `app/registration/page.tsx`) call
  `src/server/services/*` directly (no HTTP round-trip needed, since
  they run on the server) and pass plain serializable data down to client
  carousel/form components via props.
- **`src/lib/validation.ts`** holds zod schemas shared by both the client
  forms (instant validation) and the API routes (server-side validation) —
  one source of truth for what a valid registration/contact submission
  looks like.

If you later want a fully separate backend (e.g. a standalone API service
consumed by multiple frontends), everything in `src/server` is already
isolated enough to lift into its own package with minimal changes.

## Setup

```bash
npm install
cp .env.example .env      # then fill in your real DATABASE_URL
npm run db:generate       # generate the Prisma client
npm run db:migrate        # create tables (prompts for a migration name)
npm run db:seed           # populate sample programs/teachers/testimonials
npm run dev                # http://localhost:3000
```

Prisma is configured for PostgreSQL by default (`prisma/schema.prisma`) —
switch the `provider` to `"mysql"` or `"sqlite"` if you'd rather use those.

## The three home page carousels

| Carousel | Component | Data source |
|---|---|---|
| Programs | `ProgramsCarousel.tsx` | `Program` table via `program.service.ts` |
| Teachers | `TeachersCarousel.tsx` | `Teacher` table via `content.service.ts` |
| Testimonials | `TestimonialsCarousel.tsx` | `Testimonial` table via `content.service.ts` |

All three share one carousel primitive, `components/ui/Carousel.tsx` — a
dependency-free flex row with CSS scroll-snap, arrow buttons, and dot
indicators (per the "use CSS flex and Tailwind" requirement — no carousel
library was added).

## Using 21st.dev components instead

This project's components (`Navbar`, `Footer`, `Carousel`, form inputs)
are hand-built in the same idiom 21st.dev's components use — Tailwind +
Radix-style primitives + `lucide-react` icons — so anything you pull from
there should drop in cleanly. To swap one in:

1. Browse https://21st.dev/community/components and find a component
   (e.g. a Hero, Footer, or Carousel variant you like).
2. Most listings give you a `shadcn` CLI install command, e.g.:
   ```bash
   npx shadcn@latest add "https://21st.dev/r/<author>/<component-slug>"
   ```
   This drops the component's source directly into your project
   (commonly under `src/components/ui/`) — you own the code, same as the
   rest of this project.
3. Replace the import in the relevant page/component (e.g. swap
   `components/home/HeroSection.tsx`'s markup, or replace
   `components/ui/Carousel.tsx` with a pulled-in carousel component) and
   wire your existing data props into it.

## Responsiveness

Every page uses Tailwind's responsive prefixes (`sm:`, `lg:`) with flexbox
and CSS grid — nav collapses to a mobile menu under `lg`, carousels show
1 card on mobile up to 3–4 on desktop, and all forms/grids stack to a
single column on small screens.

## Notes on this build

- I couldn't run `npm install` / `next build` in the sandbox this was
  built in (no network access), so there's no live database or running
  dev server to show you. I did run every `.ts`/`.tsx` file through the
  TypeScript compiler directly (with local stub types for `next`,
  `@prisma/client`, etc.) and confirmed there are no syntax errors or
  unresolved local references — but please run `npm install && npm run
  dev` yourself as the real verification before relying on this.
- Program/teacher/testimonial images point to Unsplash URLs as
  placeholders — swap `imageUrl` values in `prisma/seed.ts` for your own
  photos before going live.
