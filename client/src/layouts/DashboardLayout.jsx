import { Box } from "@mui/material";
import Sidebar, { drawerWidth } from "./Sidebar"; 
import Navbar from "./Navbar"; 

function DashboardLayout({ children }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <Box
  component="main"
  sx={{
    flexGrow: 1,
    minHeight: "100vh",
    backgroundColor: "#f5f7fb",
  }}
>
  <Navbar />

  <Box sx={{ p: 3 }}>
    {children}
  </Box>
</Box> 
    </Box>
  );
}

export default DashboardLayout; 