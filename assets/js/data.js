/**
 * =============================================================================
 * SHASHANK BAJπ — PERSONAL PORTFOLIO DATA SYSTEM
 * =============================================================================
 * 
 * WELCOME! This file is your single source of truth for all content on your website.
 * Whenever you want to update your skills, projects, contact details, or bio,
 * you ONLY need to edit this file!
 * 
 * HOW TO EDIT:
 * - Text inside quotes (e.g. "Hello") can be replaced with whatever you want.
 * - To add a new skill or project, copy an existing block { ... } and paste it below,
 *   remembering to separate them with a comma (,).
 * - Keep your quotes closed properly so JavaScript doesn't get confused!
 * =============================================================================
 */

const PORTFOLIO_DATA = {
  // ---------------------------------------------------------------------------
  // 1. PERSONAL INFORMATION & BRANDING
  // ---------------------------------------------------------------------------
  personal: {
    firstName: "SHASHANK",
    lastNamePrefix: "BAJ",
    brandSymbol: "π",               // The Greek mathematical symbol pi
    fullNameDisplay: "SHASHANK BAJPAI",
    title: "FIRST YEAR B.TECH CSE | ARTIFICIAL INTELLIGENCE & MACHINE LEARNING",
    location: "Lucknow, India",
    tagline: "Exploring technology, building ideas and turning curiosity into projects.",
    aboutHeadline: "BEYOND THE CODE.",
    aboutBio: [
      "I'm Shashank Bajpai, a first-year B.Tech CSE student specializing in Artificial Intelligence and Machine Learning.",
      "I'm currently building my foundation in programming, exploring web development and learning how artificial intelligence can solve real-world problems.",
      "I believe in learning by building, experimenting and improving consistently."
    ],
    // Profile image path (replace with your photo in assets/images/)
    profileImage: "assets/images/profile-placeholder.png"
  },

  // ---------------------------------------------------------------------------
  // 2. EDUCATION
  // ---------------------------------------------------------------------------
  education: {
    degree: "B.Tech in Computer Science & Engineering",
    specialization: "Artificial Intelligence & Machine Learning",
    currentYear: "First Year (2025 - Present)",
    college: "RR Institute of Engineering & Technology / Dr. A.P.J. Abdul Kalam Techinal University", 
    location: "Lucknow, Uttar Pradesh, India",
    graduationYear: "Expected 2029",
    highlights: [
      "Core Computer Science Foundation",
      "Focus on Algorithmic Problem Solving",
      "Active Member of Technical & AI Exploration Clubs"
    ]
  },

  // ---------------------------------------------------------------------------
  // 3. SKILLS SECTION
  // Honest representation of first-year exploration.
  // Levels: "Beginner", "Learning", "Familiar", "Exploring"
  // ---------------------------------------------------------------------------
  skills: {
    sectionHeading: "TOOLS I'M EXPLORING.",
    sectionSubtitle: "Building strong fundamentals step by step. No fake percentages — just genuine curiosity and consistent practice.",
    
    categories: [
      {
        categoryName: "Programming Languages",
        icon: "code",
        items: [
          { name: "C Language", level: "Compeleted", description: "Memory layout, pointers, structures & core syntax" },
          { name: "Python", level: "Beginner", description: "Scripting, syntax, basic automation & math logic" },
          { name: "Java", level: "Beginner", description: "Basic syntax, compiling, and introductory OOP concepts" }
        ]
      },
      {
        categoryName: "Programming Fundamentals",
        icon: "cpu",
        items: [
          { name: "Input / Output & Conditionals", level: "Familiar", description: "User input handling, decision trees, branching" },
          { name: "Loops & Iterations", level: "Familiar", description: "for, while, nested looping patterns & iteration" },
          { name: "Functions & Scope", level: "Familiar", description: "Modular code, function calling, parameter passing" },
          { name: "Basic Problem Solving", level: "Practicing", description: "Mathematical problems, pattern printing, logic puzzles" },
          { name: "Basic Bit Manipulation", level: "Learning", description: "Binary operations, bitwise AND/OR/XOR and shifts" }
        ]
      },
      {
        categoryName: "AI & Machine Learning Concepts",
        icon: "brain",
        items: [
          { name: "Intro to Generative AI", level: "Exploring", description: "LLMs, prompt engineering fundamentals, diffusion models" },
          { name: "Supervised Learning", level: "Learning", description: "Classification & regression concepts with labeled datasets" },
          { name: "Unsupervised Learning", level: "Learning", description: "Clustering, pattern discovery in unlabeled data" },
          { name: "Generative vs Discriminative", level: "Conceptual", description: "Modeling joint vs conditional probability distributions" }
        ]
      },
      {
        categoryName: "Web & Developer Tools",
        icon: "terminal",
        items: [
          { name: "HTML5 & CSS3", level: "Exploring", description: "Semantic markup, modern flexbox, grid & dark theme UI" },
          { name: "Vanilla JavaScript", level: "Exploring", description: "DOM manipulation, events, asynchronous handling" },
          { name: "Git & GitHub", level: "Learning", description: "Version control, repositories, commits, branch basics" },
          { name: "VS Code", level: "Familiar", description: "Extensions, debugging, live server environment" }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 4. PROJECTS SECTION
  // Add your projects here as you build them!
  // ---------------------------------------------------------------------------
  projects: {
    sectionHeading: "THINGS I'VE BUILT.",
    sectionSubtitle: "Small steps towards building meaningful software. Each project is an opportunity to learn.",
    items: [
      {
        id: "project-1",
        title: "Algorithmic Pattern & Logic Solver",
        tagline: "C & Python Problem Solving Suite",
        description: "A collection of fundamental algorithmic programs in C and Python focusing on number theory, matrix manipulations, and pattern generators.",
        techStack: ["C", "Python", "CLI", "Algorithms"],
        status: "Completed",
        statusColor: "#4caf50", // Green
        image: "assets/images/project-1.png",
        githubUrl: "https://github.com/shashankbajpai200709-boop", // Replace with your real repo link
        liveUrl: "#", // Leave as "#" if no live link exists yet
        featured: true
      },
      {
        id: "project-2",
        title: "AI Concept Visualizer & Note Space",
        tagline: "Interactive Machine Learning Study Guide",
        description: "An organized web-based visual study notebook breaking down Supervised vs Unsupervised learning models and Generative AI principles with clean interactive diagrams.",
        techStack: ["HTML5", "CSS3", "JavaScript"],
        status: "In Progress",
        statusColor: "#FF6A00", // Orange
        image: "assets/images/project-2.png",
        githubUrl: "https://github.com/shashankbajpai200709-boop",
        liveUrl: "#",
        featured: true
      },
      {
        id: "project-3",
        title: "Personal Portfolio & 3D Brand Experience",
        tagline: "The Website You Are Browsing Right Now",
        description: "A dark cinematic portfolio with custom mathematical π branding, Three.js 3D interactive graphics, and scroll-driven GSAP animations built without heavy frameworks.",
        techStack: ["Vanilla JS", "Three.js", "GSAP", "CSS3"],
        status: "Live & Evolving",
        statusColor: "#00E5FF", // Cyan
        image: "assets/images/project-1.png",
        githubUrl: "https://github.com/shashankbajpai200709-boop/Porfolioi",
        liveUrl: "https://porfolio-shashankbajpai.vercel.app/",
        featured: true
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 5. LEARNING JOURNEY ROADMAP
  // Honest representation of current milestones and what's next.
  // ---------------------------------------------------------------------------
  journey: {
    sectionHeading: "CURRENTLY IN PROGRESS.",
    sectionSubtitle: "My learning roadmap as a first-year undergraduate. Moving deliberately from ground fundamentals to advanced intelligence.",
    milestones: [
      {
        phase: "Phase 01",
        title: "Programming Fundamentals & C",
        status: "Completed",
        badgeColor: "#4caf50",
        description: "Mastering logic, control flow, functions, arrays, memory management basics and command-line programming in C."
      },
      {
        phase: "Phase 02",
        title: "Object-Oriented Programming with Java",
        status: "Currently Learning",
        badgeColor: "#FF6A00",
        description: "Understanding Classes, Objects, Inheritance, Polymorphism, Abstraction, Encapsulation, and building small console applications."
      },
      {
        phase: "Phase 03",
        title: "Data Structures & Algorithms (DSA)",
        status: "Upcoming",
        badgeColor: "#888888",
        description: "Deep dive into Linked Lists, Stacks, Queues, Trees, Graphs, Sorting algorithms, and Big-O time/space complexity analysis."
      },
      {
        phase: "Phase 04",
        title: "Modern Web Development",
        status: "Currently Learning",
        badgeColor: "#FF6A00",
        description: "Crafting responsive interfaces, asynchronous JavaScript, modern CSS animations, and connecting frontend clients to RESTful APIs."
      },
      {
        phase: "Phase 05",
        title: "Mathematics for Machine Learning",
        status: "Upcoming",
        badgeColor: "#888888",
        description: "Linear Algebra (vectors, matrices, eigenvalues), Multivariate Calculus (gradients, backpropagation math), and Probability Theory."
      },
      {
        phase: "Phase 06",
        title: "Machine Learning & Neural Architectures",
        status: "Upcoming",
        badgeColor: "#888888",
        description: "Implementing algorithms from scratch, exploring Scikit-Learn, PyTorch, Deep Neural Networks, and Transformer architectures."
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 6. CONTACT & SOCIAL CHANNELS
  // ---------------------------------------------------------------------------
  contact: {
    sectionHeading: "LET'S BUILD SOMETHING.",
    sectionSubtitle: "Have a question, an opportunity, or just want to discuss technology and AI? My inbox is always open.",
    email: "shashankbajpai.work@gmail.com", // Replace with your email!
    githubUsername: "shashank-bajpai",     // Replace with your GitHub!
    githubUrl: "https://github.com/",
    linkedinUsername: "Shashank Bajpai",
    linkedinUrl: "https://linkedin.com/in/",
    locationText: "Lucknow, Uttar Pradesh, India",
    availabilityText: "Open to student internships, open-source collaborations & tech discussions.",
    footerNote: "Designed & Engineered with Vanilla Web Technologies. Mathematical π brand identity."
  }
};

// Make data available globally in the browser window
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}

