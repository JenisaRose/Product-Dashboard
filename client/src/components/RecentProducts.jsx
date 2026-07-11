import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Stack,
    Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom"; 

function RecentProducts({ products }) {
    const navigate = useNavigate();

    return ( 
        <Card
            sx={{
                mt: 3,
                transition: "0.3s",
                "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-4px)",
                },
            }}
        > 
            <CardContent>
                <Typography
                    variant="h6"
                    gutterBottom
                >
                    Recently Added Products
                </Typography>

                <Stack spacing={1.5}>
                    {products.slice(0, 3).map((product) => ( 
                        <Box
                            key={product._id}
                            sx={{
                                border: "1px solid",
                                borderColor: "divider",
                                borderRadius: 2,
                                p: 1.5,
                                transition: "all 0.3s ease",
                                cursor: "pointer",
                                "&:hover": {
                                    boxShadow: 4,
                                    transform: "translateY(-3px)",
                                },
                            }}
                        > 
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                            >
                                {product.productName}
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mt: 0.5,
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {product.category}
                                </Typography>

                                <Chip
                                    label={product.status}
                                    color={
                                        product.status === "Active"
                                            ? "success"
                                            : product.status === "Inactive"
                                                ? "error"
                                                : "warning"
                                    }
                                    size="small"
                                />
                            </Box> 
                        </Box>
                    ))}
                </Stack>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 2,
                    }}
                >
                    <Button
                        variant="text"
                        onClick={() => navigate("/products")}
                    >
                        View All
                    </Button>
                </Box>
            </CardContent>
        </Card> 
    ); 

}

export default RecentProducts; 