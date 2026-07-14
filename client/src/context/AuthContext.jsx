import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const storedAdmin = localStorage.getItem("admin");

        if (storedAdmin) {
            setAdmin(JSON.parse(storedAdmin));
        }

        setLoading(false);
    }, []); 

    const login = (adminData, token) => {
        localStorage.setItem("admin", JSON.stringify(adminData));
        localStorage.setItem("token", token);

        setAdmin(adminData);
    };

    const logout = () => {
        localStorage.removeItem("admin");
        localStorage.removeItem("token");

        setAdmin(null);
    };

    return (
        <AuthContext.Provider
            value={{
                admin,
                loading,
                login,
                logout,
            }} 
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); 