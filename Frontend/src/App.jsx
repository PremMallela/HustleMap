import { Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import ProfileRoutes from "./Components/routes/ProfileRoutes";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile/*" element={<ProfileRoutes />} />
    </Routes>
  );
}

export default App;
