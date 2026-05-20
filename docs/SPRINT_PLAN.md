# Sprint Plan: To-Do App Development

**Deadline:** Kamis, 21 Mei 2026, 12.00 WIB
**Duration:** ~1.5 hari

---

## Sprint Goal
Deliver a polished, dockerized full-stack todo app using Laravel 12 (Public API) and React (Vite).

---

## Day 1 (Selasa, 20 Mei) - Backend + Core Logic

### Session 1: Project Setup & Docker (2 jam)
**Tasks:**
- [ ] Initialize folder structure
- [ ] Create `docker-compose.yml` with **MySQL persistence (volumes)**
- [ ] Setup Laravel 12 Dockerfile & React Vite Dockerfile
- [ ] Configure `.env` templates for both services
- [ ] Test `docker-compose up`

**Deliverable:**
- Services running: `app`, `mysql`, `react`
- Laravel accessible at port 8000

---

### Session 2: Database & Model (1.5 jam)
**Tasks:**
- [ ] Create `tasks` migration (title, description, status)
- [ ] Create `Task` model with `$fillable`
- [ ] **Create `TaskSeeder`** with sample tasks
- [ ] Setup routes in `api.php`

**Deliverable:**
- Database migrated and seeded
- `php artisan db:seed` working

---

### Session 3: Robust API Endpoints (2.5 jam)
**Tasks:**
- [ ] **Create `TaskRequest`** for validation logic
- [ ] **Create `TaskResource`** for standardized JSON output
- [ ] Implement CRUD in `TaskController`
- [ ] Configure **CORS** for React access
- [ ] Test endpoints with Postman (Check JSON structure & validation errors)

**Deliverable:**
- Endpoints return `data: { ... }` format
- Validation returns 422 for missing titles

---

## Day 2 (Rabu, 21 Mei) - Frontend + UX Polish

### Session 4: React Setup & Services (1 jam)
**Tasks:**
- [ ] Setup React with Vite & Basecoat CSS
- [ ] **Install `react-hot-toast`** for notifications
- [ ] Create `.env` for `VITE_API_URL`
- [ ] Setup Axios/Fetch service for API calls

**Deliverable:**
- React dev server running at port 3000
- API client communicating with backend

---

### Session 5: UI Components & CRUD (2.5 jam)
**Tasks:**
- [ ] Build `TaskForm` (Add task) with **Loading state**
- [ ] Build `TaskList` & `TaskItem` (Display & Toggle status)
- [ ] Build `EditTask` (Inline/Modal form)
- [ ] Implement **Simple Delete Confirmation** (window.confirm or simple modal)

**Deliverable:**
- Full CRUD cycle functional from UI
- UI looks professional with Basecoat CSS

---

### Session 6: UX Integration & Polish (2 jam)
**Tasks:**
- [ ] Integrate **Toast notifications** for Success/Error feedback
- [ ] Implement **Optimistic Updates** or Auto-refresh list
- [ ] Add **Empty State** message
- [ ] Final UI styling refinement

**Deliverable:**
- Smooth UX with clear feedback
- Handles 422 validation errors gracefully (displays field errors)

---

### Session 7: Final Testing & Submission (1 jam)
**Tasks:**
- [ ] Test full flow on a clean `docker-compose down -v`
- [ ] Write `README.md` (Setup instructions + Features list)
- [ ] **Record screen record demo** (mp4/gif)
- [ ] Push to GitHub & Submit

**Deliverable:**
- GitHub repo with clean code
- Video demo included

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| CORS issue | Setup `config/cors.php` correctly in Session 3 |
| DB Connectivity | Use `wait-for-it.sh` or manual check before migration |
| Over-engineering | **Strictly NO AUTH**, focus on CRUD quality |

---

## Definition of Done

- [ ] `docker-compose up` runs everything (including migrations/seed optional)
- [ ] Frontend performs CRUD with real-time feedback
- [ ] JSON response follows Laravel API Resource standard
- [ ] Code is documented and pushed to GitHub
- [ ] Video demo shows full CRUD cycle
