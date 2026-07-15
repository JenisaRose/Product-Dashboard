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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button, 
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); 

  // Fetch products automatically when the page loads
  useEffect(() => {
    fetchProducts();
  }, []);

  // Deletes a product after user confirmation
  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(selectedProduct._id);

      toast.success("Product deleted successfully");

      fetchProducts();

      setDeleteDialogOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }; 

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
        <h1 style={{ fontSize: "40px" }}>Product Dashboard</h1> 

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

          {/* MUI FormControl */}
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
          <FormControl sx={{ 
            minWidth: 200, 

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
          onDelete={handleDeleteClick}
        /> 
      </Box> 
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            color: "#d32f2f",
            fontWeight: "bold",
          }}
        >
          Delete Product?
        </DialogTitle>

        <DialogContent dividers>

          <Typography>
            This action cannot be undone.
          </Typography>

          <Typography sx={{ mt: 2 }}>
            Deleting this product will also remove all related:
          </Typography>

          <Box sx={{ mt: 2, ml: 2 }}>

            <Typography>
              • Assignments
            </Typography>

            <Typography>
              • Payments
            </Typography>

            <Typography>
              • Renewals
            </Typography>

          </Box>

        </DialogContent>

        <DialogActions>

          <Button
            onClick={() => {
              setDeleteDialogOpen(false);
              setSelectedProduct(null);
            }}
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={confirmDelete}
          >
            Delete
          </Button>

        </DialogActions>

      </Dialog> 
    </DashboardLayout>
  );
} 

export default Products; 