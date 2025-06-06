import { Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import ProfileRoutes from "./routes/ProfileRoute";
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

      <Route element ={<ProtectedRoute/>}>
          <Route path="/profile/*" element={<ProfileRoutes />} />
          <Route path="/hustleTimeline/editor" element={<TimelineEditor/>} />
          <Route path="/hustleTimeline/display" element={<TimelineDisplay/>} />
      </Route>

      <Route path="*" element={<LandingPage />} />
     
    </Routes>
  );
}

export default App;
