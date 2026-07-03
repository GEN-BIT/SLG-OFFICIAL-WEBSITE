/* staff-directory.js — Staff filtering functionality */

(function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const staffCards = document.querySelectorAll('.staff-card');

  if (!filterBtns.length || !staffCards.length) return;

  function filterStaff(category) {
    staffCards.forEach(card => {
      const cardCategory = card.dataset.category;
      
      if (category === 'all' || cardCategory === category) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const category = this.dataset.filter;
      
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Filter cards
      filterStaff(category);
      
      // Scroll to grid
      const grid = document.querySelector('.staff-grid');
      if (grid) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Initialize with 'all' category
  filterStaff('all');
})();
