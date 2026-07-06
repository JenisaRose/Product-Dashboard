import { useState, useEffect } from "react"; 

// MUI Components
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"; // MUI Form Components 

// React Hot Toast
import toast from "react-hot-toast";

// Client API
import { createClient, updateClient } from "../api/clientApi"; 

function ClientForm({
  onClientAdded,
  selectedClient,
  clearSelectedClient,
}) { 
  const [formData, setFormData] = useState({
  companyName: "",
  contactPerson: "",
  email: "",
  phone: "",
  address: "",
  industry: "",
  status: "Active",
  internalNotes: "",
}); 
useEffect(() => {
  if (selectedClient) {
    setFormData({
      companyName: selectedClient.companyName,
      contactPerson: selectedClient.contactPerson,
      email: selectedClient.email,
      phone: selectedClient.phone,
      address: selectedClient.address,
      industry: selectedClient.industry,
      status: selectedClient.status,
      internalNotes: selectedClient.internalNotes, 
    });
  }
}, [selectedClient]); 

  // Handle input change
  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  // Save client
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (selectedClient) {
  await updateClient(selectedClient._id, formData);
  toast.success("Client updated successfully");
} else {
  await createClient(formData);
  toast.success("Client added successfully");
} 

      setFormData({
  companyName: "",
  contactPerson: "",
  email: "",
  phone: "",
  address: "",
  industry: "",
  status: "Active",
  internalNotes: "",
}); 

      onClientAdded(); 
      clearSelectedClient(); 
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong."
      );
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h5" mb={3}>
        Add Client
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* MUI Grid */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            {/* MUI TextField */}
            <TextField
              fullWidth
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            {/* MUI TextField */}
            <TextField
              fullWidth
              label="Contact Person"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            {/* MUI TextField */}
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            {/* MUI TextField */}
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            {/* MUI TextField */}
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            {/* MUI TextField */}
            <TextField
              fullWidth
              label="Industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
            />
          </Grid> 

          <Grid size={{ xs: 12, md: 6 }}>
  {/* MUI FormControl */}
  <FormControl fullWidth>
    {/* MUI InputLabel */}
    <InputLabel>Status</InputLabel>

    {/* MUI Select */}
    <Select
      name="status"
      value={formData.status}
      label="Status"
      onChange={handleChange}
    >
      {/* MUI MenuItem */}
      <MenuItem value="Active">Active</MenuItem>
      <MenuItem value="Inactive">Inactive</MenuItem>
      <MenuItem value="Prospect">Prospect</MenuItem>
    </Select>
  </FormControl>
</Grid> 

          <Grid size={{ xs: 12 }}>
            {/* MUI TextField */}
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Internal Notes"
              name="internalNotes"
              value={formData.internalNotes} 
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            {/* MUI Button */}
           <Button
  type="submit"
  variant="contained"   // MUI Button
  size="large"
  sx={{ mt: 2 }}
>
  {selectedClient ? "Update Client" : "Add Client"}
</Button> 
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default ClientForm; 