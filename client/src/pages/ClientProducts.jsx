import { useEffect, useState } from "react";

import {
    getClientProducts,
    deleteClientProduct,
} from "../api/clientProductApi";

import ClientProductForm from "../components/ClientProductForm";
import ClientProductTable from "../components/ClientProductTable";

import DashboardLayout from "../layouts/DashboardLayout";

import toast from "react-hot-toast";

import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    Box,
} from "@mui/material";

function ClientProducts() {
    // Stores all assignments
    const [assignments, setAssignments] = useState([]);

    // Search text
    const [searchTerm, setSearchTerm] = useState("");

    // Selected assignment for editing
    const [selectedAssignment, setSelectedAssignment] = useState(null);

    // Filters
    const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
    const [currentStatusFilter, setCurrentStatusFilter] = useState("");

    // Fetch assignments when page loads
    useEffect(() => {
        fetchAssignments();
    }, []);

    // Get assignments from backend
    async function fetchAssignments() {
        try {
            const response = await getClientProducts();
            setAssignments(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    // Delete assignment
    async function handleDelete(id) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this assignment?"
        );

        if (!confirmDelete) return;

        try {
            await deleteClientProduct(id);

            toast.success("Assignment deleted successfully");

            fetchAssignments();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong."
            );
        }
    }

    // Search and Filter
    const filteredAssignments = assignments.filter((assignment) => {
        const search = searchTerm.toLowerCase();

        const matchesSearch =
            (assignment.client?.companyName || "")
                .toLowerCase()
                .includes(search) ||

            (assignment.product?.productName || "")
                .toLowerCase()
                .includes(search) ||

            (assignment.planName || "")
                .toLowerCase()
                .includes(search);

        const matchesPayment =
            paymentStatusFilter === "" ||
            assignment.paymentStatus === paymentStatusFilter;

        const matchesCurrent =
            currentStatusFilter === "" ||
            assignment.currentStatus === currentStatusFilter;

        return (
            matchesSearch &&
            matchesPayment &&
            matchesCurrent
        );
    });

    // Sort assignments by Renewal Date (earliest first)
    filteredAssignments.sort((a, b) => {
        return (
            new Date(a.renewalDate) -
            new Date(b.renewalDate)
        );
    });

    return (
        <DashboardLayout>
            <Box sx={{ p: 3 }}>
                <h1>Product Assignment Tracker</h1>

                <ClientProductForm
                    onAssignmentAdded={fetchAssignments}
                    selectedAssignment={selectedAssignment}
                    clearSelectedAssignment={() =>
                        setSelectedAssignment(null)
                    }
                />

                <hr />

                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    sx={{ mb: 3 }}
                >
                    <TextField
                        label="Search Assignment"
                        fullWidth
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(event.target.value)
                        } 
                        sx={{
                            mb: 3,

                            "& .MuiOutlinedInput-root": {
                                borderRadius: 3,
                                transition: "all 0.3s ease",
                                backgroundColor: "#fff",

                                "& fieldset": {
                                    transition: "all 0.3s ease",
                                },

                                "&:hover": {
                                    backgroundColor: "#fafafa",
                                },

                                "&:hover fieldset": {
                                    borderColor: "#1976d2",
                                },

                                "&.Mui-focused": {
                                    boxShadow: "0 6px 18px rgba(25,118,210,0.18)",
                                },

                                "&.Mui-focused fieldset": {
                                    borderColor: "#1976d2",
                                    borderWidth: "2px",
                                },
                            },
                        }} 
                    />

                    <FormControl sx={{ 
                        minWidth: 180,

                        "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                            transition: "all 0.3s ease",
                            backgroundColor: "#fff",

                            "& fieldset": {
                                transition: "all 0.3s ease",
                            },

                            "&:hover": {
                                backgroundColor: "#fafafa",
                            },

                            "&:hover fieldset": {
                                borderColor: "#1976d2",
                            },

                            "&.Mui-focused": {
                                boxShadow: "0 6px 18px rgba(25,118,210,0.18)",
                            },

                            "&.Mui-focused fieldset": {
                                borderColor: "#1976d2",
                                borderWidth: "2px",
                            },
                        },
                    }} 
                    >
                        <InputLabel>Payment</InputLabel>

                        <Select
                            value={paymentStatusFilter}
                            label="Payment"
                            onChange={(event) =>
                                setPaymentStatusFilter(event.target.value)
                            }
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Paid">Paid</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Partial">Partial</MenuItem>
                            <MenuItem value="Overdue">Overdue</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ 
                        minWidth:180, 

                        "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                            transition: "all 0.3s ease",
                            backgroundColor: "#fff",

                            "& fieldset": {
                                transition: "all 0.3s ease",
                            },

                            "&:hover": {
                                backgroundColor: "#fafafa",
                            },

                            "&:hover fieldset": {
                                borderColor: "#1976d2",
                            },

                            "&.Mui-focused": {
                                boxShadow: "0 6px 18px rgba(25,118,210,0.18)",
                            },

                            "&.Mui-focused fieldset": {
                                borderColor: "#1976d2",
                                borderWidth: "2px",
                            },
                        },
                    }} 
                     >
                        <InputLabel>Status</InputLabel>

                        <Select
                            value={currentStatusFilter}
                            label="Status"
                            onChange={(event) =>
                                setCurrentStatusFilter(event.target.value)
                            }
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Expiring Soon">
                                Expiring Soon
                            </MenuItem>
                            <MenuItem value="Expired">Expired</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                <ClientProductTable
                    assignments={filteredAssignments}
                    onEdit={setSelectedAssignment}
                    onDelete={handleDelete}
                />
            </Box>
        </DashboardLayout>
    );
}

export default ClientProducts; 