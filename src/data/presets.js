// Ready-made Makeup Presets for Radiance Salon
// Quick-apply looks for various occasions

export const PRESETS = [
    // --- WEDDING SERIES ---
    {
        id: "wedding_glam",
        name: "Bridal Glow",
        category: "Wedding",
        description: "Classic red lip and golden eyes for the big day.",
        thumbnail: "/assets/presets/wedding.jpg",
        products: { lips: { id: "mac_lips_1", opacity: 0.9 }, eyes: { id: "mac_eyes_16", opacity: 0.8 }, blush: { id: "loreal_cheeks_3", opacity: 0.6 } }
    },
    {
        id: "wedding_mehendi",
        name: "Mehendi Vibe",
        category: "Wedding",
        description: "Vibrant yellow and green hues.",
        thumbnail: "/assets/presets/mehendi.jpg",
        products: { lips: { id: "mac_lips_3", opacity: 0.8 }, eyes: { id: "huda_eyes_1", opacity: 0.9 }, blush: { id: "fenty_cheeks_1", opacity: 0.7 } }
    },
    {
        id: "wedding_reception",
        name: "Reception Queen",
        category: "Wedding",
        description: "Deep burgundy elegance.",
        thumbnail: "/assets/presets/reception.jpg",
        products: { lips: { id: "mac_lips_4", opacity: 1.0 }, eyes: { id: "mac_eyes_14", opacity: 0.7 }, blush: { id: "loreal_cheeks_4", opacity: 0.5 } }
    },

    // --- PARTY LOOKS ---
    {
        id: "party_night",
        name: "Midnight Party",
        category: "Party",
        description: "Bold berry lips and smokey eyes.",
        thumbnail: "/assets/presets/party.jpg",
        products: { lips: { id: "mac_lips_4", opacity: 1.0 }, eyes: { id: "mac_eyes_14", opacity: 0.7 }, blush: { id: "fenty_cheeks_3", opacity: 0.5 } }
    },
    {
        id: "club_glam",
        name: "Club Glam",
        category: "Party",
        description: "Shimmering metallics.",
        thumbnail: "/assets/presets/club.jpg",
        products: { lips: { id: "mac_lips_5", opacity: 0.8 }, eyes: { id: "huda_eyes_2", opacity: 0.9 }, blush: { id: "fenty_cheeks_2", opacity: 0.6 } }
    },
    {
        id: "gala_dinner",
        name: "Gala Dinner",
        category: "Party",
        description: "Sophisticated glam.",
        thumbnail: "/assets/presets/gala.jpg",
        products: { lips: { id: "mac_lips_2", opacity: 0.9 }, eyes: { id: "mac_eyes_15", opacity: 0.6 }, blush: { id: "affaire_cheeks_3", opacity: 0.5 } }
    },

    // --- EVERYDAY / OFFICE ---
    {
        id: "office_chic",
        name: "Office Chic",
        category: "Professional",
        description: "Subtle nude tones for a professional look.",
        thumbnail: "/assets/presets/office.jpg",
        products: { lips: { id: "mac_lips_5", opacity: 0.8 }, eyes: { id: "mac_eyes_15", opacity: 0.3 }, blush: { id: "loreal_cheeks_4", opacity: 0.4 } }
    },
    {
        id: "no_makeup",
        name: "No-Makeup Look",
        category: "Everyday",
        description: "Enhance your natural beauty.",
        thumbnail: "/assets/presets/nomakeup.jpg",
        products: { lips: { id: "maybelline_lips_2", opacity: 0.3 }, eyes: { id: "mac_eyes_13", opacity: 0.1 }, blush: { id: "fenty_cheeks_3", opacity: 0.2 } }
    },
    {
        id: "morning_fresh",
        name: "Morning Fresh",
        category: "Everyday",
        description: "Awake and ready.",
        thumbnail: "/assets/presets/morning.jpg",
        products: { lips: { id: "mac_lips_3", opacity: 0.5 }, eyes: { id: "lakme_eyes_3", opacity: 0.3 }, blush: { id: "affaire_cheeks_2", opacity: 0.4 } }
    },

    // --- SEASONAL ---
    {
        id: "summer_fresh",
        name: "Summer Coral",
        category: "Seasonal",
        description: "Fresh coral tones perfect for sunlight.",
        thumbnail: "/assets/presets/summer.jpg",
        products: { lips: { id: "mac_lips_3", opacity: 0.8 }, eyes: { id: "huda_eyes_2", opacity: 0.4 }, blush: { id: "affaire_cheeks_3", opacity: 0.5 } }
    },
    {
        id: "winter_berry",
        name: "Winter Berry",
        category: "Seasonal",
        description: "Cool tones for cold days.",
        thumbnail: "/assets/presets/winter.jpg",
        products: { lips: { id: "mac_lips_4", opacity: 0.8 }, eyes: { id: "mac_eyes_13", opacity: 0.5 }, blush: { id: "loreal_cheeks_1", opacity: 0.5 } }
    },
    {
        id: "monsoon_pink",
        name: "Monsoon Pink",
        category: "Seasonal",
        description: "Waterproof pinks.",
        thumbnail: "/assets/presets/monsoon.jpg",
        products: { lips: { id: "mac_lips_1", opacity: 0.6 }, eyes: { id: "lakme_eyes_5", opacity: 0.4 }, blush: { id: "fenty_cheeks_1", opacity: 0.5 } }
    },

    // --- TRENDS ---
    {
        id: "k_beauty",
        name: "K-Beauty Soft",
        category: "Trends",
        description: "Gradient lips and soft blurred blush.",
        thumbnail: "/assets/presets/kbeauty.jpg",
        products: { lips: { id: "maybelline_lips_2", opacity: 0.6, finish: "glossy" }, eyes: { id: "lakme_eyes_5", opacity: 0.3 }, blush: { id: "fenty_cheeks_3", opacity: 0.4 } }
    },
    {
        id: "latte_makeup",
        name: "Latte Makeup",
        category: "Trends",
        description: "Monochromatic browns.",
        thumbnail: "/assets/presets/latte.jpg",
        products: { lips: { id: "mac_lips_5", opacity: 0.9 }, eyes: { id: "mac_eyes_15", opacity: 0.8 }, blush: { id: "affaire_cheeks_1", opacity: 0.7 } }
    },
    {
        id: "strawberry_girl",
        name: "Strawberry Girl",
        category: "Trends",
        description: "Flushed cheeks and faux freckles vibe.",
        thumbnail: "/assets/presets/strawberry.jpg",
        products: { lips: { id: "mac_lips_1", opacity: 0.4 }, eyes: { id: "lakme_eyes_5", opacity: 0.2 }, blush: { id: "loreal_cheeks_3", opacity: 0.8 } }
    },
    {
        id: "clean_girl",
        name: "Clean Girl",
        category: "Trends",
        description: "Slick back hair and glowing skin.",
        thumbnail: "/assets/presets/clean.jpg",
        products: { lips: { id: "maybelline_lips_1", opacity: 0.4, finish: "glossy" }, eyes: { id: "mac_eyes_13", opacity: 0.1 }, blush: { id: "fenty_cheeks_3", opacity: 0.3 } }
    },
    {
        id: "mob_wife",
        name: "Mob Wife",
        category: "Trends",
        description: "Heavy glam, bold liner, dark lips.",
        thumbnail: "/assets/presets/mobwife.jpg",
        products: { lips: { id: "mac_lips_4", opacity: 1.0, finish: "matte" }, eyes: { id: "mac_eyes_14", opacity: 0.9 }, blush: { id: "affaire_cheeks_4", opacity: 0.6 } }
    },
    {
        id: "coquette",
        name: "Coquette",
        category: "Trends",
        description: "Hyper feminine, doll-like.",
        thumbnail: "/assets/presets/coquette.jpg",
        products: { lips: { id: "mac_lips_3", opacity: 0.6 }, eyes: { id: "lakme_eyes_5", opacity: 0.5 }, blush: { id: "loreal_cheeks_3", opacity: 0.9 } }
    },
    {
        id: "grunge_soft",
        name: "Soft Grunge",
        category: "Trends",
        description: "Smudged liner and muted lips.",
        thumbnail: "/assets/presets/grunge.jpg",
        products: { lips: { id: "mac_lips_5", opacity: 0.7 }, eyes: { id: "mac_eyes_14", opacity: 0.6 }, blush: { id: "loreal_cheeks_4", opacity: 0.3 } }
    },
    {
        id: "eid_special",
        name: "Eid Special",
        category: "Festive",
        description: "Festive glam for celebrations.",
        thumbnail: "/assets/presets/eid.jpg",
        products: { lips: { id: "mac_lips_2", opacity: 1.0 }, eyes: { id: "huda_eyes_1", opacity: 0.8 }, blush: { id: "fenty_cheeks_2", opacity: 0.6 } }
    }
];
