/* enrollment-form.js — Form validation and PDF generation */

(function () {
  const form = document.getElementById('enrollmentForm');
  const okMsg = document.getElementById('okMsg');
  const errMsg = document.getElementById('errMsg');
  const downloadPdfBtn = document.getElementById('downloadPdfBtn');

  if (!form) return;

  // Form validation rules
  const validationRules = {
    firstName: { required: true, minLength: 2, pattern: /^[a-zA-Z\s'-]+$/ },
    lastName: { required: true, minLength: 2, pattern: /^[a-zA-Z\s'-]+$/ },
    dateOfBirth: { required: true },
    gender: { required: true },
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    phone: { required: true, pattern: /^\+?[0-9\s\-()]{10,}$/ },
    nationalId: { required: true, minLength: 16 },
    district: { required: true },
    lastSchool: { required: true },
    examType: { required: true },
    examScore: { required: true, min: 0, max: 1000 },
    examYear: { required: true, min: 1990, max: 2100 },
    program: { required: true },
    agreeTerms: { required: true },
    agreePrivacy: { required: true }
  };

  function validateField(name, value) {
    const rules = validationRules[name];
    if (!rules) return true;

    if (rules.required && !value) {
      return false;
    }

    if (rules.minLength && value && value.length < rules.minLength) {
      return false;
    }

    if (rules.pattern && value && !rules.pattern.test(value)) {
      return false;
    }

    if (rules.min !== undefined && value && parseFloat(value) < rules.min) {
      return false;
    }

    if (rules.max !== undefined && value && parseFloat(value) > rules.max) {
      return false;
    }

    return true;
  }

  function getFieldValue(name) {
    const field = form.elements[name];
    if (!field) return '';

    if (field.type === 'radio') {
      const checked = form.querySelector(`input[name="${name}"]:checked`);
      return checked ? checked.value : '';
    }

    if (field.type === 'checkbox') {
      return field.checked;
    }

    return field.value || '';
  }

  function showFieldError(name, message) {
    const field = form.elements[name];
    const errorEl = document.getElementById(`error-${name}`);
    if (field) {
      field.classList.add('error');
    }
    if (errorEl) {
      errorEl.textContent = message || 'This field is invalid';
    }
  }

  function clearFieldError(name) {
    const field = form.elements[name];
    const errorEl = document.getElementById(`error-${name}`);
    if (field) {
      field.classList.remove('error');
    }
    if (errorEl) {
      errorEl.textContent = '';
    }
  }

  function validateForm() {
    let isValid = true;
    Object.keys(validationRules).forEach(name => {
      const value = getFieldValue(name);
      if (!validateField(name, value)) {
        showFieldError(name);
        isValid = false;
      } else {
        clearFieldError(name);
      }
    });
    return isValid;
  }

  // Real-time validation
  Object.keys(validationRules).forEach(name => {
    const field = form.elements[name];
    if (field) {
      field.addEventListener('blur', () => {
        const value = getFieldValue(name);
        if (!validateField(name, value)) {
          showFieldError(name);
        } else {
          clearFieldError(name);
        }
      });

      field.addEventListener('input', () => {
        if (field.classList.contains('error')) {
          const value = getFieldValue(name);
          if (validateField(name, value)) {
            clearFieldError(name);
          }
        }
      });
    }
  });

  // Form submission
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Hide messages
    okMsg.classList.remove('show');
    errMsg.classList.remove('show');

    if (!validateForm()) {
      errMsg.classList.add('show');
      window.scrollTo({ top: form.offsetTop - 100, behavior: 'smooth' });
      return;
    }

    // Form is valid - collect data
    const formData = {
      firstName: getFieldValue('firstName'),
      lastName: getFieldValue('lastName'),
      dateOfBirth: getFieldValue('dateOfBirth'),
      gender: getFieldValue('gender'),
      email: getFieldValue('email'),
      phone: getFieldValue('phone'),
      nationalId: getFieldValue('nationalId'),
      district: getFieldValue('district'),
      lastSchool: getFieldValue('lastSchool'),
      examType: getFieldValue('examType'),
      examScore: getFieldValue('examScore'),
      examYear: getFieldValue('examYear'),
      program: getFieldValue('program'),
      programSecond: getFieldValue('programSecond'),
      submissionDate: new Date().toLocaleDateString()
    };

    // Store form data for PDF download
    window.enrollmentFormData = formData;

    // Show success message
    okMsg.classList.add('show');
    downloadPdfBtn.style.display = 'inline-block';

    // Scroll to message
    window.scrollTo({ top: okMsg.offsetTop - 100, behavior: 'smooth' });

    // Log to console (in real app, would send to server)
    console.log('Form submitted:', formData);
  });

  // PDF Download functionality
  downloadPdfBtn.addEventListener('click', function () {
    if (!window.enrollmentFormData) return;

    const data = window.enrollmentFormData;
    const pdfContent = `
SAINT LAURENT GASEKE TSS
STUDENT ENROLLMENT APPLICATION FORM

═══════════════════════════════════════════════════════════

PERSONAL INFORMATION
─────────────────────────────────────────────────────────
First Name: ${data.firstName}
Last Name: ${data.lastName}
Date of Birth: ${data.dateOfBirth}
Gender: ${data.gender}
Email: ${data.email}
Phone: ${data.phone}
National ID: ${data.nationalId}
District: ${data.district}

EDUCATIONAL BACKGROUND
─────────────────────────────────────────────────────────
Last School Attended: ${data.lastSchool}
Exam Type: ${data.examType}
Exam Score: ${data.examScore}
Year of Exam: ${data.examYear}

PROGRAM SELECTION
─────────────────────────────────────────────────────────
Preferred Program: ${data.program}
Second Choice: ${data.programSecond || 'None'}

═══════════════════════════════════════════════════════════

Application Submitted: ${data.submissionDate}

This is an official application form for Saint Laurent Gaseke TSS.
Please retain this copy for your records.

For inquiries, contact: admissions@slgtss.rw or +250 781 234 567

═══════════════════════════════════════════════════════════
    `;

    // Create a Blob and download
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `enrollment_${data.firstName}_${data.lastName}_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  });

  // Reset form button
  const resetBtn = form.querySelector('button[type="reset"]');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      okMsg.classList.remove('show');
      errMsg.classList.remove('show');
      downloadPdfBtn.style.display = 'none';
      // Clear all error states
      form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
      form.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    });
  }
})();
