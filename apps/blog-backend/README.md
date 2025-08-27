<p align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="100" alt="NestJS Logo" />
  </a>
</p>

<p align="center">
  A RESTful blog API built with NestJS, Prisma, and PostgreSQL.
</p>

# @nestvue/backend

This is the backend API for the **NestVue Blog App**, a full-stack blog platform managed as an npm workspaces monorepo.

It provides core functionality for managing blog posts, users, and authentication, using JWT for secure access. The app is built following RESTful principles and includes Swagger documentation.

## Tech Stack

- **NestJS** – Node.js backend framework
- **Prisma** – ORM for PostgreSQL
- **PostgreSQL** – Relational database
- **JWT** – Authentication
- **Swagger** – Auto-generated API docs
- **TypeScript**

## Getting Started

> This package lives inside a monorepo and is located at:  
> `apps/blog-backend`

### 1. Setup environment variables

Copy the example `.env` file:

```bash
cp .env.example .env
````

Update the following variables:

- `DATABASE_URL`
- `JWT_SECRET`

### 2. Install dependencies (from root)

Install everything from the monorepo root:

```bash
npm install
```

### 3. Setup the database

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

## Running the Backend

You can run this package from the monorepo root using npm workspace commands:

```bash
# Start in development mode
npm run start:dev --workspace @nestvue/backend

# Start normally
npm run start --workspace @nestvue/backend

# Build and run for production
npm run start:prod --workspace @nestvue/backend
```

Or use root-level shortcuts if configured:

```bash
npm run dev:backend
```

## API Endpoints

### Articles

- `GET /articles` – list all published articles
- `GET /articles/drafts` – list all drafts
- `GET /articles/:id` – get a single article
- `POST /articles` – create a new article
- `PATCH /articles/:id` – update an article
- `DELETE /articles/:id` – delete an article

> Article routes require authentication.

### Users

- `POST /user` – create user
- `GET /user` – list users
- `GET /user/:id` – get user by ID
- `PATCH /user/:id` – update user
- `DELETE /user/:id` – delete user

### Auth

- `POST /auth/register` – register a new user
- `POST /auth/login` – log in and receive a JWT token

## Swagger API Docs

Available at:

```bash
http://localhost:3000/api
```

Use this to explore and test endpoints with live documentation.

## Project Structure

```bash
apps/blog-backend/
├── prisma/
│   ├── schema.prisma       → Database schema
│   └── seed.ts             → Sample seed data
├── src/
│   ├── articles/           → Blog article module
│   ├── auth/               → Auth module (JWT, guards)
│   ├── users/              → User module
│   ├── prisma/             → PrismaService wrapper
│   └── main.ts             → App entry point
```

## License

MIT License. See [NestJS License](https://github.com/nestjs/nest/blob/master/LICENSE).
