/**
 * ADMIN-DASHBOARD.JS — Saint Laurent Gaseke TSS
 * Admin dashboard functionality
 */

// Check if user is logged in
function checkAdminLogin() {
  if (!isAdminLoggedIn()) {
    window.location.href = 'admin-login.html';
  }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
  checkAdminLogin();
  initializeDashboard();
  loadInquiries();
  setupEventListeners();
});

function initializeDashboard() {
  const adminUser = getStoredAdminUser();
  if (adminUser) {
    document.getElementById('adminName').textContent = adminUser.name || adminUser.email;
  }
}

function setupEventListeners() {
  // Tab navigation
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tabName = link.getAttribute('data-tab');
      switchTab(tabName);

      // Update active state in sidebar
      document.querySelectorAll('.nav-link').forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Logout button
  document.getElementById('logoutBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to log out?')) {
      adminLogout();
      window.location.href = 'admin-login.html';
    }
  });

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      filterInquiries(filter);
    });
  });

  // Change password form
  document.getElementById('changePasswordForm').addEventListener('submit', handlePasswordChange);

  // Modal close button
  document.querySelector('.modal-close').addEventListener('click', closeModal);
  document.getElementById('inquiryModal').addEventListener('click', (e) => {
    if (e.target.id === 'inquiryModal') {
      closeModal();
    }
  });
}

function switchTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach((tab) => {
    tab.classList.remove('active');
  });

  // Show selected tab
  document.getElementById(tabName).classList.add('active');

  // Load data for specific tabs
  if (tabName === 'inquiries') {
    loadInquiries();
  } else if (tabName === 'overview') {
    loadOverview();
  }
}

async function loadOverview() {
  try {
    const result = await getAllInquiries();

    if (result.success && result.data) {
      const inquiries = result.data;

      // Calculate statistics
      const total = inquiries.length;
      const pending = inquiries.filter((i) => i.status === 'pending').length;
      const reviewed = inquiries.filter((i) => i.status === 'reviewed').length;
      const spam = inquiries.filter((i) => i.status === 'spam').length;

      // Update stats
      document.getElementById('totalCount').textContent = total;
      document.getElementById('pendingCount').textContent = pending;
      document.getElementById('reviewedCount').textContent = reviewed;
      document.getElementById('spamCount').textContent = spam;

      // Show recent inquiries (last 5)
      const recent = inquiries.slice(0, 5);
      displayRecentInquiries(recent);
    }
  } catch (error) {
    console.error('Error loading overview:', error);
  }
}

function displayRecentInquiries(inquiries) {
  const container = document.getElementById('recentList');

  if (inquiries.length === 0) {
    container.innerHTML = '<p class="loading-msg">No inquiries yet.</p>';
    return;
  }

  container.innerHTML = inquiries
    .map(
      (inquiry) => `
    <div class="inquiry-item">
      <div class="inquiry-header">
        <div>
          <div class="inquiry-sender">${inquiry.firstName} ${inquiry.lastName}</div>
          <div class="inquiry-meta">
            <span>${inquiry.email}</span>
            <span>${inquiry.phone || 'No phone'}</span>
          </div>
        </div>
        <span class="inquiry-status ${inquiry.status}">${inquiry.status.toUpperCase()}</span>
      </div>
      <div class="inquiry-message">${inquiry.message.substring(0, 100)}...</div>
      <div class="inquiry-meta">
        <span>📅 ${new Date(inquiry.createdAt).toLocaleDateString()}</span>
        <span>🏷️ ${inquiry.enquiryType || 'General'}</span>
      </div>
    </div>
  `
    )
    .join('');

  // Add click handlers
  document.querySelectorAll('.inquiry-item').forEach((item, index) => {
    item.addEventListener('click', () => {
      showInquiryDetails(inquiries[index]);
    });
  });
}

async function loadInquiries() {
  try {
    const result = await getAllInquiries();

    if (result.success && result.data) {
      displayInquiries(result.data);
    }
  } catch (error) {
    console.error('Error loading inquiries:', error);
    document.getElementById('inquiriesList').innerHTML = `
      <p class="loading-msg" style="color: red;">Error loading inquiries. Please try again.</p>
    `;
  }
}

function filterInquiries(status) {
  const items = document.querySelectorAll('.inquiry-item');

  items.forEach((item) => {
    if (status === '') {
      item.style.display = 'block';
    } else {
      const itemStatus = item.querySelector('.inquiry-status').textContent.toLowerCase();
      item.style.display = itemStatus === status.toUpperCase() ? 'block' : 'none';
    }
  });
}

function displayInquiries(inquiries) {
  const container = document.getElementById('inquiriesList');

  if (inquiries.length === 0) {
    container.innerHTML = '<p class="loading-msg">No inquiries found.</p>';
    return;
  }

  container.innerHTML = inquiries
    .map(
      (inquiry) => `
    <div class="inquiry-item">
      <div class="inquiry-header">
        <div>
          <div class="inquiry-sender">${inquiry.firstName} ${inquiry.lastName}</div>
          <div class="inquiry-meta">
            <span>${inquiry.email}</span>
            <span>${inquiry.phone || 'No phone'}</span>
          </div>
        </div>
        <span class="inquiry-status ${inquiry.status}">${inquiry.status.toUpperCase()}</span>
      </div>
      <div class="inquiry-message">${inquiry.message.substring(0, 100)}...</div>
      <div class="inquiry-meta">
        <span>📅 ${new Date(inquiry.createdAt).toLocaleDateString()}</span>
        <span>🏷️ ${inquiry.enquiryType || 'General'}</span>
        <span>${inquiry.program ? '📚 ' + inquiry.program : ''}</span>
      </div>
    </div>
  `
    )
    .join('');

  // Add click handlers
  document.querySelectorAll('.inquiry-item').forEach((item, index) => {
    item.addEventListener('click', () => {
      showInquiryDetails(inquiries[index]);
    });
  });
}

function showInquiryDetails(inquiry) {
  const details = document.getElementById('inquiryDetails');

  details.innerHTML = `
    <div class="details-header">
      <h2 class="details-name">${inquiry.firstName} ${inquiry.lastName}</h2>
      <p class="details-email">${inquiry.email}</p>
    </div>

    <div class="detail-field">
      <label class="detail-label">Status</label>
      <select id="statusSelect" class="detail-value" style="width: 100%; padding: 8px; border: 1px solid var(--border); border-radius: 4px;">
        <option value="pending" ${inquiry.status === 'pending' ? 'selected' : ''}>Pending</option>
        <option value="reviewed" ${inquiry.status === 'reviewed' ? 'selected' : ''}>Reviewed</option>
        <option value="responded" ${inquiry.status === 'responded' ? 'selected' : ''}>Responded</option>
        <option value="archived" ${inquiry.status === 'archived' ? 'selected' : ''}>Archived</option>
        <option value="spam" ${inquiry.status === 'spam' ? 'selected' : ''}>Spam</option>
      </select>
    </div>

    <div class="detail-field">
      <label class="detail-label">Phone</label>
      <div class="detail-value">${inquiry.phone || 'Not provided'}</div>
    </div>

    <div class="detail-field">
      <label class="detail-label">Enquiry Type</label>
      <div class="detail-value">${inquiry.enquiryType || 'General'}</div>
    </div>

    ${inquiry.program ? `<div class="detail-field"><label class="detail-label">Program Interest</label><div class="detail-value">${inquiry.program}</div></div>` : ''}

    <div class="detail-field">
      <label class="detail-label">Message</label>
      <div class="detail-value" style="white-space: pre-wrap; background: white; border: 1px solid var(--border); padding: 12px;">${inquiry.message}</div>
    </div>

    <div class="detail-field">
      <label class="detail-label">Received Date</label>
      <div class="detail-value">${new Date(inquiry.createdAt).toLocaleString()}</div>
    </div>

    <div class="details-actions">
      <button class="action-btn primary" onclick="updateInquiryStatus('${inquiry._id}')">Update Status</button>
      <button class="action-btn danger" onclick="deleteInquiry('${inquiry._id}')">Delete</button>
      <button class="action-btn secondary" onclick="closeModal()">Close</button>
    </div>
  `;

  openModal();
}

async function updateInquiryStatus(inquiryId) {
  const statusSelect = document.getElementById('statusSelect');
  const newStatus = statusSelect.value;

  try {
    const result = await updateInquiryStatus(inquiryId, newStatus);

    if (result.success) {
      alert('✓ Status updated successfully!');
      closeModal();
      loadInquiries();
    } else {
      alert('❌ Failed to update status');
    }
  } catch (error) {
    alert('❌ Error: ' + error.message);
  }
}

async function deleteInquiry(inquiryId) {
  if (!confirm('Are you sure you want to delete this inquiry? This cannot be undone.')) {
    return;
  }

  try {
    const result = await deleteInquiry(inquiryId);

    if (result.success) {
      alert('✓ Inquiry deleted successfully!');
      closeModal();
      loadInquiries();
    } else {
      alert('❌ Failed to delete inquiry');
    }
  } catch (error) {
    alert('❌ Error: ' + error.message);
  }
}

function openModal() {
  document.getElementById('inquiryModal').classList.add('active');
}

function closeModal() {
  document.getElementById('inquiryModal').classList.remove('active');
}

async function handlePasswordChange(e) {
  e.preventDefault();

  const oldPassword = document.getElementById('oldPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const msg = document.getElementById('pwdMsg');

  msg.classList.remove('error', 'success');
  msg.textContent = '';

  if (newPassword !== confirmPassword) {
    msg.classList.add('error');
    msg.textContent = '❌ New passwords do not match';
    return;
  }

  if (newPassword.length < 6) {
    msg.classList.add('error');
    msg.textContent = '❌ Password must be at least 6 characters';
    return;
  }

  try {
    const result = await changePassword(oldPassword, newPassword);

    if (result.success) {
      msg.classList.add('success');
      msg.textContent = '✓ Password changed successfully!';
      document.getElementById('changePasswordForm').reset();
      setTimeout(() => {
        msg.textContent = '';
      }, 3000);
    } else {
      msg.classList.add('error');
      msg.textContent = `❌ ${result.message || 'Failed to change password'}`;
    }
  } catch (error) {
    msg.classList.add('error');
    msg.textContent = `❌ Error: ${error.message}`;
  }
}

// Load overview by default
window.addEventListener('load', () => {
  loadOverview();
});
