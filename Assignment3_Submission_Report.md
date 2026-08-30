# CS1303 Full Stack Development — Assignment 3 Submission Report
**National Institute of Technology, Warangal (NITW)**  
**Department of Computer Science and Engineering**

---

### Student & Submission Details
- **Student Name**: HarshaVardhan Reddy Kunam
- **Course Code**: CS1303
- **Course Title**: Full Stack Development
- **Assignment No.**: Assignment 3 — Backend Integration for Portfolio Website (Node.js / Express)
- **GitHub Repository**: [https://github.com/HarshaVardhan31012007/Portfolio](https://github.com/HarshaVardhan31012007/Portfolio)
- **Google Drive Link (Demo Video & Files)**: `[PASTE_YOUR_GOOGLE_DRIVE_LINK_HERE]`

---

## 1. Executive Summary

This submission extends the React Portfolio Website (Assignment 2) by architecting and integrating a live **Node.js / Express REST API backend** (`/server`).

### Key Highlights:
1. **Live REST API**: Replaced client-side static data with dynamic REST endpoints for project cataloging and contact form handling.
2. **Server-Side Validation**: Robust payload verification on incoming contact requests, with proper HTTP status codes (`200`, `201`, `400`, `404`, `500`).
3. **Data Persistence**: Submissions and projects are stored in persistent server-side JSON files (`contacts.json` and `projects.json`).
4. **Resilient Frontend UX**: Handled asynchronous loading states (`LoadingSpinner`) and network failure states with visible error banners and a connection retry mechanism.
5. **CORS & Environment Isolation**: Configured `cors` middleware and `.env` / `.env.example` configurations.

---

## 2. Backend Task Checklist & Evaluation Mapping

| Task | Endpoint / Feature | Method | Status | Description |
| :--- | :--- | :---: | :---: | :--- |
| **B1** | `/` | `GET` | **Complete** | Server health check returning HTTP 200 `{ "status": "ok" }`. Port loaded from `.env`. |
| **B2** | `/api/projects` | `GET` | **Complete** | Serves full project array from `projects.json` retaining all props expected by `ProjectCard`. |
| **B3** | `/api/projects/:id` | `GET` | **Complete** | Returns single project object by ID (HTTP 200) or HTTP 404 JSON `{ "error": "Project not found" }`. |
| **B4** | `/api/contact` | `POST` | **Complete** | Validates `name`, `email` (`@` check), and `message`. Returns 400 on error or 201 on valid submission + persists. |
| **B5** | `/api/contact` | `GET` | **Complete** | Open verification endpoint returning all stored contact submissions in JSON. |
| **B6** | Centralized 404 & Errors | ALL | **Complete** | Catch-all 404 middleware for undefined routes + global Express error handler `(err, req, res, next)`. |
| **B7** | CORS & Environment | - | **Complete** | CORS enabled for `http://localhost:5173`. `.env.example` provided with zero hardcoded secrets. |

---

## 3. Frontend Integration Checklist

| Task | Component | Status | Implementation Details |
| :--- | :--- | :---: | :--- |
| **F1** | `Projects.jsx` | **Complete** | Uses `useEffect` to fetch data from `GET /api/projects`. Renders `LoadingSpinner` while pending. |
| **F2** | `Projects.jsx` & `Home.jsx` | **Complete** | Gracefully handles backend downtime by rendering an error banner with a **"Retry Connection"** button. |
| **F3** | `ProjectDetail.jsx` | **Complete** | Dynamically fetches by dynamic route `:projectId` via `GET /api/projects/:id`. Handles direct deep-links and 404s. |
| **F4** | `ContactForm.jsx` | **Complete** | Sends `POST` request to `/api/contact`. Displays server-side validation error messages or green success confirmation. |

---

## 4. Setup and Execution Instructions

### Prerequisites
- Node.js `v18.0.0` or higher
- npm `v9.0.0` or higher

### Commands to Run:

#### Terminal 1: Backend Server (`http://localhost:5000`)
```bash
npm run server
```
*(Or navigate to `/server` and run `npm start`)*

#### Terminal 2: React Frontend Client (`http://localhost:5173`)
```bash
npm run dev
```

---

## 5. API Test Suite (cURL Commands)

```bash
# B1: Health Check
curl -X GET http://localhost:5000/

# B2: Get All Projects
curl -X GET http://localhost:5000/api/projects

# B3: Get Single Project (Valid ID)
curl -X GET http://localhost:5000/api/projects/stayverse

# B3: Get Single Project (404 Non-existent ID)
curl -X GET http://localhost:5000/api/projects/invalid-id

# B4: Valid Contact Submission (201 Created)
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Alex Turner","email":"alex@example.com","message":"Great portfolio! Looking forward to connecting."}'

# B4: Invalid Email Submission (400 Bad Request)
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Alex Turner","email":"invalidemail","message":"Short message"}'

# B5: List All Contact Submissions (Open Verification Endpoint)
curl -X GET http://localhost:5000/api/contact

# B6: Catch-All 404 Route Test
curl -X GET http://localhost:5000/api/doesnotexist
```

---

## 6. Open Endpoint Statement (Task B5)
As per the assignment requirements, `GET /api/contact` is implemented as an **open endpoint** without authentication to permit automated and manual evaluation of persisted contact form submissions.
