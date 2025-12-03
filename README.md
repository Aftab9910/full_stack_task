# Frontend — Fullstack Assignment

This is a simple React + Vite + Tailwind frontend designed for the task management UI.

## Setup

1. Install
```powershell
cd frontend
npm install
```
2. Create `.env` from `.env.example` and set `VITE_API_URL`.
3. Start dev server:

```powershell
npm run dev
```

## Pages
- /login — Login UI
- /register — Registration UI
- / — Dashboard (protected) with task list and create/update/delete

Auth
- AuthProvider handles session
- Token is stored in localStorage
- Axios adds Authorization header automatically
