import { Routes, Route, Navigate } from "react-router-dom"; // React Router

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products"; 
import { Toaster } from "react-hot-toast"; // React Hot Toast 
import Clients from "./pages/Clients"; 

function App() {
  return ( 
    <>
  <Toaster position="top-right" /> {/* React Hot Toast */} 

    <Routes> 
      <Route path="/" element={<Navigate to="/dashboard" />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/products" element={<Products />} /> 
      
      <Route path="/clients" element={<Clients />} /> 
 
    </Routes> 
    </> 
    
  );
}

export default App; 