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
        <TableContainer component={Paper}>
            <Table>

                {/* Table Header */}
                <TableHead>
                    <TableRow>
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
                    {assignments.map((assignment) => (
                        <TableRow key={assignment._id}>

                            <TableCell>
                                {assignment.client?.companyName}
                            </TableCell>

                            <TableCell>
                                {assignment.product?.productName}
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
                                <IconButton
                                    color="primary"
                                    onClick={() => onEdit(assignment)}
                                >
                                    <Pencil size={18} /> 
                                </IconButton>

                                <IconButton
                                    color="error"
                                    onClick={() => onDelete(assignment._id)}
                                >
                                    <Trash2 size={18} />
                                </IconButton>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>
    );
}

export default ClientProductTable; 