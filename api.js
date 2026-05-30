/**
 * API.js - Frontend API Integration
 * Handles all communication with the backend
 */

const API_BASE_URL = 'http://localhost:5001/api';

/**
 * Generic fetch wrapper with error handling
 */
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add JWT token if available
  const token = localStorage.getItem('adminToken');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * Contact Form Submission
 */
async function submitContact(formData) {
  const fullName = [formData.firstName, formData.lastName].filter(Boolean).join(' ').trim();
  const subject = formData.program
    ? `Program of Interest: ${formData.program}`
    : `Enquiry Type: ${formData.enquiryType}`;

  return apiCall('/contact', {
    method: 'POST',
    body: JSON.stringify({
      name: fullName,
      email: formData.email,
      phone: formData.phone,
      type: formData.enquiryType,
      subject,
      message: formData.message,
    }),
  });
}

/**
 * Admin Login
 */
async function adminLogin(email, password) {
  const result = await apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  // Store token in localStorage
  if (result.data && result.data.token) {
    localStorage.setItem('adminToken', result.data.token);
    localStorage.setItem('adminUser', JSON.stringify(result.data.user));
  }

  return result;
}

/**
 * Admin Logout
 */
function adminLogout() {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
}

/**
 * Get Current Admin User
 */
async function getCurrentAdmin() {
  return apiCall('/auth/me', {
    method: 'GET',
  });
}

/**
 * Change Admin Password
 */
async function changePassword(oldPassword, newPassword) {
  return apiCall('/auth/change-password', {
    method: 'POST',
    body: JSON.stringify({ oldPassword, newPassword }),
  });
}

/**
 * Get All Contact Inquiries
 */
async function getAllInquiries(filters = {}) {
  let query = '';
  if (filters.status) query += `?status=${filters.status}`;
  
  return apiCall(`/contact${query}`, {
    method: 'GET',
  });
}

/**
 * Get Single Inquiry by ID
 */
async function getInquiry(id) {
  return apiCall(`/contact/${id}`, {
    method: 'GET',
  });
}

/**
 * Update Inquiry Status
 */
async function updateInquiryStatus(id, status) {
  return apiCall(`/contact/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

/**
 * Mark Inquiry as Spam
 */
async function markAsSpam(id, isSpam) {
  return apiCall(`/contact/${id}/spam`, {
    method: 'PATCH',
    body: JSON.stringify({ isSpam }),
  });
}

/**
 * Delete Inquiry
 */
async function deleteInquiry(id) {
  return apiCall(`/contact/${id}`, {
    method: 'DELETE',
  });
}

/**
 * Check Health Status
 */
async function checkHealthStatus() {
  try {
    return await apiCall('/health/live', {
      method: 'GET',
    });
  } catch (error) {
    return null;
  }
}

/**
 * Helper: Check if admin is logged in
 */
function isAdminLoggedIn() {
  return !!localStorage.getItem('adminToken');
}

/**
 * Helper: Get stored admin user
 */
function getStoredAdminUser() {
  const user = localStorage.getItem('adminUser');
  return user ? JSON.parse(user) : null;
}
