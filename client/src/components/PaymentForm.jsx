import {
    Grid,
    TextField,
    MenuItem,
} from "@mui/material";

import formatCurrency from "../utils/formatCurrency"; 
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; 
import dayjs from "dayjs"; 

function PaymentForm({
    formData,
    setFormData,
    totalAmount,
}) {

    // Handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Calculate the pending amount automatically
    const pendingAmount =
        totalAmount - (Number(formData.paidAmount) || 0); 
    // Calculate payment status automatically
    let paymentStatus = "Pending";

    if (pendingAmount === 0) {
        paymentStatus = "Paid";
    } else if (pendingAmount < totalAmount) {
        paymentStatus = "Partial";
    } 

    return (
        <Grid container spacing={2} sx={{ mt: 1 }}> 

            {/* Total Amount (Read Only) */}
            <Grid size={{ xs: 12 }}>
                <TextField
                    fullWidth
                    label="Total Amount"
                    value={formatCurrency(totalAmount, formData.currency)}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid> 

            {/* Paid Amount */}
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    fullWidth
                    type="number"
                    label="Paid Amount"
                    name="paidAmount"
                    value={formData.paidAmount}
                    onChange={handleChange}
                    onFocus={() => {
                        if (formData.paidAmount === 0) {
                            setFormData({
                                ...formData,
                                paidAmount: "",
                            });
                        }
                    }}
                    onBlur={() => {
                        if (formData.paidAmount === "") {
                            setFormData({
                                ...formData,
                                paidAmount: 0,
                            });
                        }
                    }}
                /> 
            </Grid> 

            {/* Last Payment Date */}
            <Grid size={{ xs: 12, md: 6 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Last Payment Date"
                        value={
                            formData.lastPaymentDate
                                ? dayjs(formData.lastPaymentDate)
                                : null
                        }
                        onChange={(newValue) => {
                            setFormData((prev) => ({
                                ...prev,
                                lastPaymentDate: newValue
                                    ? newValue.format("YYYY-MM-DD")
                                    : "",
                            }));
                        }}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                            },
                        }}
                    />
                </LocalizationProvider> 
            </Grid> 

            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    fullWidth
                    label="Payment Status"
                    value={paymentStatus}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid>  

            {/* Pending Amount (Read Only) */}
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    fullWidth
                    label="Pending Amount"
                    value={formatCurrency(
                        pendingAmount,
                        formData.currency
                    )}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid>

            {/* Payment Remarks */}
            <Grid size={12}>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Payment Remarks"
                    name="paymentRemarks"
                    value={formData.paymentRemarks}
                    onChange={handleChange}
                />
            </Grid>

        </Grid>
    );
}

export default PaymentForm; 