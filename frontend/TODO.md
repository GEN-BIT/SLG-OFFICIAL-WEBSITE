# TODO — Admin login credentials + backend

## Step 1 — Add backend skeleton
- [ ] Create `backend/package.json`
- [ ] Create `backend/server.js` (Express app, JSON parsing, routes mount, health endpoint)

## Step 2 — Implement admin authentication
- [ ] Add JWT auth middleware
- [ ] Add `/api/auth/login` endpoint
- [ ] Add `/api/auth/me` endpoint
- [ ] Add `/api/auth/change-password` endpoint
- [ ] Use bcrypt password hashing
- [ ] Use environment variables for admin credentials (no plaintext in repo)

## Step 3 — Implement dashboard inquiry endpoints
- [ ] Add `/api/contact` (GET all with optional status filter)
- [ ] Add `/api/contact/:id` (GET one)
- [ ] Add `/api/contact/:id/status` (PATCH)
- [ ] Add `/api/contact/:id/spam` (PATCH)
- [ ] Add `/api/contact/:id` (DELETE)

## Step 4 — Data storage
- [ ] Implement simple JSON-file storage for inquiries (dev-friendly)

## Step 5 — Add configuration
- [ ] Add `backend/.env.example`
- [ ] Ensure CORS allows frontend pages to call backend

## Step 6 — Install dependencies
- [ ] Run `npm install` inside `backend/`

## Step 7 — Start backend + verify
- [ ] Start backend with `npm run dev`
- [ ] Validate `/api/health/live` returns 200
- [ ] Validate admin login returns expected shape for frontend (`success`, `message`, `data.token`, `data.user`)

