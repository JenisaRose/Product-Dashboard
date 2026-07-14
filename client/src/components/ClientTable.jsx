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
} from "@mui/material";

import { Pencil, Trash2 } from "lucide-react";

function ClientTable({ clients, onEdit, onDelete }) {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
      }}
    >
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          borderRadius: 3,
        }}
      >
        <Table>
          {/* Table Header */}
          <TableHead>
            <TableRow
              hover
              sx={{
                "&:hover": {
                  bgcolor: "#F5F9FF",
                },
              }}
            >
              <TableCell sx={{ fontWeight: 700 }}>Company</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Contact Person</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Address</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Industry</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Internal Notes</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {clients.length > 0 ? (
              clients.map((client) => (
                <TableRow
                  key={client._id}
                  hover
                  sx={{
                    transition: "all 0.25s ease",

                    "&:hover": {
                      backgroundColor: "#F5F9FF",
                    },
                  }}
                >
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
                      sx={{
                        transition: "0.25s",

                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    />
                  </TableCell>

                  <TableCell>{client.internalNotes}</TableCell>

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
                        onClick={() => onEdit(client)}
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
                        onClick={() => onDelete(client._id)}
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
                  colSpan={9}
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