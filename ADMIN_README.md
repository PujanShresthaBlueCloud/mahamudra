# Mahamudra — Admin CRM Backend

This is the backend/admin half of the project: Clerk authentication, a
protected `/admin` dashboard, and secure CRUD API routes backed by Prisma.
It's built to drop into the existing frontend project you already have —
nothing here touches your public pages.

## 1. Install dependencies

```bash
npm install @clerk/nextjs @prisma/client zod \
  @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-slot \
  class-variance-authority clsx tailwind-merge lucide-react

npm install -D prisma
```

## 2. File structure (what's added)

```
├── middleware.ts                        # Clerk route protection
├── .env.example
├── prisma/schema.prisma                 # merge into your existing schema
├── lib/
│   ├── db.ts                             # Prisma client singleton
│   ├── auth.ts                           # requireAdmin() — the core guard
│   ├── validations.ts                    # zod schemas
│   ├── rate-limit.ts
│   ├── audit.ts
│   └── utils.ts                          # cn() helper for the UI components
├── components/
│   ├── ui/                               # shadcn/21st.dev-style primitives
│   │   ├── button.tsx  card.tsx  input.tsx  textarea.tsx
│   │   ├── label.tsx   badge.tsx table.tsx  dialog.tsx
│   └── admin/
│       ├── Sidebar.tsx  Topbar.tsx  StatCard.tsx
│       ├── ServicesTable.tsx  ServiceFormDialog.tsx
│       └── BookingsTable.tsx
└── app/
    ├── sign-in/[[...sign-in]]/page.tsx
    ├── sign-up/[[...sign-up]]/page.tsx
    ├── admin/
    │   ├── layout.tsx                    # server-side admin gate + shell
    │   ├── page.tsx                      # dashboard overview
    │   ├── services/page.tsx             # full CRUD
    │   ├── bookings/page.tsx             # list + status updates
    │   └── unauthorized/page.tsx
    └── api/admin/
        ├── services/route.ts             # GET, POST
        ├── services/[id]/route.ts        # GET, PATCH, DELETE
        ├── bookings/route.ts             # GET
        └── bookings/[id]/route.ts        # PATCH, DELETE
```

## 3. Using components from 21st.dev

The `components/ui/*` files are written in the exact shape the
shadcn/21st.dev CLI would generate, so you have two equivalent options:

- **Use the files as given** — no extra step, they work as-is.
- **Or pull the originals from 21st.dev/shadcn directly** (get a free API
  key at https://21st.dev/mcp) and overwrite these files 1:1 — nothing
  else in the project needs to change, since the component names, props,
  and exports match:
  ```bash
  21st_sk_1d0b56d575200488cbd2b2f23461c030abe7f20e2c27c829ec95668d9c3e51c4
  npx shadcn@latest add "https://21st.dev/r/shadcn/button?api_key=21st_sk_1d0b56d575200488cbd2b2f23461c030abe7f20e2c27c829ec95668d9c3e51c4"
  npx shadcn@latest add "https://21st.dev/r/shadcn/card?api_key=21st_sk_1d0b56d575200488cbd2b2f23461c030abe7f20e2c27c829ec95668d9c3e51c4"
  npx shadcn@latest add "https://21st.dev/r/shadcn/dialog?api_key=21st_sk_1d0b56d575200488cbd2b2f23461c030abe7f20e2c27c829ec95668d9c3e51c4"
  npx shadcn@latest add "https://21st.dev/r/shadcn/table?api_key=21st_sk_1d0b56d575200488cbd2b2f23461c030abe7f20e2c27c829ec95668d9c3e51c4"
  npx shadcn@latest add "https://21st.dev/r/shadcn/input?api_key=21st_sk_1d0b56d575200488cbd2b2f23461c030abe7f20e2c27c829ec95668d9c3e51c4"
  npx shadcn@latest add "https://21st.dev/r/shadcn/label?api_key=21st_sk_1d0b56d575200488cbd2b2f23461c030abe7f20e2c27c829ec95668d9c3e51c4"
  ```
  Browse more polished dashboard blocks (stat cards, charts, tables) at
  https://21st.dev/community/components and swap them into
  `app/admin/page.tsx` the same way.

## 4. Wire Clerk into your existing root layout

Add `<ClerkProvider>` around your existing `app/layout.tsx` body (don't
replace the whole file — just wrap it):

```tsx
// app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

## 5. Set up Clerk

1. Create an application at https://dashboard.clerk.com and copy the two
   keys into `.env` (see `.env.example`).
2. **Make a user an admin**: Dashboard → Users → select a user → Metadata
   → add to **Public metadata**:
   ```json
   { "role": "admin" }
   ```
3. **(Recommended) Add role to the session token** so `requireAdmin()`
   doesn't need an extra API call on every request: Dashboard → Sessions
   → Customize session token → add:
   ```json
   { "metadata": "{{user.public_metadata}}" }
   ```
   `lib/auth.ts` works either way — it just does one extra lookup if this
   step is skipped.

## 6. Database

```bash
# merge prisma/schema.prisma into your existing schema.prisma first if
# you already have one, then:
npx prisma migrate dev --name add_crm_models
npx prisma generate
```

## 7. How the security model works

| Layer | What it does |
|---|---|
| `middleware.ts` | First-pass reject: unauthenticated users never reach `/admin/*` or `/api/admin/*`; non-admins (via session claim) are redirected early. |
| `app/admin/layout.tsx` | Authoritative check via `requireAdmin()` — re-verifies on the server even if middleware were misconfigured or bypassed. |
| Every API route | Calls `requireAdmin()` again independently. An API route is never protected only by "you can't see the link" — it's protected by a server-side check that runs no matter how the request arrives. |
| `lib/validations.ts` (zod) | Every write is validated and coerced server-side before touching Prisma — untrusted input never reaches the database as-is. |
| `lib/rate-limit.ts` | Throttles abuse per admin user. Swap for `@upstash/ratelimit` in a multi-instance deployment (see comments in the file). |
| Prisma | Parameterized queries by construction — not vulnerable to SQL injection the way raw string-built SQL would be. |
| `lib/audit.ts` | Every create/update/delete is logged with who did it and when (`AuditLog` table) — lets you answer "who changed this" after the fact. |
| `noStore()` in `lib/api-helpers.ts` | Admin API responses are never cached by the browser or a CDN. |

**Before going to production**, also do these (not code changes, but
required for a real "highly secure" deployment):
- Put the app behind HTTPS only (Vercel/most hosts do this by default).
- Turn on Clerk's bot protection and email verification.
- Replace the in-memory rate limiter with Redis-backed if you run more
  than one server instance.
- Restrict your database user's permissions to only what this app needs.
- Set up alerting on repeated 401/403s from `/api/admin/*` (a sign of a
  credential-stuffing or scraping attempt).

## 8. Extending CRUD to Messages and Contributions

`ContactMessage` and `Contribution` follow the exact same shape as
`Service`. To add their admin pages, copy the pattern:
1. Add a zod schema in `lib/validations.ts`.
2. Add `app/api/admin/messages/route.ts` + `[id]/route.ts` (copy
   `services/route.ts`, swap the model name).
3. Add `app/admin/messages/page.tsx` (copy `bookings/page.tsx` — it's a
   read + simple-update pattern, no dialog form needed for messages,
   since it's a "mark as read" pattern rather than full CRUD).
