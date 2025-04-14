import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

export const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:5000/api/profile", {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/login");
        }
        setIsAuthenticated(false);
       }
    };
    checkAuth();
  }, []);

  return isAuthenticated ? children : null;
};
