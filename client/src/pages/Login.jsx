import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
    Box,
    Button,
    Paper,
    TextField,
    Typography,
    CircularProgress,
    Stack,
} from "@mui/material"; 

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded"; 
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton"; 

import toast from "react-hot-toast";

import { loginAdmin } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

import logo from "../assets/ARODEKLOGO.png"; 

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            setLoading(true);

            const response = await loginAdmin(email, password);

            login(response.admin, response.token);

            toast.success("Welcome back!");

            navigate("/dashboard");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Login failed."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                bgcolor: "#F8FAFC",
            }}
        >
            {/* Left Side */}
            <Box
                sx={{
                    flex: 1,
                    display: { xs: "none", md: "flex" },
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    background:
                        "linear-gradient(135deg,#2563EB,#1E3A8A)",
                    color: "white",
                    p: 8,
                }}
            >
                <Box
                    component="img"
                    src={logo}
                    alt="ARODEK Logo"
                    sx={{
                        width: 260,
                        mb: 5,
                        bgcolor: "white",
                        p: 2,
                        borderRadius: 3,
                    }}
                />

                <Typography
                    variant="h3"
                    fontWeight="bold"
                    gutterBottom
                >
                    Welcome Back!
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        opacity: 0.9,
                        mb: 5,
                        textAlign: "center",
                        maxWidth: 500,
                    }}
                >
                    Manage products, clients, subscriptions,
                    renewals, payments and reports in one place.
                </Typography>

                <Stack spacing={2}>
                    <Stack direction="row" spacing={1}>
                        <CheckCircleRoundedIcon />
                        <Typography>Manage Products</Typography>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                        <CheckCircleRoundedIcon />
                        <Typography>Track Payments</Typography>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                        <CheckCircleRoundedIcon />
                        <Typography>Monitor Renewals</Typography>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                        <CheckCircleRoundedIcon />
                        <Typography>Generate Reports</Typography>
                    </Stack>
                </Stack>
            </Box>

            {/* Right Side */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 3,
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Paper
                        elevation={8}
                        sx={{
                            width: 420,
                            p: 5,
                            borderRadius: 5,
                        }}
                    >
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            gutterBottom
                        >
                            Admin Login
                        </Typography>

                        <Typography
                            color="text.secondary"
                            mb={3}
                        >
                            Sign in to continue to ARODEK Dashboard
                        </Typography>

                        <TextField
                            fullWidth
                            autoFocus
                            label="Email"
                            margin="normal"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            onKeyDown={(e) =>
                                e.key === "Enter" &&
                                handleLogin()
                            }
                        />

                        <TextField 
                            sx={{
                                "& .MuiInputAdornment-root": {
                                    display: "flex",
                                },
                            }} 
                            fullWidth
                            margin="normal"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                edge="end"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }} 
                        /> 

                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{
                                mt: 4,
                                py: 1.5,
                                borderRadius: 3,
                                textTransform: "none",
                                fontSize: 16,
                            }}
                            disabled={loading}
                            onClick={handleLogin}
                        >
                            {loading ? (
                                <>
                                    <CircularProgress
                                        size={20}
                                        color="inherit"
                                        sx={{ mr: 1 }}
                                    />
                                    Signing In...
                                </>
                            ) : (
                                "Login"
                            )} 
                        </Button>
                    </Paper>
                </motion.div>
            </Box>
        </Box>
    );
};

export default Login; 