import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api/productApi";

import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import DashboardLayout from "../layouts/DashboardLayout"; // Custom Layout 
import toast from "react-hot-toast"; 

import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material"; // MUI Form Components 
import { Box } from "@mui/material"; 

function Products() {
  // Stores all products received from the backend
  const [products, setProducts] = useState([]);

  // Stores the text entered in the search box
  const [searchTerm, setSearchTerm] = useState("");

  // Stores the product currently being edited
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Stores selected filters
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Fetch products automatically when the page loads
  useEffect(() => {
    fetchProducts();
  }, []);

  // Deletes a product after user confirmation
  async function handleDelete(productId) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  try {
    await deleteProduct(productId);

    toast.success("Product deleted successfully");

    fetchProducts();
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Something went wrong");
  }
}

async function fetchProducts() {
  try {
    const response = await getProducts();
    setProducts(response.data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
} 

  // Get unique categories from all products
  const categories = [...new Set(products.map((product) => product.category))]; 
  // Filters products based on product name, product code, category and status
  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      product.productName.toLowerCase().includes(search) ||
      product.productCode.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "" || product.status === statusFilter;

    const matchesCategory =
      categoryFilter === "" || product.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <DashboardLayout>
  <Box sx={{ p: 3 }}>
    <h1>Product Dashboard</h1>

    <ProductForm
      onProductAdded={fetchProducts}
      selectedProduct={selectedProduct}
      clearSelectedProduct={() => setSelectedProduct(null)}
    />

    <hr />


        {/* MUI Stack */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          {/* MUI TextField */}
          <TextField
            label="Search Products"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            fullWidth
          />

          {/* MUI FormControl */}
          <FormControl sx={{ minWidth: 180 }}>
            {/* MUI InputLabel */}
            <InputLabel>Status</InputLabel>

            {/* MUI Select */}
            <Select
              value={statusFilter}
              label="Status"
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              {/* MUI MenuItem */}
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="Under Development">
                Under Development
              </MenuItem>
              <MenuItem value="Discontinued">Discontinued</MenuItem>
            </Select>
          </FormControl>

          {/* MUI FormControl */}
          <FormControl sx={{ minWidth: 200 }}>
            {/* MUI InputLabel */}
            <InputLabel>Category</InputLabel>

            {/* MUI Select */}
            <Select
              value={categoryFilter}
              label="Category"
              onChange={(event) => setCategoryFilter(event.target.value)}
            >
              {/* MUI MenuItem */}
              <MenuItem value="">All Categories</MenuItem>

              {categories.map((category) => (
                <MenuItem
                  key={category}
                  value={category}
                >
                  {category}
                </MenuItem>
              ))} 
            </Select>
          </FormControl>
        </Stack>

        {/* Product Table */}
        <ProductTable
          products={filteredProducts}
          onEdit={setSelectedProduct}
          onDelete={handleDelete}
        />
      </Box> 
    </DashboardLayout>
  );
} 

export default Products; 