# NestVue Blog App

A full-stack blog platform built with **NestJS** (backend) and **Vue.js** (frontend), organized as a monorepo using **npm workspaces**.

This project is structured for modular development and clean separation between the backend API and the frontend UI.

## Overview

This is a monorepo containing two apps:

* `@nestvue/backend` — RESTful API built with NestJS, Prisma, and PostgreSQL
* `@nestvue/frontend` — Modern frontend built with Vue 3 and Vite

Both apps are managed together using **npm workspaces** for easier dependency management and streamlined development.

## Tech Stack

### Backend (`apps/blog-backend`)

* **NestJS** – Node.js backend framework
* **Prisma** – ORM for PostgreSQL
* **PostgreSQL** – Relational database
* **JWT** – Authentication
* **Swagger** – API docs
* **TypeScript**

### Frontend (`apps/blog-frontend`)

* **Vue.js 3** – Frontend framework
* **Vite** – Fast dev server and build tool
* **PrimeVue** – Component library
* **Tailwind CSS** – Utility-first CSS
* **TypeScript**

## Monorepo Structure

This project uses [npm workspaces](https://docs.npmjs.com/cli/v9/using-npm/workspaces) to manage dependencies for both frontend and backend from the root.

```bash
mini-blog-app/
├── apps/
│   ├── blog-backend/       → NestJS backend
│   └── blog-frontend/      → Vue.js frontend
├── node_modules/           → Workspace-level dependencies
├── package.json            → Root config with workspace settings
└── package-lock.json
```

**Root `package.json` includes:**

```json
{
  "workspaces": [
    "apps/blog-backend",
    "apps/blog-frontend"
  ]
}
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/recluzegeek/nestvue-blog-app.git
cd nestvue-blog-app
```

### 2. Install dependencies

This will install all workspace dependencies in one go:

```bash
npm install
```

## Running the Project

You can start each app individually from the root using workspace scripts.

### Start the backend (NestJS)

```bash
npm run start:dev --workspace @nestvue/backend
```

> Make sure to set up your `.env` file and database before running the backend. See `apps/blog-backend/README.md` for detailed backend setup.

### Start the frontend (Vue)

```bash
npm run dev --workspace @nestvue/frontend
```

Then visit:
[http://localhost:5173](http://localhost:5173)

## Available Scripts

You can also run the frontend and backend from the root `package.json` using the following scripts:

```json
"scripts": {
  "dev:backend": "npm run start:dev --workspace @nestvue/backend",
  "dev:frontend": "npm run dev --workspace @nestvue/frontend"
}
```

## Build Configuration with VS Code Tasks

To simplify development and improve the overall developer experience, a `.vscode/tasks.json` file is included in the project. This allows you to run both the backend and frontend apps in separate terminals with a single command—right inside VS Code.

You can trigger these tasks by going to **Terminal → Run Task...**, or even better, using keyboard shortcuts if you've set them up in `.vscode/keybindings.json`.

For example:

```json
[
  {
    "key": "ctrl+alt+b",
    "command": "workbench.action.tasks.runTask",
    "args": "Run Backend"
  },
  {
    "key": "ctrl+alt+f",
    "command": "workbench.action.tasks.runTask",
    "args": "Run Frontend"
  }
]
```

This setup ensures that both apps can be run side-by-side in your editor without needing to open multiple terminal windows manually.
