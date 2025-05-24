import { Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import ProfileRoutes from "./routes/ProfileRoutes";
import TimelineEditor from "./components/pages/timelinePages/TimelineEditor";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import TimelineDisplay from "./components/pages/timelinePages/TimelineDisplay";
import LandingPage from "./components/pages/LandingPage";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />      
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile/*" element={<ProtectedRoute authUrl= "/profile"><ProfileRoutes /></ProtectedRoute>} />
      <Route path="/hustleTimeline/editor" element={<ProtectedRoute authUrl = "/timeline"><TimelineEditor/></ProtectedRoute>} />
      <Route path="/hustleTimeline/display" element={<ProtectedRoute authUrl = "/timeline"><TimelineDisplay/></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
