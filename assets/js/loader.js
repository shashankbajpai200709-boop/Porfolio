/**
 * =============================================================================
 * SHASHANK BAJπ — CINEMATIC LOADING SCREEN CONTROLLER (loader.js)
 * =============================================================================
 * 
 * Manages the black loading overlay:
 * 1. Animates progress smoothly from 1% to 100%
 * 2. Synchronizes with window load & Three.js initialization
 * 3. Fallback safety timer so the screen NEVER gets stuck
 * 4. Triggers hero entrance animations once complete
 * =============================================================================
 */

(function () {
  'use strict';

  // DOM Elements
  const loaderScreen = document.getElementById('loader-screen');
  const counterElement = document.getElementById('loader-counter');
  const progressBar = document.getElementById('loader-progress-bar');
  const statusElement = document.getElementById('loader-status');

  // Tracking state
  let currentProgress = 0;
  let targetProgress = 0;
  let isWindowLoaded = false;
  let animationFrameId = null;

  // Status message sequence for cinematic feel
  const statusSteps = [
    { at: 15, text: "INITIALIZING ENVIRONMENT..." },
    { at: 40, text: "LOADING 3D WIREFRAME MESH..." },
    { at: 70, text: "CALIBRATING MATHEMATICAL π IDENTITY..." },
    { at: 90, text: "PREPARING CINEMATIC VIEWPORT..." },
    { at: 100, text: "SYSTEM READY." }
  ];

  /**
   * Updates the progress bar and counter UI on screen.
   */
  function renderProgress(value) {
    const rounded = Math.floor(value);
    if (counterElement) {
      counterElement.textContent = rounded;
    }
    if (progressBar) {
      progressBar.style.width = `${rounded}%`;
    }

    // Update status text based on milestones
    if (statusElement) {
      for (let i = statusSteps.length - 1; i >= 0; i--) {
        if (rounded >= statusSteps[i].at) {
          statusElement.textContent = statusSteps[i].text;
          break;
        }
      }
    }
  }

  /**
   * Main animation loop using requestAnimationFrame for 60fps smooth easing.
   */
  function updateProgressLoop() {
    // Smoothly interpolate current towards target
    const speed = isWindowLoaded ? 0.12 : 0.05;
    currentProgress += (targetProgress - currentProgress) * speed;

    if (currentProgress < targetProgress - 0.5) {
      renderProgress(currentProgress);
      animationFrameId = requestAnimationFrame(updateProgressLoop);
    } else {
      currentProgress = targetProgress;
      renderProgress(currentProgress);

      if (currentProgress >= 100) {
        completeLoading();
      } else {
        animationFrameId = requestAnimationFrame(updateProgressLoop);
      }
    }
  }

  /**
   * Hides the loader screen with a cinematic slide-up and emits 'site-ready' event.
   */
  function completeLoading() {
    cancelAnimationFrame(animationFrameId);

    // Brief pause at 100% so visitor perceives completion
    setTimeout(() => {
      if (loaderScreen) {
        loaderScreen.classList.add('loaded');
      }

      // Dispatch global custom event so hero animations and Three.js can begin
      window.dispatchEvent(new CustomEvent('site-ready'));

      // Clean up loader from DOM after transition completes
      setTimeout(() => {
        if (loaderScreen && loaderScreen.parentNode) {
          loaderScreen.style.display = 'none';
        }
      }, 1000);
    }, 300);
  }

  // Initial gradual increment while assets fetch
  targetProgress = 30;
  animationFrameId = requestAnimationFrame(updateProgressLoop);

  setTimeout(() => {
    if (targetProgress < 65) targetProgress = 65;
  }, 400);

  setTimeout(() => {
    if (targetProgress < 85) targetProgress = 85;
  }, 900);

  // When all fonts, stylesheets and scripts finish loading
  window.addEventListener('load', () => {
    isWindowLoaded = true;
    targetProgress = 100;
  });

  // Safety fallback: Never let user wait more than 3.5 seconds even on slow networks
  setTimeout(() => {
    if (targetProgress < 100) {
      isWindowLoaded = true;
      targetProgress = 100;
    }
  }, 3500);

})();

