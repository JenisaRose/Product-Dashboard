import DashboardLayout from "../layouts/DashboardLayout"; 
import { Typography, Paper, Box } from "@mui/material";
import { motion } from "framer-motion"; 
import { useEffect, useState } from "react";
import { getActivityLogs } from "../api/activityLogApi"; 
import TablePagination from "@mui/material/TablePagination"; 
import HistoryIcon from "@mui/icons-material/History";  
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PersonIcon from "@mui/icons-material/Person";
import PaymentsIcon from "@mui/icons-material/Payments"; 
import TodayIcon from "@mui/icons-material/Today";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CategoryIcon from "@mui/icons-material/Category"; 
import {
    Table,
    TableBody,
    TableCell,
    TableContainer, 
    TextField, 
    TableHead,
    TableRow,
    Chip,
    Button, 
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions, 
    Grid, 
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack, 
    Card,
    CardContent, 
} from "@mui/material"; 

const ActivityLog = () => { 
    const [activityLogs, setActivityLogs] = useState([]); 
    const [searchTerm, setSearchTerm] = useState(""); 
    const [actionFilter, setActionFilter] = useState(""); 
    const [selectedLog, setSelectedLog] = useState(null);
    const [openDialog, setOpenDialog] = useState(false); 
    const [page, setPage] = useState(0); 
    const [rowsPerPage, setRowsPerPage] = useState(10); 

    const handleView = (log) => {
        setSelectedLog(log);
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
        setSelectedLog(null);
    }; 

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }; 

    useEffect(() => {
        const fetchActivityLogs = async () => {
            try {
                const response = await getActivityLogs();
                setActivityLogs(response.data);
            } catch (error) {
                console.error("Error fetching activity logs:", error);
            }
        };

        fetchActivityLogs();
    }, []); 

    const filteredLogs = activityLogs.filter((log) => {
        const search = searchTerm.toLowerCase();

        const matchesSearch =
            log.actionType?.toLowerCase().includes(search) ||
            log.entityName?.toLowerCase().includes(search) ||
            log.performedBy?.name?.toLowerCase().includes(search);

        const matchesAction =
            actionFilter === "" ||
            log.actionType === actionFilter;

        return matchesSearch && matchesAction;
    }); 

    const totalLogs = activityLogs.length;

    const productLogs = activityLogs.filter(
        (log) => log.actionType === "Product Created"
    ).length;

    const clientLogs = activityLogs.filter(
        (log) => log.actionType === "Client Updated"
    ).length;

    const paymentLogs = activityLogs.filter(
        (log) => log.actionType === "Payment Status Changed"
    ).length; 

    const todayLogs = activityLogs.filter((log) => {
        return (
            new Date(log.createdAt).toDateString() ===
            new Date().toDateString()
        );
    }).length;

    const uniqueAdmins = new Set(
        activityLogs.map((log) => log.performedBy?.email)
    ).size;

    const uniqueActions = new Set(
        activityLogs.map((log) => log.actionType)
    ).size; 

    const getChipColor = (action) => {
        switch (action) {
            case "Product Created":
                return "success";

            case "Product Updated":
                return "info";

            case "Product Deleted":
                return "error";

            case "Client Updated":
                return "warning";

            case "Subscription Renewed":
                return "primary";

            case "Payment Status Changed":
                return "secondary";

            default:
                return "default";
        }
    }; 

    return ( 
        <DashboardLayout>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    borderRadius: 3,
                }}
            >
                <Typography variant="h4" fontWeight="bold">
                    Activity Log
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{ mt: 1 }}
                >
                    View all important admin activities performed in the system.
                </Typography> 

                    <Grid
                        container
                        spacing={3}
                        sx={{
                            mt: 2,
                            mb: 5,
                        }} 
                    > 

                        {/* Total Logs */}
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}> 
                            <Card
                                elevation={3}
                                sx={{ 
                                    cursor: "pointer", 
                                    borderLeft: "6px solid #1976D2",
                                    border: "1px solid #90CAF9",
                                    bgcolor: "#F4F9FF", 
                                    opacity: 0.9,
                                    borderRadius: 3,
                                    transition: "all 0.35s cubic-bezier(.4,0,.2,1)", 

                                    "&:hover": {
                                        transform: "translateY(-6px) scale(1.02)",
                                        boxShadow:
                                            "0 8px 20px rgba(0,0,0,.14), 0 0 18px rgba(25,118,210,.42)",
                                    },  
                                }}
                            >
                                <CardContent
                                    sx={{
                                        py: 3,
                                        px: 3,
                                    }}
                                > 
                                    <Box
                                        display="flex"
                                        justifycontent="space-between"
                                        alignitems="flex-end"
                                    > 
                                        <Box>

                                            <Typography
                                                color="text.secondary"
                                                fontWeight={600}
                                            >
                                                Total Logs
                                            </Typography>

                                            <Typography
                                                variant="h2"
                                                fontWeight={700}
                                                sx={{
                                                    lineheight: 1,
                                                }}  
                                            >
                                                {totalLogs}
                                            </Typography>

                                        </Box>

                                        <HistoryIcon
                                            sx={{
                                                fontSize: 58, 
                                                color: "#1976D2",
                                            }}
                                        />

                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Today's Logs */}

                        <Grid size={{ xs: 12, sm: 6, md: 3 }}> 
                            <Card
                                elevation={3}
                                sx={{  
                                    cursor: "pointer", 
                                    borderLeft: "6px solid #2E7D32",
                                    border: "1px solid #A5D6A7",
                                    bgcolor: "#F1FFF5", 
                                    opacity: 0.9, 
                                    borderRadius: 3,
                                    transition: "all 0.35s cubic-bezier(.4,0,.2,1)", 

                                    "&:hover": {
                                        transform: "translateY(-6px) scale(1.02)",
                                        boxShadow:
                                            "0 8px 20px rgba(0,0,0,.14), 0 0 18px rgba(46,125,50,.42)",
                                    },   
                                }} 
                            >
                                <CardContent
                                    sx={{
                                        py: 3,
                                        px: 3,
                                    }}
                                > 
                                    <Box
                                        display="flex"
                                        justifycontent="space-between"
                                        alignitems="flex-end"
                                    > 
                                        <Box>

                                            <Typography
                                                color="text.secondary"
                                                fontWeight={600}
                                            >
                                                Today's Logs
                                            </Typography>

                                            <Typography
                                                variant="h2"
                                                fontWeight={700}
                                                sx={{
                                                    lineheight: 1,
                                                }}  
                                            >
                                                {todayLogs}
                                            </Typography>

                                        </Box>

                                        <TodayIcon
                                            sx={{
                                                fontSize: 58, 
                                                color: "#2E7D32",
                                            }}
                                        />

                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Admins */}

                        <Grid size={{ xs: 12, sm: 6, md: 3 }}> 
                            <Card
                                elevation={3}
                                sx={{ 
                                    cursor: "pointer", 
                                    borderLeft: "6px solid #8E24AA",
                                    border: "1px solid #CE93D8",
                                    bgcolor: "#FCF5FF", 
                                    opacity: 0.9, 
                                    borderRadius: 3,
                                    transition: "all 0.35s cubic-bezier(.4,0,.2,1)", 

                                    "&:hover": {
                                        transform: "translateY(-6px) scale(1.02)",
                                        boxShadow:
                                            "0 8px 20px rgba(0,0,0,.14), 0 0 18px rgba(142,36,170,.42)",
                                    }, 
                                }}
                            >
                                <CardContent
                                    sx={{
                                        py: 3,
                                        px: 3,
                                    }}
                                > 
                                    <Box
                                        display="flex"
                                        justifycontent="space-between"
                                        alignitems="flex-end"
                                    > 
                                        <Box>

                                            <Typography
                                                color="text.secondary"
                                                fontWeight={600}
                                            >
                                                Admins
                                            </Typography>

                                            <Typography
                                                variant="h2"
                                                fontWeight={700}
                                                sx={{
                                                    lineheight: 1,
                                                }}  
                                            >
                                                {uniqueAdmins}
                                            </Typography>

                                        </Box>

                                        <AdminPanelSettingsIcon
                                            sx={{
                                                fontSize: 58, 
                                                color: "#8E24AA",
                                            }}
                                        />

                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Action Types */}

                        <Grid size={{ xs: 12, sm: 6, md: 3 }}> 
                            <Card
                                elevation={3}
                                sx={{  
                                    cursor: "pointer", 
                                    borderLeft: "6px solid #EF6C00",
                                    border: "1px solid #FFCC80",
                                    bgcolor: "#FFF8F0", 
                                    opacity: 0.9, 
                                    borderRadius: 3,
                                    transition: "all 0.35s cubic-bezier(.4,0,.2,1)", 

                                    "&:hover": {
                                        transform: "translateY(-6px) scale(1.02)",
                                        boxShadow:
                                            "0 8px 20px rgba(0,0,0,.14), 0 0 18px rgba(239,108,0,.42)",
                                    },     
                                }}
                            >
                                <CardContent
                                    sx={{
                                        py: 3,
                                        px: 3,
                                    }}
                                > 
                                    <Box
                                        display="flex"
                                        justifycontent="space-between"
                                        alignitems="flex-end"
                                    >
                                        <Box>

                                            <Typography
                                                color="text.secondary"
                                                fontWeight={600}
                                            >
                                                Action Types
                                            </Typography>

                                            <Typography
                                                variant="h2"
                                                fontWeight={700}
                                                sx={{
                                                    lineheight: 1,
                                                }}  
                                            >
                                                {uniqueActions}
                                            </Typography>

                                        </Box>

                                        <CategoryIcon
                                            sx={{
                                                fontSize: 58, 
                                                color: "#EF6C00",
                                            }}
                                        /> 

                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                    </Grid> 

                <Box sx={{ mt: 4 }}> 

                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={2}
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
                        >
                        <TextField
                            fullWidth
                            placeholder="Search by action, entity or admin..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            variant="outlined" 
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
                            <FormControl sx={{ minWidth: 220 }}>
                                <InputLabel>Action</InputLabel>

                                <Select
                                    value={actionFilter}
                                    label="Action"
                                    onChange={(e) => setActionFilter(e.target.value)}
                                >
                                    <MenuItem value="">All Actions</MenuItem>

                                    <MenuItem value="Product Created">
                                        Product Created
                                    </MenuItem>

                                    <MenuItem value="Client Updated">
                                        Client Updated
                                    </MenuItem>

                                    <MenuItem value="Subscription Renewed">
                                        Subscription Renewed
                                    </MenuItem>

                                    <MenuItem value="Payment Status Changed">
                                        Payment Status Changed
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Stack> 

                        {filteredLogs.length === 0 ? (

                            <Box
                                sx={{
                                    py: 10,
                                    textAlign: "center",
                                    bgcolor: "#FAFAFA",
                                    borderRadius: 3,
                                    border: "1px dashed #D0D7DE",
                                }}
                            >

                                <HistoryIcon
                                    sx={{
                                        fontSize: 75,
                                        color: "#BDBDBD",
                                    }}
                                />

                                <Typography
                                    variant="h5"
                                    mt={2}
                                    fontWeight="bold"
                                >
                                    No Activity Logs Found
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    mt={1}
                                >
                                    Try changing your search or filter.
                                </Typography>

                                <Button
                                    variant="contained"
                                    sx={{
                                        mt: 3,
                                        borderRadius: 2,
                                        textTransform: "none",
                                    }}
                                    onClick={() => {
                                        setSearchTerm("");
                                        setActionFilter("");
                                    }}
                                >
                                    Clear Filters
                                </Button>

                            </Box> 

                        ) : (

                            <Paper
                                elevation={3}
                                sx={{
                                    borderRadius: 3,
                                    overflow: "hidden",
                                    mt: 3,
                                }}
                            >
                                <TableContainer>
                                    <Table>

                                        <TableHead>
                                            <TableRow
                                                hover
                                                sx={{
                                                    transition: "0.2s",

                                                    "&:hover": {
                                                        bgcolor: "#F5F9FF",
                                                    },
                                                }}
                                            >
                                                <TableCell>
                                                    <strong>Action</strong>
                                                </TableCell>

                                                <TableCell>
                                                    <strong>Entity</strong>
                                                </TableCell>

                                                <TableCell>
                                                    <strong>Performed By</strong>
                                                </TableCell>

                                                <TableCell>
                                                    <strong>Timestamp</strong>
                                                </TableCell>

                                                <TableCell align="center">
                                                    <strong>Details</strong>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>

                                            {filteredLogs
                                                .slice(
                                                    page * rowsPerPage,
                                                    page * rowsPerPage + rowsPerPage
                                                )
                                                .map((log) => (

                                                    <TableRow
                                                        key={log._id}
                                                        hover
                                                        sx={{
                                                            transition: "0.2s",

                                                            "&:hover": {
                                                                bgcolor: "#F8FBFF",
                                                            },
                                                        }}
                                                    >
                                                        <TableCell>
                                                            <Chip
                                                                label={log.actionType}
                                                                color={getChipColor(log.actionType)} 
                                                                variant="outlined"
                                                            />
                                                        </TableCell>

                                                        <TableCell>
                                                            {log.entityName}
                                                        </TableCell>

                                                        <TableCell>
                                                            {log.performedBy?.name}
                                                        </TableCell>

                                                        <TableCell>
                                                            {new Date(
                                                                log.createdAt
                                                            ).toLocaleString()}
                                                        </TableCell>

                                                        <TableCell align="center">
                                                            <Button
                                                                variant="contained"
                                                                onClick={() => handleView(log)}
                                                                sx={{
                                                                    borderRadius: 2,
                                                                    textTransform: "none",
                                                                    transition: "0.25s",

                                                                    "&:hover": {
                                                                        transform: "scale(1.06)",
                                                                        boxShadow: 5,
                                                                    },
                                                                }}
                                                            >
                                                                View
                                                            </Button>
                                                        </TableCell>

                                                    </TableRow>

                                                ))}

                                        </TableBody>

                                    </Table>
                                </TableContainer>

                                <TablePagination
                                    component="div"
                                    count={filteredLogs.length}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    rowsPerPage={rowsPerPage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    rowsPerPageOptions={[5, 10, 25, 50]}
                                />

                            </Paper>

                        )} 
                        </Box> 
    
            </Paper>
                <Dialog
                    open={openDialog}
                    onClose={handleClose}
                    maxWidth="lg" 
                    fullWidth
                >
                    <DialogTitle
                        sx={{
                            fontWeight: 700,
                            fontSize: 28,
                        }}
                    >
                        📋 Activity Details
                    </DialogTitle> 

                    <DialogContent dividers>
                        {selectedLog && (
                            <>
                                <Grid container spacing={2} sx={{ mb: 3 }}>

                                    <Grid item xs={12} md={6}>
                                        <Paper
                                            elevation={2}
                                            sx={{
                                                p: 2,
                                                borderRadius: 2,
                                                transition: "all 0.25s ease",
                                                cursor: "default",

                                                "&:hover": {
                                                    transform: "translateY(-4px)",
                                                    boxShadow: 8,
                                                    bgcolor: "#F8FAFC",
                                                },
                                            }}
                                        > 
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                Action
                                            </Typography>

                                            <Typography
                                                variant="h6"
                                                fontWeight={600}
                                            >
                                                {selectedLog.actionType}
                                            </Typography>
                                        </Paper>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Paper
                                            elevation={2}
                                            sx={{
                                                p: 2,
                                                borderRadius: 2,
                                                transition: "all 0.25s ease",
                                                cursor: "default",

                                                "&:hover": {
                                                    transform: "translateY(-4px)",
                                                    boxShadow: 8,
                                                    bgcolor: "#F8FAFC",
                                                },
                                            }}
                                        > 
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                Entity
                                            </Typography>

                                            <Typography
                                                variant="h6"
                                                fontWeight={600}
                                            >
                                                {selectedLog.entityName}
                                            </Typography>
                                        </Paper>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Paper
                                            elevation={2}
                                            sx={{
                                                p: 2,
                                                borderRadius: 2,
                                                transition: "all 0.25s ease",
                                                cursor: "default",

                                                "&:hover": {
                                                    transform: "translateY(-4px)",
                                                    boxShadow: 8,
                                                    bgcolor: "#F8FAFC",
                                                },
                                            }}
                                        > 
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                Performed By
                                            </Typography>

                                            <Typography fontWeight={600}>
                                                {selectedLog.performedBy?.name}
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {selectedLog.performedBy?.email}
                                            </Typography>
                                        </Paper>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Paper
                                            elevation={2}
                                            sx={{
                                                p: 2,
                                                borderRadius: 2,
                                                transition: "all 0.25s ease",
                                                cursor: "default",

                                                "&:hover": {
                                                    transform: "translateY(-4px)",
                                                    boxShadow: 8,
                                                    bgcolor: "#F8FAFC",
                                                },
                                            }}
                                        > 
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                Date & Time
                                            </Typography>

                                            <Typography fontWeight={600}>
                                                {new Date(selectedLog.createdAt).toLocaleString()}
                                            </Typography>
                                        </Paper>
                                    </Grid>

                                </Grid> 

                                <Typography
                                    variant="h6"
                                    sx={{ mt: 3 }}
                                >
                                    Old Value
                                </Typography>

                                <Paper
                                    elevation={1}
                                    sx={{
                                        p: 2,
                                        mt: 1,
                                        bgcolor: "#FAFAFA",
                                        borderRadius: 2,
                                        transition: "0.25s",

                                        "&:hover": {
                                            boxShadow: 6,
                                            bgcolor: "#F5F7FA",
                                        },
                                    }}
                                > 
                                    <pre
                                        style={{
                                            margin: 0,
                                            whiteSpace: "pre-wrap",
                                        }}
                                    >
                                        {JSON.stringify(
                                            selectedLog.oldValue,
                                            null,
                                            2
                                        )}
                                    </pre>
                                </Paper>

                                <Typography
                                    variant="h6"
                                    sx={{ mt: 3 }}
                                >
                                    New Value
                                </Typography>

                                <Paper
                                    elevation={1}
                                    sx={{
                                        p: 2,
                                        mt: 1,
                                        bgcolor: "#FAFAFA",
                                        borderRadius: 2,
                                        transition: "0.25s",

                                        "&:hover": {
                                            boxShadow: 6,
                                            bgcolor: "#F5F7FA",
                                        },
                                    }}
                                > 
                                    <pre
                                        style={{
                                            margin: 0,
                                            whiteSpace: "pre-wrap",
                                        }}
                                    >
                                        {JSON.stringify(
                                            selectedLog.newValue,
                                            null,
                                            2
                                        )}
                                    </pre>
                                </Paper>
                            </>
                        )}
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog> 
        </motion.div> 
        </DashboardLayout> 
    );
};

export default ActivityLog; 