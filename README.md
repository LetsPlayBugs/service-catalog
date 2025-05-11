# 🚀 Service Catalog

A modern service catalog application built with NestJS and PostgreSQL. This application powers the Service Card List Page

## 🛠️ Tech Stack

- **Backend**: NestJS
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Testing**: Jest

## 🚦 Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- Docker
- pnpm v8.15.9

### Installation

1. Clone the repository
```bash
git clone git@github.com:LetsPlayBugs/service-catalog.git
cd service-catalog
```

2. Install dependencies
```bash
nvm use && pnpm install
```

3. Start the database
```bash
docker-compose up -d
```

4. Setup environment variables
```bash
cp .env.example .env
```

5. Seed
```bash
pnpm seed:run
```

6. Run the application
```bash
pnpm start:dev
```

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:cov

# Run tests with specific file 
pnpm test src/app.e2e.spec.ts
```

## 📝 API Documentation

API documentation is available at `/docs` when running the application.

## 🐛 Bug Tracking

[Link to bug tracker to be introduced]
