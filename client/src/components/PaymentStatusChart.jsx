import {
    Card,
    CardContent,
    Typography,
} from "@mui/material";

import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    Cell,
} from "recharts";

function PaymentStatusChart({ data }) {
    const chartData = [
        {
            name: "Paid",
            value: data.paid,
            color: "#2e7d32",
        },
        {
            name: "Pending",
            value: data.pending,
            color: "#d32f2f",
        },
        {
            name: "Partial",
            value: data.partial,
            color: "#ed6c02",
        },
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
                    Payment Status Distribution
                </Typography>

                <ResponsiveContainer
                    width="100%"
                    height={320}
                >
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="name" />

                        <YAxis allowDecimals={false} />

                        <Tooltip />

                        <Bar
                            dataKey="value"
                            radius={[8, 8, 0, 0]}
                        >
                            {chartData.map((entry) => (
                                <Cell
                                    key={entry.name}
                                    fill={entry.color}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

export default PaymentStatusChart; 