import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useShopStore = create(
    persist(
        (set, get) => ({
            cart: [],
            wishlist: [],

            // Cart Actions
            addToCart: (product, quantity = 1, variant = null) => {
                const cart = get().cart;
                const existingIndex = cart.findIndex(item =>
                    item.id === product.id &&
                    JSON.stringify(item.selectedVariant) === JSON.stringify(variant)
                );

                if (existingIndex > -1) {
                    const newCart = [...cart];
                    newCart[existingIndex].quantity += quantity;
                    set({ cart: newCart });
                } else {
                    set({ cart: [...cart, { ...product, quantity, selectedVariant: variant }] });
                }
            },

            removeFromCart: (productId, variant = null) => {
                set({
                    cart: get().cart.filter(item =>
                        !(item.id === productId && JSON.stringify(item.selectedVariant) === JSON.stringify(variant))
                    )
                });
            },

            updateQuantity: (productId, quantity, variant = null) => {
                const newCart = get().cart.map(item => {
                    if (item.id === productId && JSON.stringify(item.selectedVariant) === JSON.stringify(variant)) {
                        return { ...item, quantity: Math.max(1, quantity) };
                    }
                    return item;
                });
                set({ cart: newCart });
            },

            clearCart: () => set({ cart: [] }),

            // Wishlist Actions
            toggleWishlist: (productId) => {
                const wishlist = get().wishlist;
                if (wishlist.includes(productId)) {
                    set({ wishlist: wishlist.filter(id => id !== productId) });
                } else {
                    set({ wishlist: [...wishlist, productId] });
                }
            },

            // Computed
            getCartTotal: () => get().cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            getCartCount: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),
        }),
        {
            name: 'radiance-shop-storage',
        }
    )
);
