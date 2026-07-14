import { Grid, Paper, Typography } from "@mui/material"; 
import { motion } from "framer-motion"; 
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import ErrorIcon from "@mui/icons-material/Error"; 
import AssessmentIcon from "@mui/icons-material/Assessment";
import { Stack } from "@mui/material"; 

const ReportsSummaryCards = ({ reportData }) => {
    const pendingCount = reportData.filter(
        (payment) => payment.paymentStatus === "Pending"
    ).length;

    const partialCount = reportData.filter(
        (payment) => payment.paymentStatus === "Partial"
    ).length;

    const overdueCount = reportData.filter(
        (payment) => payment.currentStatus === "Expired"
    ).length;

    const totalRecords = reportData.length;

    return ( 
        <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
> 
        <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            backgroundColor: "#FFF7ED",
                            border: "1px solid #FDBA74",
                            transition: "all 0.3s",

                            "&:hover": {
                                transform: "translateY(-6px)",
                                boxShadow: "0 10px 25px rgba(234,88,12,0.18)",
                            },
                        }}
                    > 
                        <Stack direction="row" spacing={1} alignitems="center">
                            <PendingActionsIcon sx={{ color: "#EA580C", fontSize: 22 }} />

                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#64748B",
                                    fontWeight: 600,
                                }}
                            >
                                Pending Payments
                            </Typography>
                        </Stack> 

                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            sx={{ mt: 1, color: "#EA580C" }}
                        > 
                        {pendingCount}
                    </Typography>
                </Paper>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            backgroundColor: "#EFF6FF",
                            border: "1px solid #93C5FD",
                            transition: "all 0.3s",

                            "&:hover": {
                                transform: "translateY(-6px)",
                                boxShadow: "0 10px 25px rgba(37,99,235,0.18)",
                            },
                        }}
                    > 
                        <Stack direction="row" spacing={1} alignitems="center">
                            <HourglassTopIcon sx={{ color: "#2563EB", fontSize: 22 }} />

                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#64748B",
                                    fontWeight: 600,
                                }}
                            >
                                Partial Payments
                            </Typography>
                        </Stack> 
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            sx={{ mt: 1, color: "#2563EB" }}
                        > 
                        {partialCount}
                    </Typography>
                </Paper>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            backgroundColor: "#FEF2F2",
                            border: "1px solid #FCA5A5",
                            transition: "all 0.3s",

                            "&:hover": {
                                transform: "translateY(-6px)",
                                boxShadow: "0 10px 25px rgba(220,38,38,0.18)",
                            },
                        }}
                    > 
                        <Stack direction="row" spacing={1} alignitems="center">
                            <ErrorIcon sx={{ color: "#DC2626", fontSize: 22 }} />

                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#64748B",
                                    fontWeight: 600,
                                }}
                            >
                                Overdue Payments
                            </Typography>
                        </Stack> 

                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            sx={{ mt: 1, color: "#DC2626" }}
                        > 
                        {overdueCount}
                    </Typography>
                </Paper>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            backgroundColor: "#ECFDF5",
                            border: "1px solid #86EFAC",
                            transition: "all 0.3s",

                            "&:hover": {
                                transform: "translateY(-6px)",
                                boxShadow: "0 10px 25px rgba(22,163,74,0.18)",
                            },
                        }}
                    > 
                        <Stack direction="row" spacing={1} alignitems="center">
                            <AssessmentIcon sx={{ color: "#16A34A", fontSize: 22 }} />

                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#64748B",
                                    fontWeight: 600,
                                }}
                            >
                                Total Records
                            </Typography>
                        </Stack> 
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            sx={{ mt: 1, color: "#16A34A" }}
                        > 
                        {totalRecords}
                    </Typography>
                </Paper>
            </Grid>
        </Grid> 
        </motion.div> 
    );
};

export default ReportsSummaryCards; 