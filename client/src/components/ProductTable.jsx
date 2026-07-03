function ProductTable({ products, onEdit, onDelete }) { 
  return (
    <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        {/* Table headings */}
        <tr>
          <th>Name</th>
          <th>Code</th>
          <th>Category</th>
          <th>Version</th>
          <th>Status</th>
          <th>Owner Team</th> 
          <th>Actions</th> 
        </tr>
      </thead>

      <tbody>
        {/* Render one row for every product */}
        {products.map((product) => (
          <tr key={product._id}>
            <td>{product.productName}</td>
            <td>{product.productCode}</td>
            <td>{product.category}</td>
            <td>{product.version}</td>
            <td>{product.status}</td>
            <td>{product.ownerTeam}</td> 
            {/* Product actions */} 
            <td>
    <button onClick={() => onEdit(product)}>
        Edit
    </button>

    <button onClick={() => onDelete(product._id)}>
    Delete
    </button> 
</td> 
          </tr>
        ))}
      </tbody>
    </table>
  );
} 

export default ProductTable; 