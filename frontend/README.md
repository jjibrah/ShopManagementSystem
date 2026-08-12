# Shopwise React frontend

React/Vite application served by the Express backend in production.

## Run locally

```powershell
Copy-Item .env.example .env
npm install
npm run dev
```

The local frontend uses `VITE_API_URL=http://localhost:5000/api/v1`. Add only a Stripe test publishable key to `VITE_STRIPE_PUBLISHABLE_KEY` when testing card payments.

## Commands

```powershell
npm run lint
npm test
npm run build
```

## Railway

Railway deploys from the repository root using `/railway.toml`. The React application is built into `frontend/dist`, then the Express backend serves it alongside `/api/v1` from one domain.

Set `VITE_API_URL=/api/v1` in Railway. Backend and provider secrets must never use `VITE_` variables.
