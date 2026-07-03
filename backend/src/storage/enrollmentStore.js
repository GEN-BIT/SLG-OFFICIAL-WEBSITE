const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');

function getDataDir() {
  return process.env.DATA_DIR || path.join(__dirname, '../../data');
}

function enrollmentsPath() {
  return path.join(getDataDir(), 'enrollments.json');
}

function ensureFile() {
  const p = enrollmentsPath();
  if (!fs.existsSync(p)) {
    fs.writeFileSync(p, JSON.stringify({ enrollments: [] }, null, 2));
  }
}

function readAll() {
  ensureFile();
  const raw = fs.readFileSync(enrollmentsPath(), 'utf8');
  const parsed = JSON.parse(raw || '{"enrollments": []}');
  return Array.isArray(parsed.enrollments) ? parsed.enrollments : [];
}

function writeAll(enrollments) {
  ensureFile();
  fs.writeFileSync(enrollmentsPath(), JSON.stringify({ enrollments }, null, 2));
}

function list(filters = {}) {
  let items = readAll();
  if (filters.status) {
    items = items.filter((i) => String(i.status) === String(filters.status));
  }
  // Sort newest first
  items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return items;
}

function getById(id) {
  return readAll().find((i) => i._id === id) || null;
}

function create(doc) {
  const items = readAll();
  const now = new Date().toISOString();
  const enrollment = {
    _id: nanoid(),
    firstName: doc.firstName || '',
    lastName: doc.lastName || '',
    dateOfBirth: doc.dateOfBirth || '',
    gender: doc.gender || '',
    email: doc.email || '',
    phone: doc.phone || '',
    nationalId: doc.nationalId || '',
    district: doc.district || '',
    lastSchool: doc.lastSchool || '',
    examType: doc.examType || '',
    examScore: doc.examScore || '',
    examYear: doc.examYear || '',
    program: doc.program || '',
    programSecond: doc.programSecond || '',
    status: doc.status || 'pending',
    createdAt: now,
    updatedAt: now,
    notes: ''
  };
  items.unshift(enrollment);
  writeAll(items);
  return enrollment;
}

function update(id, updater) {
  const items = readAll();
  const idx = items.findIndex((i) => i._id === id);
  if (idx === -1) return null;

  const current = items[idx];
  const updated = updater({ ...current });
  updated.updatedAt = new Date().toISOString();
  items[idx] = updated;
  writeAll(items);
  return updated;
}

function remove(id) {
  const items = readAll();
  const filtered = items.filter((i) => i._id !== id);
  if (filtered.length === items.length) return false;
  writeAll(filtered);
  return true;
}

module.exports = { list, getById, create, update, remove };
