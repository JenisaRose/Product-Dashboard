import {
  Drawer,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import {
  LayoutDashboard,
  Package,
  Users,
  ClipboardList,
  CreditCard,
  Bell,
  FileBarChart, 
  History, 
} from "lucide-react"; 
import { NavLink, useLocation } from "react-router-dom"; // React Router 
import logo from "../assets/ARODEKLOGO.png"; 

export const drawerWidth = 260; 

const menuItems = [
  { text: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
  { text: "Products", path: "/products", icon: <Package size={20} /> },
  { text: "Clients", path: "/clients", icon: <Users size={20} /> },
  { text: "Assignments", path: "/assignments", icon: <ClipboardList size={20} /> },
  { text: "Payments", path: "/payments", icon: <CreditCard size={20} /> },
  { text: "Renewals", path: "/renewals", icon: <Bell size={20} /> },
  { text: "Reports", path: "/reports", icon: <FileBarChart size={20} /> }, 
  {
    text: "Activity Log",
    path: "/activity-logs",
    icon: <History size={20} />,
  }, 
]; 

function Sidebar() { 
    const location = useLocation(); // React Router 
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#111827",
          color: "#fff",
        },
      }}
    >
      <Box sx={{ p: 3 }}>
  <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    mb: 3,
  }}
>
  <Box
    component="img"
    src={logo}
    alt="ARODEK"
    sx={{
      width: 150,
      height: "auto",
      objectFit: "contain",
      mb: 2,
    }}
  />

  <Typography
  variant="h6"
  fontWeight="bold"
  color="white"
  sx={{
    fontSize: "2rem",   // Increase this value
    lineHeight: 1.2,
    mt: 1,              // Space between logo and text
  }}
>
  Product Dashboard
</Typography> 
</Box> 

  <List>
    {menuItems.map((item) => (
     <ListItemButton
  key={item.text}
  component={NavLink} // React Router
  to={item.path}
  selected={location.pathname === item.path} 
  sx={{
    borderRadius: 2,
    mb: 1,
    color: "#E5E7EB",
    textDecoration: "none",
    backgroundColor:
  location.pathname === item.path ? "#2563EB" : "transparent", 

    "&:hover": {
     backgroundColor:
  location.pathname === item.path ? "#1D4ED8" : "#1F2937", 
    },
  }} 
> 
      <ListItemIcon
  sx={{
    color: "inherit",
    minWidth: 40,
  }}
> 
          {item.icon}
        </ListItemIcon>

        <ListItemText primary={item.text} />
      </ListItemButton>
    ))}
  </List>
</Box> 
    </Drawer>
  );
}

export default Sidebar; 