(function () {
  'use strict';

  const form = document.getElementById('enrollmentForm');
  const okMsg = document.getElementById('okMsg');
  const errMsg = document.getElementById('errMsg');
  const errContainer = document.getElementById('errContainer');
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

  if (!form) return;

  // Helper: get value of checked radio by name
  function getRadioValue(name) {
    const radio = form.querySelector(`input[type="radio"][name="${name}"]:checked`);
    return radio ? radio.value : '';
  }

  // Show inline error on a field
  function setFieldError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const errSpan = document.getElementById('error-' + fieldId);
    if (input) input.classList.toggle('error', !!message);
    if (errSpan) {
      errSpan.textContent = message || '';
      errSpan.style.display = message ? 'block' : 'none';
    }
  }

  // Clear all field errors
  function clearAllErrors() {
    document.querySelectorAll('.error-msg').forEach((el) => {
      el.textContent = '';
      el.style.display = 'none';
    });
    document.querySelectorAll('.field input.error, .field select.error').forEach((el) => {
      el.classList.remove('error');
    });
  }

  // Hide both global messages
  function hideGlobalMessages() {
    if (okMsg) { okMsg.classList.remove('show'); okMsg.style.display = 'none'; }
    if (errMsg) { errMsg.classList.remove('show'); errMsg.style.display = 'none'; }
  }

  // Show success message
  function showSuccess(msg) {
    hideGlobalMessages();
    if (okMsg) {
      okMsg.textContent = msg || '✓ Your application has been submitted successfully! We will contact you soon.';
      okMsg.style.display = 'block';
      okMsg.classList.add('show');
    }
  }

  // Show error message
  function showError(msg) {
    hideGlobalMessages();
    if (errMsg) {
      errMsg.textContent = msg || '✗ Something went wrong. Please try again.';
      errMsg.style.display = 'block';
      errMsg.classList.add('show');
    }
  }

  // Validate all required fields
  function validateForm() {
    let valid = true;
    clearAllErrors();

    const requiredFields = [
      'firstName', 'lastName', 'dateOfBirth', 'gender',
      'email', 'phone', 'nationalId', 'district',
      'lastSchool', 'examType', 'examScore', 'examYear'
    ];

    for (const id of requiredFields) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (!el.value || !el.value.trim()) {
        setFieldError(id, 'This field is required');
        valid = false;
      }
    }

    // Validate email format
    const email = document.getElementById('email');
    if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      setFieldError('email', 'Please enter a valid email address');
      valid = false;
    }

    // Validate phone (at least minimal)
    const phone = document.getElementById('phone');
    if (phone && phone.value && phone.value.trim().length < 7) {
      setFieldError('phone', 'Please enter a valid phone number');
      valid = false;
    }

    // Validate program radio
    if (!getRadioValue('program')) {
      const errSpan = document.getElementById('error-program');
      if (errSpan) {
        errSpan.textContent = 'Please select a program';
        errSpan.style.display = 'block';
      }
      valid = false;
    }

    // Validate terms
    const agreeTerms = document.getElementById('agreeTerms');
    if (agreeTerms && !agreeTerms.checked) {
      const errSpan = document.getElementById('error-agreeTerms');
      if (errSpan) {
        errSpan.textContent = 'You must agree to the terms and conditions';
        errSpan.style.display = 'block';
      }
      valid = false;
    }

    // Validate privacy
    const agreePrivacy = document.getElementById('agreePrivacy');
    if (agreePrivacy && !agreePrivacy.checked) {
      const errSpan = document.getElementById('error-agreePrivacy');
      if (errSpan) {
        errSpan.textContent = 'You must agree to the privacy policy';
        errSpan.style.display = 'block';
      }
      valid = false;
    }

    return valid;
  }

  // Collect form data
  function collectFormData() {
    return {
      firstName: document.getElementById('firstName')?.value?.trim() || '',
      lastName: document.getElementById('lastName')?.value?.trim() || '',
      dateOfBirth: document.getElementById('dateOfBirth')?.value || '',
      gender: document.getElementById('gender')?.value || '',
      email: document.getElementById('email')?.value?.trim() || '',
      phone: document.getElementById('phone')?.value?.trim() || '',
      nationalId: document.getElementById('nationalId')?.value?.trim() || '',
      district: document.getElementById('district')?.value?.trim() || '',
      lastSchool: document.getElementById('lastSchool')?.value?.trim() || '',
      examType: document.getElementById('examType')?.value || '',
      examScore: document.getElementById('examScore')?.value || '',
      examYear: document.getElementById('examYear')?.value || '',
      program: getRadioValue('program'),
      programSecond: document.getElementById('programSecond')?.value || ''
    };
  }

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideGlobalMessages();

    if (!validateForm()) {
      // Scroll to first error
      const firstError = form.querySelector('.error-msg[style*="display: block"], .field input.error, .field select.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
    }

    const formData = collectFormData();

    try {
      const response = await fetch('http://localhost:5001/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        showSuccess(result.message || '✓ Application submitted successfully! We will contact you soon.');
        form.reset();
        // Scroll to the success message
        if (okMsg) okMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        showError(result.message || '✗ Submission failed. Please check your information and try again.');
      }
    } catch (error) {
      console.error('Enrollment submission error:', error);
      showError('✗ Failed to connect to the server. Please ensure the backend is running and try again.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Application';
      }
    }
  });

  // Clear errors on input
  form.addEventListener('input', (e) => {
    const input = e.target;
    if (input.classList.contains('error')) {
      input.classList.remove('error');
      const errSpan = document.getElementById('error-' + input.id);
      if (errSpan) {
        errSpan.textContent = '';
        errSpan.style.display = 'none';
      }
    }
  });

  // Hide global messages when user interacts
  form.addEventListener('input', hideGlobalMessages);

})();
