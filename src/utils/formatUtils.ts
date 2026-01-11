export const formatDate = (
    date: string | number | Date,
    options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }
): string => {
    const d = new Date(date);
    // Invalid date check
    if (isNaN(d.getTime())) return 'Invalid Date';
    return d.toLocaleDateString('en-US', options);
};

export const formatCurrency = (amount: number, currency = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(amount);
};

export const truncateText = (text: string, length: number): string => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
};
