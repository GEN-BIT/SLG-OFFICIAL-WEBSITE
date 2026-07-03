const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function ensureAdminSeed() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  if (!adminEmail || !adminPasswordHash) {
    console.warn(
      '[auth] Missing ADMIN_EMAIL or ADMIN_PASSWORD_HASH in env. Login will fail until configured.'
    );
  }
}

async function login(req, res) {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminPasswordHash) {
    return res.status(500).json({ success: false, message: 'Admin not configured on server' });
  }

  if (email.toLowerCase() !== String(adminEmail).toLowerCase()) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const ok = await bcrypt.compare(String(password), String(adminPasswordHash));
  if (!ok) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { role: 'admin', email: adminEmail },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      token,
      user: { email: adminEmail, name: 'Admin' }
    }
  });
}

async function me(req, res) {
  const email = req.auth && req.auth.email;
  return res.status(200).json({
    success: true,
    data: {
      user: { email, name: 'Admin', role: 'admin' }
    }
  });
}

async function changePassword(req, res) {
  // For this simple env-based implementation, we cannot persist new hash.
  // Return a helpful message that tells operator to update env hash.
  const { oldPassword, newPassword } = req.body || {};

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminPasswordHash) {
    return res.status(500).json({ success: false, message: 'Admin not configured on server' });
  }

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ success: false, message: 'Old and new password are required' });
  }

  if (String(newPassword).length < 6) {
    return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
  }

  const ok = await bcrypt.compare(String(oldPassword), String(adminPasswordHash));
  if (!ok) {
    return res.status(401).json({ success: false, message: 'Old password is incorrect' });
  }

  return res.status(501).json({
    success: false,
    message: 'Password change is not persisted in this dev backend. Update ADMIN_PASSWORD_HASH in .env and restart the server.'
  });
}

module.exports = { login, me, changePassword, ensureAdminSeed };

