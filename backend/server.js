require('dotenv').config();

const path = require('path');
const fs = require('fs');
const express = require('express');
const helmet = require('helmet');

const { authenticateJWT, requireAdmin } = require('./src/middleware/auth');
const {
  login,
  me,
  changePassword,
  ensureAdminSeed
} = require('./src/routes/auth');
const {
  listInquiries,
  getInquiry,
  updateInquiryStatus,
  markInquirySpam,
  deleteInquiry
} = require('./src/routes/contact');
const { healthLive } = require('./src/routes/health');

// Enrollment routes (public + admin)
const { submitEnrollment } = require('./src/routes/publicEnrollment');
const {
  listEnrollments,
  getEnrollment,
  updateEnrollmentStatus,
  deleteEnrollment
} = require('./src/routes/adminEnrollment');

const app = express();

// Security headers
app.use(helmet());

// CORS: allow the static frontend to call localhost backend
app.use(
  cors({
    origin: true,
    credentials: false,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Ensure data dir exists
const dataDir = process.env.DATA_DIR || path.join(__dirname, 'data');
fs.mkdirSync(dataDir, { recursive: true });

// Seed admin (optional) — mainly checks required env
ensureAdminSeed();

app.get('/api/health/live', healthLive);

// Auth routes
app.post('/api/auth/login', login);
app.get('/api/auth/me', authenticateJWT, requireAdmin, me);
app.post('/api/auth/change-password', authenticateJWT, requireAdmin, changePassword);

// Inquiry management routes (admin only)
app.get('/api/contact', authenticateJWT, requireAdmin, listInquiries);
app.get('/api/contact/:id', authenticateJWT, requireAdmin, getInquiry);
app.patch('/api/contact/:id/status', authenticateJWT, requireAdmin, updateInquiryStatus);
app.patch('/api/contact/:id/spam', authenticateJWT, requireAdmin, markInquirySpam);
app.delete('/api/contact/:id', authenticateJWT, requireAdmin, deleteInquiry);

// Public contact submission endpoint (used by frontend contact form)
// If your frontend uses it, keep it working.
const { createInquiry } = require('./src/routes/publicContact');
app.post('/api/contact', createInquiry);

// Enrollment routes — public submission
app.post('/api/enrollments', submitEnrollment);

// Enrollment routes — admin management (authenticated)
app.get('/api/enrollments', authenticateJWT, requireAdmin, listEnrollments);
app.get('/api/enrollments/:id', authenticateJWT, requireAdmin, getEnrollment);
app.patch('/api/enrollments/:id/status', authenticateJWT, requireAdmin, updateEnrollmentStatus);
app.delete('/api/enrollments/:id', authenticateJWT, requireAdmin, deleteEnrollment);

const port = Number(process.env.PORT || 5001);
app.listen(3000, "0.0.0.0", () => {
  console.log(`[slg-tss-backend] listening on http://localhost:${port}`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
