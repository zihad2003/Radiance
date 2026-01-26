// Extended Product Database - 400+ Products
// This file extends the base makeupBrands.js with additional products

const createProduct = (index, brand, name, category, type, shadeName, hex, finish, priceBDT, description, extras = {}) => ({
    id: `${brand.toLowerCase().replace(/\s+/g, '_')}_${category}_${index}`,
    name: `${name} - ${shadeName}`,
    brand: brand,
    category: category,
    type: type,
    shade: shadeName,
    hex: hex,
    finish: finish,
    opacity: extras.opacity || 0.8,
    price: priceBDT,
    priceUSD: Number((priceBDT / 110).toFixed(2)),
    currency: "BDT",
    description: description || `High-quality ${type} by ${brand} with a ${finish} finish.`,
    ingredients: extras.ingredients || ["Vitamin E", "Aloe Vera", "Pigments"],
    skinType: extras.skinType || ["all"],
    texture: extras.texture || "cream",
    rating: 4.5 + Math.random() * 0.5,
    reviews: Math.floor(Math.random() * 500) + 50,
    inStock: true,
    image: extras.image || null
});

// NARS Products (50 items)
const narsProducts = [
    // Lipsticks
    ...Array.from({ length: 15 }, (_, i) => createProduct(i + 1, "NARS", "Velvet Matte Lip Pencil", "lips", "lipstick",
        ["Dragon Girl", "Cruella", "Dolce Vita", "Bahama", "Never Say Never", "Endangered Red", "Walkyrie", "Belle de Jour", "Paimpol", "Mysterious Red", "Do Me Baby", "Damned", "Sex Machine", "Bettina", "Consuming Red"][i],
        ["#C41E3A", "#DC143C", "#C08081", "#E6A8A8", "#D8BFD8", "#8B0000", "#E75480", "#F5DEB3", "#C9A0DC", "#8B0000", "#E75480", "#8B0000", "#DC143C", "#C41E3A", "#8B0000"][i],
        "matte", 2800, "Iconic NARS matte lip pencil.")),

    // Blushes
    ...Array.from({ length: 10 }, (_, i) => createProduct(i + 16, "NARS", "Blush", "cheeks", "blush",
        ["Orgasm", "Deep Throat", "Torrid", "Sin", "Dolce Vita", "Luster", "Gaiety", "Amour", "Exhibit A", "Taj Mahal"][i],
        ["#FF9999", "#FFB6C1", "#FF6347", "#FFB6C1", "#DDA0DD", "#FFE4E1", "#FF69B4", "#FFC0CB", "#FF6B6B", "#D2691E"][i],
        "shimmer", 3200, "Iconic NARS blush with shimmer.")),

    // Foundations
    ...Array.from({ length: 15 }, (_, i) => createProduct(i + 26, "NARS", "Sheer Glow Foundation", "face", "foundation",
        `${i < 5 ? 'Light' : i < 10 ? 'Medium' : 'Deep'} ${i % 5 + 1}`,
        ["#F5E6D3", "#F0D9C4", "#E8C9A8", "#DEB887", "#D2B48C", "#C19A6B", "#B8860B", "#A0826D", "#8B7355", "#704214", "#5C4033", "#4A3728", "#3E2723", "#2E1A0A", "#1A0F08"][i],
        "natural", 4500, "Natural radiant finish foundation.")),

    // Eyeshadows
    ...Array.from({ length: 10 }, (_, i) => createProduct(i + 41, "NARS", "Single Eyeshadow", "eyes", "eyeshadow",
        ["Fathom", "Night Porter", "Lhasa", "Kalahari", "Galapagos", "Coconut Grove", "Persia", "Bellissima", "Daphne", "Pandora"][i],
        ["#2F4F4F", "#1C1C1C", "#8B4513", "#D2691E", "#4682B4", "#228B22", "#9370DB", "#FFB6C1", "#E6E6FA", "#FFD700"][i],
        ["matte", "matte", "shimmer", "metallic", "satin", "shimmer", "metallic", "shimmer", "satin", "metallic"][i],
        1900, "Highly pigmented eyeshadow."))
];

// Urban Decay Products (50 items)
const urbanDecayProducts = [
    // Naked Palettes (eyeshadows)
    ...Array.from({ length: 20 }, (_, i) => createProduct(i + 1, "Urban Decay", "Naked Eyeshadow", "eyes", "eyeshadow",
        ["Virgin", "Sin", "Naked", "Sidecar", "Buck", "Half Baked", "Smog", "Darkhorse", "Toasted", "Hustle", "Creep", "Gunmetal", "Strange", "Foxy", "Trick", "Nooner", "Liar", "Factory", "Mugshot", "Blackheart"][i],
        ["#F5E6D3", "#E6D5C3", "#D4A574", "#C19A6B", "#8B7355", "#DAA520", "#696969", "#3E2723", "#A0522D", "#CD853F", "#2F4F4F", "#708090", "#DDA0DD", "#F5DEB3", "#FFE4B5", "#D2B48C", "#A0826D", "#8B7355", "#696969", "#1C1C1C"][i],
        ["shimmer", "shimmer", "matte", "metallic", "matte", "metallic", "matte", "matte", "shimmer", "metallic", "matte", "metallic", "shimmer", "matte", "shimmer", "matte", "matte", "matte", "shimmer", "matte"][i],
        2200, "Iconic Naked palette shade.")),

    // Vice Lipsticks
    ...Array.from({ length: 15 }, (_, i) => createProduct(i + 21, "Urban Decay", "Vice Lipstick", "lips", "lipstick",
        ["Bad Blood", "Rapture", "Violate", "Sheer Shame", "Backtalk", "Conspiracy", "Firebird", "Fuel", "Gash", "Heat", "Jilted", "Liar", "Manic", "Naked", "Obsessed"][i],
        ["#8B0000", "#DC143C", "#9370DB", "#FFB6C1", "#FF69B4", "#8B4513", "#FF4500", "#DC143C", "#8B0000", "#FF6347", "#C71585", "#A0522D", "#FF1493", "#D2B48C", "#8B008B"][i],
        ["matte", "cream", "matte", "sheer", "cream", "matte", "metallic", "matte", "matte", "cream", "matte", "matte", "metallic", "matte", "matte"][i],
        2400, "Bold Urban Decay lipstick.")),

    // All Nighter Foundation
    ...Array.from({ length: 15 }, (_, i) => createProduct(i + 36, "Urban Decay", "All Nighter Foundation", "face", "foundation",
        `Shade ${i + 1}`,
        ["#FFEFD5", "#FFE4C4", "#FFDAB9", "#F5DEB3", "#F0E68C", "#EEE8AA", "#E6D5C3", "#DEB887", "#D2B48C", "#C19A6B", "#B8860B", "#A0826D", "#8B7355", "#704214", "#5C4033"][i],
        "matte", 4200, "Long-lasting matte foundation."))
];

// Too Faced Products (40 items)
const tooFacedProducts = [
    // Born This Way Foundation
    ...Array.from({ length: 15 }, (_, i) => createProduct(i + 1, "Too Faced", "Born This Way Foundation", "face", "foundation",
        ["Snow", "Pearl", "Vanilla", "Almond", "Natural Beige", "Warm Nude", "Sand", "Nude", "Golden Beige", "Caramel", "Chestnut", "Chocolate", "Cocoa", "Mahogany", "Espresso"][i],
        ["#FFF5EE", "#FFE4E1", "#FFEFD5", "#FFEBCD", "#F5DEB3", "#DEB887", "#F4A460", "#D2B48C", "#DAA520", "#D2691E", "#A0522D", "#8B4513", "#704214", "#5C4033", "#3E2723"][i],
        "natural", 4000, "Medium coverage natural foundation.")),

    // Melted Lipsticks
    ...Array.from({ length: 15 }, (_, i) => createProduct(i + 16, "Too Faced", "Melted Matte Lipstick", "lips", "liquid_lipstick",
        ["Child Star", "Queen B", "Lady Balls", "Sell Out", "Cool Girl", "It's Happening", "Bend & Snap", "Gingerbread Man", "Candy Cane", "Chihuahua", "Drop Dead Red", "Mrs. Roper", "Unicorn", "Peekaboo", "Evil Twin"][i],
        ["#FFB6C1", "#DC143C", "#FF69B4", "#C71585", "#DDA0DD", "#FF1493", "#FFC0CB", "#D2691E", "#DC143C", "#FF69B4", "#8B0000", "#FF6347", "#E6E6FA", "#FFB6C1", "#8B008B"][i],
        "matte", 2200, "Liquid matte lipstick.")),

    // Chocolate Eyeshadows
    ...Array.from({ length: 10 }, (_, i) => createProduct(i + 31, "Too Faced", "Chocolate Bar Eyeshadow", "eyes", "eyeshadow",
        ["White Chocolate", "Milk Chocolate", "Salted Caramel", "Marzipan", "Champagne Truffle", "Amaretto", "Creme Brulee", "Strawberry Bon Bon", "Candied Violet", "Triple Fudge"][i],
        ["#F5E6D3", "#8B4513", "#D2691E", "#F5DEB3", "#FFE4B5", "#D2B48C", "#F0E68C", "#FFB6C1", "#9370DB", "#3E2723"][i],
        ["shimmer", "matte", "shimmer", "matte", "shimmer", "matte", "shimmer", "shimmer", "shimmer", "matte"][i],
        2000, "Chocolate-scented eyeshadow."))
];

// Anastasia Beverly Hills Products (50 items)
const anastasiaBHProducts = [
    // Modern Renaissance Palette
    ...Array.from({ length: 14 }, (_, i) => createProduct(i + 1, "Anastasia Beverly Hills", "Modern Renaissance", "eyes", "eyeshadow",
        ["Tempera", "Golden Ochre", "Vermeer", "Buon Fresco", "Antique Bronze", "Love Letter", "Cyprus Umber", "Realgar", "Warm Taupe", "Burnt Orange", "Primavera", "Red Ochre", "Venetian Red", "Raw Sienna"][i],
        ["#F5E6D3", "#DAA520", "#FFD700", "#DDA0DD", "#CD7F32", "#C71585", "#3E2723", "#FF6347", "#D2B48C", "#FF8C00", "#FFB6C1", "#8B4513", "#8B0000", "#A0522D"][i],
        ["matte", "metallic", "shimmer", "matte", "metallic", "matte", "matte", "shimmer", "matte", "matte", "shimmer", "matte", "matte", "matte"][i],
        5500, "Iconic Modern Renaissance shade.")),

    // Liquid Lipsticks
    ...Array.from({ length: 20 }, (_, i) => createProduct(i + 15, "Anastasia Beverly Hills", "Liquid Lipstick", "lips", "liquid_lipstick",
        ["Ashton", "Dolce", "Pure Hollywood", "Heathers", "Stripped", "Sad Girl", "Dusty Rose", "Craft", "Sepia", "Kathryn", "Catnip", "Veronica", "Poet", "Vintage", "Spicy", "Trust Issues", "Trouble", "Midnight", "Vamp", "Bloodline"][i],
        ["#A0522D", "#FFB6C1", "#DC143C", "#C71585", "#D2B48C", "#DDA0DD", "#BC8F8F", "#8B4513", "#704214", "#FF69B4", "#9370DB", "#8B008B", "#A0826D", "#D2691E", "#8B0000", "#C19A6B", "#DC143C", "#2F4F4F", "#8B0000", "#8B0000"][i],
        "matte", 2400, "Long-lasting liquid lipstick.")),

    // Brow Products
    ...Array.from({ length: 10 }, (_, i) => createProduct(i + 35, "Anastasia Beverly Hills", "Brow Wiz", "eyes", "brow_pencil",
        ["Taupe", "Soft Brown", "Medium Brown", "Chocolate", "Dark Brown", "Granite", "Ebony", "Blonde", "Caramel", "Auburn"][i],
        ["#D2B48C", "#A0826D", "#8B7355", "#704214", "#5C4033", "#696969", "#1C1C1C", "#F5DEB3", "#D2691E", "#A52A2A"][i],
        "matte", 2200, "Ultra-fine brow pencil.")),

    // Glow Kits
    ...Array.from({ length: 6 }, (_, i) => createProduct(i + 45, "Anastasia Beverly Hills", "Glow Kit", "face", "highlighter",
        ["Moonchild", "Sun Dipped", "Gleam", "That Glow", "Sweets", "Aurora"][i],
        ["#E6E6FA", "#FFD700", "#F0E68C", "#DAA520", "#FFB6C1", "#E0FFFF"][i],
        "shimmer", 4500, "Illuminating highlighter palette."))
];

// Charlotte Tilbury Products (40 items)
const charlotteTilburyProducts = [
    // Pillow Talk Collection
    ...Array.from({ length: 10 }, (_, i) => createProduct(i + 1, "Charlotte Tilbury", "Pillow Talk Lipstick", "lips", "lipstick",
        ["Original", "Medium", "Intense", "Big", "VIP", "Dreamy", "Blushed", "Runway Royalty", "Walk of No Shame", "Very Victoria"][i],
        ["#C08081", "#B76E79", "#A0522D", "#C19A6B", "#D2B48C", "#DDA0DD", "#FFB6C1", "#DC143C", "#C71585", "#8B4513"][i],
        ["matte", "matte", "matte", "matte", "satin", "matte", "satin", "matte", "matte", "matte"][i],
        3200, "Iconic Pillow Talk shade.")),

    // Magic Cream & Foundations
    ...Array.from({ length: 15 }, (_, i) => createProduct(i + 11, "Charlotte Tilbury", "Airbrush Flawless Foundation", "face", "foundation",
        [`${i + 1} ${i < 5 ? 'Fair' : i < 10 ? 'Medium' : 'Deep'}`],
        ["#FFF5EE", "#FFE4E1", "#FFEFD5", "#F5DEB3", "#F0E68C", "#DEB887", "#D2B48C", "#C19A6B", "#B8860B", "#A0826D", "#8B7355", "#704214", "#5C4033", "#3E2723", "#2E1A0A"][i],
        "natural", 4800, "Airbrush finish foundation.")),

    // Eyes to Mesmerize
    ...Array.from({ length: 10 }, (_, i) => createProduct(i + 26, "Charlotte Tilbury", "Eyes to Mesmerize", "eyes", "eyeshadow",
        ["Bette", "Jean", "Mona Lisa", "Marie Antoinette", "Cleopatra", "Veruschka", "Oyster Pearl", "Champagne", "Rose Gold", "Copper Charge"][i],
        ["#C19A6B", "#8B7355", "#D2B48C", "#E6E6FA", "#DAA520", "#696969", "#F5E6D3", "#FFE4B5", "#B76E79", "#CD7F32"][i],
        ["shimmer", "metallic", "shimmer", "shimmer", "metallic", "metallic", "shimmer", "shimmer", "metallic", "metallic"][i],
        3000, "Cream eyeshadow pot.")),

    // Blushes
    ...Array.from({ length: 5 }, (_, i) => createProduct(i + 36, "Charlotte Tilbury", "Cheek to Chic Blush", "cheeks", "blush",
        ["Pillow Talk", "First Love", "Love Glow", "Ecstasy", "Walk of No Shame"][i],
        ["#FFB6C1", "#FFC0CB", "#FF69B4", "#DC143C", "#C71585"][i],
        "shimmer", 3800, "Swirl blush duo."))
];

// Clinique Products (30 items)
const cliniqueProducts = [
    // Even Better Foundation
    ...Array.from({ length: 15 }, (_, i) => createProduct(i + 1, "Clinique", "Even Better Foundation", "face", "foundation",
        [`WN ${i < 5 ? '01-08' : i < 10 ? '22-46' : '48-122'} ${['Flax', 'Cream Whip', 'Breeze', 'Linen', 'Alabaster', 'Ivory', 'Vanilla', 'Buff', 'Honey', 'Golden', 'Amber', 'Nutty', 'Toffee', 'Espresso', 'Ebony'][i]}`],
        ["#FFF5EE", "#FFE4E1", "#FFEFD5", "#F5DEB3", "#F0E68C", "#EEE8AA", "#DEB887", "#D2B48C", "#DAA520", "#CD853F", "#D2691E", "#A0826D", "#8B7355", "#5C4033", "#3E2723"][i],
        "natural", 3800, "Clinical skincare foundation.")),

    // Chubby Sticks
    ...Array.from({ length: 10 }, (_, i) => createProduct(i + 16, "Clinique", "Chubby Stick", "lips", "lipstick",
        ["Mega Melon", "Whole Lotta Honey", "Two Ton Tomato", "Richer Raisin", "Woppin' Watermelon", "Chunky Cherry", "Oversized Orange", "Bountiful Blush", "Graped Up", "Super Strawberry"][i],
        ["#FFB6C1", "#F0E68C", "#FF6347", "#8B008B", "#FF69B4", "#DC143C", "#FF8C00", "#FFC0CB", "#9370DB", "#FF1493"][i],
        "balm", 2000, "Moisturizing lip balm.")),

    // Cheek Pops
    ...Array.from({ length: 5 }, (_, i) => createProduct(i + 26, "Clinique", "Cheek Pop", "cheeks", "blush",
        ["Ginger Pop", "Peach Pop", "Berry Pop", "Plum Pop", "Nude Pop"][i],
        ["#D2691E", "#FFDAB9", "#C71585", "#8B008B", "#D2B48C"][i],
        "satin", 2800, "Silky blush."))
];

// Bobbi Brown Products (30 items)
const bobbieBrownProducts = [
    // Skin Foundation
    ...Array.from({ length: 15 }, (_, i) => createProduct(i + 1, "Bobbi Brown", "Skin Long-Wear Foundation", "face", "foundation",
        [`${i < 5 ? 'Porcelain' : i < 10 ? 'Warm' : 'Deep'} ${i % 5 + 1}`],
        ["#FFF5EE", "#FFE4E1", "#FFEFD5", "#F5DEB3", "#F0E68C", "#DEB887", "#D2B48C", "#C19A6B", "#B8860B", "#A0826D", "#8B7355", "#704214", "#5C4033", "#3E2723", "#2E1A0A"][i],
        "natural", 4500, "Lightweight long-wear foundation.")),

    // Luxe Lip Color
    ...Array.from({ length: 10 }, (_, i) => createProduct(i + 16, "Bobbi Brown", "Luxe Lip Color", "lips", "lipstick",
        ["Neutral Rose", "Soft Coral", "Pink Buff", "Sandwash Pink", "Desert Rose", "Uber Beige", "Retro Red", "Burnt Cherry", "Brocade", "Plum"][i],
        ["#C08081", "#FF7F50", "#FFB6C1", "#FFC0CB", "#C71585", "#D2B48C", "#DC143C", "#8B0000", "#8B4513", "#8B008B"][i],
        "cream", 2800, "Creamy lipstick.")),

    // Shimmer Bricks
    ...Array.from({ length: 5 }, (_, i) => createProduct(i + 26, "Bobbi Brown", "Shimmer Brick", "face", "highlighter",
        ["Bronze", "Rose", "Pink Quartz", "Beige", "Nectar"][i],
        ["#CD7F32", "#FFB6C1", "#FFC0CB", "#F5DEB3", "#FFD700"][i],
        "shimmer", 4200, "Multi-toned shimmer brick."))
];

// Combine all extended products
export const extendedProducts = [
    ...narsProducts,
    ...urbanDecayProducts,
    ...tooFacedProducts,
    ...anastasiaBHProducts,
    ...charlotteTilburyProducts,
    ...cliniqueProducts,
    ...bobbieBrownProducts
];

export const extendedBrands = [
    { id: "nars", name: "NARS", origin: "International", products: narsProducts },
    { id: "urban_decay", name: "Urban Decay", origin: "International", products: urbanDecayProducts },
    { id: "too_faced", name: "Too Faced", origin: "International", products: tooFacedProducts },
    { id: "anastasia_bh", name: "Anastasia Beverly Hills", origin: "International", products: anastasiaBHProducts },
    { id: "charlotte_tilbury", name: "Charlotte Tilbury", origin: "International", products: charlotteTilburyProducts },
    { id: "clinique", name: "Clinique", origin: "International", products: cliniqueProducts },
    { id: "bobbi_brown", name: "Bobbi Brown", origin: "International", products: bobbieBrownProducts }
];
