import { useState, useEffect } from "react"; 
import { createProduct, updateProduct } from "../api/productApi"; 

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
} else {
    // Create a new product
    await createProduct(formData);

    setMessage("✅ Product added successfully!");
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

    setTimeout(() => {
        setMessage("");
    }, 3000);
} 
} 
  return (
    <div>
      <h2>Add Product</h2> 
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
        <div>
          <label>Product Name</label>
          <input 
          type="text"
        name="productName"
     value={formData.productName}
    onChange={handleChange}
           /> 
        </div>

        <div>
          <label>Product Code</label>
          <input 
          type="text"
        name="productCode"
     value={formData.productCode}
    onChange={handleChange}
           /> 
        </div>

        <div>
          <label>Category</label>
          <input 
          type="text"
        name="category"
     value={formData.category}
    onChange={handleChange}
           /> 
        </div>

        <div>
          <label>Description</label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Version</label>
          <input 
            type="text"
            name="version"
            value={formData.version}
            onChange={handleChange}
          /> 
        </div>

        <div>
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Active</option>
            <option>Inactive</option>
            <option>Under Development</option>
            <option>Discontinued</option>
          </select>
        </div>

        <div>
          <label>Owner Team</label>
          <input 
            type="text"
            name="ownerTeam"
            value={formData.ownerTeam}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Launch Date</label>
          <input 
            type="date"
            name="launchDate"
            value={formData.launchDate}
            onChange={handleChange}
          /> 
        </div>

        <button type="submit">
        {selectedProduct ? "Update Product" : "Add Product"}
        </button> 
      </form>
    </div>
  ); 
}

export default ProductForm; 