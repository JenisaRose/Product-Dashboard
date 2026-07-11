import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Stack,
    Typography,
} from "@mui/material"; 
import {
    Building2,
    Package,
    CalendarDays,
} from "lucide-react"; 

import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate"; 

function getInitials(name = "") {
    return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();
} 

function RecentClientMappings({ mappings }) {
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                mt: 3,
                transition: "0.3s",
                "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-4px)",
                },
            }}
        > 
            <CardContent>
                <Typography
                    variant="h6"
                    gutterBottom
                >
                    Recent Client Assignments
                </Typography>

                <Stack spacing={1.5}>
                    {mappings.slice(0, 3).map((assignment) => (
                        <Box
                            key={assignment._id}
                            sx={{
                                border: "1px solid",
                                borderColor: "divider",
                                borderRadius: 2,
                                p: 2,
                                transition: "0.25s",
                                cursor: "pointer",
                                "&:hover": {
                                    boxShadow: 4,
                                    transform: "translateY(-3px)",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: 1,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    <Building2 size={18} />

                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                    >
                                        {assignment.client?.companyName}
                                    </Typography>
                                </Box>

                                <Chip
                                    label={assignment.currentStatus}
                                    color={
                                        assignment.currentStatus === "Active"
                                            ? "success"
                                            : assignment.currentStatus === "Expiring Soon"
                                                ? "warning"
                                                : "error"
                                    }
                                    size="small"
                                />
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 0.5,
                                }}
                            >
                                <Package size={16} />

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {assignment.product?.productName}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <CalendarDays size={16} />

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Assigned • {formatDate(assignment.createdAt)}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Stack>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 2,
                    }}
                >
                    <Button
                        variant="text"
                        onClick={() => navigate("/assignments")}
                    >
                        View All
                    </Button> 
                </Box>
            </CardContent>
        </Card>
    ); 
}

export default RecentClientMappings; 