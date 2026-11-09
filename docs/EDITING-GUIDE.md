# 📘 SHASHANK BAJπ — BEGINNER-FRIENDLY EDITING GUIDE

Welcome to your personal portfolio codebase! This guide was written specifically for you so that you can easily edit, customize, and expand your website as you progress through your B.Tech journey.

---

## ⚡ Quick Reference Table: Where to Edit What

| What I Want to Edit | File Location | What to Look For |
|---|---|---|
| **Name & Tagline** | `assets/js/data.js` | `personal.firstName`, `personal.tagline` |
| **About Bio Paragraphs** | `assets/js/data.js` | `personal.aboutBio` array |
| **Skills & Proficiency Levels** | `assets/js/data.js` | `skills.categories` array |
| **Projects & GitHub Links** | `assets/js/data.js` | `projects.items` array |
| **Learning Journey Milestones** | `assets/js/data.js` | `journey.milestones` array |
| **College & Education Details** | `assets/js/data.js` | `education` object |
| **Email & Social Links** | `assets/js/data.js` | `contact.email`, `contact.githubUrl` |
| **Orange Color & Dark Theme** | `assets/css/style.css` | `:root` CSS variables at the top |
| **3D Object Speed & Color** | `assets/js/three-scene.js` | `torusMaterial`, `animate()` function |
| **Loading Screen Speed** | `assets/js/loader.js` | `updateProgressLoop()` function |
| **Navbar & Mobile Menu** | `assets/js/navigation.js` | `handleNavbarScroll()`, `toggleMobileMenu()` |
| **Profile Photo Replacement** | `assets/images/` | Put your image here as `profile-placeholder.png` |

---

## 1. How to Open the Project in VS Code

1. Open **VS Code**.
2. Go to **File → Open Folder...** (or press `Ctrl + K, Ctrl + O`).
3. Navigate to:
   ```
   D:\data\WEB DEV\SHASHANK-PORTFOLIO
   ```
4. Click **Select Folder**.

---

## 2. How to Launch the Website (VS Code Live Server)

You do **NOT** need Node.js, npm, or terminal build commands!

1. In VS Code, click the **Extensions** icon on the left sidebar (or press `Ctrl + Shift + X`).
2. Search for **Live Server** (by Ritwick Dey) and click **Install**.
3. Once installed, open `index.html`.
4. Right-click anywhere inside `index.html` and click **"Open with Live Server"** (or click the **"Go Live"** button at the bottom right of the VS Code window).
5. Your browser will automatically open:
   ```
   http://127.0.0.1:5500/index.html
   ```
6. Every time you save any file (`Ctrl + S`), the browser will automatically refresh!

---

## 3. How to Edit Your Personal Information

Open `assets/js/data.js`. At the top, you will see the `personal` object:

```javascript
personal: {
  firstName: "SHASHANK",
  lastNamePrefix: "BAJ",
  brandSymbol: "π",
  fullNameDisplay: "SHASHANK BAJPAI",
  title: "FIRST YEAR B.TECH CSE | ARTIFICIAL INTELLIGENCE & MACHINE LEARNING",
  location: "Lucknow, India",
  tagline: "Exploring technology, building ideas and turning curiosity into projects.",
  ...
}
```

Simply change the text inside the quotes `""` and save the file.

---

## 4. How to Replace Your Profile Photo

1. Take your professional headshot or photo.
2. Rename your photo file to `profile-placeholder.png`.
3. Copy it into the folder:
   ```
   D:\data\WEB DEV\SHASHANK-PORTFOLIO\assets\images\
   ```
4. If your image has a different file extension (e.g. `.jpg`), update the filename in `assets/js/data.js`:
   ```javascript
   profileImage: "assets/images/my-photo.jpg"
   ```

*Recommended dimensions: 600 × 600 pixels (Square 1:1 aspect ratio).*

---

## 5. How to Add a New Skill

Open `assets/js/data.js` and scroll to `skills.categories`.

Each category has an `items` array. To add a new skill (for example, *Data Structures*), simply add a new block separated by a comma:

```javascript
{
  categoryName: "Programming Fundamentals",
  icon: "cpu",
  items: [
    { name: "Input / Output & Conditionals", level: "Familiar", description: "..." },
    
    // 👇 ADD YOUR NEW SKILL HERE:
    { name: "Data Structures", level: "Beginner", description: "Learning arrays, stacks, and queues" }
  ]
}
```

Save the file and check your browser — the new skill card will appear automatically!

---

## 6. How to Add a New Project

Open `assets/js/data.js` and locate `projects.items`.

Copy this template, fill in your details, and paste it inside the `items: [ ... ]` list:

```javascript
{
  id: "project-4",
  title: "My Awesome New Project",
  tagline: "Python Machine Learning Experiment",
  description: "A short description of what this project does and what problem it solves.",
  techStack: ["Python", "NumPy", "Pandas"],
  status: "In Progress",
  statusColor: "#FF6A00", // Orange
  image: "assets/images/project-1.png", // Or add your own screenshot to assets/images/
  githubUrl: "https://github.com/your-username/your-repo",
  liveUrl: "#", // Add your live demo link if available
  featured: true
},
```

---

## 7. How to Add a New Milestone to Your Learning Journey

Open `assets/js/data.js` and locate `journey.milestones`.

Add a new item to the array:

```javascript
{
  phase: "Phase 07",
  title: "Cloud Deployment & Docker",
  status: "Upcoming",
  badgeColor: "#888888",
  description: "Containerizing applications with Docker and deploying to AWS / cloud servers."
}
```

---

## 8. How to Change the Orange Accent Color

If you ever want to switch from **Orange** to **Neon Cyan**, **Emerald Green**, or **Electric Purple**:

Open `assets/css/style.css` and look at lines 15–23 inside `:root`:

```css
/* Change this: */
--accent-orange: #FF6A00;
--accent-orange-light: #FF8C38;
--accent-orange-glow: rgba(255, 106, 0, 0.35);

/* Example: Change to Neon Cyan */
--accent-orange: #00E5FF;
--accent-orange-light: #6EFFFF;
--accent-orange-glow: rgba(0, 229, 255, 0.35);
```

Save the file and your entire website's accent color will update instantly!

---

## 9. How to Update Your Email and Social Links

Open `assets/js/data.js` and scroll down to the `contact` section:

```javascript
contact: {
  email: "your.real.email@gmail.com",
  githubUrl: "https://github.com/your-actual-github-username",
  linkedinUrl: "https://linkedin.com/in/your-actual-linkedin-username",
  ...
}
```

---

## 10. Troubleshooting Common Issues

### Issue 1: "The 3D background object isn't showing up"
- Make sure you are connected to the internet the first time you test, as Three.js is loaded from a CDN (`cdnjs.cloudflare.com`).
- Check your browser console (`F12 → Console`) for any blocked script warnings.

### Issue 2: "The website didn't refresh when I saved my changes"
- Ensure Live Server is currently running (check the bottom right bar of VS Code for *"Port: 5500"*).
- If needed, manually refresh your browser by pressing `Ctrl + F5`.

### Issue 3: "A comma or syntax error broke the page"
- If cards disappear, you might have missed a comma `,` or closing quote `"` inside `assets/js/data.js`.
- Open your browser's developer console (`F12`) to see the exact line number where the typo happened!

---

*Happy Coding! You now have a unique, mathematical, cinematic portfolio to showcase your journey through B.Tech CSE (AI & ML).*

