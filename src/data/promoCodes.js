export const PROMO_CODES = [
    { code: 'SAVE20', discount: 0.2, type: 'percentage', label: '20% Off' },
    { code: 'FLAT500', discount: 500, type: 'fixed', label: '৳500 Off', minSpend: 3000 },
    { code: 'FREESHIP', discount: 0, type: 'shipping', label: 'Free Shipping' },
    { code: 'NEW10', discount: 0.1, type: 'percentage', label: '10% First Order' },
    { code: 'RADIANCE50', discount: 0.5, type: 'percentage', label: '50% Styling Discount', category: 'makeup' }
];

export const validatePromoCode = (code, subtotal) => {
    const found = PROMO_CODES.find(p => p.code.toUpperCase() === code.toUpperCase());
    if (!found) return { valid: false, message: 'Invalid promo code' };

    if (found.minSpend && subtotal < found.minSpend) {
        return { valid: false, message: `Minimum spend of ৳${found.minSpend} required` };
    }

    return { valid: true, ...found };
};
