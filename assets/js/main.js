/**
 * =============================================================================
 * SHASHANK BAJπ — MAIN APPLICATION CONTROLLER (main.js)
 * =============================================================================
 * 
 * Coordinates the entire application:
 * 1. Reads data from PORTFOLIO_DATA (in data.js)
 * 2. Dynamically builds and injects HTML for:
 *    - Skills categories and individual items
 *    - Projects showcase cards with tech stack tags
 *    - Learning Journey roadmap milestones
 *    - Education card highlights
 *    - Contact details and social links
 * 3. Implements the interactive "Copy Email to Clipboard" feature
 * =============================================================================
 */

(function () {
  'use strict';

  // Check if centralized data exists
  const DATA = window.PORTFOLIO_DATA;
  if (!DATA) {
    console.error('PORTFOLIO_DATA is not defined. Ensure data.js is loaded prior to main.js');
    return;
  }

  // ---------------------------------------------------------------------------
  // 1. RENDER ABOUT SECTION
  // ---------------------------------------------------------------------------
  function renderAboutSection() {
    const bioContainer = document.getElementById('about-bio-container');
    if (!bioContainer) return;

    bioContainer.innerHTML = '';
    DATA.personal.aboutBio.forEach(paragraph => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      bioContainer.appendChild(p);
    });
  }

  // ---------------------------------------------------------------------------
  // 2. RENDER SKILLS SECTION
  // ---------------------------------------------------------------------------
  function renderSkillsSection() {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;

    grid.innerHTML = '';

    // Map category icons to SVG graphics
    const iconSvgs = {
      code: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
      cpu: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>',
      brain: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z"></path></svg>',
      terminal: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>'
    };

    DATA.skills.categories.forEach(category => {
      const card = document.createElement('div');
      card.className = 'skill-category-card';

      const iconHtml = iconSvgs[category.icon] || iconSvgs.code;

      let itemsHtml = '';
      category.items.forEach(item => {
        itemsHtml += `
          <div class="skill-item">
            <div class="skill-name-row">
              <span class="skill-name">${item.name}</span>
              <span class="skill-level-badge">${item.level}</span>
            </div>
            <p class="skill-desc">${item.description}</p>
          </div>
        `;
      });

      card.innerHTML = `
        <div class="skill-category-header">
          <div class="skill-icon-wrap">${iconHtml}</div>
          <h3 class="skill-category-title">${category.categoryName}</h3>
        </div>
        <div class="skill-items-list">
          ${itemsHtml}
        </div>
      `;

      grid.appendChild(card);
    });
  }

  // ---------------------------------------------------------------------------
  // 3. RENDER PROJECTS SECTION
  // ---------------------------------------------------------------------------
  function renderProjectsSection() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = '';

    DATA.projects.items.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';

      // Tech pills HTML
      const techPillsHtml = project.techStack
        .map(tech => `<span class="tech-pill">${tech}</span>`)
        .join('');

      card.innerHTML = `
        <div class="project-preview">
          <img src="${project.image}" alt="${project.title}" onerror="this.src='data:image/svg+xml,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'220\\' viewBox=\\'0 0 400 220\\'><rect fill=\\'%23171717\\' width=\\'400\\' height=\\'220\\'/><text fill=\\'%23FF6A00\\' x=\\'50%\\' y=\\'50%\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' font-family=\\'monospace\\' font-size=\\'18\\'>${project.title}</text></svg>'">
          <div class="project-status-tag" style="color: ${project.statusColor};">
            <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${project.statusColor};box-shadow:0 0 8px ${project.statusColor}"></span>
            ${project.status}
          </div>
        </div>
        <div class="project-content">
          <span class="project-tagline">${project.tagline}</span>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <div class="project-tech-stack">
            ${techPillsHtml}
          </div>
          <div class="project-links">
            <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="View Source Code on GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              Source Code
            </a>
            ${project.liveUrl && project.liveUrl !== '#' ? `
              <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Open Live Demo">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                Live Preview
              </a>
            ` : ''}
          </div>
        </div>
      `;

      grid.appendChild(card);
    });
  }

  // ---------------------------------------------------------------------------
  // 4. RENDER LEARNING JOURNEY ROADMAP
  // ---------------------------------------------------------------------------
  function renderJourneySection() {
    const timeline = document.getElementById('roadmap-timeline');
    if (!timeline) return;

    timeline.innerHTML = '';

    DATA.journey.milestones.forEach(milestone => {
      const item = document.createElement('div');
      item.className = 'timeline-milestone';

      item.innerHTML = `
        <div class="milestone-dot"></div>
        <div class="milestone-card">
          <div class="milestone-header">
            <span class="milestone-phase">${milestone.phase}</span>
            <span class="milestone-status" style="color: ${milestone.badgeColor}; border: 1px solid ${milestone.badgeColor}40">
              ${milestone.status}
            </span>
          </div>
          <h3 class="milestone-title">${milestone.title}</h3>
          <p class="milestone-description">${milestone.description}</p>
        </div>
      `;

      timeline.appendChild(item);
    });
  }

  // ---------------------------------------------------------------------------
  // 5. RENDER EDUCATION HIGHLIGHTS
  // ---------------------------------------------------------------------------
  function renderEducationSection() {
    const list = document.getElementById('edu-highlights-list');
    if (!list) return;

    list.innerHTML = '';
    DATA.education.highlights.forEach(highlight => {
      const li = document.createElement('li');
      li.textContent = highlight;
      list.appendChild(li);
    });
  }

  // ---------------------------------------------------------------------------
  // 6. COPY EMAIL FUNCTIONALITY
  // ---------------------------------------------------------------------------
  function setupEmailCopy() {
    const copyBox = document.getElementById('email-copy-box');
    const copyText = document.getElementById('copy-status-text');
    if (!copyBox) return;

    copyBox.addEventListener('click', () => {
      const email = DATA.contact.email;

      navigator.clipboard.writeText(email)
        .then(() => {
          if (copyText) {
            const originalText = copyText.textContent;
            copyText.textContent = "COPIED TO CLIPBOARD! ✓";
            copyText.style.color = "#4caf50";

            setTimeout(() => {
              copyText.textContent = originalText;
              copyText.style.color = "";
            }, 2500);
          }
        })
        .catch(err => {
          console.warn("Could not copy email automatically:", err);
          window.location.href = `mailto:${email}`;
        });
    });
  }

  // ---------------------------------------------------------------------------
  // INITIALIZATION
  // ---------------------------------------------------------------------------
  function initApp() {
    renderAboutSection();
    renderSkillsSection();
    renderProjectsSection();
    renderJourneySection();
    renderEducationSection();
    setupEmailCopy();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();

