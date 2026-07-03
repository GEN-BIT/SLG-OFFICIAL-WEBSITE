const store = require('../storage/enrollmentStore');

// Public endpoint: submit an enrollment application from the frontend form
function submitEnrollment(req, res) {
  const body = req.body || {};

  // Validate required fields
  const required = ['firstName', 'lastName', 'email', 'phone', 'program'];
  for (const field of required) {
    if (!body[field] || !String(body[field]).trim()) {
      return res.status(400).json({
        success: false,
        message: `${field} is required`
      });
    }
  }

  const enrollment = store.create({
    firstName: String(body.firstName).trim(),
    lastName: String(body.lastName).trim(),
    dateOfBirth: body.dateOfBirth || '',
    gender: body.gender || '',
    email: String(body.email).trim(),
    phone: String(body.phone).trim(),
    nationalId: body.nationalId || '',
    district: body.district || '',
    lastSchool: body.lastSchool || '',
    examType: body.examType || '',
    examScore: body.examScore || '',
    examYear: body.examYear || '',
    program: String(body.program).trim(),
    programSecond: body.programSecond || '',
    status: 'pending'
  });

  return res.status(201).json({
    success: true,
    message: 'Application submitted successfully! We will contact you soon.'
  });
}

module.exports = { submitEnrollment };
