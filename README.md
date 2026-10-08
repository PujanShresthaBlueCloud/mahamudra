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



# ///////////////////////////////////////
## when I unzip deploy bundle it is 792.2 MB can it be much smaller or not?
Yes — significantly. **792MB for a Next.js app is way outside normal range** (a healthy production bundle for this stack is typically 50–150MB), so this isn't "Next.js is just big," it's a real inefficiency worth fixing. The standard fix is Next.js's **standalone output mode**, which is specifically designed to solve exactly this problem.

## Why it's this big right now

Your current approach ships the **entire** `node_modules` folder (even after `npm prune --omit=dev`), which includes a lot of things your running app never actually touches at runtime — build tooling remnants, unused parts of large packages, etc. `npm prune` only removes devDependencies; it doesn't trim production dependencies down to "only what's actually imported."

## The fix: Next.js standalone output

This mode has Next.js **trace your actual code** and copy only the files genuinely required to run — typically cutting deploy size by 80%+.

### 1. Enable it in `next.config.mjs`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
```

### 2. What `next build` now produces

A new folder: `.next/standalone/` — a self-contained app with its own **minimal** `node_modules`, plus an auto-generated `server.js` that already does exactly what your hand-written one does (starts an HTTP server, listens on `process.env.PORT`). Two things it does **not** auto-include, which you must copy manually:

```bash
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
```

### 3. Important Prisma-specific gotcha

Next's file tracing frequently misses Prisma's compiled query engine binary (it's not a JS import, so tracing can't "see" it), which causes a confusing runtime error (`Prisma Client could not locate the Query Engine`) if skipped. Copy it explicitly:

```bash
cp -r node_modules/.prisma .next/standalone/node_modules/.prisma
cp -r node_modules/@prisma/client .next/standalone/node_modules/@prisma/client
```

### 4. Updated CI packaging steps

Replace your current prune/tar steps with:

```yaml
      - name: Build Next.js application
        run: npm run build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          DIRECT_URL: ${{ secrets.DIRECT_URL }}
          NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: ${{ secrets.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY }}
          CLERK_SECRET_KEY: ${{ secrets.CLERK_SECRET_KEY }}

      - name: Assemble standalone deploy folder
        run: |
          cp -r public .next/standalone/public
          cp -r .next/static .next/standalone/.next/static
          cp -r node_modules/.prisma .next/standalone/node_modules/.prisma
          cp -r node_modules/@prisma/client .next/standalone/node_modules/@prisma/client
          cp -r prisma .next/standalone/prisma

      - name: Package the deployable bundle
        run: tar -czf deploy.tar.gz -C .next/standalone .

      - name: Upload deploy bundle
        uses: actions/upload-artifact@v4
        with:
          name: deploy-bundle
          path: deploy.tar.gz
          retention-days: 1
```

Note the `npm prune --omit=dev` step is no longer needed at all — remove it, since standalone mode already ships only what's required.

## 5. One cPanel-side change: nothing, actually

Your Application startup file is already set to `server.js`, and your Application root is already `new.mahamudra.com` — since the standalone folder's **contents** (not a subfolder) get extracted directly into that same location, `server.js` lands in exactly the same place it already does. You can delete your hand-written root `server.js` from the repo now (it's superseded by the auto-generated one), or just leave it unused — either is fine, it won't be part of the tarball either way since CD's extraction step overwrites whatever's there.

## What to expect afterward

Re-run the pipeline and check the new `deploy.tar.gz` size in the CI logs before even reaching GoDaddy — you should see something in the **tens of MB**, not hundreds. If it's still unexpectedly large after this change, the fastest way to see exactly what's taking space is adding a quick debug step right before packaging:

```yaml
      - name: Show size breakdown
        run: du -sh .next/standalone/* | sort -rh
```

That'll show you precisely which folder is the actual culprit if anything's still off.


##what files from build do i need to run nextjs project manually into cpanel



With `output: "standalone"` enabled, here's exactly what you need — this is deliberately a much smaller, simpler list than before.

## 1. Build locally first

```bash
npm run build
```

## 2. Assemble the deploy folder

Next's standalone output doesn't auto-include static assets or the Prisma engine, so copy those in manually:

```bash
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
cp -r node_modules/.prisma .next/standalone/node_modules/.prisma
cp -r node_modules/@prisma/client .next/standalone/node_modules/@prisma/client
cp -r prisma .next/standalone/prisma
```

## 3. What you actually upload to cPanel

**Only the contents of `.next/standalone/`** — not the folder itself, its *contents* — go directly into `/home/mahamudr/new.mahamudra.com/`:

```
new.mahamudra.com/
├── server.js              ← auto-generated by Next, already exists in standalone/
├── package.json
├── .next/
│   ├── static/             ← the one you manually copied in step 2
│   └── (other build files, already here)
├── node_modules/           ← minimal, traced — NOT your full node_modules
│   ├── .prisma/             ← manually copied
│   └── @prisma/client/      ← manually copied
├── public/                 ← manually copied
└── prisma/                 ← manually copied (schema, for migrations)
```

That's it — this is dramatically smaller than your old 792MB bundle, and you do **not** need to run `npm install` on the server at all, since standalone mode already bundled the minimal dependencies it needs.

## 4. One thing NOT in this folder: your `.env`

Create this directly on the server — it was never meant to travel through the build or git:

```bash
cd /home/mahamudr/new.mahamudra.com
nano .env
```
```
DATABASE_URL=...
DIRECT_URL=...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
```

Or set the same values in **Setup Node.js App → Environment Variables** instead — either works, since standalone's `server.js` reads from `process.env` either way.

## 5. cPanel Node app settings — unchanged

- **Application root:** `new.mahamudra.com`
- **Application startup file:** `server.js` (this is now the auto-generated one, not your hand-written one — same filename, so no settings change needed)

## 6. Upload method

Since this is now small, plain **File Manager zip upload** works fine:

```bash
cd .next/standalone
zip -r ../../deploy.zip .
```

Upload `deploy.zip` via File Manager into `new.mahamudra.com`, extract it there, delete the zip.

## 7. Restart

**Setup Node.js App → Restart**, then visit `https://new.mahamudra.com`.

---

Once you confirm this smaller setup actually runs correctly end-to-end manually, it's worth going back and updating the CI/CD pipeline to produce exactly this same folder structure — which is what the packaging steps I gave you in the last message already do.


# Database prisma connection issue with mac os and godaddy linux while building the script for connecting DB
```
PrismaClientInitializationError: 
Invalid `prisma.program.findMany()` invocation:


Prisma Client could not locate the Query Engine for runtime "debian-openssl-1.0.x".

This happened because Prisma Client was generated for "darwin-arm64", but the actual deployment required "debian-openssl-1.0.x".
Add "debian-openssl-1.0.x" to `binaryTargets` in the "schema.prisma" file and run `prisma generate` after saving it:

generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "debian-openssl-1.0.x"]
}

The following locations have been searched:
  /home/mahamudr/new.mahamudra.com/node_modules/.prisma/client
  /home/mahamudr/new.mahamudra.com/node_modules/@prisma/client
  /Users/pujan/Desktop/pujanShrestha/Projects/mahamudra/node_modules/@prisma/client
  /tmp/prisma-engines
  /home/mahamudr/new.mahamudra.com/prisma
    at $n.handleRequestError (/home/mahamudr/new.mahamudra.com/node_modules/@prisma/client/runtime/library.js:121:7615)
    at $n.handleAndLogRequestError (/home/mahamudr/new.mahamudra.com/node_modules/@prisma/client/runtime/library.js:121:6623)
    at $n.request (/home/mahamudr/new.mahamudra.com/node_modules/@prisma/client/runtime/library.js:121:6307)
    at async l (/home/mahamudr/new.mahamudra.com/node_modules/@prisma/client/runtime/library.js:130:9633)
    at async Promise.all (index 0)
    at async y (/home/mahamudr/new.mahamudra.com/.next/server/app/page.js:1:13511) {
  clientVersion: '5.22.0',
  errorCode: undefined,
  digest: '1689243671'
}
```


## What's causing this

Prisma's Client isn't pure JavaScript — it bundles a compiled binary ("query engine") specific to the OS/architecture it was generated on. The error is telling you exactly what happened: **this Client was generated on your Mac** (`darwin-arm64` — Apple Silicon), but it's now running on GoDaddy's Linux server, which needs a completely different binary (`debian-openssl-1.0.x`). A Mac binary simply cannot run on Linux — this isn't a config typo, it's an actual missing file.

This almost certainly happened during the **manual deploy test** we walked through a couple messages ago — when you ran `npm run build` locally on your Mac to assemble the standalone folder and zip-uploaded it, `node_modules/.prisma` (containing the compiled engine) came from your Mac's `npx prisma generate`, not from a Linux machine.

## The fix — two parts

### 1. Tell Prisma to also generate the Linux engine

In `schema.prisma`:

```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "debian-openssl-1.0.x"]
}
```

`"native"` keeps your local Mac development working as before; `"debian-openssl-1.0.x"` is the exact target GoDaddy's server needs (per the error message — their shared hosting runs an older OpenSSL version, which is why it's `1.0.x` rather than the more common modern `3.0.x`).

### 2. Regenerate — but on Linux, not your Mac

This is the part that actually matters: adding `binaryTargets` only helps if `prisma generate` is **run on a machine that can produce that Linux binary**. Running `npx prisma generate` again on your Mac will add the `debian-openssl-1.0.x` engine file alongside the Mac one (Prisma can cross-generate multiple targets from one machine — it doesn't need to literally run on Linux to produce a Linux binary), so:

```bash
npx prisma generate
npm run build
```

on your Mac again, then redo the standalone assembly steps — this time `node_modules/.prisma/client` will contain **both** engine binaries, and the right one gets picked automatically at runtime based on the OS it's actually running on.

## Going forward: let CI/CD handle this, not manual uploads

This exact class of bug is precisely why I'd push you back toward finishing the CI/CD pipeline rather than continuing manual zip uploads — GitHub Actions' `ubuntu-latest` runner would have generated a Linux-compatible engine automatically in most cases (its default OpenSSL target just happens to not be the specific `1.0.x` your GoDaddy plan needs, which is exactly why step 1's explicit `binaryTargets` is still necessary either way). Once `binaryTargets` includes `debian-openssl-1.0.x`, your existing CI pipeline's `npx prisma generate` step will produce the correct engine automatically on every deploy, and you won't hit this again from either path.

## After fixing

Re-upload (or redeploy via CI/CD), restart the Node app, and check `/` and `/admin` again — this was specifically breaking any page that queries Prisma (your homepage's `programs.findMany()`, matching the stack trace), so fixing this should resolve the registration API too if its failure was secondary to this same root cause.