import {
  Box,
  Typography,
} from "@mui/material"; 
import { useEffect, useState } from "react"; 

import Grid from "@mui/material/Grid"; 

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardSummaryCards from "../components/DashboardSummaryCards"; 
import UpcomingRenewals from "../components/UpcomingRenewals"; 
import RecentProducts from "../components/RecentProducts"; 
import RecentClientMappings from "../components/RecentClientMappings"; 
import ProductDistributionChart from "../components/ProductDistributionChart"; 
import PaymentStatusChart from "../components/PaymentStatusChart"; 

import {
  getDashboardSummary,
  getUpcomingRenewals,
  getRecentClientMappings,
  getDashboardCharts,
} from "../api/dashboardApi"; 

import { getRecentProducts } from "../api/productApi"; 

function Dashboard() {
  // Store dashboard summary
  const [summary, setSummary] = useState({}); 
  // Store upcoming renewals
  const [upcomingRenewals, setUpcomingRenewals] = useState([]); 
  // Store recently added products
  const [recentProducts, setRecentProducts] = useState([]); 
  // Store recent client-product mappings
  const [recentMappings, setRecentMappings] = useState([]); 
  // Store chart data
  const [chartData, setChartData] = useState({
    productDistribution: {},
    paymentDistribution: {},
  }); 

  // Fetch dashboard summary
  useEffect(() => {
    fetchDashboardSummary();
    fetchUpcomingRenewals();
    fetchRecentProducts();
    fetchRecentMappings();
    fetchDashboardCharts(); 
  }, []); 


  async function fetchDashboardSummary() { 
    try {
      const response = await getDashboardSummary();
      setSummary(response.data);
    } catch (error) {
      console.error("Error fetching dashboard summary:", error);
    }
  } 

  async function fetchUpcomingRenewals() {
    try {
      const response = await getUpcomingRenewals();
      setUpcomingRenewals(response.data);
    } catch (error) {
      console.error("Error fetching upcoming renewals:", error);
    }
  } 

  async function fetchRecentProducts() {
    try {
      const response = await getRecentProducts();
      setRecentProducts(response.data);
    } catch (error) {
      console.error("Error fetching recent products:", error);
    }
  } 

  async function fetchRecentMappings() {
    try {
      const response = await getRecentClientMappings();
      setRecentMappings(response.data);
    } catch (error) {
      console.error("Error fetching recent client mappings:", error);
    }
  } 

  async function fetchDashboardCharts() {
    try {
      const response = await getDashboardCharts();
      setChartData(response.data);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  } 

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        <h1 style={{ fontSize: "48px" }}>Dashboard</h1> 

        <DashboardSummaryCards summary={summary} />

        <Grid
          container
          spacing={3}
          sx={{ mt: 2 }}
        >
          <Grid size={{ xs: 12, lg: 7 }}>
            <UpcomingRenewals renewals={upcomingRenewals} />
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }}>
            <RecentProducts products={recentProducts} />
          </Grid>
        </Grid> 
        <RecentClientMappings mappings={recentMappings} /> 
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            gap: 3,
            mt: 3,
          }}
        >
          <ProductDistributionChart
            data={chartData.productDistribution}
          />

          <PaymentStatusChart
            data={chartData.paymentDistribution}
          />
        </Box> 
      </Box>
    </DashboardLayout>
  );
}

export default Dashboard; 