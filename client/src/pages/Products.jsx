import { useEffect, useState } from "react";
import { getProducts, deleteProduct} from "../api/productApi"; 
import ProductForm from "../components/ProductForm";  
import ProductTable from "../components/ProductTable"; 

function Products() {

  // Stores all products received from the backend
  const [products, setProducts] = useState([]); 
  // Stores the product currently being edited
const [selectedProduct, setSelectedProduct] = useState(null); 
console.log(selectedProduct); 

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

    // Refresh the product list
    fetchProducts();
  } catch (error) {
    console.error("Error deleting product:", error);
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

  return (
  <div>
    <h1>Product Dashboard</h1>

    {/* Form for adding a new product */}
    <ProductForm
    onProductAdded={fetchProducts}
    selectedProduct={selectedProduct} 
    clearSelectedProduct={() => setSelectedProduct(null)} 
    /> 
    <hr />

    {/* Display all products */}
    <ProductTable
    products={products}
    onEdit={setSelectedProduct} 
    onDelete={handleDelete} 
/> 
  </div>
); 
}

export default Products; 