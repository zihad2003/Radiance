// Comprehensive Product Database for Radiance Beauty Boutique
// Includes Skincare, Haircare, Nails, Fragrance, and Accessories

export const SHOP_CATEGORIES = [
    { id: 'all', name: 'All Boutique', icon: 'All' },
    { id: 'makeup', name: 'Makeup', icon: 'Makeup' },
    { id: 'skincare', name: 'Skincare', icon: 'Skincare' },
    { id: 'haircare', name: 'Haircare', icon: 'Haircare' },
    { id: 'nails', name: 'Nails', icon: 'Nails' },
    { id: 'fragrance', name: 'Fragrance', icon: 'Fragrance' },
    { id: 'accessories', name: 'Accessories', icon: 'Accessories' }
];

export const BOUTIQUE_PRODUCTS = [
    // --- SKINCARE ---
    {
        id: 'skin_001',
        brand: 'The Body Shop',
        name: 'Tea Tree Oil',
        category: 'skincare',
        subcategory: 'Treatments',
        price: 950,
        oldPrice: 1200,
        priceUSD: 8.50,
        rating: 4.8,
        reviews: 1240,
        isNew: false,
        isPopular: true,
        stockStatus: 'In Stock',
        sku: 'TBS-TT-001',
        description: 'Target skin imperfections with the powerful, purifying properties of our iconic Tea Tree Oil. Sustainably sourced from Kenyan community-grown tea trees.',
        benefits: ['Reduces appearance of blemishes', 'Purifying and cooling', 'Suitable for oily skin'],
        howToUse: 'Apply directly to blemishes using a cotton bud or clean fingertip.',
        ingredients: ['Melaleuca Alternifolia Leaf Oil', 'Limonene', 'Tocopherol'],
        skinType: ['Oily', 'Combination'],
        images: [
            'https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?q=80&w=800',
            'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800',
            'https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?q=80&w=800'
        ],
        variants: [{ label: '10ml', price: 950 }, { label: '20ml', price: 1600 }]
    },
    {
        id: 'skin_002',
        brand: 'Lanéige',
        name: 'Water Bank Blue Hyaluronic Cream',
        category: 'skincare',
        subcategory: 'Moisturizers',
        price: 4200,
        priceUSD: 38.00,
        rating: 4.9,
        reviews: 850,
        isNew: true,
        isPopular: true,
        stockStatus: 'Low Stock',
        sku: 'LAN-WB-002',
        description: 'Next-gen hyaluronic acid moisturizer that provides 100-hour hydration for a glowing, dewy finish.',
        benefits: ['Deep hydration', 'Strengthens moisture barrier', 'Non-sticky formula'],
        howToUse: 'Apply evenly to face AM & PM after serum.',
        ingredients: ['Blue Hyaluronic Acid', 'Peptides', 'Squalane'],
        skinType: ['Dry', 'Normal'],
        images: [
            'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800',
            'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800'
        ]
    },
    {
        id: 'skin_003',
        brand: 'COSRX',
        name: 'Advanced Snail 96 Mucin Power Essence',
        category: 'skincare',
        subcategory: 'Treatments',
        price: 2400,
        priceUSD: 22.00,
        rating: 4.9,
        reviews: 3200,
        isPopular: true,
        stockStatus: 'In Stock',
        sku: 'COS-SN-003',
        description: 'A cult-favorite essence that repairs, hydrates, and brightens skin using 96% snail secretion filtrate.',
        skinType: ['All'],
        images: ['https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800']
    },

    // --- HAIRCARE ---
    {
        id: 'hair_001',
        brand: 'Olaplex',
        name: 'No. 3 Hair Perfector',
        category: 'haircare',
        subcategory: 'Treatments',
        price: 3600,
        priceUSD: 32.00,
        rating: 4.7,
        reviews: 5400,
        isPopular: true,
        stockStatus: 'In Stock',
        sku: 'OLA-003',
        description: 'A global bestseller. A weekly at-home treatment, not a conditioner, that reduces breakage and visibly strengthens hair.',
        howToUse: 'Apply to damp hair from roots to ends. Leave on for 10+ minutes.',
        images: [
            'https://images.unsplash.com/photo-1527799822340-4107127bcfb9?q=80&w=800',
            'https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?q=80&w=800'
        ]
    },
    {
        id: 'hair_002',
        brand: "L'Oréal Paris",
        name: 'Elvive Total Repair 5 Shampoo',
        category: 'haircare',
        subcategory: 'Shampoo',
        price: 850,
        oldPrice: 1050,
        priceUSD: 7.50,
        rating: 4.5,
        reviews: 620,
        stockStatus: 'In Stock',
        sku: 'LOR-TR-002',
        howToUse: 'Apply to wet hair, massage into lather and rinse.',
        images: ['https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=800']
    },

    // --- NAILS ---
    {
        id: 'nail_001',
        brand: 'OPI',
        name: 'Nail Lacquer - Big Apple Red',
        category: 'nails',
        subcategory: 'Polish',
        price: 1400,
        priceUSD: 12.00,
        rating: 4.9,
        reviews: 210,
        stockStatus: 'In Stock',
        sku: 'OPI-BA-001',
        description: 'OPI classic cherry-red nail polish. Long-lasting, chip-resistant formula.',
        hex: '#C10016',
        images: ['https://images.unsplash.com/photo-1632345031435-07cc66385330?q=80&w=800']
    },
    {
        id: 'nail_002',
        brand: 'Nirvana Color',
        name: 'Gel Effect Polish - Dhaka Night',
        category: 'nails',
        subcategory: 'Polish',
        price: 650,
        priceUSD: 6.00,
        rating: 4.6,
        reviews: 45,
        stockStatus: 'In Stock',
        sku: 'NIR-DN-002',
        description: 'Local favorite gel-finish polish in deep midnight blue.',
        hex: '#191970',
        images: ['https://images.unsplash.com/photo-1604902396830-aca29e19b067?q=80&w=800']
    },

    // --- FRAGRANCE ---
    {
        id: 'frag_001',
        brand: 'Chanel',
        name: 'N°5 Eau de Parfum',
        category: 'fragrance',
        subcategory: 'Perfumes',
        price: 18500,
        priceUSD: 165.00,
        rating: 5.0,
        reviews: 12,
        isNew: false,
        isPopular: true,
        stockStatus: 'Premium Only',
        sku: 'CHA-N5-001',
        description: 'The essence of femininity. A powdery floral bouquet housed in an iconic bottle with a minimalist design.',
        benefits: ['Iconic fragrance', 'Long-lasting', 'May Chang, Rose, Jasmine notes'],
        images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800']
    },
    {
        id: 'frag_002',
        brand: 'Jo Malone',
        name: 'English Pear & Freesia',
        category: 'fragrance',
        subcategory: 'Perfumes',
        price: 12500,
        priceUSD: 110.00,
        rating: 4.9,
        reviews: 48,
        stockStatus: 'In Stock',
        sku: 'JM-EP-002',
        description: 'The essence of autumn. The sensuous freshness of just-ripe pears is wrapped in a bouquet of white freesias.',
        images: ['https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800']
    },

    // --- ACCESSORIES ---
    {
        id: 'acc_001',
        brand: 'Radiance Signature',
        name: 'Professional Brush Set (12pcs)',
        category: 'accessories',
        subcategory: 'Gift Sets',
        price: 4500,
        oldPrice: 5500,
        priceUSD: 40.00,
        rating: 4.8,
        reviews: 110,
        isPopular: true,
        stockStatus: 'In Stock',
        sku: 'RAD-BS-001',
        description: 'A curated collection of 12 essential synthetic brushes for face and eyes. Includes a luxury travel pouch.',
        benefits: ['High-density bristles', 'Cruelty-free', 'Ergonomic handles'],
        images: ['https://images.unsplash.com/photo-1596462502278-27bfaf433393?q=80&w=800']
    },
    {
        id: 'acc_002',
        brand: 'Glamour World',
        name: 'Satin Hair Scrunchies (Set of 3)',
        category: 'accessories',
        subcategory: 'Hair',
        price: 450,
        priceUSD: 4.00,
        rating: 4.5,
        reviews: 320,
        stockStatus: 'In Stock',
        sku: 'GLW-HS-002',
        description: 'Protective satin scrunchies that prevent hair breakage and frizz. Perfect for sleeping or daily wear.',
        images: ['https://images.unsplash.com/photo-1610444583737-231697316710?q=80&w=800']
    },

    // --- BUNDLES (Radiance Exclusives) ---
    {
        id: 'bundle_001',
        brand: 'Radiance Elite',
        name: 'The Ultimate Bridal Glow Kit',
        category: 'accessories',
        subcategory: 'Gift Sets',
        price: 12500,
        oldPrice: 15000,
        priceUSD: 115.00,
        rating: 5.0,
        reviews: 24,
        isPopular: true,
        isBundle: true,
        stockStatus: 'Limited Edition',
        sku: 'RAD-BK-001',
        description: 'Everything a bride needs for pre-wedding radiance and wedding day glam. Includes bestsellers from MAC, lanéige, and Olaplex.',
        benefits: ['Save 15% on products', 'Includes luxury box', 'Personalized shades'],
        images: ['https://images.unsplash.com/photo-1522338242992-e1a5a1334641?q=80&w=800']
    }
];

export const ALL_PRODUCTS = [
    // We bring in makeup from makeupBrands too when exporting from a main helper
    ...BOUTIQUE_PRODUCTS
];
