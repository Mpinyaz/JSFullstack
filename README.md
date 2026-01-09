# React + TypeScript + Vite + TanStack

Modern full-stack application with React frontend and NestJS backend.

## Tech Stack

### Frontend
- **Vite** - Fast build tool
- **React 18** + **TypeScript** - UI with type safety
- **TanStack Router** - Type-safe file-based routing
- **TanStack Query** - Data fetching and caching
- **Tailwind CSS** - Utility-first styling

### Backend
- **NestJS** - Node.js framework
- **TypeORM** - Database ORM
- **PostgreSQL** - Database

## Quick Start

### Backend
```bash
cd backend
npm install
# Configure .env with database credentials
npm run start:dev
```
API runs at `http://localhost:3000/v1/api`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
App runs at `http://localhost:5173`

## Project Structure
```
frontend/src/
├── routes/          # File-based routing
│   ├── users/       # User CRUD routes
│   └── __root.tsx   # Root layout
├── components/      # Reusable components
├── lib/            # API & query hooks
└── types/          # TypeScript types

backend/src/
├── user/           # User module
├── config/         # App configuration
└── main.ts
```

## Key Features

**TanStack Router** - Type-safe routing with auto-generated routes
```typescript
const { userId } = Route.useParams() // Fully typed
```

**TanStack Query** - Smart caching and state management
```typescript
const { data, isLoading } = useUsers()
const createUser = useCreateUser()
```

**Full CRUD** - Complete user management with create, read, update, delete

## Learn More
- [TanStack Router](https://tanstack.com/router)
- [TanStack Query](https://tanstack.com/query)
- [Vite](https://vitejs.dev/)
- [NestJS](https://docs.nestjs.com/)