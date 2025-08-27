# @nestvue/frontend

This is the Vue 3 frontend for the **NestVue Blog App**, a full-stack blog platform powered by NestJS and Vue, managed as a monorepo using npm workspaces.

The frontend is built with **Vite**, **TypeScript**, **PrimeVue**, and **Tailwind CSS**, offering a clean and responsive interface for blog readers and admins.

## Tech Stack

- **Vue 3** – Modern JavaScript framework
- **Vite** – Fast build and dev environment
- **TypeScript** – Static typing
- **Tailwind CSS** – Utility-first CSS
- **PrimeVue** – Rich UI components

---

## Directory

This app is located at:

```bash
apps/blog-frontend/
```

## Getting Started

### 1. Install dependencies (from root)

```bash
npm install
```

> The project uses npm workspaces. Installing from the root will install all packages across the monorepo.

### 2. Start the development server

From the monorepo root:

```bash
npm run --workspace @nestvue/frontend start:dev
```

Or use the root alias if configured:

```bash
npm run dev:frontend
```

Then visit:
[http://localhost:5173](http://localhost:5173)

---

## Available Scripts

From within `apps/blog-frontend/`:

### Compile and hot-reload for development

```bash
npm run dev
```

### Type-check, compile, and minify for production

```bash
npm run build
```

### Run ESLint

```bash
npm run lint
```

## License

MIT License. See root of the monorepo for license information.
