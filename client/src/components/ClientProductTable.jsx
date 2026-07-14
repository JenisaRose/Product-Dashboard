import {
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    IconButton,
    Chip, 
    Tooltip 
} from "@mui/material"; 

import { Pencil, Trash2 } from "lucide-react"; 
import formatCurrency from "../utils/formatCurrency"; 
import { formatDate } from "../utils/formatDate"; 

function ClientProductTable({
    assignments,
    onEdit,
    onDelete,
}) {
    return (
        <TableContainer
            component={Paper}
            elevation={3}
            sx={{
                borderRadius: 3,
            }}
        > 
            <Table>

                {/* Table Header */}
                <TableHead>
                    <TableRow 
                    hover 
                        sx={{
                            "&:hover": {
                                bgcolor: "#F5F9FF",
                            },
                        }}
                    > 
                        <TableCell><strong>Client</strong></TableCell>
                        <TableCell><strong>Product</strong></TableCell>
                        <TableCell><strong>Plan</strong></TableCell>
                        <TableCell><strong>Billing</strong></TableCell>
                        <TableCell><strong>Amount</strong></TableCell>
                        <TableCell><strong>Payment</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                        <TableCell><strong>Renewal</strong></TableCell>
                        <TableCell align="center">
                            <strong>Actions</strong>
                        </TableCell>
                    </TableRow>
                </TableHead>

                {/* Table Data */}
                <TableBody>
                    {assignments.length > 0 ? (
                        assignments.map((assignment) => (
                            <TableRow
                                key={assignment._id}
                                hover
                                sx={{
                                    transition: "all 0.25s ease",

                                    "&:hover": {
                                        backgroundColor: "#F5F9FF",
                                    },
                                }}
                            >
                                <TableCell>
                                    {assignment.client?.companyName || "Deleted Client"} 
                                </TableCell>

                                <TableCell>
                                    {assignment.product?.productName || "Deleted Product"} 
                                </TableCell>

                                <TableCell>
                                    {assignment.planName}
                                </TableCell>

                                <TableCell>
                                    {assignment.billingCycle}
                                </TableCell>

                                <TableCell>
                                    {formatCurrency(
                                        assignment.amount,
                                        assignment.currency
                                    )}
                                </TableCell>

                                <TableCell>
                                    <Chip
                                        label={assignment.paymentStatus}
                                        color={
                                            assignment.paymentStatus === "Paid"
                                                ? "success"
                                                : assignment.paymentStatus === "Pending"
                                                    ? "warning"
                                                    : assignment.paymentStatus === "Partial"
                                                        ? "info"
                                                        : "error"
                                        }
                                        size="small"
                                    />
                                </TableCell>

                                <TableCell>
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
                                </TableCell>

                                <TableCell>
                                    {formatDate(assignment.renewalDate)}
                                </TableCell>

                                <TableCell align="center">
                                    <Tooltip title="Edit">
                                        <IconButton
                                            color="primary"
                                            onClick={() => onEdit(assignment)}
                                            sx={{
                                                transition: "0.2s",

                                                "&:hover": {
                                                    color: "#1976d2",
                                                    transform: "scale(1.15)",
                                                },
                                            }}
                                        >
                                            <Pencil size={18} />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Delete">
                                        <IconButton
                                            color="error"
                                            onClick={() => onDelete(assignment._id)}
                                            sx={{
                                                transition: "0.2s",

                                                "&:hover": {
                                                    color: "#d32f2f",
                                                    transform: "scale(1.15)",
                                                },
                                            }}
                                        >
                                            <Trash2 size={18} />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={9}
                                align="center"
                                sx={{ py: 2.5 }}
                            >
                                No assignments found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody> 

            </Table>
        </TableContainer>
    );
}

export default ClientProductTable; 