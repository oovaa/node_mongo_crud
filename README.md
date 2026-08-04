# Node.js MongoDB CRUD with Docker

[![Node.js](https://img.shields.io/badge/node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/mongodb-6+-green.svg)](https://mongodb.com/)
[![Docker](https://img.shields.io/badge/docker-containerized-blue.svg)](https://docker.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> **MongoDB CRUD Practice** — Full-stack CRUD application with Node.js, MongoDB, and Docker.

---

## 🎯 Overview

Practice project demonstrating CRUD operations with Node.js, MongoDB, and Docker containerization.

---

## 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| **Language** | JavaScript (Node.js 18+) |
| **Database** | MongoDB 6+ |
| **ODM** | Mongoose |
| **Containerization** | Docker, Docker Compose |
| **Runtime** | Node.js 18+ |

---

## 🚀 Quick Start

### With Docker (Recommended)
```bash
git clone https://github.com/oovaa/node_mongo_crud.git
cd node_mongo_crud

docker compose up --build
# App runs on http://localhost:3000
```

### Local Development
```bash
# Start MongoDB
docker run -d -p 27017:27017 --name mongo mongo:6

# Install & run
npm install
npm run dev
```

---

## 🐳 Docker Compose Services

| Service | Port | Description |
|---------|------|-------------|
| `app` | 3000 | Node.js API |
| `mongo` | 27017 | MongoDB database |
| `mongo-express` | 8081 | MongoDB Admin UI |

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/items` | Create item |
| GET | `/api/items` | List all items |
| GET | `/api/items/:id` | Get item by ID |
| PUT | `/api/items/:id` | Update item |
| DELETE | `/api/items/:id` | Delete item |

---

## 📂 Project Structure

```
node_mongo_crud/
├── src/
│   ├── models/       # Mongoose models
│   ├── routes/       # Express routes
│   ├── controllers/  # Request handlers
│   └── app.js        # Express setup
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

---

## 📚 Learning Outcomes

- ✅ MongoDB CRUD operations with Mongoose
- ✅ Docker containerization for Node.js apps
- ✅ Docker Compose multi-service orchestration
- ✅ Environment configuration with `.env`
- ✅ RESTful API design

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 👤 Author

**Omar Abdulrahim**  
GitHub: [@oovaa](https://github.com/oovaa)