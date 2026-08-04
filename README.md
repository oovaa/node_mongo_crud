# Node.js MongoDB CRUD with Docker

[![Node.js](https://img.shields.io/badge/node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)](https://typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/mongodb-6+-green.svg)](https://mongodb.com/)
[![Mongoose](https://img.shields.io/badge/ODM-Mongoose-red.svg)](https://mongoosejs.com/)
[![Docker](https://img.shields.io/badge/docker-compose-blue.svg)](https://docker.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> **Employee & Department Management API** — Full-stack CRUD application with Node.js/Express/TypeScript, MongoDB/Mongoose, Docker Compose, and a React/Vite frontend.

---

## 🎯 Overview

A complete full-stack application demonstrating CRUD operations for **Employees** and **Departments** with a MongoDB backend. Features:

- **Backend**: Express + TypeScript + Mongoose ODM with RESTful API
- **Frontend**: React 18 + Vite + TypeScript (in `/app` subdirectory)
- **Database**: MongoDB 6 with Mongoose models & population
- **Containerization**: Docker Compose for multi-service deployment
- **Runtime**: Node.js 18+ (with Bun lockfile for fast installs)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Docker Compose                           │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │  Frontend   │    │   Backend   │    │   MongoDB   │         │
│  │  (Vite/React)│◀──▶│  (Express)  │◀──▶│   (mongo:6) │         │
│  │  Port 5463  │    │  Port 3232  │    │  Port 27017 │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
│         │                   │                   │               │
│         ▼                   ▼                   ▼               │
│  Serves SPA          REST API             Document Store        │
│  Proxies /api        /api/e, /api/d      Employees & Depts      │
└─────────────────────────────────────────────────────────────────┘
```

### Data Models

| Model | Fields | Relations |
|-------|--------|-----------|
| **Employee** | `name`, `surename`, `DOB`, `department` (string), `department_id` (ObjectId) | Populates `department_id` → Department |
| **Department** | `name` (required), `location`, `numberOfEmployees` | Referenced by Employee |

---

## 📁 Project Structure

```
node_mongo_crud/
├── index.ts                 # Express app entry point
├── package.json             # Dependencies: express, cors, mongoose
├── tsconfig.json            # TypeScript config
├── dockerfile               # Backend Dockerfile (Node 18+)
├── docker-compose.yml       # 3-service orchestration
├── bun.lock                 # Bun lockfile
├── db/                      # Database layer
│   ├── index.ts             # MongoDB connection with retry logic
│   ├── employee.ts          # Employee Mongoose model
│   └── department.ts        # Department Mongoose model
├── router/                  # API routes
│   ├── employees.ts         # /api/e — Employee CRUD
│   └── departments.ts       # /api/d — Department CRUD + search
├── lib/                     # Business logic (service layer)
│   ├── employees_lib.ts     # Employee operations with validation
│   └── departments_lib.ts   # Department service class
└── app/                     # Frontend (React + Vite + TS)
    ├── src/
    │   ├── main.tsx         # Entry point
    │   ├── App.tsx          # Main component
    │   ├── api.ts           # Axios instance (base: /api)
    │   └── components/
    │       └── DepartmentList.tsx  # Example component
    ├── package.json
    ├── vite.config.ts       # Vite config with API proxy
    ├── dockerfile
    └── README.md
```

---

## 🚀 Quick Start

### With Docker Compose (Recommended)

```bash
# Clone and navigate
git clone https://github.com/oovaa/node_mongo_crud.git
cd node_mongo_crud

# Build and start all services
docker compose up --build -d

# Verify services
docker compose ps

# Access points:
# Backend API:  http://localhost:3232
# Frontend:     http://localhost:5463
# MongoDB:      mongodb://localhost:27017
```

### Local Development (Backend)

```bash
# Install dependencies
bun install  # or npm install

# Start MongoDB (if not using Docker)
docker run -d --name mongo-db -p 27017:27017 mongo:6

# Set MongoDB URI (optional)
export MONGO_URI=mongodb://localhost:27017/node_mongo_crud

# Development with hot reload
bun --watch index.ts
# or: npx tsx watch index.ts
```

### Local Development (Frontend)

```bash
cd app

# Install dependencies
bun install  # or npm install

# Start dev server (proxies /api to http://localhost:3000)
bun run dev
# Opens http://localhost:5173
```

---

## 📡 API Endpoints

### Employees (`/api/e`)

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/` | List all employees (with department) | — |
| `GET` | `/id/:id` | Get employee by ID | — |
| `GET` | `/name/:name` | Search employees by name | — |
| `POST` | `/` | Create employee | `{ name, DOB, department_id }` |
| `PUT` | `/:id` | Update employee | `{ name?, DOB?, department_id? }` |
| `DELETE` | `/:id` | Delete employee | — |

### Departments (`/api/d`)

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/` | List all departments | — |
| `GET` | `/:id` | Get department by ID | — |
| `GET` | `/search/:name` | Search departments by name (regex) | — |
| `POST` | `/` | Create department | `{ name, location?, numberOfEmployees? }` |
| `PUT` | `/:id` | Update department (full) | `{ name?, location?, numberOfEmployees? }` |
| `PATCH` | `/:id` | Partial update department | `{ name?, location?, numberOfEmployees? }` |
| `DELETE` | `/:id` | Delete department | — |

### Health Check

| Method | Endpoint | Response |
|--------|----------|----------|
| `GET` | `/` | `{ "status": "sucess" }` |

---

## ⚙️ Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `MONGO_URI` | `mongodb://mongo-db:27017/node_mongo_crud` | MongoDB connection string |
| `PORT` | `3000` | Backend server port |

### Docker Compose Services

| Service | Image/Build | Ports | Environment |
|---------|-------------|-------|-------------|
| `mongo-db` | `mongo:6.0` | `27017:27017` | — |
| `crudserver` | `./` (dockerfile) | `3232:3000` | `MONGO_URI=mongodb://mongo-db:27017/node_mongo_crud` |
| `crudui` | `./app` (dockerfile) | `5463:5463` | — |

---

## 🧪 Testing API

```bash
# Create a department
curl -X POST http://localhost:3232/api/d \
  -H "Content-Type: application/json" \
  -d '{"name": "Engineering", "location": "Building A", "numberOfEmployees": 10}'

# Create an employee (use department _id from above)
curl -X POST http://localhost:3232/api/e \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "DOB": "1990-01-15", "department_id": "DEPT_ID_HERE"}'

# List all employees (with populated department)
curl http://localhost:3232/api/e

# List all departments
curl http://localhost:3232/api/d

# Search departments
curl http://localhost:3232/api/d/search/Engineering
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Runtime** | Node.js 18+ / Bun 1.0+ |
| **Language** | TypeScript 5+ |
| **Framework** | Express 4.x |
| **Database** | MongoDB 6+ |
| **ODM** | Mongoose 8+ |
| **Frontend** | React 18, Vite 5, TypeScript |
| **HTTP Client** | Axios |
| **Containerization** | Docker, Docker Compose |
| **Dev Tools** | tsx (hot reload), ESLint |

---

## 📝 Development Commands

```bash
# Backend
bun install          # Install deps
bun --watch index.ts # Dev with hot reload
bun run build        # TypeScript compile (tsc)

# Frontend
cd app
bun install
bun run dev          # Vite dev server
bun run build        # Production build

# Docker
docker compose up --build -d   # Build & start
docker compose logs -f         # View logs
docker compose down            # Stop & remove
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/my-feature`
3. Make changes with clear commits
4. Test with `docker compose up --build`
5. Submit Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 👤 Author

**Omar Abdulrahim**  
GitHub: [@oovaa](https://github.com/oovaa)