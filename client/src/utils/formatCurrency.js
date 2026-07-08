// Format currency based on the selected currency
const formatCurrency = (amount, currency) => {

    // Choose the correct locale
    const localeMap = {
        INR: "en-IN",
        USD: "en-US",
        EUR: "de-DE",
    };

    return new Intl.NumberFormat(
        localeMap[currency] || "en-US",
        {
            style: "currency",
            currency,
            minimumFractionDigits: 0,
        }
    ).format(amount || 0);
};

export default formatCurrency; 