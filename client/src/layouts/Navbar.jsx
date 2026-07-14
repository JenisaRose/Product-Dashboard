import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge,
} from "@mui/material"; 

import { Bell } from "lucide-react"; 
import { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import {
  getUpcomingRenewals,
  getPendingPayments,
} from "../api/dashboardApi"; 

function Navbar() { 
  const [anchorEl, setAnchorEl] = useState(null); 
  const [notificationAnchor, setNotificationAnchor] = useState(null); 
  const [upcomingRenewals, setUpcomingRenewals] = useState([]);
  const [pendingPayments, setPendingPayments] = useState([]); 

  const open = Boolean(anchorEl); 
  const notificationCount =
    upcomingRenewals.length + pendingPayments.length;  

  const navigate = useNavigate();

  const { admin, logout } = useAuth();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  }; 

  const handleNotificationOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  }; 

  const handleLogout = () => {
    logout();
    navigate("/login");
  }; 

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const [renewalRes, paymentRes] = await Promise.all([
          getUpcomingRenewals(),
          getPendingPayments(),
        ]);

        setUpcomingRenewals(renewalRes.data);
        setPendingPayments(paymentRes.data);
      } catch (error) {
        console.error("Failed to load notifications:", error);
      }
    };

    fetchNotifications();
  }, []); 

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

        <IconButton
          onClick={handleNotificationOpen}
          sx={{
            mr: 1,
            transition: "0.2s",
            "&:hover": {
              backgroundColor: "#EFF6FF",
            },
          }}
        >
          <Badge
            badgeContent={notificationCount}
            color="error"
            max={99}
            invisible={notificationCount === 0}
          > 
            <Bell size={20} />
          </Badge>
        </IconButton> 

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            ml: 2,
          }}
          onClick={handleMenuOpen}
        >
          <Avatar sx={{ bgcolor: "#2563EB" }}>
            {admin?.name?.charAt(0) || "A"}
          </Avatar>

          <Typography sx={{ ml: 1, fontWeight: 500 }}>
            {admin?.name || "Admin"}
          </Typography>
        </Box> 
</Toolbar> 
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
      >
        <MenuItem disabled>
          {admin?.email}
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu> 
      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={handleNotificationClose}
        PaperProps={{
          sx: {
            width: 340,
            borderRadius: 3,
            mt: 1,
          },
        }}
      >
        <MenuItem disabled sx={{ fontWeight: 600 }}>
          Notifications
        </MenuItem>

        <Divider />

        {upcomingRenewals.map((renewal) => (
          <MenuItem key={`renewal-${renewal._id}`}>
            📅 {renewal.product?.productName} for{" "}
            {renewal.client?.companyName} renews on{" "}
            {new Date(renewal.renewalDate).toLocaleDateString()}
          </MenuItem>
        ))}

        {pendingPayments.map((payment) => (
          <MenuItem key={`payment-${payment._id}`}>
            💰 {payment.product?.productName} for{" "}
            {payment.client?.companyName} payment is pending
          </MenuItem>
        ))} 
        {notificationCount === 0 && (
          <MenuItem disabled>
            No new notifications 🎉
          </MenuItem>
        )} 
      </Menu> 
    </AppBar>
  );
}

export default Navbar; 