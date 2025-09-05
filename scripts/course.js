
// Fetch courses from JSON and render them
fetch('data/courses.json')
  .then(response => response.json())
  .then(courses => {
    renderCourses(courses);

    // Filter buttons
    document.querySelectorAll('.filter-buttons button').forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        const filtered = filter === 'All'
          ? courses
          : courses.filter(course => course.subject === filter);
        renderCourses(filtered);
      });
    });
  })
  .catch(error => console.error('Error loading courses:', error));

/**
 * Render course cards and update credits
 */
function renderCourses(courses) {
  const courseList = document.getElementById('course-list');
  const totalCreditsEl = document.getElementById('total-credits');

  courseList.innerHTML = ''; // Clear existing

  let totalCredits = 0;

  courses.forEach(course => {
    // Create course card
    const card = document.createElement('div');
    card.classList.add('course-card');

    // Completed styling
    if (course.completed) {
      card.classList.add('completed');
    }

    card.innerHTML = `
      <h3>${course.subject} ${course.number} - ${course.title}</h3>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <p><strong>Certificate:</strong> ${course.certificate}</p>
      <p>${course.description}</p>
      <p><strong>Tech:</strong> ${course.technology.join(', ')}</p>
    `;

    courseList.appendChild(card);
    totalCredits += course.credits;
  });

  // Update total credits dynamically
  totalCreditsEl.textContent = Total credits: ${totalCredits};
}


