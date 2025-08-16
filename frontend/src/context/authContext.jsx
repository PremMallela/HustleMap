import { createContext, useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    status: "loading", 
    error: null,
  });

  const verifyAuth = async () => {
  try {
    await axios.get("/api/profile", { withCredentials: true });
    setAuth({ status: "authenticated", error: null });
  } catch (error) {
    if (error.response?.status === 401) {
      setAuth({ status: "unauthenticated", error: "Unauthorized" });
    } else {
      setAuth({ status: "unauthenticated", error: error.message || "Unknown error" });
    }
  }
};
  useEffect(()=>{
    verifyAuth();
  },[])

  return (
    <AuthContext.Provider value={{ auth, verifyAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
