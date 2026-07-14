import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = ({ children }) => {
    const { admin, loading } = useAuth(); 

    if (loading) {
        return null;
    } 

    if (!admin) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoutes; 