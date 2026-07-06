import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material"; // MUI Table 
import { Pencil, Trash2 } from "lucide-react"; // Lucide Icons 

function ClientTable({ clients, onEdit, onDelete }) { 
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
      }}
    >
      {/* MUI Table */}
      <TableContainer>
        <Table>
          {/* MUI TableHead */}
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Company</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Contact Person</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell> 
              <TableCell sx={{ fontWeight: 700 }}>Address</TableCell> 
              <TableCell sx={{ fontWeight: 700 }}>Industry</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell> 
              <TableCell sx={{ fontWeight: 700 }}>Internal Notes</TableCell> 
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          {/* MUI TableBody */}
          <TableBody>
            {clients.length > 0 ? (
              clients.map((client) => (
                <TableRow key={client._id}>
                 <TableCell>{client.companyName}</TableCell>

<TableCell>{client.contactPerson}</TableCell>

<TableCell>{client.email}</TableCell>

<TableCell>{client.phone}</TableCell>

<TableCell>{client.address}</TableCell>

<TableCell>{client.industry}</TableCell>

<TableCell>
  <Chip
    label={client.status}
    color={
      client.status === "Active"
        ? "success"
        : client.status === "Inactive"
        ? "default"
        : "warning"
    }
    size="small"
  />
</TableCell> {/* MUI Chip */}

<TableCell>{client.internalNotes}</TableCell>

<TableCell>
  {/* Edit Button */}
  <Tooltip title="Edit">
    <IconButton
      color="primary"
      onClick={() => onEdit(client)}
    >
      <Pencil size={18} />
    </IconButton>
  </Tooltip>

  {/* Delete Button */}
  <Tooltip title="Delete">
    <IconButton
      color="error"
      onClick={() => onDelete(client._id)}
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
                  colSpan={7}
                  align="center"
                  sx={{ py: 2.5 }}
                >
                  No clients found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default ClientTable; 