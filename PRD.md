# Product Requirements Document: To-Do App

## Overview
Full-stack todo application dengan Laravel 12 backend dan React frontend, dockerized deployment. Fokus pada kecepatan, fungsionalitas CRUD inti, dan UX yang responsif.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Laravel 12 (PHP 8.3) |
| Database | MySQL 8.0 |
| Frontend | React 18 (Vite) |
| Styling | Basecoat CSS |
| Container | Docker + Docker Compose |

---

## Architecture & Scope
- **Auth:** Public API (Tanpa Authentication) untuk efisiensi waktu sesuai requirement test teknis.
- **Data Handling:** Menggunakan Laravel API Resources untuk output JSON yang konsisten.
- **Validation:** Server-side validation untuk integritas data.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | List semua task (Ordered by created_at DESC) |
| POST | `/api/tasks` | Create task baru (Validation: title required) |
| PUT | `/api/tasks/{id}` | Update task (Title, description, status) |
| DELETE | `/api/tasks/{id}` | Hapus task |

### Request/Response Format

**Create Task:**
```json
POST /api/tasks
{
  "title": "string (required)",
  "description": "string (optional)",
  "status": "pending|done (default: pending)"
}
```

**Response (Standardized via API Resource):**
```json
{
  "data": {
    "id": 1,
    "title": "string",
    "description": "string",
    "status": "pending",
    "created_at": "2026-05-20T...",
    "updated_at": "2026-05-20T..."
  }
}
```

---

## Database Schema

```sql
CREATE TABLE tasks (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    status ENUM('pending', 'done') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## Frontend Features

### Halaman Utama
- [ ] List semua task dengan card layout
- [ ] Checkbox toggle status (pending ↔ done)
- [ ] Tombol Edit (inline modal/form)
- [ ] Tombol Delete dengan konfirmasi (Simple Confirm)
- [ ] Form Add Task (title, description)

### UX Requirements
- [ ] Auto-update list setelah CRUD (Optimistic UI update)
- [ ] Error handling dengan Toast notifications (React Hot Toast)
- [ ] Loading states pada tombol submit/delete
- [ ] Empty state illustration/message jika tidak ada task

---

## Project Structure

```
project-root/
├── docker-compose.yml
├── backend/              # Laravel 12
│   ├── Dockerfile
│   ├── database/seeders/ # Include TaskSeeder
│   ├── app/Http/Resources/
│   └── ...
├── frontend/             # React + Vite
│   ├── Dockerfile
│   ├── .env.example      # VITE_API_URL
│   └── ...
└── docs/
    └── PRD.md
```

---

## Docker Services

| Service | Port | Description | Volume Persistence |
|---------|------|-------------|-------------------|
| app | 8000 | Laravel API | No |
| mysql | 3306 | Database | Yes (mysql_data) |
| react | 3000 | React dev server | No |

---

## Acceptance Criteria

- [ ] Semua endpoint CRUD berfungsi dengan response JSON standardized
- [ ] Server-side validation berfungsi (error 422 ditangani Frontend)
- [ ] Frontend bisa melakukan CRUD tanpa reload page
- [ ] Status toggle real-time & persistent
- [ ] Database berisi sample data saat pertama kali dijalankan (`php artisan db:seed`)
- [ ] Aplikasi runnable hanya dengan `docker-compose up -d`
