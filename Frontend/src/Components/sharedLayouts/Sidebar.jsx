import { Link, useLocation ,useNavigate } from "react-router-dom";
import { useState } from "react";
import { Avatar, Drawer, List, ListItemButton, ListItemIcon, ListItemText,Button, CircularProgress } from "@mui/material";
import { Person, Code, GitHub, BarChart } from "@mui/icons-material";
import axios from "axios";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const menuItems = [
    { text: "Profile", path: "/profile", icon: <Person /> },
    { text: "LeetCode Data", path: "/profile/leetcode", icon: <Code /> },
    { text: "GitHub Data", path: "/profile/github", icon: <GitHub /> },
    { text: "Grit Evaluation", path: "/profile/grit", icon: <BarChart /> }
  ];

  const handleLogout = async () => {
    try {
       await axios.get("http://localhost:5000/api/users/logout", 
            {withCredentials: true}
        )
        setLoading(false);
        setTimeout(( ) =>{
           navigate("/login");
          }, 1500);
        
    }catch (error) {
        console.error("Logout failed:", error)
    }
}
  
  return (
    <Drawer 
      variant="permanent" 
      anchor="left" 
      sx={{
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          backgroundColor: "#f8f9fa",
          boxShadow: "2px 0px 5px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 2
        }
      }}
    >
      <Avatar 
        src="/path-to-profile-pic.jpg" 
        alt="Profile Picture" 
        sx={{ width: 80, height: 80, mb: 2 }}
      />
      <List sx={{ width: "100%" }}>
        {menuItems.map((item) => (
          <ListItemButton 
            component={Link} 
            to={item.path} 
            key={item.text} 
            selected={location.pathname === item.path}
            sx={{
              borderRadius: 2,
              bgcolor: location.pathname === item.path ? "rgba(0, 0, 255, 0.2)" : "transparent",
              '&:hover': { bgcolor: "rgba(0, 0, 255, 0.1)" }
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
              <Button variant="contained" color="primary" onClick={handleLogout} sx={{ marginTop: "auto", marginBottom: 2,width :"80%", borderRadius: 2 }}>
                 {loading ? "logout": <CircularProgress size={24} color="inherit" />}
              </Button>
    </Drawer>
  );
};

export default Sidebar;