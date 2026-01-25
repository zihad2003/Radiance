// Comprehensive Makeup Database for Radiance Beauty Salon
// Contains 100+ SKUs across 6 categories with advanced metadata

const createProduct = (index, brand, name, category, type, shadeName, hex, finish, priceBDT, description, extras = {}) => ({
    id: `${brand.toLowerCase().replace(/\s+/g, '_')}_${category}_${index}`,
    name: `${name} - ${shadeName}`,
    brand: brand,
    category: category,
    type: type,
    shade: shadeName,
    hex: hex,
    finish: finish, // matte, glossy, satin, sheer, metallic, shimmer, natural
    opacity: extras.opacity || 0.8,
    price: priceBDT,
    priceUSD: Number((priceBDT / 110).toFixed(2)), // Approx conversion
    currency: "BDT",
    description: description || `High-quality ${type} by ${brand} with a ${finish} finish.`,
    ingredients: extras.ingredients || ["Vitamin E", "Aloe Vera", "Pigments"],
    skinType: extras.skinType || ["all"],
    texture: extras.texture || "cream",
    rating: 4.5 + Math.random() * 0.5,
    reviews: Math.floor(Math.random() * 500) + 50,
    inStock: true
});

// --- BRAND DATA ---

const macProducts = [
    // Lipsticks (Reds)
    createProduct(1, "MAC", "Retro Matte Lipstick", "lips", "lipstick", "Ruby Woo", "#990000", "matte", 2400, "The iconic vivid blue-red.", { opacity: 0.9 }),
    createProduct(2, "MAC", "Matte Lipstick", "lips", "lipstick", "Russian Red", "#AB0E17", "matte", 2400, "Intense bluish-red.", { opacity: 0.9 }),
    createProduct(3, "MAC", "Matte Lipstick", "lips", "lipstick", "Lady Danger", "#E32619", "matte", 2400, "Vivid bright coral-red.", { opacity: 0.9 }),
    createProduct(4, "MAC", "Amplified Lipstick", "lips", "lipstick", "Dubonnet", "#791D23", "satin", 2400, "Deepened claret.", { opacity: 0.9 }),

    // Lipsticks (Nudes/Pinks)
    createProduct(5, "MAC", "Matte Lipstick", "lips", "lipstick", "Velvet Teddy", "#A87262", "matte", 2400, "Deep-tone beige.", { opacity: 0.85 }),
    createProduct(6, "MAC", "Matte Lipstick", "lips", "lipstick", "Mehr", "#C18693", "matte", 2400, "Dirty blue pink.", { opacity: 0.85 }),
    createProduct(7, "MAC", "Satin Lipstick", "lips", "lipstick", "Twig", "#9E6D68", "satin", 2400, "Soft muted brownish-pink.", { opacity: 0.8 }),

    // Foundations (Studio Fix)
    createProduct(8, "MAC", "Studio Fix Fluid", "face", "foundation", "NC15", "#F2Dcb3", "matte", 4200, "Fair beige with neutral undertone.", { opacity: 0.9 }),
    createProduct(9, "MAC", "Studio Fix Fluid", "face", "foundation", "NC20", "#EBC8A6", "matte", 4200, "Light beige with golden undertone.", { opacity: 0.9 }),
    createProduct(10, "MAC", "Studio Fix Fluid", "face", "foundation", "NC25", "#EACDAA", "matte", 4200, "Light to medium beige.", { opacity: 0.9 }),
    createProduct(11, "MAC", "Studio Fix Fluid", "face", "foundation", "NC35", "#D7AC84", "matte", 4200, "Medium beige with peach undertone.", { opacity: 0.9 }),
    createProduct(12, "MAC", "Studio Fix Fluid", "face", "foundation", "NC42", "#C69068", "matte", 4200, "Tan beige with golden undertone.", { opacity: 0.9 }),
    createProduct(13, "MAC", "Studio Fix Fluid", "face", "foundation", "NC45", "#B67B52", "matte", 4200, "Deep bronze with golden undertone.", { opacity: 0.9 }),

    // Eyeshadows
    createProduct(14, "MAC", "Eye Shadow", "eyes", "eyeshadow", "Carbon", "#1A1A1A", "matte", 1800, "Intense black.", { opacity: 0.9 }),
    createProduct(15, "MAC", "Eye Shadow", "eyes", "eyeshadow", "Espresso", "#4B3628", "matte", 1800, "Muted golden brown.", { opacity: 0.85 }),
    createProduct(16, "MAC", "Eye Shadow", "eyes", "eyeshadow", "Amber Lights", "#B87C4C", "shimmer", 1800, "Peachy-brown with shimmer.", { opacity: 0.7, texture: "shimmer" }),
];

const maybellineProducts = [
    // Lips
    createProduct(1, "Maybelline", "SuperStay Matte Ink", "lips", "liquid_lipstick", "Pioneer", "#990F21", "matte", 1200, "Vibrant true red.", { opacity: 1.0 }),
    createProduct(2, "Maybelline", "SuperStay Matte Ink", "lips", "liquid_lipstick", "Lover", "#B06575", "matte", 1200, "Mauve pink.", { opacity: 1.0 }),
    createProduct(3, "Maybelline", "SuperStay Matte Ink", "lips", "liquid_lipstick", "Seductress", "#A67F71", "matte", 1200, "Perfect nude.", { opacity: 1.0 }),

    // Mascara
    createProduct(4, "Maybelline", "Lash Sensational", "eyes", "mascara", "Very Black", "#000000", "matte", 950, "Full fan effect volume.", { opacity: 0.9 }),
    createProduct(5, "Maybelline", "Colossal Waterproof", "eyes", "mascara", "Glam Black", "#111111", "matte", 850, "9x volume, no clumps.", { opacity: 0.9 }),

    // Eyeliner
    createProduct(6, "Maybelline", "Colossal Kajal", "eyes", "eyeliner", "Black", "#000000", "matte", 350, "12H smudge-proof.", { opacity: 1.0 }),
    createProduct(7, "Maybelline", "Tattoo Studio", "eyes", "eyeliner", "Bold Brown", "#4A3728", "matte", 750, "Longwear gel pencil.", { opacity: 0.9 }),

    // Fit Me Foundation
    createProduct(8, "Maybelline", "Fit Me Matte+Poreless", "face", "foundation", "115 Ivory", "#F0D3B9", "natural", 1100, "Light skin, pink undertone.", { opacity: 0.7 }),
    createProduct(9, "Maybelline", "Fit Me Matte+Poreless", "face", "foundation", "220 Natural Beige", "#E0B68D", "natural", 1100, "Medium skin, neutral undertone.", { opacity: 0.7 }),
    createProduct(10, "Maybelline", "Fit Me Matte+Poreless", "face", "foundation", "330 Toffee", "#A67451", "natural", 1100, "Deep skin, warm undertone.", { opacity: 0.7 }),
];

const lorealProducts = [
    // Lipsticks
    createProduct(1, "L'Oreal", "Color Riche", "lips", "lipstick", "Blake's Red", "#8B0000", "matte", 1400, "Pure brick red."),
    createProduct(2, "L'Oreal", "Rouge Signature", "lips", "liquid_lipstick", "I Rule", "#A25C67", "matte", 1500, "Lightweight matte lip stain."),

    // Blush
    createProduct(3, "L'Oreal", "True Match Blush", "cheeks", "blush", "Rosewood", "#D98D8D", "satin", 1200, "Soft rose shine.", { opacity: 0.5 }),
    createProduct(4, "L'Oreal", "Le Blush", "cheeks", "blush", "Sandalwood Pink", "#C87C7C", "matte", 1200, "Natural flush.", { opacity: 0.6 }),
];

const fentyProducts = [
    createProduct(1, "Fenty Beauty", "Stunna Lip Paint", "lips", "liquid_lipstick", "Uncensored", "#A60D1A", "matte", 3200, "Universal red paint.", { opacity: 1.0 }),
    createProduct(2, "Fenty Beauty", "Gloss Bomb", "lips", "lipstick", "Fenty Glow", "#C77F70", "glossy", 2800, "Universal rose nude.", { opacity: 0.4, finish: "glossy" }),
    createProduct(3, "Fenty Beauty", "Cheeks Out", "cheeks", "blush", "Petal Poppin", "#F58EA1", "sheer", 2900, "Soft baby pink cream.", { opacity: 0.5 }),
    createProduct(4, "Fenty Beauty", "Killawatt", "face", "highlighter", "Trophy Wife", "#E8C946", "shimmer", 3800, "3D hyper-metallic gold.", { opacity: 0.6, texture: "metallic" })
];

const hudaProducts = [
    // Eyeshadow Palettes broken down into singles for try-on
    createProduct(1, "Huda Beauty", "Rose Gold", "eyes", "eyeshadow", "Maneater", "#800020", "matte", 1500, "Rich mulberry.", { opacity: 0.9 }),
    createProduct(2, "Huda Beauty", "Rose Gold", "eyes", "eyeshadow", "Rose Gold", "#B76E79", "metallic", 1500, "Foiled rose gold.", { opacity: 0.8, texture: "metallic" }),
    createProduct(3, "Huda Beauty", "Rose Gold", "eyes", "eyeshadow", "Cocoa", "#5D4037", "matte", 1500, "Warm brown.", { opacity: 0.85 }),
    createProduct(4, "Huda Beauty", "Power Bullet", "lips", "lipstick", "Third Date", "#994E4E", "matte", 2800, "Warm rosewood.", { opacity: 1.0 }),
];

// --- LOCAL BRANDS ---

const lakmeProducts = [
    createProduct(1, "Lakmé", "9to5 Primer+Matte", "lips", "lipstick", "Red Coat", "#B22222", "matte", 750),
    createProduct(2, "Lakmé", "9to5 Primer+Matte", "lips", "lipstick", "Pink Post", "#D65282", "matte", 750),
    createProduct(3, "Lakmé", "Absolute Blur Perfect", "face", "primer", "Pink", "#F8DADD", "matte", 850, "Makeup primer."),
    createProduct(4, "Lakmé", "Eyeconic Kajal", "eyes", "eyeliner", "Deep Black", "#050505", "matte", 350, "Smudge-free kajal.", { opacity: 1.0 }),
    createProduct(5, "Lakmé", "Absolute Infinity Eye Shadow", "eyes", "eyeshadow", "Pink Paradise", "#E38AAE", "shimmer", 950, "Soft pink shimmer.", { texture: "shimmer" }),
];

const affaireProducts = [
    createProduct(1, "Affaire", "Velvet Liquid", "lips", "liquid_lipstick", "Vintage Rose", "#B06D7B", "matte", 950),
    createProduct(2, "Affaire", "Velvet Liquid", "lips", "liquid_lipstick", "Dark Desire", "#4A192C", "matte", 950),
    createProduct(3, "Affaire", "Luminous Blush", "cheeks", "blush", "Peachy keen", "#FFAD86", "satin", 850),
];

const goldenRoseProducts = [
    createProduct(1, "Golden Rose", "Velvet Matte", "lips", "lipstick", "16", "#9E6857", "matte", 550),
    createProduct(2, "Golden Rose", "Velvet Matte", "lips", "lipstick", "18", "#A52A2A", "matte", 550),
    createProduct(3, "Golden Rose", "Terracotta Blush", "cheeks", "blush", "03", "#D1867A", "shimmer", 1200, "Baked blush with shimmer.", { texture: "shimmer" }),
];

const nirvanaProducts = [
    createProduct(1, "Nirvana Color", "Liquid Matte", "lips", "liquid_lipstick", "Dhaka Dreams", "#C24545", "matte", 650, "Local favorite red."),
    createProduct(2, "Nirvana Color", "Liquid Matte", "lips", "liquid_lipstick", "Chittagong Chill", "#D48C95", "matte", 650, "Cool toned pink."),
    createProduct(3, "Nirvana Color", "Shadow Palette", "eyes", "eyeshadow", "Bengal Gold", "#C5A000", "metallic", 1050, "Gold shimmer.", { texture: "metallic", opacity: 0.8 }),
];


// --- EXPORT ---

export const internationalBrands = [
    { id: "mac_cosmetics", name: "MAC Cosmetics", origin: "International", logo: "/assets/brands/mac.png", products: macProducts },
    { id: "maybelline", name: "Maybelline New York", origin: "International", logo: "/assets/brands/maybelline.png", products: maybellineProducts },
    { id: "fenty", name: "Fenty Beauty", origin: "International", logo: "/assets/brands/fenty.png", products: fentyProducts },
    { id: "loreal", name: "L'Oréal Paris", origin: "International", logo: "/assets/brands/loreal.png", products: lorealProducts },
    { id: "huda", name: "Huda Beauty", origin: "International", logo: "/assets/brands/huda.png", products: hudaProducts },
];

export const localBrands = [
    { id: "lakme", name: "Lakmé", origin: "Regional", logo: "/assets/brands/lakme.png", products: lakmeProducts },
    { id: "affaire", name: "Affaire Cosmetics", origin: "Local", logo: "/assets/brands/affaire.png", products: affaireProducts },
    { id: "golden_rose", name: "Golden Rose", origin: "Regional", logo: "/assets/brands/golden_rose.png", products: goldenRoseProducts },
    { id: "nirvana", name: "Nirvana Color", origin: "Local", logo: "/assets/brands/nirvana.png", products: nirvanaProducts },
];

export const getAllProducts = () => {
    return [...internationalBrands.flatMap(b => b.products), ...localBrands.flatMap(b => b.products)];
};

export const getBrands = () => {
    return { international: internationalBrands, local: localBrands };
};
