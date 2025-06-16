import { createContext, useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    status: "loading", 
    error: null,
  });

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await axios.get("/api/profile");
        setAuth({ status: "authenticated", error: null });
      } catch (error) {
        console.log(error)
        if (error.response?.status === 401) {
          setAuth({ status: "unauthenticated", error: null });
        } else {
          setAuth({ status: "unauthenticated", error: error.message });
        }
      }
    };

    verifyAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
