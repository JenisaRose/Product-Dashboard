import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Button,  
} from "@mui/material"; 
import formatCurrency from "../utils/formatCurrency"; 
import { Pencil } from "lucide-react";
import { IconButton, Tooltip } from "@mui/material"; 
import { formatDate } from "../utils/formatDate"; 


const PaymentTable = ({
    payments,
    onEdit,
}) => {        //Destraucturing props 
    return (
        <TableContainer
            component={Paper}
            elevation={3}
            sx={{ 
                mt: 3, 
                borderRadius: 3,
            }}
        > 
            <Table>

                {/* Table Header */}
                <TableHead>
                    <TableRow
                        sx={{
                            "&:hover": {
                                bgcolor: "#F5F9FF",
                            },
                        }}
                    > 
                        <TableCell><strong>Client</strong></TableCell>
                        <TableCell><strong>Product</strong></TableCell>
                        <TableCell><strong>Total Amount</strong></TableCell>
                        <TableCell><strong>Paid Amount</strong></TableCell>
                        <TableCell><strong>Pending Amount</strong></TableCell>
                        <TableCell><strong>Payment Status</strong></TableCell> 
                        <TableCell><strong>Last Payment Date</strong></TableCell> 
                        <TableCell><strong>Payment Remarks</strong></TableCell> 
                        <TableCell align="center">
                            <strong>Actions</strong>
                        </TableCell> 
                    </TableRow>
                </TableHead>

                {/* Table Body */}
                <TableBody>
                    {payments.length > 0 ? (
                        payments.map((payment) => (
                            <TableRow
                                key={payment._id}
                                hover
                                sx={{
                                    transition: "all 0.25s ease",

                                    "&:hover": {
                                        backgroundColor: "#F5F9FF",
                                    },
                                }}
                            >
                                <TableCell>
                                    {payment.client?.companyName}
                                </TableCell>

                                <TableCell>
                                    {payment.product?.productName}
                                </TableCell>

                                <TableCell>
                                    {formatCurrency(payment.amount, payment.currency)}
                                </TableCell>

                                <TableCell>
                                    {formatCurrency(payment.paidAmount, payment.currency)}
                                </TableCell>

                                <TableCell>
                                    {formatCurrency(payment.pendingAmount, payment.currency)}
                                </TableCell>

                                <TableCell>
                                    <Chip
                                        label={
                                            payment.currentStatus === "Expired" &&
                                                payment.paymentStatus !== "Paid"
                                                ? `Overdue (${payment.paymentStatus})`
                                                : payment.paymentStatus
                                        }
                                        color={
                                            payment.currentStatus === "Expired" &&
                                                payment.paymentStatus !== "Paid"
                                                ? "error"
                                                : payment.paymentStatus === "Paid"
                                                    ? "success"
                                                    : payment.paymentStatus === "Pending"
                                                        ? "warning"
                                                        : "info"
                                        }
                                        size="small"
                                    />
                                </TableCell>

                                <TableCell>
                                    {formatDate(payment.lastPaymentDate)}
                                </TableCell>

                                <TableCell>
                                    <Tooltip title={payment.paymentRemarks || ""} arrow>
                                        <span>
                                            {payment.paymentRemarks
                                                ? payment.paymentRemarks.length > 30
                                                    ? `${payment.paymentRemarks.substring(0, 30)}...`
                                                    : payment.paymentRemarks
                                                : "-"}
                                        </span>
                                    </Tooltip>
                                </TableCell>

                                <TableCell align="center">
                                    <Tooltip title="Edit Payment">
                                        <IconButton
                                            color="primary"
                                            onClick={() => onEdit(payment)}
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
                                No payments found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody> 

            </Table>
        </TableContainer>
    );
};

export default PaymentTable; 