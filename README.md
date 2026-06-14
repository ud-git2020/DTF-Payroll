# DTF Payroll — React frontend

A modern React rebuild of the legacy **Doralawitiyehena Tea Factory** payroll
desktop application. This repo is the **frontend only**, running entirely on
**dummy data** so you can develop the UI before the backend exists.

## Stack (current 2025/26 recommended choices)

| Concern            | Choice                          | Why |
| ------------------ | ------------------------------- | --- |
| Build tool         | **Vite 6**                      | Fast dev server, the de-facto standard for React SPAs |
| Language           | **TypeScript** (strict)         | Type safety across the domain model |
| UI library         | **React 19**                    | Latest stable |
| Routing            | **React Router v7**             | Standard client routing |
| Server state       | **TanStack Query v5**           | Caching, loading/error states, mutations |
| Client/UI state    | **Zustand**                     | Tiny store for auth/session |
| Forms              | **React Hook Form** + **Zod**   | Performant forms + schema validation |
| Tables/grids       | **TanStack Table v8**           | Headless, perfect for payroll grids |
| Styling            | **Tailwind CSS v4**             | Utility-first, theme via `@theme` tokens |
| Components         | Custom, **CVA** + `tailwind-merge` (shadcn-style) | Owned, themable primitives |
| Icons              | **lucide-react**                | Clean, consistent |
| Dates              | **date-fns**                    | Lightweight formatting |
| Lint/format        | **ESLint 9 (flat)** + Prettier  | |

## Getting started

```bash
npm install      # (or pnpm install / yarn)
npm run dev      # starts Vite on http://localhost:5173
```

Login with **any non-empty** user ID + password (demo auth).

```bash
npm run build    # type-check + production build
npm run preview  # preview the build
npm run lint
```

> Requires Node 18+ (Node 20+ recommended).

## Project structure

```
src/
├─ components/
│  ├─ ui/          reusable primitives (Button, Input, Modal, DataTable, …)
│  └─ layout/      Sidebar, Topbar, AppLayout, ProtectedRoute, nav config
├─ features/       one folder per domain module
│  ├─ auth/        Login
│  ├─ dashboard/
│  ├─ departments/ hooks.ts + page  (master-data CRUD pattern)
│  ├─ banks/
│  ├─ employees/   list + tabbed form (Personal / Bank)
│  ├─ attributes/  editable Attribute/Value grids
│  ├─ payroll/     payroll run grid
│  └─ masters/     Company, placeholders
├─ mocks/          db.ts (dummy data) + api.ts (fake async API)
├─ store/          Zustand auth store
├─ lib/            utils (cn, money, dates), queryClient
└─ types/          domain model
```

## How the data layer works

`src/mocks/api.ts` is a fake backend: each method returns a Promise with a
small artificial delay and mutates the in-memory data in `src/mocks/db.ts`.
TanStack Query hooks (e.g. `useDepartments`, `useSaveBank`) call this API.

**To connect a real backend**, replace the bodies in `mocks/api.ts` with
`fetch`/axios calls — the feature hooks and components stay unchanged.

## What's implemented vs scaffolded

Fully built (real CRUD against dummy data): **Login, Dashboard, Departments,
Banks, Employees (Personal/Bank tabs), Employee Attributes, Company Attributes,
Company, Payroll Run**.

Scaffolded placeholders (wired in nav + routes, ready to fill using the same
pattern): Loans, Festival Advance, Employee Codes, Employee Types, Formula Pro,
Users, Options/Backup, Pay Sheet.

## Adding a new module (the pattern)

1. Add dummy data to `mocks/db.ts` and a few methods to `mocks/api.ts`.
2. Create `src/features/<name>/hooks.ts` with TanStack Query hooks.
3. Build the page with `DataTable` + a `Modal` form (`react-hook-form`).
4. Add the nav entry in `components/layout/nav.ts` and a `<Route>` in `App.tsx`.

Copy `features/departments` as the simplest reference.
```
```
