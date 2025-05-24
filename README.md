# HustleMap 

**HustleMap** is a MERN-based platform that helps users visualize and narrate their career journeys, especially during gaps, struggles, and personal growth phases.

## Features
- Interactive timeline showing upskilling, projects, wins, and gaps
- GitHub and LeetCode integration (API based)
- Grit Score based on consistency // in-progress
- JWT-based authentication
- Personalized walkthrough experience

## 🌐 Live Demo
https://hustle-map.vercel.app/

## 🛠️ Tech Stack
**Frontend:** React, TailwindCSS, MUI, React Router DOM, Axios  
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt, Cookie-parser

## 📁 Folder Structure Highlights

<details>
<summary><strong>/backend</strong></summary>

```plaintext
backend/
├── models/           # Mongoose models: User, Profile, TimelineEvent
├── handlers/         # Controllers for auth, profile, and timeline logic
├── middleware/       # Authentication and error handling
├── routes/           # Express routes for auth, profile, timeline
├── utils/            # Helpers: DB connection, JWT, bcrypt test
├── server.js         # Entry point for Express server
├── .env              # Environment variables
├── package.json      # Backend dependencies
```
</details>

<details>
<summary><strong>/frontend</strong></summary>

```plaintext
frontend/
├── src/
│   ├── assets/                 # Static images and logos
│   ├── components/
│   │   ├── layouts/            # Page layouts like ProfileLayout
│   │   ├── pages/
│   │   │   ├── profilePages/   # Profile related pages
│   │   │   ├── timelinePages/  # Timeline related pages
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   └── sharedLayouts/      # Common UI like Sidebar
│   ├── routes/                 # React Router setup & protected routes
│   ├── utils/                  # Custom hooks, Axios, PDF gen, themes
│   ├── App.jsx                 # Root component
│   └── main.jsx                # Entry point
├── tailwind.config.js
├── vite.config.js
├── .env
├── package.json               # Frontend dependencies
```
</details>

## Key Concepts Implemented

- 🧩 Drag-and-drop **timeline event reordering** with **auto-save on drop**
- 🔐 JWT Auth using **HttpOnly cookies** for secure session management
- 🌐 Public API integration: GitHub & LeetCode
- 📦 **Custom React hooks** for data fetching, theming, and reusability
- 🧯 React Router DOM v7 with nested and protected routes (centralized) 
- 🧱 Modular folder structure for clean, scalable codebase
- 🎨 UI built with **Tailwind CSS** + **MUI** for consistency and responsiveness !

## 🚀 How to Run Locally
```bash
# Clone and install
git clone https://github.com/PremMallela/hustlemap.git

cd hustlemap
cd frontend
npm install

cd ../backend
npm install
```

```bash
# setup .env at both frontend,backend folders, then run in two seperate terminals: 
cd frontend
npm run dev
```

```bash
cd backend
npm run start
```


