import { Routes, Route, Navigate } from "react-router-dom"; // React Router

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products"; 
import { Toaster } from "react-hot-toast"; // React Hot Toast 
import Clients from "./pages/Clients"; 
import ClientProducts from "./pages/ClientProducts"; 
import PaymentTracking from "./pages/PaymentTracking"; 
import RenewalTracking from "./pages/RenewalTracking"; 
import Reports from "./pages/Reports"; 
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoutes"; 
import ActivityLog from "./pages/ActivityLog"; 

function App() {
  return ( 
    <>
  <Toaster position="top-right" /> {/* React Hot Toast */} 

    <Routes> 
        <Route path="/login" element={<Login />} /> 

        <Route path="/" element={<Navigate to="/login" />} /> 

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> 

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        /> 
      
        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <Clients />
            </ProtectedRoute>
          }
        /> 

        <Route
          path="/assignments"
          element={
            <ProtectedRoute>
              <ClientProducts />
            </ProtectedRoute>
          }
        /> 
 
        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <PaymentTracking />
            </ProtectedRoute>
          }
        />  

        <Route
          path="/renewals"
          element={
            <ProtectedRoute>
              <RenewalTracking />
            </ProtectedRoute>
          }
        />  

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        /> 

        <Route
          path="/activity-logs"
          element={
            <ProtectedRoute>
              <ActivityLog />
            </ProtectedRoute>
          }
        /> 
    </Routes> 
    </> 
    
  );
}

export default App; 