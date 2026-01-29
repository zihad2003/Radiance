import { mutation } from "./_generated/server";

export const resetAndSeed = mutation({
    args: {},
    handler: async (ctx: any) => {
        // 1. Clear existing products (optional, but good for clean seed)
        const products = await ctx.db.query("products").collect();
        for (const p of products) {
            await ctx.db.delete(p._id);
        }

        // 2. Seed Sample Products
        const sampleProducts = [
            // CLEANSERS
            {
                id: "clean-01",
                name: "Gentle Hydrating Milk",
                brand: "Radiance Pure",
                category: "Cleanser",
                type: "Milk",
                hex: "#FFFFFF",
                finish: "Natural",
                opacity: 0,
                price: 2400,
                priceUSD: 24,
                currency: "BDT",
                description: "A soothing milk cleanser that removes impurities without stripping moisture.",
                ingredients: ["Ceramides", "Oat Extract", "Glycerin"],
                skinType: ["Dry", "Sensitive", "Normal"],
                concerns: ["Dryness", "Sensitivity"],
                texture: "Creamy",
                rating: 4.8,
                reviews: 320,
                inStock: true,
                architecture: {},
                image: "https://images.unsplash.com/photo-1556228720-19875bb564d3?auto=format&fit=crop&q=80&w=300"
            },
            {
                id: "clean-02",
                name: "Salicylic Deep Wash",
                brand: "ClearSkin Lab",
                category: "Cleanser",
                type: "Gel",
                hex: "#A3D4E0",
                finish: "Natural",
                opacity: 0,
                price: 2200,
                priceUSD: 22,
                currency: "BDT",
                description: "Foaming gel cleanser with 2% Salicylic Acid to unclog pores and fight acne.",
                ingredients: ["Salicylic Acid", "Tea Tree Oil", "Niacinamide"],
                skinType: ["Oily", "Combination", "Acne-Prone"],
                concerns: ["Acne", "Pores", "Oiliness"],
                texture: "Gel",
                rating: 4.7,
                reviews: 512,
                inStock: true,
                architecture: {},
                image: "https://images.unsplash.com/photo-1556228578-8d89a556345d?auto=format&fit=crop&q=80&w=300"
            },

            // TONERS
            {
                id: "toner-01",
                name: "Glow Exfoliating Tonic",
                brand: "Radiance Pure",
                category: "Toner",
                type: "Liquid",
                hex: "#FFD180",
                finish: "Radiant",
                opacity: 0,
                price: 2800,
                priceUSD: 28,
                currency: "BDT",
                description: "Gentle exfoliating toner with AHA/BHA for instant radiance and smoother texture.",
                ingredients: ["Glycolic Acid", "Lactic Acid", "Aloe Vera"],
                skinType: ["All Skin Types", "Dull"],
                concerns: ["Dullness", "Texture", "Aging"],
                texture: "Liquid",
                rating: 4.9,
                reviews: 840,
                inStock: true,
                architecture: {},
                image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=300"
            },

            // SERUMS
            {
                id: "serum-01",
                name: "Vitamin C Brightening Serum",
                brand: "Lumina",
                category: "Serum",
                type: "Serum",
                hex: "#FFA500",
                finish: "Dewy",
                opacity: 0,
                price: 4500,
                priceUSD: 45,
                currency: "BDT",
                description: "Potent 15% Vitamin C serum to fade dark spots and boost collagen.",
                ingredients: ["L-Ascorbic Acid", "Ferulic Acid", "Vitamin E"],
                skinType: ["All Skin Types"],
                concerns: ["Dullness", "Dark Spots", "Aging", "Pigmentation"],
                texture: "Light Oil",
                rating: 4.6,
                reviews: 1250,
                inStock: true,
                architecture: {},
                image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=300"
            },
            {
                id: "serum-02",
                name: "Hyaluronic Acid Plumping Booster",
                brand: "HydroZone",
                category: "Serum",
                type: "Serum",
                hex: "#E0F7FA",
                finish: "Dewy",
                opacity: 0,
                price: 3200,
                priceUSD: 32,
                currency: "BDT",
                description: "Pure Hyaluronic Acid serum for deep hydration and plumping fine lines.",
                ingredients: ["Multi-Molecular HA", "Vitamin B5", "Glycerin"],
                skinType: ["Dry", "Dehydrated", "Normal", "Mature"],
                concerns: ["Dryness", "Aging", "Fine Lines"],
                texture: "Gel",
                rating: 4.8,
                reviews: 930,
                inStock: true,
                architecture: {},
                image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=300"
            },
            {
                id: "serum-03",
                name: "Retinol Renewal Night Serum",
                brand: "Radiance Pro",
                category: "Serum",
                type: "Serum",
                hex: "#F3E5F5",
                finish: "Natural",
                opacity: 0,
                price: 5200,
                priceUSD: 52,
                currency: "BDT",
                description: "Advanced encapsulated retinol for anti-aging without irritation. Night use only.",
                ingredients: ["Encapsulated Retinol", "Peptides", "Squalane"],
                skinType: ["Mature", "Combination", "Oily"],
                concerns: ["Aging", "Wrinkles", "Acne", "Texture"],
                texture: "Creamy Serum",
                rating: 4.7,
                reviews: 420,
                inStock: true,
                architecture: {},
                image: "https://images.unsplash.com/photo-1571781535009-5363219018cb?auto=format&fit=crop&q=80&w=300"
            },

            // MOISTURIZERS
            {
                id: "moist-01",
                name: "Barrier Repair Cream",
                brand: "Ceramix",
                category: "Moisturizer",
                type: "Cream",
                hex: "#FFFFFF",
                finish: "Matte",
                opacity: 0,
                price: 2800,
                priceUSD: 28,
                currency: "BDT",
                description: "Rich restorative cream to strengthen skin barrier and lock in moisture.",
                ingredients: ["Ceramides", "Cholesterol", "Fatty Acids", "Niacinamide"],
                skinType: ["Dry", "Sensitive", "Normal"],
                concerns: ["Dryness", "Sensitivity", "Redness"],
                texture: "Rich Cream",
                rating: 4.9,
                reviews: 156,
                inStock: true,
                architecture: {},
                image: "https://images.unsplash.com/photo-1611930046339-2e2900c6c235?auto=format&fit=crop&q=80&w=300"
            },
            {
                id: "moist-02",
                name: "Oil-Free Aqua Gel",
                brand: "HydroLight",
                category: "Moisturizer",
                type: "Gel",
                hex: "#E1F5FE",
                finish: "Natural",
                opacity: 0,
                price: 2600,
                priceUSD: 26,
                currency: "BDT",
                description: "Lightweight gel moisturizer that hydrates without clogging pores.",
                ingredients: ["Aloe Vera", "Green Tea", "Hyaluronic Acid"],
                skinType: ["Oily", "Combination", "Acne-Prone"],
                concerns: ["Oiliness", "Acne", "Pores"],
                texture: "Water Gel",
                rating: 4.5,
                reviews: 340,
                inStock: true,
                architecture: {},
                image: "https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80&w=300"
            },

            // SUNSCREEN
            {
                id: "sun-01",
                name: "Invisible Shield SPF 50",
                brand: "SunGuard",
                category: "Sunscreen",
                type: "Lotion",
                hex: "#FFF9C4",
                finish: "Invisible",
                opacity: 0,
                price: 2200,
                priceUSD: 22,
                currency: "BDT",
                description: "Broad spectrum SPF 50 that leaves no white cast. Essential for AM routine.",
                ingredients: ["Zinc Oxide", "Niacinamide", "Antioxidants"],
                skinType: ["All Skin Types"],
                concerns: ["Aging", "Dark Spots", "Protection"],
                texture: "Light Lotion",
                rating: 4.9,
                reviews: 2100,
                inStock: true,
                architecture: {},
                image: "https://images.unsplash.com/photo-1556228720-19875bb564d3?auto=format&fit=crop&q=80&w=300"
            }
        ];

        for (const p of sampleProducts) {
            await ctx.db.insert("products", p as any);
        }

        // 3. Seed test user
        const existingUser = await ctx.db.query("users").filter((q: any) => q.eq(q.field("phone"), "01700000000")).first();
        if (!existingUser) {
            await ctx.db.insert("users", {
                phone: "01700000000",
                name: "Demo User",
                email: "demo@radiance.com",
                points: 500,
                level: "Silver",
                savedLooks: [],
                createdAt: Date.now(),
            });
        }

        return "Database Seeded Successfully";
    },
});
