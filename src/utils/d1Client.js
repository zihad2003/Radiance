/**
 * Radiance D1 Client
 * Helper utility for interacting with the Cloudflare D1 API endpoints
 */

export const d1 = {
    // Products
    async getProducts() {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        return await response.json();
    },

    async addProduct(product) {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });
        return await response.json();
    },

    // Bookings
    async getBookings() {
        const response = await fetch('/api/bookings');
        if (!response.ok) throw new Error('Failed to fetch bookings');
        return await response.json();
    },

    async createBooking(booking) {
        const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(booking)
        });
        return await response.json();
    }
};
