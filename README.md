# HarshaVardhan Reddy Kunam - Full Stack Personal Portfolio

A full-stack portfolio web application built with **React 18**, **Vite**, **React Router DOM v6**, and a **Node.js / Express** REST API backend.

This repository includes both the React frontend and the Express backend (`/server`), connected dynamically with `useEffect`-based data fetching, server-side validation, error handling, CORS, and persistence.

---

## Table of Contents

- [Overview & Specifications](#overview--specifications)
- [Assignment 3 - Backend Integration (Express API)](#assignment-3---backend-integration-express-api)
- [Setup & Run Instructions](#setup--run-instructions)
- [API Endpoints & Specifications (B1-B7)](#api-endpoints--specifications-b1-b7)
- [cURL Test Commands](#curl-test-commands)
- [Postman Collection](#postman-collection)
- [Frontend Integration (F1-F4)](#frontend-integration-f1-f4)
- [Component Tree & Architecture](#component-tree--architecture)
- [State Management & Side Effects](#state-management--side-effects)
- [Routing System](#routing-system)

---

## Overview & Specifications

This repository builds upon Assignment 2 by integrating a live Node.js/Express backend server:
- **Express Server (`/server`)**: Modular Node.js API with environment-based configuration, REST endpoints, CORS, data persistence (`JSON` file storage), and centralized error-handling middleware.
- **Frontend Integration (`React 18`)**: Replaced static project imports with dynamic `fetch` calls in `useEffect`, providing loading spinners, connection retry UI for server downtime, and server-side validation error handling.
- **Data Persistence**: Project listings and contact form submissions are persisted in `server/data/projects.json` and `server/data/contacts.json`.

---

## Assignment 3 - Backend Integration (Express API)

The backend is located in the `/server` folder within this repository.

### Backend Tech Stack & Architecture:
- **Runtime**: Node.js
- **Framework**: Express.js
- **Middleware**: `cors` (Cross-Origin Resource Sharing), `dotenv` (Environment Variables), `express.json` (JSON Request Parsing)
- **Data Storage**: Server-side JSON files (`projects.json` & `contacts.json`)
- **Development Tooling**: `nodemon` for hot-reloading server execution

### Environment Variables & Configuration (`.env.example`):
The server loads its configuration from `.env` via `dotenv`:
```env
# Server Port
PORT=5000

# Allowed CORS Origin for React Frontend
ALLOWED_ORIGIN=http://localhost:5173

# Path to Data Directory
DATA_FILE_PATH=./data
```
A `.env.example` file is included in `/server` listing all required environment variables.

---

## Setup & Run Instructions

### Prerequisites
- Node.js `v18.0.0` or higher
- npm `v9.0.0` or higher

### Running Backend and Frontend

The application is launched using two separate commands:

#### 1. Start the Express Backend Server (`/server`)
```bash
# Navigate to server directory and install dependencies
cd server
npm install

# Start the server (runs on http://localhost:5000)
npm start

# Or run with hot-reload in development
npm run dev
```

*Alternatively, from the repository root:*
```bash
npm run server
```

#### 2. Start the React Frontend Dev Server
```bash
# From the repository root
npm install
npm run dev
```
Open your browser at `http://localhost:5173`.

---

## API Endpoints & Specifications (B1-B7)

> [!IMPORTANT]
> **Open Endpoint Notice**: The endpoint `GET /api/contact` (Task B5) is intentionally an **open endpoint** with no authentication requirement to allow evaluation verification of stored contact submissions.

| Task | Endpoint | Method | Description | Success Status | Error Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **B1** | `/` | `GET` | Health check route confirming API is active | `200 OK` | N/A |
| **B2** | `/api/projects` | `GET` | Serves array of all project objects | `200 OK` | `500 Internal Error` |
| **B3** | `/api/projects/:id` | `GET` | Serves single project object by ID | `200 OK` | `404 Not Found` |
| **B4** | `/api/contact` | `POST` | Accepts & validates contact submission | `201 Created` | `400 Bad Request` |
| **B5** | `/api/contact` | `GET` | Returns stored contact submissions (Open Endpoint) | `200 OK` | `500 Internal Error` |
| **B6** | `/*` (Catch-all) | `ALL` | Catches undefined routes & unhandled server errors | N/A | `404 Not Found` / `500` |

---

### Sample Requests & Responses

#### 1. B1 - Health Check
- **Request**: `GET http://localhost:5000/`
- **Response** (`200 OK`):
```json
{
  "status": "ok",
  "message": "Portfolio Express Backend API Server is running",
  "timestamp": "2026-08-30T21:35:00.000Z"
}
```

#### 2. B2 - Get All Projects
- **Request**: `GET http://localhost:5000/api/projects`
- **Response** (`200 OK`):
```json
[
  {
    "id": "stayverse",
    "title": "StayVerse",
    "category": "Backend & Systems",
    "isFeatured": true,
    "shortDescription": "A scalable Vacation Rental Platform focused on robust MVC backend operations...",
    "fullDescription": "StayVerse is a production-grade vacation rental platform engineered to process concurrent booking requests...",
    "techStack": ["Node.js", "Express.js", "MongoDB", "Geospatial Indexing", "JWT", "REST API"],
    "achievements": [
      "Architected a scalable MVC backend with clean RESTful API endpoints and middleware pipelines",
      "Engineered concurrency-safe reservation workflows, reducing booking conflicts by 40%"
    ],
    "architectureHighlights": [
      "MVC Architecture with decoupled service and controller layers",
      "Bcrypt password hashing + JWT access token verification"
    ],
    "githubUrl": "https://github.com/HarshaVardhan31012007/StayVerse",
    "badgeText": "Backend MVC"
  }
]
```

#### 3. B3 - Get Single Project (Success)
- **Request**: `GET http://localhost:5000/api/projects/stayverse`
- **Response** (`200 OK`):
```json
{
  "id": "stayverse",
  "title": "StayVerse",
  "category": "Backend & Systems",
  "isFeatured": true,
  "shortDescription": "A scalable Vacation Rental Platform...",
  "techStack": ["Node.js", "Express.js", "MongoDB"]
}
```

#### 4. B3 - Get Single Project (404 Not Found)
- **Request**: `GET http://localhost:5000/api/projects/invalid-id`
- **Response** (`404 Not Found`):
```json
{
  "error": "Project not found",
  "requestedId": "invalid-id"
}
```

#### 5. B4 - Submit Contact Form (201 Success)
- **Request**: `POST http://localhost:5000/api/contact`
- **Body**:
```json
{
  "name": "Jane Developer",
  "email": "jane@example.com",
  "message": "Hello Harsha, I am interested in discussing a backend engineering position."
}
```
- **Response** (`201 Created`):
```json
{
  "message": "Contact submission received successfully",
  "submission": {
    "id": "contact_1725044123456_a8f9k",
    "name": "Jane Developer",
    "email": "jane@example.com",
    "message": "Hello Harsha, I am interested in discussing a backend engineering position.",
    "submittedAt": "2026-08-30T21:35:00.000Z"
  }
}
```

#### 6. B4 - Submit Contact Form (400 Invalid Email Format)
- **Request**: `POST http://localhost:5000/api/contact`
- **Body**:
```json
{
  "name": "John Doe",
  "email": "invalidemailformat",
  "message": "This message is long enough but email lacks @ symbol."
}
```
- **Response** (`400 Bad Request`):
```json
{
  "error": "Validation failed",
  "details": {
    "email": "Invalid email format. Must contain \"@\" and a valid domain."
  },
  "message": "Invalid email format. Must contain \"@\" and a valid domain."
}
```

#### 7. B5 - List All Contact Submissions (Open Verification Endpoint)
- **Request**: `GET http://localhost:5000/api/contact`
- **Response** (`200 OK`):
```json
[
  {
    "id": "contact_1725044123456_a8f9k",
    "name": "Jane Developer",
    "email": "jane@example.com",
    "message": "Hello Harsha, I am interested in discussing a backend engineering position.",
    "submittedAt": "2026-08-30T21:35:00.000Z"
  }
]
```

#### 8. B6 - Catch-all 404 Undefined Route Handler
- **Request**: `GET http://localhost:5000/api/non-existent-endpoint`
- **Response** (`404 Not Found`):
```json
{
  "error": "Route not found",
  "message": "The endpoint GET /api/non-existent-endpoint does not exist on this server."
}
```

---

## cURL Test Commands

You can execute these commands in your terminal to verify all backend tasks (B1–B7):

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
  -d '{"name":"Alex Turner","email":"alex@example.com","message":"Great portfolio website! Looking forward to connecting."}'

# B4: Invalid Email Submission (400 Bad Request)
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Alex Turner","email":"invalidemail","message":"Hello there!"}'

# B4: Missing Fields Submission (400 Bad Request)
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Alex Turner"}'

# B5: List All Contact Submissions (Open Verification Endpoint)
curl -X GET http://localhost:5000/api/contact

# B6: Catch-All 404 Route Test
curl -X GET http://localhost:5000/api/doesnotexist
```

---

## Postman Collection

An exported Postman Collection (`Portfolio_API.postman_collection.json`) is available in the root directory.

To use:
1. Open Postman.
2. Click **Import** and select `Portfolio_API.postman_collection.json`.
3. Ensure the variable `baseUrl` is set to `http://localhost:5000`.
4. Run requests for B1 through B6.

---

## Frontend Integration (F1-F4)

1. **F1 (Fetch Projects)**: `Projects.jsx` uses `useEffect` and `fetch` to load projects from `GET /api/projects`. Shows `LoadingSpinner` while pending.
2. **F2 (Handle Connection Errors)**: If Express server is stopped, `Projects.jsx` catches error and displays a red warning banner with a **"Retry Connection"** button. Restarting the backend restores normal UI operation.
3. **F3 (Fetch Single Project for Detail Page)**: `/projects/:projectId` dynamic page calls `GET /api/projects/:id`. Deep links and refreshes work seamlessly; non-existent project IDs render a 404 error page.
4. **F4 (Submit Contact Form)**: `ContactForm.jsx` sends payload to `POST /api/contact`. Success response displays green banner and clears form; server 400 rejection displays red server error banner to user.

---

## Component Tree & Architecture

```
App (Lifts Theme State, Router, Persists to LocalStorage)
├── Navbar (NavLink routes, Theme Toggle Button, Mobile Menu)
├── Main Content Container
│   ├── Routes
│   │   ├── Route "/" -> Home (Mount Loading effect, Hero, SkillsSection, Dynamic API Featured Projects)
│   │   ├── Route "/about" -> About (Education, Focus, Timeline Experience, Achievements)
│   │   ├── Route "/projects" -> Projects (Category Filters, useEffect API fetch, Loading/Error States)
│   │   │   └── ProjectList [Child]
│   │   │       └── ProjectCard [Grandchild - Instance-scoped isExpanded state]
│   │   │           └── TechStackList [Great-Grandchild - Receives techStack prop]
│   │   ├── Route "/projects/:projectId" -> ProjectDetail (useEffect API fetch by ID, 404 error handling)
│   │   │   └── TechStackList
│   │   ├── Route "/contact" -> Contact (Contact Info, Controlled ContactForm POST API submit)
│   │   └── Route "*" -> NotFound (404 Catch-All with Link back to Home)
├── Footer (Global Copyright & Socials)
└── BackToTop (Floating action with scroll cleanup)
```
