# Frontend (Vite + React)

This folder contains a minimal Vite + React + TypeScript frontend for the `node_mongo_crud` project.

Quick start

1. cd into this folder:

```bash
cd app
```

2. Install dependencies (npm/yarn/pnpm):

```bash
npm install
# or
# yarn
# pnpm install
```

3. Start the dev server:

```bash
npm run dev
```

The Vite dev server runs on port 5173 by default. API calls are proxied to `http://localhost:3000/api` (see `vite.config.ts`). Make sure your backend is running on port 3000.

Files of interest

- `src/main.tsx` — app entry
- `src/App.tsx` — main container
- `src/components/DepartmentList.tsx` — example component fetching `/api/departments`
- `src/api.ts` — axios instance with base `/api`

Next steps / suggestions

- Add forms for Create/Update/Delete operations.
- Add routing with `react-router` if you need multiple pages.
- Add environment vars for backend URL if you want a different proxy in production.
