<p align="center">
  <a href="https://nestjs.com/" target="_blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="NestJS Logo" /></a>
</p>

<p align="center">
  A simple and clean Blog Management API built with NestJS, Prisma, and PostgreSQL.
</p>

## Introduction

This is a basic blog backend built with [NestJS](https://nestjs.com/) as part of a take-home assignment. It covers essential CRUD operations for blog posts, along with optional features like user authentication using JWT.

The app follows RESTful principles and uses Prisma as the ORM to connect to a PostgreSQL database. Swagger is used for API documentation.

## Tech Stack

This project uses:

* **NestJS** — backend framework
* **Prisma** — ORM for database access
* **PostgreSQL** — database
* **JWT** — for user authentication
* **Swagger** — API documentation
* **TypeScript** — language of choice

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/recluzegeek/median-app-nestjs.git
cd your-repo
```

### 2. Set up environment variables

Copy the example `.env` file and fill in your own values:

```bash
cp .env.example .env
```

Make sure to update:

* `DATABASE_URL`
* `JWT_SECRET`

### 3. Install dependencies

```bash
npm install
```

### 4. Set up the database

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

> Run `npx prisma generate` again anytime you update the Prisma schema.

---

## Running the App

```bash
# Start in development mode
npm run start:dev

# Start normally
npm run start

# Build and start for production
npm run start:prod
```

## Features

### Articles API

* `GET /articles` – list all published articles
* `GET /articles/drafts` – list all drafts
* `GET /articles/:id` – get a single article (draft or published)
* `POST /articles` – create a new article
* `PATCH /articles/:id` – update an article
* `DELETE /articles/:id` – delete an article

> Article management routes are **protected** and require authentication.

### Users API

* `POST /user` – create a new user
* `GET /user` – list all users
* `GET /user/:id` – get user by ID
* `PATCH /user/:id` – update user
* `DELETE /user/:id` – delete user

### Authentication (Bonus)

* `POST /auth/register` – register a user
* `POST /auth/login` – login and receive a JWT token

JWT tokens are required for authenticated routes like creating or updating articles.

### Exception Handling & Validation

* Global exception filtering with NestJS to handle errors gracefully
* Input validation and transformation using DTOs and `class-validator`
* Prisma error handling wrapped for meaningful API responses

### Swagger Documentation

Available at:

```bash
http://localhost:3000/api
```

You can explore all routes, input types, and try requests directly from there.

---

## Project Structure

```bashn
├── prisma/
│   └── schema.prisma         → database schema
│   └── seed.ts               → sample seed data
├── src/
│   ├── articles/             → article module (controllers, services, DTOs)
│   ├── auth/                 → auth module (login, register, JWT strategy)
│   ├── users/                → user module
│   ├── prisma/               → PrismaService wrapper
│   └── main.ts               → application entry point
```

## 📄 License

NestJS is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
