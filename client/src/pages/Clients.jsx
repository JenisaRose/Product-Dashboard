import DashboardLayout from "../layouts/DashboardLayout"; // Custom Layout
import {
  Box,
  TextField,
  Stack,
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
async function handleDelete(clientId) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this client?"
  );

  if (!confirmDelete) return;

  try {
    await deleteClient(clientId);

    toast.success("Client deleted successfully");

    fetchClients();
  } catch (error) {
    console.log(error);
    toast.error(
      error.response?.data?.message || "Something went wrong"
    );
  }
}

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
        <h1>Client Dashboard</h1> 


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
  />
</Stack> 

<ClientTable
  clients={filteredClients} 
  onEdit={setSelectedClient}
  onDelete={handleDelete}
/> 
      </Box>
    </DashboardLayout>
  );
}

export default Clients; 