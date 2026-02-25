# News Portal Frontend

## Tech Stack
- React 18 + Vite
- Tailwind CSS
- Zustand (state management)
- React Router v6
- Axios (API calls)
- React Hot Toast (notifications)

## Pages
- `/`             → Home (Hero, Top 6 News, Categories, CTA)
- `/news`         → All News (search, filter, pagination)
- `/news/:id`     → Single News Details
- `/login`        → Login
- `/register`     → Register
- `/dashboard`    → User Dashboard (profile, my news, create news)
- `/dashboard/edit/:id` → Edit News
- `/contact`      → Contact Us

## Setup

```bash
npm install
npm run dev
```

## Build & Deploy (Vercel)

```bash
npm run build
```
Then deploy `dist/` folder to Vercel or drag-and-drop on Vercel dashboard.

## Backend API
Connected to: https://backend-for-porject.onrender.com
