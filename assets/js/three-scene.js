/**
 * =============================================================================
 * SHASHANK BAJπ — INTERACTIVE 3D WEBGL SCENE (three-scene.js)
 * =============================================================================
 * 
 * Powered by Three.js (via CDN).
 * Creates a futuristic floating 3D metallic geometric structure:
 * 1. Inner metallic orange Torus Knot core reflecting dynamic lights
 * 2. Outer futuristic wireframe icosahedron cage
 * 3. Surrounding ambient orange particle cloud
 * 4. Mouse-tracking parallax on desktop & smooth touch response on mobile
 * 5. Scroll-linked rotational velocity
 * 6. High-performance fallback if WebGL is unavailable
 * =============================================================================
 */

(function () {
  'use strict';

  // Check if Three.js library loaded from CDN
  if (typeof THREE === 'undefined') {
    console.warn('Three.js library is not loaded. 3D background will remain disabled.');
    return;
  }

  const container = document.getElementById('three-canvas-container');
  if (!container) return;

  // Scene setup variables
  let scene, camera, renderer;
  let mainGroup, innerMesh, wireMesh, particlesMesh;
  let targetRotationX = 0;
  let targetRotationY = 0;
  let mouseX = 0;
  let mouseY = 0;
  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;
  let isPageVisible = true;

  /**
   * Initializes the Three.js viewport, camera, meshes and lighting.
   */
  function init3DScene() {
    // 1. Create Scene
    scene = new THREE.Scene();

    // 2. Setup Perspective Camera
    camera = new THREE.PerspectiveCamera(
      50, // Field of view
      window.innerWidth / window.innerHeight, // Aspect ratio
      0.1, // Near clipping plane
      1000 // Far clipping plane
    );
    camera.position.z = 24;

    // 3. Setup WebGL Renderer with Alpha transparency for dark HTML background
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Clamped to 2 for battery efficiency
    container.appendChild(renderer.domElement);

    // 4. Create Master Group to hold all 3D objects
    mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Position group slightly to the right side on desktop so hero text remains readable
    if (window.innerWidth > 992) {
      mainGroup.position.x = 4.5;
    } else {
      mainGroup.position.x = 0;
    }

    // -------------------------------------------------------------------------
    // A. INNER METALLIC TORUS KNOT (Represents technological computation)
    // -------------------------------------------------------------------------
    const torusGeometry = new THREE.TorusKnotGeometry(4.2, 1.1, 100, 16);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0xFF6A00,         // Primary signature orange
      roughness: 0.25,        // Smooth metallic sheen
      metalness: 0.85,        // Strong metallic reflection
      wireframe: false
    });
    innerMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    mainGroup.add(innerMesh);

    // -------------------------------------------------------------------------
    // B. OUTER WIREFRAME CAGE (Represents algorithms & neural meshes)
    // -------------------------------------------------------------------------
    const cageGeometry = new THREE.IcosahedronGeometry(7.5, 2);
    const cageMaterial = new THREE.MeshBasicMaterial({
      color: 0xFFA040,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    wireMesh = new THREE.Mesh(cageGeometry, cageMaterial);
    mainGroup.add(wireMesh);

    // -------------------------------------------------------------------------
    // C. SURROUNDING ORANGE PARTICLE CLOUD
    // -------------------------------------------------------------------------
    const particleCount = 220;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Disperse particles randomly in a spherical volume
      const radius = 12 + Math.random() * 16;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xFF6A00,
      size: 0.2,
      transparent: true,
      opacity: 0.65
    });
    particlesMesh = new THREE.Points(particleGeometry, particleMaterial);
    mainGroup.add(particlesMesh);

    // -------------------------------------------------------------------------
    // D. SCENE LIGHTING
    // -------------------------------------------------------------------------
    // Ambient soft fill light
    const ambientLight = new THREE.AmbientLight(0x221100, 1.2);
    scene.add(ambientLight);

    // Vibrant Orange Point Light
    const orangePointLight = new THREE.PointLight(0xFF6A00, 3.5, 50);
    orangePointLight.position.set(10, 12, 10);
    scene.add(orangePointLight);

    // Cool secondary rim light for contrast
    const rimLight = new THREE.PointLight(0x00E5FF, 1.2, 40);
    rimLight.position.set(-15, -10, -10);
    scene.add(rimLight);

    // Event Listeners
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('scroll', onDocumentScroll, { passive: true });

    // Touch events for mobile interaction
    document.addEventListener('touchmove', onDocumentTouchMove, { passive: true });

    // Pause rendering when tab is hidden to conserve battery
    document.addEventListener('visibilitychange', () => {
      isPageVisible = !document.hidden;
    });

    // Start 60fps Animation Loop
    animate();
  }

  /**
   * Adjusts canvas aspect ratio when browser window resizes.
   */
  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Reposition 3D object for desktop vs mobile screens
    if (window.innerWidth > 992) {
      mainGroup.position.x = 4.5;
    } else {
      mainGroup.position.x = 0;
    }
  }

  /**
   * Tracks mouse movement on desktop to create subtle parallax depth.
   */
  function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.0006;
    mouseY = (event.clientY - windowHalfY) * 0.0006;
  }

  /**
   * Supports smooth single-touch rotation on mobile phones.
   */
  function onDocumentTouchMove(event) {
    if (event.touches.length > 0) {
      mouseX = (event.touches[0].clientX - windowHalfX) * 0.0008;
      mouseY = (event.touches[0].clientY - windowHalfY) * 0.0008;
    }
  }

  /**
   * Modifies 3D rotation based on how far user has scrolled.
   */
  function onDocumentScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    targetRotationY = scrollY * 0.0015;
  }

  /**
   * Continuous render loop with smooth rotational physics.
   */
  function animate() {
    requestAnimationFrame(animate);

    if (!isPageVisible) return;

    // Continuous baseline spin
    innerMesh.rotation.x += 0.006;
    innerMesh.rotation.y += 0.008;

    wireMesh.rotation.x -= 0.002;
    wireMesh.rotation.y += 0.003;

    particlesMesh.rotation.y += 0.001;

    // Smoothly interpolate rotation to follow mouse cursor & scroll position
    mainGroup.rotation.y += (mouseX + targetRotationY - mainGroup.rotation.y) * 0.05;
    mainGroup.rotation.x += (mouseY - mainGroup.rotation.x) * 0.05;

    renderer.render(scene, camera);
  }

  // Initialize scene once DOM is interactive
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init3DScene);
  } else {
    init3DScene();
  }

})();

