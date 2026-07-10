import { useEffect, useState } from "react"; 
import { getProducts } from "../api/productApi"; 

import {
    Typography,
    Box,
    CircularProgress,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material"; 

import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";

import {
    getRenewals,
    renewSubscription,
} from "../api/renewalApi"; 

import RenewalTable from "../components/RenewalTable"; 
import { formatDate } from "../utils/formatDate"; 
import { getClients } from "../api/clientApi"; 
import { DatePicker } from "@mui/x-date-pickers/DatePicker"; 
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; 


const RenewalTracking = () => {

    // Store all renewal records
    const [renewals, setRenewals] = useState([]);

    // Loading state
    const [loading, setLoading] = useState(true);

    // Search text
    const [searchTerm, setSearchTerm] = useState("");

    // Renewal Window filter
    const [windowFilter, setWindowFilter] = useState("All"); 
    // Selected Payment Status filter
    const [paymentFilter, setPaymentFilter] = useState("All"); 
    // Expiry Date Range
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null); 
    // Store all products
    const [products, setProducts] = useState([]);

    // Selected product filter
    const [productFilter, setProductFilter] = useState("All"); 
    // Store all clients
    const [clients, setClients] = useState([]);

    // Selected client filter
    const [clientFilter, setClientFilter] = useState("All"); 
    // Renew dialog
    const [openDialog, setOpenDialog] = useState(false);

    const [selectedRenewal, setSelectedRenewal] = useState(null); 

    // Fetch renewal records
    // Fetch renewal records
    const fetchRenewals = async () => { 
        try {
            const response = await getRenewals();

            setRenewals(response.data);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load renewal records.");

        } finally {

            setLoading(false);

        }
    }; 

    // Fetch all products
    const fetchProducts = async () => { 

        try {

            const response = await getProducts();

            setProducts(response.data);

        } catch (error) {

            console.error(error);

        }

    }; 

    // Fetch all clients
    const fetchClients = async () => {

        try {

            const response = await getClients();

            setClients(response.data);

        } catch (error) {

            console.error(error);

        }

    }; 

    // Open Renew dialog
    const handleRenew = (renewal) => {

        setSelectedRenewal(renewal);

        setOpenDialog(true);

    }; 
    // Renew subscription
    const handleRenewSubscription = async () => {

        try {

            await renewSubscription(selectedRenewal._id); 

            toast.success(
                "Subscription renewed successfully."
            );

            setOpenDialog(false);

            fetchRenewals();

        } catch (error) {

            console.error(error);

            toast.error(
                "Failed to renew subscription."
            );

        }

    }; 

    useEffect(() => {

        fetchRenewals();

        fetchProducts();

        fetchClients();

    }, []); 

    // Search + Renewal Window filter
    const filteredRenewals = renewals.filter((renewal) => {

        const search = searchTerm.toLowerCase();

        const matchesSearch =
            renewal.client?.companyName
                ?.toLowerCase()
                .includes(search) ||

            renewal.product?.productName
                ?.toLowerCase()
                .includes(search) ||

            renewal.planName
                ?.toLowerCase()
                .includes(search); 

        const matchesClient =
            clientFilter === "All"
                ? true
                : renewal.client?._id === clientFilter; 

        const matchesProduct =
            productFilter === "All"
                ? true
                : renewal.product?._id === productFilter;

        const matchesWindow =
            windowFilter === "All"
                ? true
                : renewal.renewalWindow === windowFilter; 

        const matchesPayment =
            paymentFilter === "All"
                ? true
                : paymentFilter === "Overdue"
                    ? renewal.currentStatus === "Expired" &&
                    renewal.paymentStatus !== "Paid"
                    : renewal.paymentStatus === paymentFilter; 

        return (
            matchesSearch &&
            matchesClient &&
            matchesProduct &&
            matchesWindow &&
            matchesPayment
        ); 
    });

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DashboardLayout>

                <Box>

                <Typography
                    variant="h4"
                    gutterBottom
                >
                    Renewal Tracking
                </Typography>

                {/* ======================= FILTER ROW 1 ======================= */}
                <Grid
                    container
                    spacing={2}
                    sx={{ mb: 2 }}
                >

                    {/* Search */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Search by Client, Product or Plan"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Grid>

                    {/* Client */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <FormControl fullWidth>
                            <InputLabel>Client</InputLabel>

                            <Select
                                value={clientFilter}
                                label="Client"
                                onChange={(e) => setClientFilter(e.target.value)}
                            >
                                <MenuItem value="All">All</MenuItem>

                                {clients.map((client) => (
                                    <MenuItem
                                        key={client._id}
                                        value={client._id}
                                    >
                                        {client.companyName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Product */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <FormControl fullWidth>
                            <InputLabel>Product</InputLabel>

                            <Select
                                value={productFilter}
                                label="Product"
                                onChange={(e) => setProductFilter(e.target.value)}
                            >
                                <MenuItem value="All">All</MenuItem>

                                {products.map((product) => (
                                    <MenuItem
                                        key={product._id}
                                        value={product._id}
                                    >
                                        {product.productName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                </Grid> 

                    {/* ======================= FILTER ROW 2 ======================= */}
                    <Grid
                        container
                        spacing={2}
                        sx={{ mb: 2 }}
                    >

                        {/* Renewal Window */}
                        <Grid size={{ xs: 12, md: 3 }}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Renewal Window</InputLabel>

                                <Select
                                    value={windowFilter}
                                    label="Renewal Window"
                                    onChange={(e) => setWindowFilter(e.target.value)}
                                >
                                    <MenuItem value="All">All</MenuItem>
                                    <MenuItem value="7 Days">7 Days</MenuItem>
                                    <MenuItem value="15 Days">15 Days</MenuItem>
                                    <MenuItem value="30 Days">30 Days</MenuItem>
                                    <MenuItem value="Upcoming">Upcoming</MenuItem>
                                    <MenuItem value="Expired">Expired</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Payment Status */}
                        <Grid size={{ xs: 12, md: 3 }}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Payment Status</InputLabel>

                                <Select
                                    value={paymentFilter}
                                    label="Payment Status"
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

                        {/* From Date */}
                        <Grid size={{ xs: 12, md: 3 }}>
                            <DatePicker
                                label="From Date"
                                value={fromDate}
                                onChange={(newValue) => setFromDate(newValue)}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        size: "small",
                                    },
                                }}
                            />
                        </Grid>

                        {/* To Date */}
                        <Grid size={{ xs: 12, md: 3 }}>
                            <DatePicker
                                label="To Date"
                                value={toDate}
                                onChange={(newValue) => setToDate(newValue)}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        size: "small",
                                    },
                                }}
                            />
                        </Grid>

                    </Grid> 
                            
                <Typography color="text.secondary">

                    Showing {filteredRenewals.length} of {renewals.length} Records

                </Typography>

                <RenewalTable
                    renewals={filteredRenewals}
                    onRenew={handleRenew}
                /> 
                <Dialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>
                        Renew Subscription
                    </DialogTitle>

                    <DialogContent>

                        <Typography sx={{ mb: 2 }}>
                            Are you sure you want to renew this subscription?
                        </Typography>

                        <Typography>
                            <strong>Client:</strong>{" "}
                            {selectedRenewal?.client?.companyName}
                        </Typography>

                        <Typography>
                            <strong>Product:</strong>{" "}
                            {selectedRenewal?.product?.productName}
                        </Typography>

                        <Typography>
                            <strong>Billing Cycle:</strong>{" "}
                            {selectedRenewal?.billingCycle}
                        </Typography>

                        <Typography>
                            <strong>Current Renewal Date:</strong>{" "}
                            {selectedRenewal &&
                                formatDate(selectedRenewal.renewalDate)}
                        </Typography>

                        <Typography
                            sx={{
                                mt: 2,
                                color: "primary.main",
                                fontWeight: 600,
                            }}
                        >
                            The next renewal date will be calculated automatically.
                        </Typography>

                    </DialogContent> 
                    <DialogActions>

                        <Button
                            onClick={() => setOpenDialog(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="contained"
                            onClick={handleRenewSubscription}
                        >
                            Renew
                        </Button>

                    </DialogActions>

                </Dialog> 

                        </Box>

                    </DashboardLayout>
                </LocalizationProvider>
                ); 

}; 

export default RenewalTracking; 