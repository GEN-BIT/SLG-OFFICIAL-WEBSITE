const store = require('../storage/enrollmentStore');

function listEnrollments(req, res) {
  const status = req.query.status;
  const filters = {};
  if (status) filters.status = String(status);
  const data = store.list(filters);
  return res.status(200).json({ success: true, data });
}

function getEnrollment(req, res) {
  const enrollment = store.getById(req.params.id);
  if (!enrollment) {
    return res.status(404).json({ success: false, message: 'Enrollment not found' });
  }
  return res.status(200).json({ success: true, data: enrollment });
}

function updateEnrollmentStatus(req, res) {
  const { status, notes } = req.body || {};
  if (!status) {
    return res.status(400).json({ success: false, message: 'status is required' });
  }

  const validStatuses = ['pending', 'reviewed', 'accepted', 'rejected', 'waitlisted'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
    });
  }

  const updated = store.update(req.params.id, (doc) => {
    doc.status = String(status);
    if (typeof notes === 'string') doc.notes = notes;
    return doc;
  });

  if (!updated) {
    return res.status(404).json({ success: false, message: 'Enrollment not found' });
  }
  return res.status(200).json({ success: true, data: updated });
}

function deleteEnrollment(req, res) {
  const ok = store.remove(req.params.id);
  if (!ok) {
    return res.status(404).json({ success: false, message: 'Enrollment not found' });
  }
  return res.status(200).json({ success: true, message: 'Enrollment deleted' });
}

module.exports = { listEnrollments, getEnrollment, updateEnrollmentStatus, deleteEnrollment };
