const store = require('../storage/inquiriesStore');

// Public endpoint used by the frontend contact form.
// The frontend only sends { name, email, phone, type, subject, message }.
function createInquiry(req, res) {
  const body = req.body || {};

  const name = String(body.name || '').trim();
  const [firstName, ...rest] = name.split(' ');
  const lastName = rest.join(' ').trim();

  if (!body.email || !body.message) {
    return res.status(400).json({ success: false, message: 'email and message are required' });
  }

  const inquiry = store.create({
    firstName,
    lastName,
    email: String(body.email),
    phone: body.phone ? String(body.phone) : '',
    type: body.type,
    subject: body.subject,
    message: String(body.message),
    program: body.program
  });

  return res.status(201).json({ success: true, data: inquiry });
}

module.exports = { createInquiry };

