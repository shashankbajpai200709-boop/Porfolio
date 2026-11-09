/**
 * =============================================================================
 * SHASHANK BAJπ — ANIMATION & SCROLL CONTROLLER (animations.js)
 * =============================================================================
 * 
 * Powered by GSAP & ScrollTrigger (via CDN) with full Vanilla JS fallbacks.
 * Responsible for:
 * 1. Hero text character stagger reveal on page load
 * 2. Scroll-driven π logo transformation from the Hero into the Navbar
 * 3. IntersectionObserver based reveal animations for cards & sections
 * 4. 3D tilt effects on project cards
 * 5. Interactive custom magnetic cursor on desktop devices
 * =============================================================================
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. CUSTOM CURSOR PHYSICS (DESKTOP)
  // ---------------------------------------------------------------------------
  function setupCustomCursor() {
    // Only initialize on devices that support a fine pointer (mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const follower = document.createElement('div');
    follower.className = 'custom-cursor-follower';
    document.body.appendChild(follower);

    let mouseX = -100;
    let mouseY = -100;
    let followerX = -100;
    let followerY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    });

    // Smooth follower easing
    function renderCursorFollower() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;
      requestAnimationFrame(renderCursorFollower);
    }
    requestAnimationFrame(renderCursorFollower);

    // Expand cursor when hovering interactive elements
    const hoverTargets = 'a, button, .project-card, .skill-category-card, .email-copy-box, .nav-brand';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverTargets)) {
        document.body.classList.add('cursor-hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverTargets)) {
        document.body.classList.remove('cursor-hover');
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 2. HERO CHARACTER ENTRANCE ANIMATION
  // ---------------------------------------------------------------------------
  function triggerHeroEntrance() {
    const heroTitleRow1 = document.querySelector('.hero-name-row.line-1');
    const heroTitleRow2 = document.querySelector('.hero-name-row.line-2');
    const heroPi = document.getElementById('hero-pi');

    if (!heroTitleRow1 || !heroTitleRow2) return;

    // Guarantee that hero π starts completely visible
    if (heroPi) {
      heroPi.style.visibility = 'visible';
      heroPi.style.opacity = '1';
    }

    // Use GSAP if available, otherwise apply direct CSS transition
    if (typeof gsap !== 'undefined') {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from('.hero-meta-top', {
        y: -20,
        opacity: 0,
        duration: 0.8,
        delay: 0.1
      })
      .from('.hero-name-row.line-1', {
        y: 60,
        opacity: 0,
        duration: 1.1,
        skewY: 3
      }, '-=0.5')
      .from('.hero-name-row.line-2', {
        y: 60,
        opacity: 0,
        duration: 1.1,
        skewY: 3,
        onComplete: () => {
          if (typeof window.recalcPiCoords === 'function') {
            window.recalcPiCoords();
          }
        }
      }, '-=0.8')
      .from('#hero-pi', {
        opacity: 0,
        duration: 0.8
      }, '-=0.8')
      .from('.hero-title-role', {
        y: 20,
        opacity: 0,
        duration: 0.8
      }, '-=0.6')
      .from('.hero-tagline', {
        y: 20,
        opacity: 0,
        duration: 0.8
      }, '-=0.6')
      .from('.hero-actions', {
        y: 20,
        opacity: 0,
        duration: 0.8
      }, '-=0.6');
    } else {
      // Fallback: direct opacity reveal
      document.querySelectorAll('.hero-name-row, .hero-meta-top, .hero-tagline, .hero-actions').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      if (heroPi) {
        heroPi.style.opacity = '1';
        heroPi.style.visibility = 'visible';
      }
    }
  }

  // ---------------------------------------------------------------------------
  // 3. SCROLL-DRIVEN π LOGO TRANSFORMATION
  // Moves #hero-pi smoothly from hero position next to "BAJ" to the top-left
  // navbar logo box on scroll, scaling down from hero size to logo size.
  // When progress reaches 100%, #hero-pi locks into the navbar logo box.
  // Reverses seamlessly when scrolling back up.
  // ---------------------------------------------------------------------------
  function setupPiScrollTransformation() {
    const heroPi = document.getElementById('hero-pi');
    const piSlot = document.getElementById('pi-slot');
    const navLogoBox = document.getElementById('nav-pi-logo');
    const navPiIcon = document.getElementById('nav-pi-icon');

    if (!heroPi || !piSlot || !navLogoBox) return;

    // Mathematical helper functions
    const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
    const smoothstep = (t) => t * t * (3 - 2 * t);
    const lerp = (a, b, t) => a + (b - a) * t;

    // Cached coordinates and dimensions
    let startDocX = 0;
    let startDocY = 0;
    let startWidth = 0;
    let startHeight = 0;

    let endX = 0;
    let endY = 0;
    let endWidth = 24;
    let endHeight = 24;

    let ticking = false;

    // Requirement 4: Measure positions with getBoundingClientRect()
    // start = pi-slot rect + scroll offsets (document coordinates)
    // end = navbar logo box rect (viewport coordinates)
    function measure() {
      const scrollX = window.pageXOffset || document.documentElement.scrollLeft || 0;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;

      // Document coordinates for start position
      const slotRect = piSlot.getBoundingClientRect();
      startDocX = slotRect.left + scrollX;
      startDocY = slotRect.top + scrollY;
      startWidth = slotRect.width;
      startHeight = slotRect.height;

      // Viewport coordinates for target navbar logo
      const navBoxRect = navLogoBox.getBoundingClientRect();
      endWidth = 24;
      endHeight = (startWidth > 0 && startHeight > 0) ? (startHeight * (endWidth / startWidth)) : 24;

      endX = navBoxRect.left + (navBoxRect.width - endWidth) / 2;
      endY = navBoxRect.top + (navBoxRect.height - endHeight) / 2;

      // Apply measured dimensions to heroPi
      if (startWidth > 0 && startHeight > 0) {
        heroPi.style.width = `${startWidth}px`;
        heroPi.style.height = `${startHeight}px`;
      }

      update();
    }

    // Requirements 5 & 6:
    // progress = clamp(scrollY / (innerHeight * 0.6), 0, 1), eased with smoothstep.
    // y = lerp(startDocY - scrollY, endY, progress)
    // x = lerp(startDocX - scrollX, endX, progress)
    // scale = lerp(1, endWidth / startWidth, progress)
    // The "- scrollY" ensures the pi first moves up WITH the page from its place in the name.
    function update() {
      const scrollX = window.pageXOffset || document.documentElement.scrollLeft || 0;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;

      const maxScroll = Math.max(1, window.innerHeight * 0.6);
      const rawProgress = scrollY / maxScroll;
      const progress = clamp(rawProgress, 0, 1);

      if (progress >= 1) {
        // Requirement 6: Docked at 100% progress
        heroPi.style.visibility = 'hidden';
        if (navPiIcon) navPiIcon.style.opacity = '1';
      } else {
        // In flight or at rest in hero
        heroPi.style.visibility = 'visible';
        if (navPiIcon) navPiIcon.style.opacity = '0';

        const p = smoothstep(progress);

        // Calculate positions interpolated by scroll progress
        const x = lerp(startDocX - scrollX, endX, p);
        const y = lerp(startDocY - scrollY, endY, p);
        const scale = lerp(1, endWidth / (startWidth || 1), p);

        heroPi.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      }

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    // Requirement 7: Re-measure on window.load, document.fonts.ready and resize
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure);
    }

    // Measure after DOM and font rendering settles
    setTimeout(measure, 50);
    setTimeout(measure, 300);
    setTimeout(measure, 800);

    window.recalcPiCoords = measure;
  }

  // ---------------------------------------------------------------------------
  // 4. INTERSECTION OBSERVER FOR SCROLL REVEALS
  // Animates cards, skills, timeline milestones as they enter the screen.
  // ---------------------------------------------------------------------------
  function setupScrollReveals() {
    const revealElements = document.querySelectorAll(
      '.skill-category-card, .project-card, .timeline-milestone, .education-card, .contact-card'
    );

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger reveal slightly
          setTimeout(() => {
            entry.target.classList.add('is-revealed');
          }, index * 40);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => {
      el.classList.add('reveal-fade-up');
      revealObserver.observe(el);
    });
  }

  // ---------------------------------------------------------------------------
  // 5. 3D CARD TILT ON HOVER (DESKTOP)
  // Subtle physical tilt reaction when hovering project cards.
  // ---------------------------------------------------------------------------
  function setup3DCardTilt() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6; // Max 6 deg
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  // ---------------------------------------------------------------------------
  // INITIALIZATION LISTENER
  // Waits for loading screen 'site-ready' event
  // ---------------------------------------------------------------------------
  window.addEventListener('site-ready', () => {
    triggerHeroEntrance();
    setupPiScrollTransformation();
    setupScrollReveals();
    setup3DCardTilt();
  });

  // Setup cursor immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCustomCursor);
  } else {
    setupCustomCursor();
  }

})();

