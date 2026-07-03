const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
  const auth = req.headers.authorization || '';
  const [scheme, token] = auth.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ success: false, message: 'Missing bearer token' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = payload;
    return next();
  } catch (e) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}

function requireAdmin(req, res, next) {
  // Payload is expected to contain role=admin
  if (!req.auth || req.auth.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }
  return next();
}

module.exports = { authenticateJWT, requireAdmin };

