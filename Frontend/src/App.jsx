import { Routes, Route } from "react-router-dom";
import Login from "./Components/pages/Login";
import Signup from "./Components/pages/Signup";
import ProfileRoutes from "./routes/ProfileRoutes";
import TimelineEditor from "./Components/pages/timelinePages/TimelineEditor";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import TimelineDisplay from "./Components/pages/timelinePages/TimelineDisplay";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile/*" element={<ProtectedRoute authUrl= "/profile"><ProfileRoutes /></ProtectedRoute>} />
      <Route path="/hustleTimeline/editor" element={<ProtectedRoute authUrl = "/timeline"><TimelineEditor/></ProtectedRoute>} />
      <Route path="/hustleTimeline/display" element={<ProtectedRoute authUrl = "/timeline"><TimelineDisplay/></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
