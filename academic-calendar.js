/* academic-calendar.js — Calendar tab switching */

(function () {
  const tabBtns = document.querySelectorAll('.calendar-tab-btn');
  const tabContents = document.querySelectorAll('.calendar-tab-content');

  if (!tabBtns.length || !tabContents.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const tabName = this.dataset.tab;

      // Update active button
      tabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Update active content
      tabContents.forEach(content => {
        content.classList.remove('active');
      });

      const activeContent = document.getElementById(`${tabName}-tab`);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });

  // Set first tab as active by default
  if (tabBtns.length > 0) {
    tabBtns[0].classList.add('active');
    if (tabContents.length > 0) {
      tabContents[0].classList.add('active');
    }
  }
})();
