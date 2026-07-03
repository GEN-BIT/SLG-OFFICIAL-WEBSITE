const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');

function getDataDir() {
  return process.env.DATA_DIR || path.join(__dirname, '../../data');
}

function inquiriesPath() {
  return path.join(getDataDir(), 'inquiries.json');
}

function ensureFile() {
  const p = inquiriesPath();
  if (!fs.existsSync(p)) {
    fs.writeFileSync(p, JSON.stringify({ inquiries: [] }, null, 2));
  }
}

function readAll() {
  ensureFile();
  const raw = fs.readFileSync(inquiriesPath(), 'utf8');
  const parsed = JSON.parse(raw || '{"inquiries": []}');
  return Array.isArray(parsed.inquiries) ? parsed.inquiries : [];
}

function writeAll(inquiries) {
  ensureFile();
  fs.writeFileSync(inquiriesPath(), JSON.stringify({ inquiries }, null, 2));
}

function list() {
  return readAll();
}

function getById(id) {
  return readAll().find((i) => i._id === id) || null;
}

function create(doc) {
  const inquiries = readAll();
  const now = new Date().toISOString();
  const inquiry = {
    _id: nanoid(),
    firstName: doc.firstName || '',
    lastName: doc.lastName || '',
    email: doc.email,
    phone: doc.phone || '',
    enquiryType: doc.type || doc.enquiryType || '',
    program: doc.program || '',
    subject: doc.subject || '',
    message: doc.message || '',
    status: doc.status || 'pending',
    createdAt: now,
    updatedAt: now,
    isSpam: false,
    spamMarkedAt: null
  };
  inquiries.unshift(inquiry);
  writeAll(inquiries);
  return inquiry;
}

function update(id, updater) {
  const inquiries = readAll();
  const idx = inquiries.findIndex((i) => i._id === id);
  if (idx === -1) return null;

  const current = inquiries[idx];
  const updated = updater({ ...current });
  updated.updatedAt = new Date().toISOString();
  inquiries[idx] = updated;
  writeAll(inquiries);
  return updated;
}

function remove(id) {
  const inquiries = readAll();
  const filtered = inquiries.filter((i) => i._id !== id);
  if (filtered.length === inquiries.length) return false;
  writeAll(filtered);
  return true;
}

module.exports = { list, getById, create, update, remove };

