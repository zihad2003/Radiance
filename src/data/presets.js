// Ready-made Makeup Presets for Radiance Salon
// Quick-apply looks for various occasions with detailed metadata

export const PRESETS = [
    // --- BRIDAL PRESETS (1-5) ---
    {
        id: "bridal_bangladeshi",
        name: "Classic Bangladeshi Bride",
        category: "Bridal",
        description: "Classic red lip and golden eyes for the big day. Traditional and Timeless.",
        thumbnail: "/assets/presets/bridal_bangladeshi.png",
        difficulty: "Advanced",
        time: "60+ min",
        trending: true,
        skinTones: ["medium", "deep"],
        products: {
            lips: { id: "mac_lips_1", name: "MAC Ruby Woo", shade: "Ruby Woo", color: "#990000", opacity: 0.9 },
            eyes: { id: "huda_eyes_2", name: "Huda Gold", shade: "Rose Gold", color: "#B76E79", opacity: 0.8 },
            blush: { id: "loreal_cheeks_3", name: "L'Oreal Rosewood", shade: "Rosewood", color: "#D98D8D", opacity: 0.6 },
            foundation: { id: "mac_face_10", name: "MAC Studio Fix", shade: "NC25", color: "#EACDAA", opacity: 0.9 }
        },
        steps: [
            "Apply primer and foundation for full coverage.",
            "Use golden shimmer on eyelids and create a sharp wing.",
            "Apply dramatic lashes and heavy mascara.",
            "Finish with the iconic Ruby Woo red lipstick."
        ]
    },
    {
        id: "bridal_minimalist",
        name: "Modern Minimalist Bride",
        category: "Bridal",
        description: "Nude lips, peachy cheeks, natural eyes with subtle wing. Elegant and clean.",
        thumbnail: "/assets/presets/bridal_minimalist.png",
        difficulty: "Intermediate",
        time: "40 min",
        trending: false,
        skinTones: ["fair", "medium"],
        products: {
            lips: { id: "mac_lips_5", name: "MAC Velvet Teddy", shade: "Velvet Teddy", color: "#A87262", opacity: 0.8 },
            eyes: { id: "mac_eyes_15", name: "MAC Espresso", shade: "Espresso", color: "#4B3628", opacity: 0.4 },
            blush: { id: "fenty_cheeks_3", name: "Fenty Petal Poppin", shade: "Petal Poppin", color: "#F58EA1", opacity: 0.5 },
        },
        steps: [
            "Start with a sheer radiance primer.",
            "Apply a soft sweep of peach blush on the cheekbones.",
            "Define eyes with a chocolate brown liner.",
            "Finish with a matte nude lip."
        ]
    },
    {
        id: "bridal_glam",
        name: "Glam Night Bride",
        category: "Bridal",
        description: "Berry lips, smokey eyes, highlighted cheeks. Perfect for evening receptions.",
        thumbnail: "/assets/presets/bridal_glam.png",
        difficulty: "Advanced",
        time: "50 min",
        trending: true,
        skinTones: ["fair", "medium", "deep"],
        products: {
            lips: { id: "mac_lips_4", name: "MAC Dubonnet", shade: "Dubonnet", color: "#791D23", opacity: 1.0 },
            eyes: { id: "mac_eyes_14", name: "MAC Carbon", shade: "Carbon", color: "#1A1A1A", opacity: 0.7 },
            blush: { id: "affaire_cheeks_3", name: "Affaire Peachy", shade: "Peachy keen", color: "#FFAD86", opacity: 0.5 }
        },
        steps: [
            "Create a deep charcoal smokey eye.",
            "Apply a strong contour and high-intensity highlighter.",
            "Line lips precisely and fill with a deep berry shade."
        ]
    },
    {
        id: "bridal_dewy",
        name: "Dewy Radiant Bride",
        category: "Bridal",
        description: "Glossy skin, pink lips, shimmery eyes. A fresh and glowy approach.",
        thumbnail: "/assets/presets/bridal_dewy.png",
        difficulty: "Beginner",
        time: "30 min",
        trending: true,
        skinTones: ["fair", "medium"],
        products: {
            lips: { id: "fenty_lips_2", name: "Fenty Gloss Bomb", shade: "Fenty Glow", color: "#C77F70", opacity: 0.4, finish: "glossy" },
            eyes: { id: "lakme_eyes_5", name: "Lakmé Pink Paradise", shade: "Pink Paradise", color: "#E38AAE", opacity: 0.3 },
            blush: { id: "loreal_cheeks_3", name: "L'Oreal Rosewood", shade: "Rosewood", color: "#D98D8D", opacity: 0.4 }
        },
        steps: [
            "Mix illuminator with your foundation for the base.",
            "Apply liquid blush and blend upwards.",
            "Use a high-shine gloss for the lips."
        ]
    },
    {
        id: "bridal_bollywood",
        name: "Bollywood Sensation",
        category: "Bridal",
        description: "Intense eyes, bold lips, dramatic contour. Be the star of your wedding.",
        thumbnail: "/assets/presets/bridal_bollywood.png",
        difficulty: "Advanced",
        time: "75 min",
        trending: true,
        skinTones: ["medium", "deep"],
        products: {
            lips: { id: "maybelline_lips_1", name: "Maybelline Pioneer", shade: "Pioneer", color: "#990F21", opacity: 1.0 },
            eyes: { id: "huda_eyes_1", name: "Huda Maneater", shade: "Maneater", color: "#800020", opacity: 0.9 },
            blush: { id: "fenty_cheeks_2", name: "Fenty Glow", shade: "Glow", color: "#C77F70", opacity: 0.6 }
        },
        steps: [
            "Apply a heavy winged eyeliner.",
            "Use warm brown and maroon tones on eyes.",
            "Sharp contouring for a sculpted face.",
            "Bold liquid matte lipstick."
        ]
    },

    // --- PARTY LOOKS (6-10) ---
    {
        id: "party_cocktail",
        name: "Cocktail Chic",
        category: "Party",
        thumbnail: "/assets/presets/party_cocktail.png",
        difficulty: "Intermediate",
        time: "30 min",
        trending: false,
        skinTones: ["fair", "medium", "deep"],
        products: {
            lips: { id: "mac_lips_2", name: "MAC Russian Red", shade: "Russian Red", color: "#AB0E17", opacity: 0.9 },
            eyes: { id: "mac_eyes_16", name: "MAC Amber Lights", shade: "Amber Lights", color: "#B87C4C", opacity: 0.7 }
        },
        steps: ["Classic red lip combined with shimmering bronze lids."]
    },
    {
        id: "party_date_night",
        name: "Date Night Glam",
        category: "Party",
        thumbnail: "/assets/presets/party_date_night.png",
        difficulty: "Intermediate",
        time: "20 min",
        products: { lips: { id: "mac_lips_6", name: "MAC Mehr", shade: "Mehr", color: "#C18693", opacity: 0.8 }, eyes: { id: "mac_eyes_15", name: "MAC Espresso", color: "#4B3628", opacity: 0.5 } },
        steps: ["Muted pink highlights for a romantic evenining."]
    },
    {
        id: "party_gno",
        name: "Girls Night Out",
        category: "Party",
        thumbnail: "/assets/presets/party_gno.png",
        difficulty: "Beginner",
        time: "15 min",
        trending: true,
        products: { lips: { id: "maybelline_lips_2", name: "Maybelline Lover", color: "#B06575", opacity: 0.9 }, eyes: { id: "nirvana_eyes_3", name: "Nirvana Bengal Gold", color: "#C5A000", opacity: 0.4 } },
        steps: ["Easy smudged liner and long-wear mauve lips."]
    },
    {
        id: "party_festival",
        name: "Festival Vibes",
        category: "Party",
        thumbnail: "/assets/presets/party_festival.png",
        difficulty: "Intermediate",
        time: "40 min",
        products: { lips: { id: "fenty_lips_2", name: "Fenty Glow", color: "#C77F70", opacity: 0.6 }, eyes: { id: "nirvana_eyes_3", name: "Bengal Gold", color: "#C5A000", opacity: 0.8 } },
        steps: ["Golden shimmering lids and high-shine gloss."]
    },
    {
        id: "party_evening",
        name: "Elegant Evening",
        category: "Party",
        thumbnail: "/assets/presets/party_evening.png",
        difficulty: "Intermediate",
        time: "25 min",
        products: { lips: { id: "mac_lips_4", name: "MAC Dubonnet", color: "#791D23", opacity: 0.9 }, eyes: { id: "mac_eyes_13", name: "MAC Carbon", color: "#1A1A1A", opacity: 0.3 } },
        steps: ["Sophisticated matte berry lips."]
    },

    // --- CASUAL LOOKS (11-15) ---
    {
        id: "casual_nomakeup",
        name: "No-Makeup Makeup",
        category: "Casual",
        thumbnail: "/assets/presets/casual_nomakeup.png",
        difficulty: "Beginner",
        time: "10 min",
        products: { lips: { id: "mac_lips_5", name: "Velvet Teddy", color: "#A87262", opacity: 0.3 }, blush: { id: "fenty_cheeks_3", name: "Petal Poppin", color: "#F58EA1", opacity: 0.2 } },
        steps: ["Barely there tint and natural flushed cheeks."]
    },
    {
        id: "casual_fresh",
        name: "Fresh Faced Glow",
        category: "Casual",
        thumbnail: "/assets/presets/casual_fresh.png",
        difficulty: "Beginner",
        time: "12 min",
        products: { lips: { id: "fenty_lips_2", name: "Fenty Glow", color: "#C77F70", opacity: 0.3 }, eyes: { id: "mac_eyes_13", name: "Carbon", opacity: 0.1 } },
        steps: ["Highlighter focused base for a healthy glow."]
    },
    {
        id: "casual_office",
        name: "Office Ready",
        category: "Casual",
        thumbnail: "/assets/presets/casual_office.png",
        difficulty: "Beginner",
        time: "15 min",
        products: { lips: { id: "mac_lips_7", name: "MAC Twig", color: "#9E6D68", opacity: 0.8 }, eyes: { id: "mac_eyes_15", name: "Espresso", color: "#4B3628", opacity: 0.2 } },
        steps: ["Muted brownish-pink tones for professional settings."]
    },
    {
        id: "casual_brunch",
        name: "Brunch Beauty",
        category: "Casual",
        thumbnail: "/assets/presets/casual_brunch.png",
        difficulty: "Beginner",
        time: "15 min",
        products: { lips: { id: "mac_lips_3", name: "Lady Danger", color: "#E32619", opacity: 0.5 }, blush: { id: "affaire_cheeks_3", name: "Peachy keen", color: "#FFAD86", opacity: 0.4 } },
        steps: ["Bright peachy lips and soft blush."]
    },
    {
        id: "casual_goddess",
        name: "Natural Goddess",
        category: "Casual",
        thumbnail: "/assets/presets/casual_goddess.png",
        difficulty: "Intermediate",
        time: "20 min",
        products: { lips: { id: "maybelline_lips_3", name: "Seductress", color: "#A67F71", opacity: 0.6 }, eyes: { id: "huda_eyes_3", name: "Cocoa", color: "#5D4037", opacity: 0.4 } },
        steps: ["Brown-toned monochromatic elegance."]
    },

    // --- TRENDS (16-20) ---
    {
        id: "trend_kbeauty",
        name: "K-Beauty Gradient",
        category: "Trend",
        thumbnail: "/assets/presets/trend_kbeauty.png",
        difficulty: "Intermediate",
        time: "20 min",
        products: { lips: { id: "maybelline_lips_2", name: "Lover", color: "#B06575", opacity: 0.7, finish: "gradient" }, blush: { id: "fenty_cheeks_3", name: "Petal Poppin", color: "#F58EA1", opacity: 0.3 } },
        steps: ["Concentrated lip color in center, blurred edges."]
    },
    {
        id: "trend_summer_coral",
        name: "Sunset Glow",
        category: "Trend",
        thumbnail: "/assets/presets/trend_summer_coral.png",
        difficulty: "Beginner",
        time: "15 min",
        products: { lips: { id: "mac_lips_3", name: "Lady Danger", color: "#E32619", opacity: 0.8 }, eyes: { id: "nirvana_eyes_3", name: "Bengal Gold", color: "#C5A000", opacity: 0.4 } },
        steps: ["Warm oranges and gold reflections."]
    },
    {
        id: "trend_autumn",
        name: "Autumn Spice",
        category: "Trend",
        thumbnail: "/assets/presets/trend_autumn.png",
        difficulty: "Intermediate",
        time: "20 min",
        products: { lips: { id: "mac_lips_2", name: "Russian Red", color: "#AB0E17", opacity: 0.8 }, eyes: { id: "mac_eyes_15", name: "Espresso", color: "#4B3628", opacity: 0.6 } },
        steps: ["Terracotta and spiced wood tones."]
    },
    {
        id: "trend_winter",
        name: "Winter Berry",
        category: "Trend",
        thumbnail: "/assets/presets/trend_winter.png",
        difficulty: "Beginner",
        time: "15 min",
        products: { lips: { id: "mac_lips_4", name: "Dubonnet", color: "#791D23", opacity: 0.9 }, blush: { id: "loreal_cheeks_3", name: "Rosewood", color: "#D98D8D", opacity: 0.4 } },
        steps: ["Cold-weather chic with deep berry accents."]
    },
    {
        id: "trend_latte",
        name: "Latte Glow",
        category: "Trend",
        thumbnail: "/assets/presets/trend_latte.png",
        difficulty: "Intermediate",
        time: "20 min",
        products: { lips: { id: "mac_lips_5", name: "Velvet Teddy", color: "#A87262", opacity: 1.0 }, eyes: { id: "mac_eyes_15", name: "Espresso", color: "#4B3628", opacity: 0.8 } },
        steps: ["Rich browns and bronze contour for a creamy look."]
    }
];
