Frontend (Vercel)

- Problem: `vite: command not found` during Vercel build.
- Fix applied: replaced aliased vite dependency with official `vite` in `frontend/package.json`.

Recommended Vercel settings for monorepo frontend folder:
- Project Root / Framework Preset: leave blank or point to root, but set:
  - "Root Directory": `frontend` (so Vercel runs install/build inside frontend)
  - Build Command: `npm run build`
  - Install Command: leave blank (Vercel will run `npm ci` or `npm install`)
  - Output Directory: `dist`
  - Node Version: (if needed) set to `18.x` or `20.x` in Project Settings or add `engines` in `package.json`.

Local verification:
```bash
# frontend
cd frontend
npm ci
npm run build
# expect dist/ folder
```

Backend (Render)

- Problem observed: Render tried to run build command `yaml` (misconfigured). Ensure the Render service settings use proper commands.

Recommended Render settings for Node backend service:
- Environment: `Node` (or Web Service)
- Build Command: `npm install` (or leave blank — Render will install dependencies automatically)
- Start Command: `npm start` (this runs `node server.js` per `backend/package.json`)
- Instance: choose appropriate plan
- Set required environment variables in Render Dashboard (example list):
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `ENCRYPTION_KEY`
  - `FRONTEND_URL` (e.g. `https://your-frontend-domain.com`)
  - Payment keys (Stripe/Monnify) as needed

Local verification:
```bash
# backend
cd backend
npm ci
npm start
# test health
curl http://localhost:5000/api/health || curl http://localhost:5000/api
```

Security & Production tweaks applied

- `backend/config/env.js`: added `FRONTEND_URL` (defaults to `http://localhost:3000`).
- `backend/app.js`: uses `FRONTEND_URL` for CORS, supports comma-separated allowed origins, sets `trust proxy` in production.

Other recommendations

- Confirm all required env vars exist in Render and Vercel dashboard.
- If Vercel uses the root repo, set the `Root Directory` to `frontend` so it runs build in the right folder.
- Avoid bundling dev-only aliases for build tools (e.g. replacing custom aliases for `vite`).

Next steps you may want me to do

- Run frontend build here and verify (I can run `npm ci && npm run build` inside `frontend`).
- Run backend locally and run smoke tests. 
- Create a deployment branch and commit these changes, then push and open a PR.
