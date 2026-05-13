document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('enrollmentForm') || document.querySelector('form');
  
  if (!form) {
    console.error('Enrollment form not found!');
    return;
  }

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Helper to get value by ID, Name, or Placeholder guess
    const getVal = (id, name) => {
      const el = document.getElementById(id) || document.querySelector(`[name="${name}"]`);
      return el ? el.value : '';
    };

    const formData = {
      studentName: getVal('studentName', 'studentName') || getVal('name', 'fullName'),
      parentName: getVal('parentName', 'parentName') || getVal('parent', 'guardianName'),
      email: getVal('email', 'email'),
      phone: getVal('phone', 'phone'),
      gradeApplying: getVal('gradeApplying', 'grade') || getVal('grade', 'class'),
      previousSchool: getVal('previousSchool', 'previousSchool') || getVal('school', 'lastSchool'),
      message: getVal('message', 'message') || getVal('comments', 'remarks')
    };

    console.log('Submitting:', formData); // Check console to see what is being sent

    try {
      const response = await fetch('http://localhost:5000/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || 'Submission failed');

      alert('Enrollment submitted successfully! We will contact you soon.');
      form.reset();
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  });
});
