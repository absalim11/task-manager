# To-Do App (Laravel 12 + React 18)

[![Status](https://img.shields.io/badge/Status-Completed-success.svg)](#)
[![Tech](https://img.shields.io/badge/Stack-Laravel%2012%20%2B%20React%2018-blue.svg)](#)

A simple yet robust full-stack to-do application built as a technical test submission. This project features a Laravel 12 backend (Public API) and a React 18 (Vite) frontend, all fully containerized with Docker.

## 🚀 Key Features

- **Modern Sleek UI:** 2-column dashboard layout with Lucide icons and professional aesthetics.
- **Three-Stage Lifecycle:** Differentiate tasks between **New**, **Pending**, and **Done**.
- **Adminer Integration:** Web-based database management tool included.
- **Instant Status Toggle:** Mark tasks as new ➔ pending ➔ done with **Optimistic UI Updates**.
- **Professional API:** Standardized JSON output via Laravel API Resources.
- **Server-side Validation:** Robust data integrity with field-level error feedback.
- **Enhanced UX:** Toast notifications (React Hot Toast), loading states, and centering layout.
- **Dockerized Architecture:** Scalable and reproducible environment using Docker Compose.
- **Database Persistence:** MySQL data mapping (Port 3308 on host).

## 🛠 Tech Stack

| Component | Technology |
|-----------|------------|
| **Backend** | Laravel 12 (PHP 8.3) |
| **Frontend** | React 19 (Vite) |
| **Styling** | Basecoat CSS + Tailwind CSS 4.0 |
| **Database** | MySQL 8.0 |
| **Tooling** | Adminer (DB Management) |
| **Container** | Docker & Docker Compose |

## 📖 Documentation

For more detailed information, please refer to:
- [**Development Milestones**](./docs/MILESTONES.md) - History of the development process.
- [**Technical Guide & Troubleshooting**](./docs/GUIDE.md) - Detailed API info and common fixes.
- [**Postman Collection**](./docs/postman_collection.json) - Ready-to-import API test suite.

## ⚙️ Getting Started

### Prerequisites
- Docker
- Docker Compose

### Quick Launch
1. **Clone & Enter Folder:**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Build and Start Containers:**
   ```bash
   docker-compose up -d --build
   ```

3. **Initialize Database:**
   Wait about 10-15 seconds for MySQL to be ready, then run:
   ```bash
   docker exec todo-backend php artisan migrate --seed
   ```

### Accessing the App
- **Frontend UI:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:8000/api](http://localhost:8000/api) (Public)
- **Adminer (DB):** [http://localhost:8080](http://localhost:8080) (Server: `mysql`, User: `todo_user`)

---
Developed for technical test purposes.
