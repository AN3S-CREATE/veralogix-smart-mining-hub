# AGENTS.md

## Cursor Cloud specific instructions

### What this is
Veralogix Smart Mining HUB — a single Next.js 15 (App Router) full‑stack web app
(TypeScript + Tailwind + ShadCN UI). Backend data is Firebase (Firestore/Auth) and
AI features use Genkit (Google AI / Gemini). There is only one service to run.

### Running / building (commands live in `package.json`)
- Dev server: `npm run dev` → http://localhost:3000 (this is the dev command; do not use `npm start`/`next build` for development).
- Build: `npm run build` (runs `scripts/name-scan.ts` then `next build`).
- Genkit dev UI (optional, for AI flows): `npm run genkit:dev`.

### Non‑obvious caveats
- **Auth is role-based, not real Firebase auth.** `/` redirects to `/login`, which is a
  role picker (Admin/Supervisor/Operator/Executive/Viewer) stored in `localStorage`.
  Selecting a role navigates into the dashboard. No credentials are needed to use the app.
- **The Firebase web SDK is initialized at startup and crashes the whole app if the
  API key is empty** (auth/invalid-api-key, thrown in src/firebase/index.ts). A
  git-ignored .env.local with non-empty placeholder values lets the app boot. Recreate it if missing with these contents:

  NEXT_PUBLIC_FIREBASE_API_KEY=placeholder
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=placeholder
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=placeholder
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=placeholder
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=placeholder
  NEXT_PUBLIC_FIREBASE_APP_ID=placeholder
  GOOGLE_GENAI_API_KEY=placeholder

  Note: You can map GOOGLE_GENAI_API_KEY to GEMINI_AI_API_KEY so Genkit AI flows can use the injected key.
- **Real Firestore data requires a real Firebase project.** With placeholder config,
  Firestore-backed widgets degrade gracefully (empty / spinning loaders) — this is
  expected, not a bug. To load real data you need real `NEXT_PUBLIC_FIREBASE_*` values and
  a `service-account.json` in the repo root, then `npm run db:seed` (see `README.md`).
  Much of the dashboard KPI content is static mock data and renders without any backend.
- **`npm run build` while `npm run dev` is running clobbers `.next` and makes the dev
  server return 500.** After building, restart dev (`rm -rf .next && npm run dev`).
- **Dev compiles routes on-demand**; the first visit to a heavy route (e.g. `/plant`,
  `/fleet`, `/safety`) can take several seconds and shows a full-screen loader. Pre-warm
  with `curl http://localhost:3000/<route>` if you need fast navigation for a demo.
- **`npm run typecheck` has many pre-existing TS errors and is not expected to pass.**
  `next.config.ts` sets `typescript.ignoreBuildErrors: true`, so `npm run build` still
  succeeds. Do not try to fix these as part of unrelated work.
- **`npm run lint` (`next lint`) is unconfigured** and prompts interactively to set up
  ESLint (no ESLint config in the repo). The `.github/workflows/deploy.yml` CI steps
  (`npm test`, `npx webpack`) are aspirational and do not match the real scripts (there is
  no `test` script and the build is `next build`).
