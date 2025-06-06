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
**Frontend:** React, TailwindCSS, MUI, React Router DOM, Axios, Context-API  
**Backend:** Node.js, Express, MongoDB, Mongoose ODM, JWT, Bcrypt, Cookie-parser

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
│   ├── routes/                 # React Router setup & centralized protected routes
│   ├── utils/                  
│   │   ├── hooks/              # Custom hooks (useAuthContext, useFetch, etc.)
│   │   ├── axiosInstance.js    # Preconfigured Axios client
│   │   ├── generateTimeline.js # PDF generation for Hustle report
│   │   └── theme.js            # MUI theme configuration
│   ├── App.jsx                 # Root component
│   └── main.jsx                # Entry point
├── tailwind.config.js
├── vite.config.js
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
- 🔐 Centralized route protection using React Context (AuthContext + `ProtectedRoute`)


## 🔐 Environment Variable Setup

Before running the application, create `.env` files for both backend and frontend as follows.

### 🔧 Backend (`/backend/.env`)

Create a file named `.env` in the `backend` folder with these entries:

```env
MONGO_URI=<your-mongodb-connection-string>
SECRET_KEY=<your-jwt-secret>
FRONTEND_URL=http://localhost:5173
GITHUB_TOKEN=<your-github-personal-access-token>
```
### 💻 Frontend (`/frontend/.env`)

Create a file named `.env` in the `frontend` folder with the following content:

```env
VITE_BACKEND_URL=http://localhost:5000
```


## 🚀 How to Run Locally
```bash
# Clone and install
git clone https://github.com/PremMallela/hustlemap.git
cd hustlemap/frontend
npm i

npm run dev
```
```bash
# Run Backend in a seperate terminal
cd hustlemap/backend
npm i

npm run start
```
