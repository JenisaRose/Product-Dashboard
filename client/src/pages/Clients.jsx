import DashboardLayout from "../layouts/DashboardLayout"; // Custom Layout
import {
  Box,
  TextField,
  Stack, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button, 
} from "@mui/material"; 
import ClientForm from "../components/ClientForm"; // Client Form 
import { useEffect, useState } from "react"; 
import { getClients, deleteClient } from "../api/clientApi"; // Client API 
import ClientTable from "../components/ClientTable"; 
import toast from "react-hot-toast"; 

function Clients() { 
    // Stores all clients
const [clients, setClients] = useState([]); 
// Stores the search text
const [searchTerm, setSearchTerm] = useState(""); 
// Stores the client currently being edited
const [selectedClient, setSelectedClient] = useState(null); 
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);  


async function fetchClients() {
  try {
    const response = await getClients();
    setClients(response.data);
  } catch (error) {
    console.error("Error fetching clients:", error);
  }
} 
useEffect(() => {
  fetchClients(); 
}, []); 
// Delete a client
  const handleDeleteClick = (client) => {
    setSelectedClient(client);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteClient(selectedClient._id);

      toast.success("Client deleted successfully");

      fetchClients();

      setDeleteDialogOpen(false);
      setSelectedClient(null);

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }; 

async function fetchClients() {
  try {
    const response = await getClients();

    setClients(response.data);
  } catch (error) {
    console.error("Error fetching clients:", error);
  }
} 

// Filter clients based on company name, contact person,
// email or phone
const filteredClients = clients.filter((client) => {
  const search = searchTerm.toLowerCase();

  return (
    client.companyName.toLowerCase().includes(search) ||
    client.contactPerson.toLowerCase().includes(search) ||
    client.email.toLowerCase().includes(search) ||
    client.phone.toLowerCase().includes(search)
  );
}); 

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}> 
        <h1 style={{ fontSize: "40px" }}>Client Dashboard</h1> 


<ClientForm
  onClientAdded={fetchClients}
  selectedClient={selectedClient}
  clearSelectedClient={() => setSelectedClient(null)}
/>

<hr />

<Stack
  direction={{ xs: "column", md: "row" }}
  spacing={2}
  sx={{
    mt: 0,
    mb: 3,
  }}
> 
  <TextField
    label="Search Clients"
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
</Stack> 

        <ClientTable
          clients={filteredClients}
          onEdit={setSelectedClient}
          onDelete={handleDeleteClick}
        /> 
      </Box> 
      <Dialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSelectedClient(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            color: "#d32f2f",
            fontWeight: "bold",
          }}
        >
          Delete Client?
        </DialogTitle>

        <DialogContent dividers>

          <Typography>
            This action cannot be undone.
          </Typography>

          <Typography sx={{ mt: 2 }}>
            Deleting this client will also remove all related:
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
              setSelectedClient(null);
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

export default Clients; 