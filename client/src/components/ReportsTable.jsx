import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip, 
    TablePagination 
} from "@mui/material"; 

import { motion } from "framer-motion";

import formatCurrency from "../utils/formatCurrency";

const ReportsTable = ({ reportData, selectedReport }) => {

    // ---------------- Pending Payment Report ----------------

    if (selectedReport === "pending") {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            > 
                
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Client</strong></TableCell>
                                <TableCell><strong>Product</strong></TableCell>
                                <TableCell><strong>Status</strong></TableCell>
                                <TableCell><strong>Amount</strong></TableCell>
                                <TableCell><strong>Pending Amount</strong></TableCell>
                                <TableCell><strong>Renewal Date</strong></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {reportData.map((payment) => (
                                <TableRow
                                    key={payment._id}
                                    hover
                                    sx={{
                                        transition: "0.2s",

                                        "&:hover": {
                                            bgcolor: "#F5F9FF",
                                        },
                                    }} 
                                >
                                    <TableCell>{payment.client?.companyName}</TableCell>

                                    <TableCell>{payment.product?.productName}</TableCell>

                                    <TableCell>
                                        <Chip
                                            label={payment.paymentStatus}
                                            color={
                                                payment.paymentStatus === "Pending"
                                                    ? "warning"
                                                    : payment.paymentStatus === "Partial"
                                                        ? "info"
                                                        : payment.paymentStatus === "Overdue"
                                                            ? "error"
                                                            : "default"
                                            }
                                            size="small"
                                        />
                                    </TableCell>

                                    <TableCell>
                                        {formatCurrency(payment.amount, payment.currency)}
                                    </TableCell>

                                    <TableCell>
                                        {formatCurrency(
                                            payment.amount - payment.paidAmount,
                                            payment.currency
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        {new Date(payment.renewalDate).toLocaleDateString(
                                            "en-GB",
                                            {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            }
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </motion.div>
        );
    }

    // ---------------- Product-wise Report ----------------

    if (selectedReport === "product") {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            > 
                
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Product</strong></TableCell>
                                <TableCell><strong>Category</strong></TableCell>
                                <TableCell><strong>Client</strong></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {reportData.map((item) => (
                                <TableRow
                                    key={item._id}
                                    hover
                                    sx={{
                                        transition: "0.2s",
                                        "&:hover": {
                                            backgroundColor: "#f8fafc",
                                        },
                                    }}
                                >
                                    <TableCell>{item.product?.productName}</TableCell>

                                    <TableCell>{item.product?.category}</TableCell>

                                    <TableCell>{item.client?.companyName}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </motion.div>
        );
    }

    // ---------------- Client-wise Report ----------------

    if (selectedReport === "client") {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Client</strong></TableCell>
                                <TableCell><strong>Product</strong></TableCell>
                                <TableCell><strong>Category</strong></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {reportData.map((item) => (
                                <TableRow
                                    key={item._id}
                                    hover
                                    sx={{
                                        transition: "0.2s",
                                        "&:hover": {
                                            backgroundColor: "#f8fafc",
                                        },
                                    }}
                                >
                                    <TableCell>{item.client?.companyName}</TableCell>

                                    <TableCell>{item.product?.productName}</TableCell>

                                    <TableCell>{item.product?.category}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </motion.div>
        );
    }

    // ---------------- Expired Report ----------------

    if (selectedReport === "expired") {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            > 
                
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Client</strong></TableCell>
                                <TableCell><strong>Product</strong></TableCell>
                                <TableCell><strong>Renewal Date</strong></TableCell>
                                <TableCell><strong>Payment Status</strong></TableCell>
                                <TableCell><strong>Current Status</strong></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {reportData.map((item) => (
                                <TableRow
                                    key={item._id}
                                    hover
                                    sx={{
                                        transition: "0.2s",
                                        "&:hover": {
                                            backgroundColor: "#f8fafc",
                                        },
                                    }}
                                >
                                    <TableCell>{item.client?.companyName}</TableCell>

                                    <TableCell>{item.product?.productName}</TableCell>

                                    <TableCell>
                                        {new Date(item.renewalDate).toLocaleDateString(
                                            "en-GB",
                                            {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            }
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        <Chip
                                            label={item.paymentStatus}
                                            color={
                                                item.paymentStatus === "Pending"
                                                    ? "warning"
                                                    : item.paymentStatus === "Partial"
                                                        ? "info"
                                                        : item.paymentStatus.includes("Overdue")
                                                            ? "error"
                                                            : "default"
                                            }
                                            size="small"
                                        />
                                    </TableCell>

                                    <TableCell>
                                        <Chip
                                            label={item.currentStatus}
                                            color="error"
                                            size="small"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </motion.div>
        );
    }

    return null;
};

export default ReportsTable; 