require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';

// CORS Middleware Configuration
app.use(cors({
  origin: ALLOWED_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body Parsing Middleware
app.use(express.json());

// Helper Paths
const PROJECTS_FILE = path.join(__dirname, 'data', 'projects.json');
const CONTACTS_FILE = path.join(__dirname, 'data', 'contacts.json');

// Helper functions for persistent data access
const readProjectsData = () => {
  try {
    const data = fs.readFileSync(PROJECTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading projects.json:', error.message);
    return [];
  }
};

const readContactsData = () => {
  try {
    if (!fs.existsSync(CONTACTS_FILE)) {
      fs.writeFileSync(CONTACTS_FILE, JSON.stringify([]), 'utf8');
      return [];
    }
    const data = fs.readFileSync(CONTACTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading contacts.json:', error.message);
    return [];
  }
};

const writeContactsData = (contacts) => {
  try {
    const dir = path.dirname(CONTACTS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing contacts.json:', error.message);
    return false;
  }
};

// ==========================================
// API ROUTES
// ==========================================

/**
 * Task B1: Express Server Health Check
 * GET /
 */
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Portfolio Express Backend API Server is running',
    timestamp: new Date().toISOString()
  });
});

/**
 * Task B2: Serve Project List
 * GET /api/projects
 */
app.get('/api/projects', (req, res) => {
  const projects = readProjectsData();
  res.status(200).json(projects);
});

/**
 * Task B3: Serve Single Project by ID
 * GET /api/projects/:id
 */
app.get('/api/projects/:id', (req, res) => {
  const projectId = req.params.id;
  const projects = readProjectsData();
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return res.status(404).json({
      error: 'Project not found',
      requestedId: projectId
    });
  }

  res.status(200).json(project);
});

/**
 * Task B4: Handle Contact Form Submissions
 * POST /api/contact
 */
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};

  const errors = {};

  // Server-side field validation
  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.name = 'Name is required.';
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long.';
  }

  // Email format validation (requires @ and domain)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!emailRegex.test(email.trim())) {
    errors.email = 'Invalid email format. Must contain "@" and a valid domain.';
  }

  if (!message || typeof message !== 'string' || !message.trim()) {
    errors.message = 'Message is required.';
  } else if (message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long.';
  }

  // Return HTTP 400 if validation fails
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors,
      message: Object.values(errors).join(' ')
    });
  }

  // Valid submission object creation
  const newSubmission = {
    id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    submittedAt: new Date().toISOString()
  };

  const contacts = readContactsData();
  contacts.push(newSubmission);
  
  const saved = writeContactsData(contacts);
  if (!saved) {
    return res.status(500).json({
      error: 'Failed to persist contact submission'
    });
  }

  return res.status(201).json({
    message: 'Contact submission received successfully',
    submission: newSubmission
  });
});

/**
 * Task B5: List All Submissions (Open Verification Endpoint)
 * GET /api/contact
 */
app.get('/api/contact', (req, res) => {
  const contacts = readContactsData();
  res.status(200).json(contacts);
});

/**
 * Task B6: Centralized Error Handling & 404s
 */

// 1. Catch-all 404 Handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The endpoint ${req.method} ${req.originalUrl} does not exist on this server.`
  });
});

// 2. Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Global Exception:', err.stack || err);
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: err.message || 'An unexpected server error occurred.'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`Portfolio Express API Server`);
  console.log(`Listening on http://localhost:${PORT}`);
  console.log(`Allowed CORS Origin: ${ALLOWED_ORIGIN}`);
  console.log(`=================================`);
});
