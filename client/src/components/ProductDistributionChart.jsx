import {
    Card,
    CardContent,
    Typography,
} from "@mui/material";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

function ProductDistributionChart({ data }) { 

    const chartData = [
        {
            name: "Active",
            value: data.active,
        },
        {
            name: "Inactive",
            value: data.inactive,
        },
        {
            name: "Under Development",
            value: data.development,
        },
    ];

    const COLORS = [
        "#2e7d32",
        "#d32f2f",
        "#ed6c02",
    ];

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
                    Product Status Distribution
                </Typography>

                <ResponsiveContainer
                    width="100%"
                    height={300}
                >
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={100}
                            label
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={entry.name}
                                    fill={COLORS[index]}
                                />
                            ))}
                        </Pie>

                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

export default ProductDistributionChart; 