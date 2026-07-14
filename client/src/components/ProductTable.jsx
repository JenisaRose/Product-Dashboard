import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, 
  Chip, 
  IconButton,         // MUI IconButton 
  Tooltip,           // MUI Tooltip 
} from "@mui/material"; // MUI Table 
import { Pencil, Trash2 } from "lucide-react"; // Lucide React Icons 
import { formatDate } from "../utils/formatDate"; 

function ProductTable({ products, onEdit, onDelete }) { 
  return (
    <Paper elevation={3} sx={{ borderRadius: 3 }}> {/* MUI Paper */}
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          borderRadius: 3,
        }}
      > 
    <Table>
      <TableHead>
            <TableRow 
            hover 
              sx={{
                transition: "all 0.25s ease",

                "&:hover": {
                  backgroundColor: "#F5F9FF",
                },
              }} 
            > 
    <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
    <TableCell sx={{ fontWeight: 700 }}>Code</TableCell>
    <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
    <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
    <TableCell sx={{ fontWeight: 700 }}>Version</TableCell>
    <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
    <TableCell sx={{ fontWeight: 700 }}>Owner Team</TableCell>
    <TableCell sx={{ fontWeight: 700 }}>Launch Date</TableCell>
    <TableCell sx={{ fontWeight: 700 }}>Created Date</TableCell>
    <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
  </TableRow>
</TableHead> 

          {/* MUI TableBody */} 
      <TableBody>          
  {products.length > 0 ? (
    products.map((product) => ( 
      <TableRow
        key={product._id}
        hover
        sx={{
          transition: "all 0.25s ease",

          "&:hover": {
            backgroundColor: "#F5F9FF",
          },
        }}
      >       
        {/* MUI TableRow */} 
            <TableCell>{product.productName}</TableCell>
            <TableCell>{product.productCode}</TableCell>
            <TableCell>{product.category}</TableCell> 
            <TableCell>{product.description}</TableCell> 
            <TableCell>{product.version}</TableCell>
            <TableCell>
          {/* MUI Chip */} 
  <Chip
    label={product.status}
    color={
      product.status === "Active"
        ? "success"
        : product.status === "Inactive"
        ? "default"
        : product.status === "Under Development"
        ? "warning"
        : "error"
    }
    size="small"
  /> 
</TableCell> 
            <TableCell>{product.ownerTeam}</TableCell> 
            <TableCell> 
          {formatDate(product.launchDate)} 
</TableCell> 

<TableCell>
          {formatDate(product.createdAt)} 
</TableCell> 
            {/* Product actions */} 
        <TableCell
          align="center"
          sx={{
            whiteSpace: "nowrap",
            minWidth: 90,
          }}
        >
          <Tooltip title="Edit">
            <IconButton
              color="primary"
              onClick={() => onEdit(product)}
              sx={{
                transition: "0.2s",
                "&:hover": {
                  color: "#1976d2",
                  transform: "scale(1.15)",
                },
              }}
            >
              <Pencil size={18} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={() => onDelete(product._id)}
              sx={{
                transition: "0.2s",
                "&:hover": {
                  color: "#d32f2f",
                  transform: "scale(1.15)",
                },
              }}
            >
              <Trash2 size={18} />
            </IconButton>
          </Tooltip>
        </TableCell> 
          </TableRow>
        )) 
  ) : (
    <TableRow>
      <TableCell
  colSpan={10}
  align="center"
  sx={{ py: 2.5 }}
> 
        No such product found.
      </TableCell>
    </TableRow> 
  )}
      </TableBody>  
        </Table>
  </TableContainer>
</Paper> 
  );
} 

export default ProductTable; 