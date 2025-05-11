# 🚀 Service Catalog

A modern service catalog application built with NestJS, TypeORM and PostgreSQL. 

## Structure of the project / Approach
This project provides extensive CRUD operations for the Service Catalog application.
It is organized with idioms and patterns that follow the [NestJS framework](https://docs.nestjs.com/).
The approach is further discussed in the Journal.MD file.

### Core Directory Structure
```
   src/
   ├── authentication/     # Authentication and authorization logic
   ├── common/            # Shared utilities and decorators
   ├── config/            # Configuration files
   ├── database/          # Database migrations and seeds
   ├── services/          # Service catalog core functionality
   ├── users/             # User management
   ├── versions/          # Version management
   └── main.ts           # Application entry point
```

### Feature Module Organization
```
   services/
   ├── dto/              # Data Transfer Objects
   ├── entities/         # Database entities
   ├── response/         # Response DTOs
   ├── services.controller.ts
   ├── services.service.ts
   └── services.module.ts
```

### Testing Structure
 - End-to-end tests **.e2e.spec.ts**
 - Unit tests **.spec.ts**

## Known issues.
Known issues are discussed extensively in the Journal.MD file.


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
