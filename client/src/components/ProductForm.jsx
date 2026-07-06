import { useState, useEffect } from "react"; 
import { createProduct, updateProduct } from "../api/productApi"; 
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
} from "@mui/material"; // MUI Form Components 
import toast from "react-hot-toast"; // React Hot Toast 

function ProductForm({ onProductAdded, selectedProduct, clearSelectedProduct,}) { 
      // Stores all values entered in the product form
  const [formData, setFormData] = useState({
    productName: "",
    productCode: "",
    category: "",
    description: "",
    version: "",
    status: "Active",
    ownerTeam: "",
    launchDate: "",
  }); 
  const [message, setMessage] = useState(""); 
  useEffect(() => {
  if (selectedProduct) {
    setFormData({
      productName: selectedProduct.productName,
      productCode: selectedProduct.productCode,
      category: selectedProduct.category,
      description: selectedProduct.description,
      version: selectedProduct.version,
      status: selectedProduct.status,
      ownerTeam: selectedProduct.ownerTeam,
      launchDate: selectedProduct.launchDate
        ? selectedProduct.launchDate.split("T")[0]
        : "",
    });
  }
}, [selectedProduct]); 
  // Updates the corresponding field whenever the user types
function handleChange(event) { 
    
  const { name, value } = event.target;

  setFormData((previousData) => ({
    ...previousData,
    [name]: value,
  })); 
  console.log(formData); 
} 
// Handles form submission and sends product data to the backend
async function handleSubmit(event) { 
    console.log("Submit button clicked"); 
  event.preventDefault();

  try {
    if (selectedProduct) {
    // Update the selected product
    await updateProduct(selectedProduct._id, formData);

    setMessage("✅ Product updated successfully!"); 
    toast.success("Product updated successfully"); 
} else {
    // Create a new product
    await createProduct(formData);

    setMessage("✅ Product added successfully!"); 
    toast.success("Product added successfully"); 
} 

// Refresh the product list in the parent component
onProductAdded(); 
// Exit edit mode after successful save
clearSelectedProduct(); 

// Clear the form after successful submission
setFormData({
  productName: "",
  productCode: "",
  category: "",
  description: "",
  version: "",
  status: "Active",
  ownerTeam: "",
  launchDate: "",
});

setMessage("✅ Product added successfully!"); 
setTimeout(() => {
    setMessage("");
}, 3000); 
} 
catch (error) {
    console.error("Error adding product:", error);

    setMessage(
        error.response?.data?.message || "Something went wrong."
    ); 
    toast.error(error.response?.data?.message || "Something went wrong"); 

    setTimeout(() => {
        setMessage("");
    }, 3000);
} 
} 
  return ( 
     <Paper
    elevation={3} // MUI Paper
    sx={{
      p: 3,
      borderRadius: 3,
      mb: 4,
    }}
  > 
    <div>
     <Typography variant="h5" mb={3}> 
  Add Product
 </Typography>                  {/*MUI Typography  */} 
      {message && (
    <p
        style={{
            color: message.includes("successfully")
                ? "green"
                : "red",
            fontWeight: "bold",
        }}
    >
        {message}
    </p>
)} 

      <form onSubmit={handleSubmit}> 
       <Grid container spacing={2}>

  <Grid size={{ xs: 12 }}>
    <TextField
      label="Product Name"
      name="productName"
      value={formData.productName}
      onChange={handleChange}
      fullWidth
    />
  </Grid>                           {/* MUI TextField  */} 

<Grid size={{ xs: 12, md: 6 }}>
       <TextField
  label="Product Code"
  name="productCode"
  value={formData.productCode}
  onChange={handleChange}
  fullWidth 
 />                                      {/*MUI TextField */} 
 </Grid> 

<Grid size={{ xs: 12, md: 6 }}>
        <TextField
  label="Category"
  name="category"
  value={formData.category}
  onChange={handleChange}
  fullWidth 
 />                            {/*MUI TextField */} 
 </Grid>

<Grid size={{ xs: 12 }}>       {/* Description TextField */} 
       <TextField
  label="Description"
  name="description"
  value={formData.description}
  onChange={handleChange}
  fullWidth
  multiline
  rows={4} 
 />                            {/*MUI TextField */} 
 </Grid> 

 <Grid size={{ xs: 12, md: 6 }}>
        <TextField
  label="Version"
  name="version"
  value={formData.version}
  onChange={handleChange}
  fullWidth 
 />                   {/*MUI TextField */} 
 </Grid> 

<Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth> 
  <InputLabel>Status</InputLabel>

  <Select
    name="status"
    value={formData.status}
    label="Status"
    onChange={handleChange}
  >
    <MenuItem value="Active">Active</MenuItem>
    <MenuItem value="Inactive">Inactive</MenuItem>
    <MenuItem value="Under Development">Under Development</MenuItem>
    <MenuItem value="Discontinued">Discontinued</MenuItem>
  </Select>
 </FormControl>               {/*MUI Select */} 
 </Grid> 

        <Grid size={{ xs: 12, md: 6 }}>
        <TextField
  label="Owner Team"
  name="ownerTeam"
  value={formData.ownerTeam}
  onChange={handleChange}
  fullWidth 
/>                            {/*MUI TextField */} 
</Grid>  

<Grid size={{ xs: 12, md: 6 }}>
        <TextField
  label="Launch Date"
  type="date"
  name="launchDate"
  value={formData.launchDate}
  onChange={handleChange}
  fullWidth 
  slotProps={{
  inputLabel: {
    shrink: true,
  },
}} 
/>                            {/*MUI TextField */} 
</Grid> 

<Grid size={{ xs: 12 }}> 
        <Button
  type="submit"
  variant="contained"
  size="large"
  sx={{ mt: 2 }}
>
  {selectedProduct ? "Update Product" : "Add Product"}
</Button>               {/*MUI Button */} 
</Grid> 

      </Grid> 
      </form> 
    </div> 
    </Paper> 
  ); 
}

export default ProductForm; 