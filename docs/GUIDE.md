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
To inspect the MySQL database directly:
```bash
docker exec -it todo-mysql mysql -u todo_user -ptodo_password todo_db
# Once inside:
SELECT * FROM tasks;
```

## 3. Troubleshooting

### "Service unavailable" or "Connection Refused"
- **Wait for DB:** MySQL can take 10-20 seconds to fully initialize the first time. If Laravel fails to migrate, wait a few seconds and run the migrate command again.
- **Port Conflict:** Ensure ports `3000`, `8000`, and `3306` are not being used by other applications on your host machine.

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
