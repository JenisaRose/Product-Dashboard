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
            color: "#1976D2",
            borderColor: "#90CAF9",
            background: "#F4F9FF",
            glow: "rgba(25,118,210,.42)",
            icon: <Inventory2Icon sx={{ fontSize: 62, color: "#1976D2" }} />,
        },
        {
            title: "Active Products",
            value: summary.activeProducts,
            color: "#2E7D32",
            borderColor: "#A5D6A7",
            background: "#F1FFF5",
            glow: "rgba(46,125,50,.42)",
            icon: <CheckCircleIcon sx={{ fontSize: 62, color: "#2E7D32" }} />,
        },
        {
            title: "Inactive Products",
            value: summary.inactiveProducts,
            color: "#D32F2F",
            borderColor: "#EF9A9A",
            background: "#FFF5F5",
            glow: "rgba(211,47,47,.42)",
            icon: <CancelIcon sx={{ fontSize: 62, color: "#D32F2F" }} />,
        },
        {
            title: "Total Clients",
            value: summary.totalClients,
            color: "#8E24AA",
            borderColor: "#CE93D8",
            background: "#FCF5FF",
            glow: "rgba(142,36,170,.42)",
            icon: <GroupsIcon sx={{ fontSize: 62, color: "#8E24AA" }} />,
        },
        {
            title: "Active Subscriptions",
            value: summary.activeSubscriptions,
            color: "#388E3C",
            borderColor: "#A5D6A7",
            background: "#F1FFF5",
            glow: "rgba(56,142,60,.42)",
            icon: <AutorenewIcon sx={{ fontSize: 62, color: "#388E3C" }} />,
        },
        {
            title: "Expired Records",
            value: summary.expiredSubscriptions,
            color: "#EF6C00",
            borderColor: "#FFCC80",
            background: "#FFF8F0",
            glow: "rgba(239,108,0,.42)",
            icon: <WarningAmberIcon sx={{ fontSize: 62, color: "#EF6C00" }} />,
        },
        {
            title: "Pending Payments",
            value: summary.pendingPayments,
            color: "#C62828",
            borderColor: "#EF9A9A",
            background: "#FFF5F5",
            glow: "rgba(198,40,40,.42)",
            icon: <PaymentsIcon sx={{ fontSize: 62, color: "#C62828" }} />,
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
                            cursor: "pointer", 
                            minHeight: 170,
                            borderRadius: 3,

                            borderLeft: `6px solid ${card.color}`,
                            border: `1px solid ${card.borderColor}`,

                            bgcolor: card.background,

                            transition: "all .35s cubic-bezier(.4,0,.2,1)",

                            "&:hover": {
                                transform: "translateY(-6px) scale(1.02)",
                                boxShadow: `0 8px 20px rgba(0,0,0,.14), 0 0 18px ${card.glow}`,
                            },
                        }} 
                    > 
                        <CardContent
                            sx={{
                                px: 3,
                                py: 3,
                            }}
                        > 
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
                                    alignItems: "flex-end", 
                                    mt: 1,
                                }}
                            >
                                <Typography
                                    variant="h2"
                                    fontWeight={700}  
                                    sx={{ lineheight: 1, mt: 1 }} 
                                >
                                    {card.value}
                                </Typography> 

                                <Box
                                    sx={{
                                        fontSize: 48,
                                        display: "flex",
                                        alignItems: "flex-end",
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