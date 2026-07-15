import { useEffect, useState } from "react"; 
import {
    Typography,
    Box,
    CircularProgress,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material"; 

// Import the existing API used by Product Assignments
import {
    getClientProducts,
    updateClientProduct,
} from "../api/clientProductApi"; 
import PaymentTable from "../components/PaymentTable"; 
import Dashboard from "./Dashboard"; 
import DashboardLayout from "../layouts/DashboardLayout"; 
import PaymentForm from "../components/PaymentForm"; 
import toast from "react-hot-toast"; 

const PaymentTracking = () => {
    // Store all payment records
    const [payments, setPayments] = useState([]);

    // Loading state
    const [loading, setLoading] = useState(true); 
    // Stores the search text entered by the user
    const [searchTerm, setSearchTerm] = useState(""); 
    // Controls whether the Edit Payment dialog is open
    const [openDialog, setOpenDialog] = useState(false);

    // Stores the selected payment record
    const [selectedPayment, setSelectedPayment] = useState(null); 
    // Stores the selected payment filter
    const [paymentFilter, setPaymentFilter] = useState("All"); 

    // Stores the form values
    const [formData, setFormData] = useState({
        paidAmount: 0,
        paymentStatus: "Pending",
        lastPaymentDate: "",
        paymentRemarks: "",
        currency: "INR",
    }); 

    // Fetch payment records
    const fetchPayments = async () => {
        try {
            const response = await getClientProducts();

            // Calculate the pending amount for every assignment
            const paymentData = response.data.map((assignment) => ({
                ...assignment,

                // Pending Amount = Total Amount - Paid Amount
                pendingAmount:
                    (assignment.amount || 0) - (assignment.paidAmount || 0),
            }));

            // Save the updated data
            setPayments(paymentData); 
        } catch (error) {
            console.error("Failed to fetch payment records:", error);
        } finally {
            setLoading(false);
        }
    }; 
    // Open the Edit Payment dialog
    const handleEditPayment = (payment) => {

        // Save the selected payment
        setSelectedPayment(payment);

        // Fill the form with the existing payment details
        setFormData({
            paidAmount: payment.paidAmount || 0,
            paymentStatus: payment.paymentStatus,
            lastPaymentDate: payment.lastPaymentDate
                ? payment.lastPaymentDate.substring(0, 10)
                : "",
            paymentRemarks: payment.paymentRemarks || "",
            currency: payment.currency,
        });

        // Open the dialog
        setOpenDialog(true);
    }; 

    // Update the selected payment
    const handleUpdatePayment = async () => {
        try { 
            console.log("Selected Payment:", selectedPayment);
            console.log("Form Data:", formData); 

            // Update the assignment in MongoDB
            await updateClientProduct(
                selectedPayment._id,
                {
                    ...selectedPayment,
                    ...formData,
                }
            );

            // Refresh the table
            fetchPayments();

            // Close the dialog
            setOpenDialog(false);

            // Success message
            toast.success("Payment updated successfully.");

        } catch (error) {

            console.error(error);

            toast.error("Failed to update payment.");

        }
    }; 

    // Fetch data when the page loads
    useEffect(() => {
        fetchPayments();
    }, []); 

    // Filter payment records based on the search text
    // Filter payment records based on the search text and payment filter
    const filteredPayments = payments.filter((payment) => {

        const search = searchTerm.toLowerCase();

        // Search filter
        const matchesSearch =
            payment.client?.companyName?.toLowerCase().includes(search) ||
            payment.product?.productName?.toLowerCase().includes(search) ||
            payment.planName?.toLowerCase().includes(search);

        // Payment Status filter
        const matchesPayment =
            paymentFilter === "All"
                ? true
                : paymentFilter === "Overdue"
                    ? payment.currentStatus === "Expired" &&
                    payment.paymentStatus !== "Paid"
                    : payment.paymentStatus === paymentFilter; 
        return matchesSearch && matchesPayment;
    }); 

    if (loading) {
        return <CircularProgress />;
    }

    return ( 
        <DashboardLayout>
        <Box>
            {/* Page Title */}
                <h1 style={{ fontSize: "48px" }}>Payment Tracking</h1> 

                {/* Search & Filter */}
                <Grid container spacing={2} sx={{ mb: 2 }}>

                    {/* Search */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <TextField
                            fullWidth
                            label="Search by Client, Product or Plan"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} 
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
                    </Grid>

                    {/* Payment Status Filter */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <FormControl fullWidth
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
                            >
                            <InputLabel>Payment</InputLabel>

                            <Select
                                value={paymentFilter}
                                label="Payment"
                                onChange={(e) => setPaymentFilter(e.target.value)} 
                            >
                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Partial">Partial</MenuItem>
                                <MenuItem value="Paid">Paid</MenuItem>
                                <MenuItem value="Overdue">Overdue</MenuItem>
                            </Select> 
                        </FormControl>
                    </Grid>

                </Grid> 

            {/* Display number of filtered records */}
            <Typography color="text.secondary">
                Showing {filteredPayments.length} of {payments.length} Records
            </Typography> 
            <PaymentTable
                payments={filteredPayments}
                onEdit={handleEditPayment}
            /> 
                <Dialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>
                        Update Payment
                    </DialogTitle>

                    <DialogContent>
                        <PaymentForm
                            formData={formData}
                            setFormData={setFormData}
                            totalAmount={selectedPayment?.amount || 0}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button
                            onClick={() => setOpenDialog(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="contained"
                            onClick={handleUpdatePayment}
                        >
                            Update Payment
                        </Button> 
                    </DialogActions>
                </Dialog> 
        </Box> 
        </DashboardLayout> 
    );
};

export default PaymentTracking; 