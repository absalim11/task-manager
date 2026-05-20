# Technical Guide & Troubleshooting

This guide provides detailed technical insights into the project and instructions for advanced testing or troubleshooting.

## 1. Technical Architecture

### Backend (Laravel 12)
- **Standardization:** All responses are wrapped in a `data` key using `JsonResource`.
- **Validation:** Failed validation returns a `422 Unprocessable Entity` with a list of field-specific errors.
- **Endpoints:**
    - `GET /api/tasks`: Returns tasks sorted by newest first.
    - `POST /api/tasks`: Accepts `title` (required) and `description` (optional).
    - `PUT /api/tasks/{id}`: Supports partial updates (e.g., just changing the status).
    - `DELETE /api/tasks/{id}`: Returns `204 No Content` on success.

### Frontend (React 18)
- **State Management:** Using React `useState` and `useEffect` for simplicity and performance.
- **Optimistic UI:** When a user toggles a task's status, the UI updates immediately. If the API call fails, the change is rolled back automatically with an error notification.
- **Notifications:** Using `react-hot-toast` for non-blocking feedback.

## 2. Advanced Testing

### Testing API with `curl`
To verify the backend without the frontend, you can run:
```bash
# Get all tasks
curl -X GET http://localhost:8000/api/tasks

# Create a task
curl -X POST http://localhost:8000/api/tasks \
     -H "Content-Type: application/json" \
     -d '{"title": "Test Task via Curl"}'
```

### Database Inspection
To inspect the MySQL database directly, you have two options:

1. **Web Interface (Adminer):**
   - URL: [http://localhost:8080](http://localhost:8080)
   - Server: `mysql`
   - User: `todo_user`
   - Password: `todo_password`
   - Database: `todo_db`

2. **CLI:**
   ```bash
   docker exec -it todo-mysql mysql -u todo_user -ptodo_password todo_db
   ```

## 3. Troubleshooting

### Port Conflicts
- **MySQL:** This project uses port **3308** on the host to avoid common conflicts with local MySQL installations.
- **Backend:** Port **8000**.
- **Frontend:** Port **3000**.
- **Adminer:** Port **8080**.

### CORS Errors
If you see CORS errors in the browser console:
- Verify that `backend/config/cors.php` has `'allowed_origins' => ['*']`.
- Restart the backend container: `docker-compose restart app`.

### "Module not found" in Frontend
- This usually means `npm install` inside the container failed. Try running:
```bash
docker-compose run --rm react npm install
```

---
For any other issues, please refer to the project's source code or contact the developer.
