# Frontend Constitution

> Read root `../CLAUDE.md` and `../docs/DESIGN-SYSTEM.md` + `../docs/LAYER-1-presentation.md` BEFORE writing UI.

## Stack
- Next.js 15 App Router + React 19 + TypeScript strict
- Tailwind CSS v4 + CSS variables
- Shadcn UI (Radix primitives, copy-in)
- Lucide React (icons)
- ApexCharts + react-apexcharts (dynamic import only)
- TanStack Query v5 (server state)
- TanStack Table v8 (data tables)
- Zustand + persist (UI/auth state)
- Axios + interceptors (HTTP)
- React Hook Form + @hookform/resolvers/zod
- Zod (mirror backend schemas)
- next-intl (i18n TH/EN)
- next-themes (dark/light/system)
- sonner (toasts)
- lodash-es
- dayjs + dayjs/locale/th

## Folder structure (`src/`)
```
app/              ← Next.js App Router pages
domain/           ← types + Zod schemas (mirror backend)
application/      ← TanStack Query hooks (use cases)
infrastructure/   ← Axios + API endpoints
persistence/      ← Zustand stores (localStorage)
presentation/     ← UI components (Shadcn-based)
shared/           ← utils, i18n messages, design tokens
```

## Hard rules
1. ทุก string ผ่าน `useTranslations()` — th.json + en.json พร้อมกัน
2. ทุก color ใช้ Tailwind token (ห้าม hex)
3. ทุก fetch ผ่าน TanStack Query
4. ทุก mutation ใช้ TanStack `useMutation`
5. ทุก form ใช้ React Hook Form + zodResolver
6. Protected actions ห่อด้วย `<Can permission="...">`
7. ทดสอบที่ 375 / 768 / 1440 ทุกหน้า
8. Light + Dark + System theme รองรับครบ
9. a11y: keyboard nav + ARIA + contrast ≥ 4.5

## Routes (App Router)
```
/[locale]/(auth)/login
/[locale]/(auth)/register
/[locale]/(auth)/forgot-password
/[locale]/(dashboard)              ← home
/[locale]/(dashboard)/medicines
/[locale]/(dashboard)/medicines/new
/[locale]/(dashboard)/medicines/[id]
/[locale]/(dashboard)/medicines/[id]/edit
/[locale]/(dashboard)/categories
/[locale]/(dashboard)/units
/[locale]/(dashboard)/users
/[locale]/(dashboard)/roles
/[locale]/(dashboard)/audit-logs
/[locale]/(dashboard)/settings
```

## Scripts (planned)
```json
{
  "dev": "next dev -p 3001",
  "build": "next build",
  "start": "next start -p 3001",
  "typecheck": "tsc --noEmit",
  "lint": "next lint",
  "test": "vitest",
  "test:e2e": "playwright test"
}
```

## Env (`.env.local`)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```
