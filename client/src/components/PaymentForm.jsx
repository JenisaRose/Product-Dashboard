import {
    Grid,
    TextField,
    MenuItem,
} from "@mui/material";

import formatCurrency from "../utils/formatCurrency";

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
                <TextField
                    fullWidth
                    type="date"
                    label="Last Payment Date"
                    name="lastPaymentDate"
                    value={formData.lastPaymentDate || ""}
                    onChange={handleChange}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />
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