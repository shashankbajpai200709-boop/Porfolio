/**
 * =============================================================================
 * SHASHANK BAJπ — NAVIGATION CONTROLLER (navigation.js)
 * =============================================================================
 * 
 * Manages:
 * 1. Sticky navbar glass background on scroll
 * 2. Mobile drawer menu toggle & backdrop handling
 * 3. Smooth offset anchor scrolling so headings aren't hidden under navbar
 * 4. Scrollspy: Highlights active navigation link corresponding to current section
 * =============================================================================
 */

(function () {
  'use strict';

  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksList = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  /**
   * Toggles sticky frosted-glass appearance when user scrolls down.
   */
  function handleNavbarScroll() {
    if (!navbar) return;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  /**
   * Toggles the mobile drawer menu.
   */
  function toggleMobileMenu() {
    if (!mobileToggle || !navLinksList) return;
    const isActive = mobileToggle.classList.toggle('active');
    navLinksList.classList.toggle('active');
    document.body.style.overflow = isActive ? 'hidden' : '';
  }

  /**
   * Closes mobile drawer when a link is clicked.
   */
  function closeMobileMenu() {
    if (!mobileToggle || !navLinksList) return;
    mobileToggle.classList.remove('active');
    navLinksList.classList.remove('active');
    document.body.style.overflow = '';
  }

  /**
   * Smoothly scrolls to target section taking navbar height into account.
   */
  function handleAnchorClick(e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute('href');
    if (targetId === '#' || targetId === '') return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    e.preventDefault();
    closeMobileMenu();

    const navbarHeight = navbar ? navbar.offsetHeight : 70;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight + 10;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  /**
   * Highlights the current active section in the navbar as user scrolls.
   */
  function updateScrollspy() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const navbarHeight = navbar ? navbar.offsetHeight : 70;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - navbarHeight - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  // Event Listeners
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  window.addEventListener('scroll', updateScrollspy, { passive: true });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }

  document.addEventListener('click', handleAnchorClick);

  // Close mobile drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinksList && navLinksList.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // Initial check on load
  handleNavbarScroll();
  updateScrollspy();

})();

