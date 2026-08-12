# Shopwise MiniPOS

Shopwise is a React and Node.js MiniPOS for independent shops. Owners manage products, inventory, staff, sales, payments, returns, and reports; shopkeepers receive a focused checkout workspace.

## Structure

- `frontend/` — canonical React/Vite/Tailwind application
- `backend/` — Express REST API
- `supabase/` — database schema and migrations
- `assets/`, `pages/`, root `index.html` — legacy static frontend retained temporarily for rollback only

## Local development

Install each application once:

```powershell
npm --prefix backend install
npm --prefix frontend install
```

Create `backend/.env` from `backend/.env.example`, and `frontend/.env` from `frontend/.env.example`.

Run the API:

```powershell
npm run dev
```

Run the React frontend in a second terminal:

```powershell
npm run dev:frontend
```

Open `http://localhost:5174/`.

## Verification

```powershell
npm test
npm run lint
npm run format:check
npm run test:frontend
npm run lint:frontend
npm run build
```

## Deployment

Deploy one Railway service from the repository root. The build creates `frontend/dist`, and Express serves the React application and `/api/v1` from the same domain.

- Root Directory: `/`
- Config file path: `/railway.toml`
- Health endpoint: `/api/v1/health`
- Generate one public Railway domain
- Set `VITE_API_URL=/api/v1`
- Set `VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...` until acceptance is complete

Set `NODE_ENV=production` and `CORS_ORIGINS=https://YOUR-RAILWAY-DOMAIN`. Add the Supabase, Stripe, Resend, timezone, and logging variables from `backend/.env.example` to the same service.

Configure Stripe's test webhook destination as:

```text
https://YOUR-RAILWAY-DOMAIN/api/v1/payments/stripe/webhook
```

Provider and database secrets belong only in the backend service. Never expose `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, or `RESEND_API_KEY` through `VITE_` variables.

## Legacy frontend

The root static frontend is no longer the canonical build. `npm run build:legacy` exists only as a temporary rollback path and should be removed together with the legacy files after browser acceptance testing succeeds.
