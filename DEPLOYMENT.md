# Deployment Guide — Job Search (JobFinder)

**Last updated:** June 2026

Single-repo app: **Vue 3 + Vite** frontend with **Vercel serverless** proxy (`api/jobs.js`) to the JSearch API (RapidAPI).

## Hosting

Deploy the project root to **Vercel**. No separate database or Java backend.

## Pre-deployment checklist

- [ ] RapidAPI account with [JSearch API](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch) subscribed
- [ ] `RAPIDAPI_KEY` set in Vercel (Production and Preview)
- [ ] `vercel.json` present (serverless `api/**/*.js` config)

## Vercel environment variables

| Variable | Description |
|----------|-------------|
| `RAPIDAPI_KEY` | RapidAPI key for `jsearch.p.rapidapi.com` |

The serverless function reads `process.env.RAPIDAPI_KEY` — never expose this key in the browser or commit it to git.

## Deploy steps

```bash
npm install
npm run build   # optional local check
vercel          # first deploy
vercel --prod   # production
```

Or connect the GitHub repo in the Vercel dashboard and deploy on push.

## Local development

1. Copy `.env.example` → `.env`
2. Set `RAPIDAPI_KEY=your_key`
3. `npm run dev`

## Rollback

Vercel → **Deployments** → **Redeploy** the last successful deployment.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 401/403 from jobs API | Verify RapidAPI subscription and key |
| API route 404 | Ensure `api/jobs.js` is included; check `vercel.json` rewrites |
| Empty results | Confirm query parameter is sent; check RapidAPI quota |

See [README.md](README.md).
