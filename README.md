# Trenton Rose — Portfolio

Personal portfolio for **Trenton Rose**, Senior Full Stack Developer (Java · React · React Native & iOS).

**Live site:** https://superworm1016.github.io/TrentonRose_Portfolio/

## Sections

- **Intro**: a lock-screen style opener with a live clock that lifts away on scroll
- **Home**: profile, summary, and an interactive IDE mockup (Spring Boot controller, React Native screen, Kubernetes manifest, live phone preview)
- **Featured**: a walkthrough of the AI Engineering Knowledge Assistant Platform
- **Projects**: healthcare, workflow automation, and AI platform builds
- **Experience**: an expandable timeline from Garmin to Jack Henry, plus education
- **Skills**: six numbered groups, from backend to quality & security
- **GitHub**: contribution chart and recent public repositories, fetched live
- **Contact**: code-styled contact card, copy-to-clipboard email, CV download

The site has dark and light themes (remembered per visitor) and respects `prefers-reduced-motion`.

## Tech

Vite · React 18 · TypeScript · Tailwind CSS · Framer Motion · lucide-react

## Editing content

All text comes from [`src/data/resume.ts`](src/data/resume.ts). Update that file and push. The CV download is [`public/Trenton_Rose_Resume.pdf`](public/Trenton_Rose_Resume.pdf).

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Deployment

Every push to `main` builds and deploys to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
In the repo settings, **Settings → Pages → Source** must be set to **GitHub Actions**.
