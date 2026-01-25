// Ready-made Makeup Presets for Radiance Salon
// Quick-apply looks for various occasions

export const PRESETS = [
    {
        id: "wedding_glam",
        name: "Bridal Glow",
        category: "Wedding",
        description: "Classic red lip and golden eyes for the big day.",
        thumbnail: "/assets/presets/wedding.jpg",
        products: {
            lips: { id: "mac_lips_1", opacity: 0.9 }, // Ruby Woo
            eyes: { id: "mac_eyes_16", opacity: 0.8 }, // Amber Lights
            blush: { id: "loreal_cheeks_3", opacity: 0.6 }, // Rosewood
            foundation: { id: "mac_face_10", opacity: 0.8 }, // NC25
            eyeliner: { id: "maybelline_eyes_6", opacity: 1.0 }, // Colossal Kajal
            mascara: { id: "maybelline_eyes_4", opacity: 1.0 } // Lash Sensational
        }
    },
    {
        id: "party_night",
        name: "Midnight Party",
        category: "Party",
        description: "Bold berry lips and smokey eyes.",
        thumbnail: "/assets/presets/party.jpg",
        products: {
            lips: { id: "mac_lips_4", opacity: 1.0 }, // Dubonnet
            eyes: { id: "mac_eyes_14", opacity: 0.7 }, // Carbon (Smokey)
            blush: { id: "fenty_cheeks_3", opacity: 0.5 }, // Petal Poppin
            foundation: { id: "maybelline_face_9", opacity: 0.8 }, // Fit Me 220
            eyeliner: { id: "maybelline_eyes_7", opacity: 1.0 } // Tattoo Studio
        }
    },
    {
        id: "office_chic",
        name: "Office Chic",
        category: "Professional",
        description: "Subtle nude tones for a professional look.",
        thumbnail: "/assets/presets/office.jpg",
        products: {
            lips: { id: "mac_lips_5", opacity: 0.8 }, // Velvet Teddy
            eyes: { id: "mac_eyes_15", opacity: 0.3 }, // Espresso (Light)
            blush: { id: "loreal_cheeks_4", opacity: 0.4 }, // Sandalwood Pink
            foundation: { id: "loreal_face_125", opacity: 0.6 }, // Infallible
            mascara: { id: "maybelline_eyes_4", opacity: 0.8 }
        }
    },
    {
        id: "summer_fresh",
        name: "Summer Coral",
        category: "Seasonal",
        description: "Fresh coral tones perfect for sunlight.",
        thumbnail: "/assets/presets/summer.jpg",
        products: {
            lips: { id: "mac_lips_3", opacity: 0.8 }, // Lady Danger (Coral)
            eyes: { id: "huda_eyes_2", opacity: 0.4 }, // Rose Gold
            blush: { id: "affaire_cheeks_3", opacity: 0.5 }, // Peachy Keen
            foundation: { id: "maybelline_face_8", opacity: 0.5 }, // Ivory
        }
    },
    {
        id: "k_beauty",
        name: "K-Beauty Soft",
        category: "Trends",
        description: "Gradient lips and soft blurred blush.",
        thumbnail: "/assets/presets/kbeauty.jpg",
        products: {
            lips: { id: "maybelline_lips_2", opacity: 0.6, finish: "glossy" }, // Lover (Pink)
            eyes: { id: "lakme_eyes_5", opacity: 0.3 }, // Pink Paradise
            blush: { id: "fenty_cheeks_3", opacity: 0.4 }, // Petal Poppin
        }
    }
];
