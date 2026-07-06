import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
} from "@mui/material";

import { Bell } from "lucide-react"; 

function Navbar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        color: "#111827",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <Toolbar>
  <Typography variant="h6" fontWeight={600}>
    Dashboard
  </Typography>

  <Box sx={{ flexGrow: 1 }} />

  <IconButton>                      {/* Using Material-UI  */} 
    <Bell size={20} />
  </IconButton>

  <Avatar sx={{ ml: 2, bgcolor: "#2563EB" }}>
    A
  </Avatar>

  <Typography sx={{ ml: 1, fontWeight: 500 }}>
    Admin
  </Typography>
</Toolbar> 
    </AppBar>
  );
}

export default Navbar; 