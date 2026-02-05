```typescript
import { mutation } from "./_generated/server";

export const fixBrokenImages = mutation({
    args: {},
    handler: async (ctx) => {
        const products = await ctx.db.query("products").collect();
        const services = await ctx.db.query("services").collect();
        const stylists = await ctx.db.query("stylists").collect();

        const validImages: Record<string, string> = {
            skincare: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
            makeup: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80",
            serum: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80",
            spa: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
            default: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80"
        };

        const brokenIds = [
            '1598378294821',
            '1583391733981',
            '1522337360705'
        ];

        let fixedCount = 0;

        // Fix Products
        for (const product of products) {
            const isBroken = brokenIds.some(id => product.image?.includes(id));
            if (isBroken) {
                const newImage = validImages[product.category.toLowerCase()] || validImages.skincare;
                await ctx.db.patch(product._id, { image: newImage });
                fixedCount++;
            }
        }

        // Fix Services
        for (const service of services) {
            const isBroken = brokenIds.some(id => service.image?.includes(id));
            if (isBroken) {
                const newImage = validImages[service.category.toLowerCase()] || validImages.makeup;
                await ctx.db.patch(service._id, { image: newImage });
                fixedCount++;
            }
        }

        // Fix Stylists
        for (const stylist of stylists) {
            const isBroken = brokenIds.some(id => stylist.image?.includes(id));
            if (isBroken) {
                await ctx.db.patch(stylist._id, { image: validImages.default });
                fixedCount++;
            }
        }

        return { fixedCount };
    },
});
