import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance"; 

export const ProtectedRoute = ({ children, authUrl }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`/api${authUrl}`, {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/");
        }
        setIsAuthenticated(false);
       }
    };
    checkAuth();
  }, []);

  return isAuthenticated ? children : null;
};
