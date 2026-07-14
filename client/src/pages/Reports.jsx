import DashboardLayout from "../layouts/DashboardLayout";
import ReportsTable from "../components/ReportsTable";
import ReportsSummaryCards from "../components/ReportsSummaryCards"; 
import * as XLSX from "xlsx"; 
import DownloadIcon from "@mui/icons-material/Download"; 
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import GroupsIcon from "@mui/icons-material/Groups";
import EventBusyIcon from "@mui/icons-material/EventBusy"; 

import {
    Typography,
    Tabs,
    Tab,
    Box,
    Button,
    TextField,
    InputAdornment,
    TablePagination,
} from "@mui/material";  
import SearchIcon from "@mui/icons-material/Search"; 
import AssessmentIcon from "@mui/icons-material/Assessment"; 

import { useEffect, useState } from "react";

import {
    getPendingPaymentReport,
    getProductWiseReport,
    getClientWiseReport,
    getExpiredReport,
} from "../api/reportApi"; 

const Reports = () => {
    const [reportData, setReportData] = useState([]);
    const [selectedReport, setSelectedReport] = useState("pending"); 
    const [searchTerm, setSearchTerm] = useState(""); 
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }; 

    useEffect(() => {
        fetchReportData();
    }, [selectedReport]);

    const fetchReportData = async () => {
        try {
            let data = [];

            switch (selectedReport) {
                case "pending":
                    data = await getPendingPaymentReport();
                    break;

                case "product":
                    data = await getProductWiseReport();
                    break; 

                case "client":
                    data = await getClientWiseReport();
                    break; 

                case "expired":
                    data = await getExpiredReport();
                    break; 

                default:
                    data = [];
            }

            setReportData(data);
        } catch (error) {
            console.error("Error fetching report:", error);
        }
    }; 

    const handleExport = () => { 
        let exportData = [];

        switch (selectedReport) {
            case "pending":
                exportData = reportData.map((item) => ({
                    Client: item.client?.companyName,
                    Product: item.product?.productName,
                    "Payment Status": item.paymentStatus,
                    Amount: item.amount,
                    "Paid Amount": item.paidAmount,
                    "Pending Amount": item.amount - item.paidAmount,
                    Currency: item.currency,
                    "Renewal Date": new Date(item.renewalDate).toLocaleDateString("en-GB"),
                }));
                break;

            case "product":
                exportData = reportData.map((item) => ({
                    Product: item.productName,
                    Category: item.category,
                    Client: item.client?.companyName,
                }));
                break;

            case "client":
                exportData = reportData.map((item) => ({
                    Client: item.companyName,
                    Product: item.product?.productName,
                    Plan: item.planName,
                }));
                break;

            case "expired":
                exportData = reportData.map((item) => ({
                    Client: item.client?.companyName,
                    Product: item.product?.productName,
                    Status: item.currentStatus,
                    "Renewal Date": new Date(item.renewalDate).toLocaleDateString("en-GB"),
                }));
                break;

            default:
                exportData = reportData;
        } 
    if (reportData.length === 0) return;

        const worksheet = XLSX.utils.json_to_sheet(exportData); 
        worksheet["!cols"] = [
            { wch: 20 },
            { wch: 25 },
            { wch: 20 },
            { wch: 15 },
            { wch: 15 },
            { wch: 18 },
            { wch: 12 },
            { wch: 18 },
        ]; 
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    let fileName = "Report.xlsx";

    switch (selectedReport) {
        case "pending":
            fileName = "Pending_Payment_Report.xlsx";
            break;

        case "product":
            fileName = "Product_Wise_Report.xlsx";
            break;

        case "client":
            fileName = "Client_Wise_Report.xlsx";
            break;

        case "expired":
            fileName = "Expired_Report.xlsx";
            break;

        default:
            break;
    }

    XLSX.writeFile(workbook, fileName);
}; 

    console.dir(reportData[0]); 

    const filteredReportData = reportData.filter((item) => {
        const search = searchTerm.toLowerCase();

        return (
            item.client?.companyName?.toLowerCase().includes(search) ||
            item.product?.productName?.toLowerCase().includes(search) ||
            item.product?.category?.toLowerCase().includes(search)
        );
    }); 

    const paginatedData = filteredReportData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    ); 

    return (
        <DashboardLayout>
            <Typography variant="h4" fontWeight="bold" mb={3}>
                Reports
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignitems: "center",
                    mb: 3,
                }}
            >
                <Tabs
                    value={selectedReport}
                    onChange={(event, newValue) => setSelectedReport(newValue)}
                >
                    <Tab
                        icon={<PendingActionsIcon />}
                        iconPosition="start"
                        label="Pending Payments"
                        value="pending"
                    />

                    <Tab
                        icon={<Inventory2Icon />}
                        iconPosition="start"
                        label="Product-wise"
                        value="product"
                    />

                    <Tab
                        icon={<GroupsIcon />}
                        iconPosition="start"
                        label="Client-wise"
                        value="client"
                    />

                    <Tab
                        icon={<EventBusyIcon />}
                        iconPosition="start"
                        label="Expired"
                        value="expired"
                    /> 
                </Tabs>

                <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    onClick={handleExport}
                    sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        px: 3,
                        boxShadow: 3,
                        "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: 6,
                        },
                        transition: "0.25s",
                    }}
                >
                    Export Excel
                </Button> 
            </Box> 

            <TextField
                fullWidth 
                placeholder="Search by client, product or cateogry..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                inputprops={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            /> 

            <Typography variant="body1" sx={{ mb: 3 }}>
                Showing {filteredReportData.length} Records 
            </Typography>

            {selectedReport === "pending" && (
                <ReportsSummaryCards reportData={reportData} />
            )} 

            {filteredReportData.length === 0 ? (

                <Box
                    sx={{
                        py: 8,
                        textAlign: "center",
                    }}
                >
                    <AssessmentIcon
                        sx={{
                            fontSize: 70,
                            color: "#BDBDBD",
                        }}
                    />

                    <Typography
                        variant="h6"
                        mt={2}
                    >
                        No reports found
                    </Typography>

                    <Typography color="text.secondary">
                        Try changing your search or report type.
                    </Typography>
                </Box>

            ) : (

                <>
                    <ReportsTable
                        reportData={paginatedData}
                        selectedReport={selectedReport}
                    />

                    <TablePagination
                        component="div"
                        count={filteredReportData.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                    />
                </>

            )} 
        </DashboardLayout>
    );
};

export default Reports; 