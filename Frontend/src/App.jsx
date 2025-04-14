import { Routes, Route } from "react-router-dom";
import Login from "./Components/pages/Login";
import Signup from "./Components/pages/Signup";
import ProfileRoutes from "./routes/ProfileRoutes";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
            <Route path="/profile/*" element={<ProtectedRoute><ProfileRoutes /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
