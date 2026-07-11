import { 
    Box, 
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip, 
    Button, 
} from "@mui/material"; 

import { formatDate } from "../utils/formatDate"; 
import dayjs from "dayjs"; 
import { useNavigate } from "react-router-dom"; 

function UpcomingRenewals({ renewals }) { 
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
                    Upcoming Renewals
                </Typography>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <strong>Client</strong>
                                </TableCell>

                                <TableCell>
                                    <strong>Product</strong>
                                </TableCell>

                                <TableCell>
                                    <strong>Renewal Date</strong>
                                </TableCell> 

                                <TableCell>
                                    <strong>Days Left</strong>
                                </TableCell> 

                                <TableCell>
                                    <strong>Payment Status</strong>
                                </TableCell>

                                <TableCell>
                                    <strong>Status</strong>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {renewals.map((renewal) => (
                                <TableRow
                                    key={renewal._id}
                                    hover
                                    sx={{
                                        cursor: "pointer",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            backgroundColor: "#f8fbff",
                                            boxShadow: 2,
                                        },
                                    }}
                                > 
                                    <TableCell>
                                        {renewal.client?.companyName}
                                    </TableCell>

                                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                                        {renewal.product?.productName}
                                    </TableCell> 

                                    <TableCell>
                                        {formatDate(renewal.renewalDate)}
                                    </TableCell> 

                                    <TableCell>
                                        {dayjs(renewal.renewalDate).diff(dayjs(), "day")}
                                    </TableCell> 

                                    <TableCell>
                                        <Chip
                                            label={renewal.paymentStatus}
                                            color={
                                                renewal.paymentStatus === "Paid"
                                                    ? "success"
                                                    : renewal.paymentStatus === "Partial"
                                                        ? "info"
                                                        : "warning"
                                            }
                                            size="small"
                                        />
                                    </TableCell>

                                    <TableCell>
                                        <Chip
                                            label={renewal.currentStatus}
                                            color={
                                                renewal.currentStatus === "Active"
                                                    ? "success"
                                                    : "warning"
                                            }
                                            size="small"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> 
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 2,
                    }}
                >
                    <Button
                        variant="text"
                        onClick={() => navigate("/renewals")}
                    >
                        View All
                    </Button>
                </Box> 
            </CardContent>
        </Card>
    ); 

}

export default UpcomingRenewals; 