# Fun Projects

A mobile-first home for small fun apps. Mahabharatham is the first one: pick a cast and crew, keep your own list, and see which names the community is choosing.

There is no sign-in. This browser gets a random id, stored in `localStorage`, and that id is your cast.

## Run it

```bash
cd funapps-website
npm install
npm run dev
```

Open the URL Vite prints. The home lists the apps. Mahabharatham works before Firebase is connected: picks stay on this phone, and Community explains that totals need Firebase.

## Connect Firebase

One Firebase project serves every app on the site. Mahabharatham stores its data under `apps/mahabharatham/...` so the next app can use the same project.

1. Create a project in the [Firebase console](https://console.firebase.google.com/).
2. Add a web app and copy its config.
3. Create a Firestore database.
4. Copy `.env.example` to `.env.local` and paste the config:

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

5. Restart `npm run dev`. Vite only reads env files at startup.
6. Publish `firestore.rules`. In the console, open Firestore, then Rules, and paste the file. Or from this folder, after `npx firebase-tools login`:

```bash
npx firebase-tools deploy --only firestore:rules
```

Until those rules are published, saves can be rejected. The screen says so, and the pick still stays on the phone.

### What gets stored

- `apps/mahabharatham/casts/{visitorId}` — the names that browser picked.
- `apps/mahabharatham/tallies/{roleId}` — a count per name, plus the top names for that role.

Changing a name moves the count. Clearing a name removes it. One browser has one vote per role. Anyone with a share link can change that cast, because there is no account to prove who owns it.

## Use Mahabharatham

- **Pick** — open a role and choose a person from the list. Director, music director, and lyricist are shown. Tap Add a crew job to bring in another crew role, then pick that person the same way.
- **Community** — the leading names for each role.
- **Mine** — your list, and a share link at `/mahabharatham/c/{your id}`.
- The gold chips under the title jump to Pandavas, Allies, Kauravas, and Elders. Crew appears there after you open it.

## Add another fun app

1. Create `src/apps/your-app/` for its screens and data.
2. Add a card in `src/apps/registry.ts` with `id`, `title`, `blurb`, `path`, and `status: 'live'`. The home renders that list and does not need a layout change.
3. Add a route in `src/App.tsx`, the same way `/mahabharatham` is wired.
4. Store its Firestore data under `apps/your-app/...`, not in the Mahabharatham path.
5. Add a `match` for that path in `firestore.rules`, then publish the rules again.

Use `status: 'soon'` on a registry entry to show a card that cannot be opened yet.

## Scripts

- `npm run dev` — local site
- `npm run build` — typecheck and production build
- `npm run preview` — serve the production build
- `npm run lint` — oxlint
