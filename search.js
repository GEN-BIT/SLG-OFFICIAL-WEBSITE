/* search.js — Site-wide search functionality */

(function () {
  // Search index - defines searchable pages and content
  const searchIndex = [
    // Home
    { page: 'index.html', title: 'Home', content: 'Saint Laurent Gaseke TSS', keywords: ['home', 'index'] },
    
    // About Us
    { page: 'about.html', title: 'About Us', content: 'Learn about our school history, mission, vision values and leadership team', keywords: ['about', 'history', 'mission', 'vision', 'values', 'team'] },
    
    // Programs
    { page: 'services.html', title: 'Our Programs', content: 'Software Development, Electrical Technology, Electronics, Building Construction', keywords: ['programs', 'services', 'courses', 'software', 'electrical', 'electronics', 'construction'] },
    
    // Gallery
    { page: 'gallery.html', title: 'Gallery', content: 'View photos from our departments and campus activities', keywords: ['gallery', 'photos', 'images', 'sod', 'ete', 'ele', 'bdc'] },
    
    // Contact
    { page: 'contact.html', title: 'Contact Us', content: 'Reach out to us for admissions and inquiries', keywords: ['contact', 'email', 'phone', 'address', 'enrollment'] },
    
    // FAQ
    { page: 'faq.html', title: 'FAQ', content: 'Frequently asked questions about admissions, programs and school', keywords: ['faq', 'questions', 'answers', 'help'] },
    
    // Announcements
    { page: 'announcements.html', title: 'Announcements', content: 'Latest news and notices from Saint Laurent Gaseke TSS', keywords: ['announcements', 'news', 'notices', 'updates'] },
    
    // Alumni
    { page: 'alumni.html', title: 'Alumni Stories', content: 'Success stories from our graduates', keywords: ['alumni', 'graduates', 'success', 'stories'] },
    
    // Virtual Tour
    { page: 'virtual-tour.html', title: 'Virtual Tour', content: 'Explore our campus virtually', keywords: ['virtual', 'tour', 'campus', 'map'] },
    
    // Enrollment Form
    { page: 'enrollment-form.html', title: 'Student Enrollment Form', content: 'Apply to our programs with validation and PDF download', keywords: ['enrollment', 'apply', 'admission', 'form', 'registration'] },
    
    // Calendar
    { page: 'academic-calendar.html', title: 'Academic Calendar', content: 'School timetable, holidays and important dates', keywords: ['calendar', 'timetable', 'schedule', 'holidays', 'dates', 'events'] },
    
    // Staff Directory
    { page: 'staff-directory.html', title: 'Staff Directory', content: 'Meet our faculty and administration', keywords: ['staff', 'directory', 'faculty', 'teachers', 'administration', 'instructors'] }
  ];

  document.addEventListener('DOMContentLoaded', function () {
    // Inject search bar into navigation
    const navInner = document.querySelector('.nav-inner');
    if (!navInner) return;

    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
      <div class="search-bar">
        <input type="text" id="searchInput" class="search-input" placeholder="Search site..." aria-label="Search the site">
        <button type="button" class="search-btn" id="searchBtn" aria-label="Submit search">
          <span>🔍</span>
        </button>
      </div>
      <div class="search-results" id="searchResults" style="display: none;">
        <div class="search-results-list"></div>
        <button type="button" class="search-close" id="searchClose">Close</button>
      </div>
    `;
    navInner.appendChild(searchContainer);

    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchResults = document.getElementById('searchResults');
    const searchClose = document.getElementById('searchClose');
    const searchResultsList = searchResults.querySelector('.search-results-list');

    function performSearch(query) {
      if (!query.trim()) {
        searchResults.style.display = 'none';
        return;
      }

      const lowerQuery = query.toLowerCase();
      const matches = searchIndex.filter(item => {
        return item.title.toLowerCase().includes(lowerQuery) ||
               item.content.toLowerCase().includes(lowerQuery) ||
               item.keywords.some(k => k.includes(lowerQuery));
      });

      searchResultsList.innerHTML = '';
      if (matches.length === 0) {
        searchResultsList.innerHTML = '<div class="no-results">No results found.</div>';
        searchResults.style.display = 'block';
        return;
      }

      matches.forEach(match => {
        const resultItem = document.createElement('a');
        resultItem.href = match.page;
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
          <div class="result-title">${match.title}</div>
          <div class="result-preview">${match.content}</div>
        `;
        searchResultsList.appendChild(resultItem);
      });

      searchResults.style.display = 'block';
    }

    searchBtn.addEventListener('click', () => {
      performSearch(searchInput.value);
    });

    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        performSearch(searchInput.value);
      } else {
        performSearch(searchInput.value);
      }
    });

    searchClose.addEventListener('click', () => {
      searchResults.style.display = 'none';
      searchInput.value = '';
    });

    // Toggle mobile menu when burger is clicked
    const burger = document.getElementById('burger');
    const navList = document.getElementById('navList');
    if (burger && navList) {
      burger.addEventListener('click', function () {
        burger.classList.toggle('is-open');
        navList.classList.toggle('open');
      });
    }

    // Close results on outside click
    document.addEventListener('click', (e) => {
      if (!searchContainer.contains(e.target)) {
        searchResults.style.display = 'none';
      }
    });
  });
})();
