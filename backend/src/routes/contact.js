const store = require('../storage/inquiriesStore');

function listInquiries(req, res) {
  const status = req.query.status;
  const all = store.list();
  const filtered = status ? all.filter((i) => String(i.status) === String(status)) : all;
  return res.status(200).json({ success: true, data: filtered });
}

function getInquiry(req, res) {
  const inquiry = store.getById(req.params.id);
  if (!inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found' });
  return res.status(200).json({ success: true, data: inquiry });
}

function updateInquiryStatus(req, res) {
  const { status } = req.body || {};
  if (!status) return res.status(400).json({ success: false, message: 'status is required' });

  const updated = store.update(req.params.id, (doc) => {
    doc.status = String(status);
    // Keep isSpam in sync
    if (doc.status === 'spam') doc.isSpam = true;
    return doc;
  });

  if (!updated) return res.status(404).json({ success: false, message: 'Inquiry not found' });
  return res.status(200).json({ success: true, data: updated });
}

function markInquirySpam(req, res) {
  const { isSpam } = req.body || {};
  if (typeof isSpam === 'undefined') return res.status(400).json({ success: false, message: 'isSpam is required' });

  const updated = store.update(req.params.id, (doc) => {
    doc.isSpam = !!isSpam;
    doc.status = doc.isSpam ? 'spam' : (doc.status === 'spam' ? 'pending' : doc.status);
    doc.spamMarkedAt = doc.isSpam ? new Date().toISOString() : null;
    return doc;
  });

  if (!updated) return res.status(404).json({ success: false, message: 'Inquiry not found' });
  return res.status(200).json({ success: true, data: updated });
}

function deleteInquiry(req, res) {
  const ok = store.remove(req.params.id);
  if (!ok) return res.status(404).json({ success: false, message: 'Inquiry not found' });
  return res.status(200).json({ success: true, message: 'Inquiry deleted' });
}

module.exports = { listInquiries, getInquiry, updateInquiryStatus, markInquirySpam, deleteInquiry };

