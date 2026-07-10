import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Tooltip,
    IconButton,
} from "@mui/material";

import { RefreshCw } from "lucide-react";

import { formatDate } from "../utils/formatDate";

const RenewalTable = ({ 
    renewals,
    onRenew,
}) => {

    return (
        <TableContainer component={Paper} sx={{ mt: 3 }}>

            <Table>

                {/* Table Header */}
                <TableHead>

                    <TableRow>

                        <TableCell><strong>Client</strong></TableCell>

                        <TableCell><strong>Product</strong></TableCell>

                        <TableCell><strong>Plan</strong></TableCell>

                        <TableCell><strong>Renewal Date</strong></TableCell>

                        <TableCell><strong>Days Left</strong></TableCell>

                        <TableCell><strong>Renewal Window</strong></TableCell>

                        <TableCell><strong>Current Status</strong></TableCell>

                        <TableCell><strong>Payment Status</strong></TableCell>

                        <TableCell align="center">
                            <strong>Actions</strong>
                        </TableCell>

                    </TableRow>

                </TableHead>

                {/* Table Body */}
                <TableBody>

                    {renewals.map((renewal) => (

                        <TableRow
                            key={renewal._id}
                            sx={{
                                backgroundColor:
                                    renewal.currentStatus === "Expired"
                                        ? "#FFEBEE"
                                        : "inherit",

                                "&:hover": {
                                    backgroundColor:
                                        renewal.currentStatus === "Expired"
                                            ? "#F8D7DA"
                                            : "action.hover",
                                },
                            }} 
                        > 

                            <TableCell>
                                {renewal.client?.companyName}
                            </TableCell>

                            <TableCell>
                                {renewal.product?.productName}
                            </TableCell>

                            <TableCell>
                                {renewal.planName}
                            </TableCell>

                            <TableCell>
                                {formatDate(renewal.renewalDate)}
                            </TableCell>

                            <TableCell>
                                {renewal.daysRemaining}
                            </TableCell>

                            <TableCell>

                                <Chip
                                    label={renewal.renewalWindow}
                                    color={
                                        renewal.renewalWindow === "Expired"
                                            ? "error"
                                            : renewal.renewalWindow === "7 Days"
                                                ? "warning"
                                                : renewal.renewalWindow === "15 Days"
                                                    ? "info"
                                                    : "success"
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
                                            : renewal.currentStatus === "Expiring Soon"
                                                ? "warning"
                                                : "error"
                                    }
                                    size="small"
                                />

                            </TableCell>

                            <TableCell>

                                <Chip
                                    label={
                                        renewal.currentStatus === "Expired" &&
                                            renewal.paymentStatus !== "Paid"
                                            ? `Overdue (${renewal.paymentStatus})`
                                            : renewal.paymentStatus
                                    }
                                    color={
                                        renewal.currentStatus === "Expired" &&
                                            renewal.paymentStatus !== "Paid"
                                            ? "error"
                                            : renewal.paymentStatus === "Paid"
                                                ? "success"
                                                : renewal.paymentStatus === "Pending"
                                                    ? "warning"
                                                    : "info"
                                    }
                                    size="small"
                                />

                            </TableCell>

                            <TableCell align="center">

                                <Tooltip
                                    title={
                                        renewal.renewalWindow === "Upcoming"
                                            ? "Renewal is not due yet."
                                            : "Renew Subscription"
                                    }
                                >
                                    <span>
                                        <IconButton
                                            color="primary"
                                            disabled={renewal.renewalWindow === "Upcoming"}
                                            onClick={() => onRenew(renewal)}
                                        >
                                            <RefreshCw size={18} />
                                        </IconButton>
                                    </span>
                                </Tooltip> 
                            </TableCell>

                        </TableRow>

                    ))}

                </TableBody>

            </Table>

        </TableContainer>
    );

};

export default RenewalTable; 