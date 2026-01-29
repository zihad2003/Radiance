import { mutation } from "./_generated/server";

export const seedFull = mutation({
    args: {},
    handler: async (ctx: any) => {
        const brands = [
            {
                name: "MAC",
                category: "lips",
                products: [
                    { id: "mac_lips_1", name: "Retro Matte Lipstick - Ruby Woo", brand: "MAC", category: "lips", type: "lipstick", hex: "#990000", finish: "matte", priceUSD: 24, description: "The iconic vivid blue-red.", image: "https://images.unsplash.com/photo-1586776108066-135d02167302?q=80&w=800" },
                    { id: "mac_lips_2", name: "Matte Lipstick - Russian Red", brand: "MAC", category: "lips", type: "lipstick", hex: "#AB0E17", finish: "matte", priceUSD: 24, description: "Intense bluish-red.", image: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?q=80&w=800" },
                    { id: "mac_face_1", name: "Studio Fix Fluid - NC15", brand: "MAC", category: "face", type: "foundation", hex: "#F2Dcb3", finish: "matte", priceUSD: 42, description: "Fair beige with neutral undertone.", image: "https://images.unsplash.com/photo-1522338242992-e1a5a1334641?q=80&w=800" }
                ]
            },
            {
                name: "Maybelline",
                category: "eyes",
                products: [
                    { id: "mayb_eyes_1", name: "Lash Sensational - Very Black", brand: "Maybelline", category: "eyes", type: "mascara", hex: "#000000", finish: "matte", priceUSD: 9.5, description: "Full fan effect volume.", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800" },
                    { id: "mayb_face_1", name: "Fit Me Matte+Poreless - 115 Ivory", brand: "Maybelline", category: "face", type: "foundation", hex: "#F0D3B9", finish: "natural", priceUSD: 11, description: "Light skin, pink undertone.", image: "https://images.unsplash.com/photo-1619451334792-150fd785ee7b?q=80&w=800" }
                ]
            },
            {
                name: "NARS",
                category: "cheeks",
                products: [
                    { id: "nars_cheeks_1", name: "Blush - Orgasm", brand: "NARS", category: "cheeks", type: "blush", hex: "#FF9999", finish: "shimmer", priceUSD: 32, description: "Iconic NARS blush with shimmer.", image: "https://images.unsplash.com/photo-1457913347322-3a187d601fa9?q=80&w=800" }
                ]
            }
        ];

        let count = 0;
        for (const brand of brands) {
            for (const product of brand.products) {
                const existing = await ctx.db.query("products").filter((q: any) => q.eq(q.field("id"), product.id)).first();
                if (!existing) {
                    await ctx.db.insert("products", {
                        ...product,
                        price: (product.priceUSD * 110),
                        currency: "BDT",
                        ingredients: ["Vitamin E", "Aloe Vera", "Pigments"],
                        skinType: ["all"],
                        texture: "cream",
                        rating: 4.8,
                        reviews: 120,
                        inStock: true,
                        architecture: {}
                    });
                    count++;
                }
            }
        }

        // Also add boutique products
        const boutique = [
            { id: 'skin_001', brand: 'The Body Shop', name: 'Tea Tree Oil', category: 'skincare', priceUSD: 8.50, description: 'Target skin imperfections with the powerful, purifying properties of our iconic Tea Tree Oil.', image: 'https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?q=80&w=800' },
            { id: 'hair_001', brand: 'Olaplex', name: 'No. 3 Hair Perfector', category: 'haircare', priceUSD: 32.00, description: 'A global bestseller. A weekly at-home treatment that reduces breakage and visibly strengthens hair.', image: 'https://images.unsplash.com/photo-1527799822340-4107127bcfb9?q=80&w=800' },
            { id: 'frag_001', brand: 'Chanel', name: 'N°5 Eau de Parfum', category: 'fragrance', priceUSD: 165.00, description: 'The essence of femininity. A powdery floral bouquet housed in an iconic bottle.', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800' }
        ];

        for (const p of boutique) {
            const existing = await ctx.db.query("products").filter((q: any) => q.eq(q.field("id"), p.id)).first();
            if (!existing) {
                await ctx.db.insert("products", {
                    ...p,
                    type: "Treatment",
                    hex: "#FFFFFF",
                    finish: "Natural",
                    price: (p.priceUSD * 110),
                    currency: "BDT",
                    ingredients: ["Active Ingredient"],
                    skinType: ["all"],
                    texture: "Liquid",
                    rating: 5.0,
                    reviews: 50,
                    inStock: true,
                    architecture: {}
                });
                count++;
            }
        }

        return `Seeded ${count} additional products.`;
    }
});
