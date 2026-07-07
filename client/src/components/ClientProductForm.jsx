import { useState, useEffect } from "react";

import {
  createClientProduct,
  updateClientProduct,
} from "../api/clientProductApi";

import { getClients } from "../api/clientApi";
import { getProducts } from "../api/productApi";

import toast from "react-hot-toast";

import {
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
} from "@mui/material"; 

function ClientProductForm({
  onAssignmentAdded,
  selectedAssignment,
  clearSelectedAssignment,
}) { 
    const [clients, setClients] = useState([]);
const [products, setProducts] = useState([]); 
const [formData, setFormData] = useState({
  client: "",
  product: "",
  planName: "",
  billingCycle: "Monthly",
  amount: "",
  currency: "INR",
  startDate: "",
  renewalDate: "",
  paymentStatus: "Pending",
  remarks: "",
}); 
useEffect(() => {
  fetchClients();
  fetchProducts();
}, []); 
async function fetchClients() {
  try {
    const response = await getClients();
    setClients(response.data);
  } catch (error) {
    console.error(error);
  }
} 
async function fetchProducts() {
  try {
    const response = await getProducts();
    setProducts(response.data);
  } catch (error) {
    console.error(error);
  }
} 

useEffect(() => {
  if (selectedAssignment) {
    setFormData({
      client: selectedAssignment.client._id,
      product: selectedAssignment.product._id,
      planName: selectedAssignment.planName,
      billingCycle: selectedAssignment.billingCycle,
      amount: selectedAssignment.amount,
      currency: selectedAssignment.currency,
      startDate: selectedAssignment.startDate
        ? selectedAssignment.startDate.split("T")[0]
        : "",
      renewalDate: selectedAssignment.renewalDate
        ? selectedAssignment.renewalDate.split("T")[0]
        : "",
      paymentStatus: selectedAssignment.paymentStatus,
      remarks: selectedAssignment.remarks,
    });
  }
}, [selectedAssignment]); 

// Calculates the renewal date based on the billing cycle
function calculateRenewalDate(startDate, billingCycle) {
  if (!startDate) return "";

  const renewal = new Date(startDate);

  switch (billingCycle) {
    case "Monthly":
      renewal.setMonth(renewal.getMonth() + 1);
      break;

    case "Quarterly":
      renewal.setMonth(renewal.getMonth() + 3);
      break;

    case "Half Yearly":
      renewal.setMonth(renewal.getMonth() + 6);
      break;

    case "Yearly":
      renewal.setFullYear(renewal.getFullYear() + 1);
      break;

    default:
      return "";
  }

  return renewal.toISOString().split("T")[0];
} 

// Updates the corresponding field whenever the user changes an input
function handleChange(event) {
  const { name, value } = event.target;

  setFormData((previousData) => {
    // Update the changed field
    const updatedData = {
      ...previousData,
      [name]: value,
    };

    // Automatically calculate Renewal Date whenever
    // Start Date or Billing Cycle changes
    if (
      name === "startDate" ||
      name === "billingCycle"
    ) {
      updatedData.renewalDate = calculateRenewalDate(
        updatedData.startDate,
        updatedData.billingCycle
      );
    }

    return updatedData;
  });
} 

// Handles form submission
async function handleSubmit(event) {
  event.preventDefault();

  // Ensure a Start Date has been selected
if (!formData.startDate) {
  toast.error("Please select a Start Date.");
  return;
}

// Renewal Date should already be calculated automatically
if (!formData.renewalDate) {
  toast.error("Renewal Date could not be calculated.");
  return;
} 
  try {
    if (selectedAssignment) {
      // Update an existing assignment
      await updateClientProduct(selectedAssignment._id, formData);

      toast.success("Assignment updated successfully");
    } else {
      // Create a new assignment
      await createClientProduct(formData);

      toast.success("Product assigned successfully");
    }

    // Refresh the assignment list
    onAssignmentAdded();

    // Exit edit mode
    clearSelectedAssignment();

    // Reset the form
    setFormData({
      client: "",
      product: "",
      planName: "",
      billingCycle: "Monthly",
      amount: "",
      currency: "INR",
      startDate: "",
      renewalDate: "",
      paymentStatus: "Pending",
      remarks: "",
    });
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message || "Something went wrong."
    );
  }
} 

return (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      borderRadius: 3,
      mb: 4,
    }}
  >
    <Typography variant="h5" mb={3}>
      {selectedAssignment
        ? "Update Product Assignment"
        : "Assign Product"}
    </Typography>

    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>

        {/* Client Dropdown */}
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Client</InputLabel>

            <Select 
              required 
              name="client"
              value={formData.client}
              label="Client"
              onChange={handleChange}
            > 
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

        {/* Product Dropdown */}
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Product</InputLabel>

            <Select 
              required 
              name="product"
              value={formData.product}
              label="Product"
              onChange={handleChange}
            >
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

        {/* Plan Name */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Plan / License Name"
            name="planName"
            value={formData.planName}
            onChange={handleChange}
            autoComplete="off"
          /> 
        </Grid>

        {/* Billing Cycle */}
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Billing Cycle</InputLabel>

            <Select
              name="billingCycle"
              value={formData.billingCycle}
              label="Billing Cycle"
              onChange={handleChange}
            >
              <MenuItem value="Monthly">Monthly</MenuItem>
              <MenuItem value="Quarterly">Quarterly</MenuItem>
              <MenuItem value="Half Yearly">
                Half Yearly
              </MenuItem>
              <MenuItem value="Yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Amount */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            type="number"
            label="Amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            slotProps={{
              htmlInput: {
              min: 1,
            },
            }}
           />
        </Grid> 
                {/* Currency */}
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Currency</InputLabel>

            <Select
              name="currency"
              value={formData.currency}
              label="Currency"
              onChange={handleChange}
            >
              <MenuItem value="INR">INR</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Start Date */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField 
            required 
            fullWidth
            type="date"
            label="Start Date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </Grid>

        {/* Renewal Date */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            type="date"
            label="Renewal Date"
            name="renewalDate"
            value={formData.renewalDate}
            disabled 
             helperText="Automatically calculated from the Start Date and Billing Cycle" 
            slotProps={{
              inputLabel: {
                shrink: true,
               },
              }}
          /> 
        </Grid>

        {/* Payment Status */}
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Payment Status</InputLabel>

            <Select
              name="paymentStatus"
              value={formData.paymentStatus}
              label="Payment Status"
              onChange={handleChange}
            >
              <MenuItem value="Paid">Paid</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Partial">Partial</MenuItem>
              <MenuItem value="Overdue">Overdue</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Remarks */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Remarks"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
          />
        </Grid>

        {/* Submit Button */}
        <Grid size={{ xs: 12 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
          >
            {selectedAssignment
              ? "Update Assignment"
              : "Assign Product"}
          </Button>
        </Grid>

      </Grid>
    </form>
  </Paper>
); 
} 

export default ClientProductForm; 
