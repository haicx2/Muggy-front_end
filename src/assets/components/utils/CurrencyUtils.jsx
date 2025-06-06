export function formatVND(amount) {
    return amount.toLocaleString() + ' VND';
}

// For international prices (in case you need to show both)
export function formatPrice(amount, currency = 'VND') {
    if (currency === 'VND') {
        return formatVND(amount);
    } else if (currency === 'USD') {
        return '$' + amount.toFixed(2);
    }
    return amount.toString();
}
