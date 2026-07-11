import { 
    Box, 
    Card,
    CardContent,
    Typography,
    Grid,
} from "@mui/material"; 

import Inventory2Icon from "@mui/icons-material/Inventory2";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import GroupsIcon from "@mui/icons-material/Groups";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import PaymentsIcon from "@mui/icons-material/Payments"; 

function DashboardSummaryCards({ summary }) { 
    const cards = [
        { 
            title: "Total Products",
            value: summary.totalProducts, 
            borderColor: "#1976d2", 
            icon: <Inventory2Icon color="primary" fontSize="inherit" />, 
        },
        {
            title: "Active Products",
            value: summary.activeProducts, 
            borderColor: "#2e7d32", 
            icon: <CheckCircleIcon color="success" fontSize="inherit" />, 
        },
        {
            title: "Inactive Products",
            value: summary.inactiveProducts, 
            borderColor: "#d75858", 
            icon: <CancelIcon color="error" fontSize="inherit" />, 
        },
        {
            title: "Total Clients",
            value: summary.totalClients, 
            borderColor: "#9c27b0", 
            icon: <GroupsIcon color="secondary" fontSize="inherit" />, 
        },
        {
            title: "Active Subscriptions",
            value: summary.activeSubscriptions, 
            borderColor: "#388e3c", 
            icon: <AutorenewIcon color="success" fontSize="inherit" />, 
        },
        {
            title: "Expired Records",
            value: summary.expiredSubscriptions, 
            borderColor: "#ed6c02",
            icon: <WarningAmberIcon color="warning" fontSize="inherit" />, 
        },
        {
            title: "Pending Payments",
            value: summary.pendingPayments, 
            borderColor: "#c62828",  
            icon: <PaymentsIcon color="error" fontSize="inherit" />, 
        },
    ]; 

    return (
        <Grid container spacing={3}>
            {cards.map((card) => (
                <Grid
                    key={card.title}
                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                >
                    <Card
                        elevation={3}
                        sx={{
                            borderRadius: 3, 
                            borderLeft: `6px solid ${card.borderColor}`, 
                            transition: ".25s",
                            cursor: "pointer",

                            "&:hover": {
                                transform: "translateY(-5px)",
                                boxShadow: 8,
                            }, 
                        }} 
                    > 
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                            >
                                {card.title}
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mt: 1,
                                }}
                            >
                                <Typography
                                    variant="h3"
                                    fontWeight="bold"
                                    sx={{ mt: 1 }}
                                >
                                    {card.value}
                                </Typography> 

                                <Box
                                    sx={{
                                        fontSize: 48,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {card.icon}
                                </Box> 
                            </Box> 
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    ); 

}

export default DashboardSummaryCards; 