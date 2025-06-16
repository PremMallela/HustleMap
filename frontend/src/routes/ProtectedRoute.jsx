import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../utils/hooks/useAuthContext";
import { LinearProgress } from "@mui/material";
import { Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const {auth} = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
  console.log("auth changed", auth);
}, [auth]);

   useEffect(() => {
    if (auth.status === "unauthenticated") {
      navigate("/login");
    }
  }, [auth.status, navigate]);

  if (auth.status == 'loading') return <LinearProgress sx={{ mt: 4 }} />;
  if(auth.status === 'authenticated') return <Outlet/> ;
  
  return null;
};
