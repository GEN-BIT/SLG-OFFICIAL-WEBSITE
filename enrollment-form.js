const form = document.getElementById('enrollmentForm');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      studentName: document.getElementById('studentName').value,
      parentName: document.getElementById('parentName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      gradeApplying: document.getElementById('gradeApplying').value,
      previousSchool: document.getElementById('previousSchool').value,
      message: document.getElementById('message').value
    };

    try {
      const response = await fetch('http://localhost:5000/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Enrollment submitted successfully! We will contact you soon.');
        form.reset();
      } else {
        const error = await response.json();
        alert('Error: ' + error.message);
      }
    } catch (error) {
      alert('Failed to connect to server. Is the backend running?');
      console.error(error);
    }
  });
}
