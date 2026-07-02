import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

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

      {products.map((product) => (
  <div
    key={product._id}
    style={{
      border: "1px solid #ccc",
      padding: "15px",
      marginBottom: "10px",
      borderRadius: "8px",
    }}
  >
    <h3>{product.productName}</h3>

    <p><strong>Code:</strong> {product.productCode}</p>

    <p><strong>Category:</strong> {product.category}</p>

    <p><strong>Version:</strong> {product.version}</p>

    <p><strong>Status:</strong> {product.status}</p>

    <p><strong>Owner Team:</strong> {product.ownerTeam}</p>
  </div>
))} 
    </div>
  );
}

export default Products; 