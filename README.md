# codespaces-rails

Two independently deployable pieces:

- **`api/`** — Rails 8.1 API-only app, PostgreSQL, deploys to Render or Railway
  (both support real Ruby processes + a DB; GitHub Pages/Vercel do not).
- **`web/`** — Vite + React + TypeScript frontend, deploys to GitHub Pages
  and/or Vercel. It is a landing page + live API health demo, and talks to the API over `VITE_API_BASE_URL`.

## Requirements

- **Ruby 3.4.11** (for the API; see `api/.ruby-version`)
- **Node 20.19+** (Node 22 recommended; Vite 7 requires ≥ 20.19)

## Local setup

```bash
# API
cd api
bundle install
bin/rails db:prepare
bin/rails s        # http://localhost:3000

# Frontend (separate terminal)
cd web
npm install
npm run dev         # http://localhost:5173
```

## Testing

```bash
# API request specs (CI runs the same on every push touching api/)
cd api && bundle exec rspec

# Frontend type-check + production build
cd web && npm run build
```

## Deploying the API

**Render**: import this repo as a Blueprint (`render.yaml` at repo root
handles the web service + Postgres DB). Set `RAILS_MASTER_KEY` in the
dashboard after `rails credentials:edit` generates one.

**Railway**: `railway up` from `api/`, or connect the repo and set the
root directory to `api/`. Add a Postgres plugin and Railway injects
`DATABASE_URL` automatically.

## Deploying the frontend

**GitHub Pages**: `.github/workflows/frontend-pages.yml` builds and
deploys `web/` on every push to `master`. Set the `API_BASE_URL`
repository variable (Settings → Secrets and variables → Actions →
Variables) to your live API URL.

**Vercel**: import the repo, set the project root to `web/`, and add
`VITE_API_BASE_URL` as an environment variable pointing at your
deployed API. `web/vercel.json` handles the SPA rewrite.

## Notes

- GitHub Pages and Vercel can only serve the static frontend — neither
  runs a Ruby process, so the API must live on Render/Railway.
- CORS is configured in `api/config/application.rb` via
  `FRONTEND_ORIGIN` — point it at whichever frontend URL is live.
