export const internationalBrands = [
    {
        id: "mac_cosmetics",
        name: "MAC Cosmetics",
        origin: "International",
        logo: "/assets/brands/mac.png",
        products: [
            {
                id: "mac_ruby_woo",
                name: "Retro Matte Lipstick - Ruby Woo",
                category: "lips",
                type: "lipstick",
                color: "#990000",
                hex: "#990000",
                finish: "matte",
                price: 22.00,
                currency: "USD",
                description: "The iconic vivid blue-red with a retro matte finish.",
                textures: {
                    gloss: 0.1,
                    roughness: 0.8,
                    metallic: 0.0
                }
            },
            {
                id: "mac_velvet_teddy",
                name: "Matte Lipstick - Velvet Teddy",
                category: "lips",
                type: "lipstick",
                color: "#A87262",
                hex: "#A87262",
                finish: "matte",
                price: 22.00,
                currency: "USD",
                textures: { gloss: 0.1, roughness: 0.8, metallic: 0.0 }
            },
            {
                id: "mac_heroine",
                name: "Matte Lipstick - Heroine",
                category: "lips",
                type: "lipstick",
                color: "#6D3080",
                hex: "#6D3080",
                finish: "matte",
                price: 22.00,
                currency: "USD",
                textures: { gloss: 0.1, roughness: 0.8, metallic: 0.0 }
            },
            {
                id: "mac_studio_fix_nc20",
                name: "Studio Fix Fluid - NC20",
                category: "face",
                type: "foundation",
                color: "#EBC8A6",
                hex: "#EBC8A6",
                finish: "matte",
                price: 39.00
            },
            {
                id: "mac_studio_fix_nc45",
                name: "Studio Fix Fluid - NC45",
                category: "face",
                type: "foundation",
                color: "#B67B52",
                hex: "#B67B52",
                finish: "matte",
                price: 39.00
            }
        ]
    },
    {
        id: "maybelline",
        name: "Maybelline New York",
        origin: "International",
        products: [
            {
                id: "may_superstay_pioneer",
                name: "SuperStay Matte Ink - Pioneer",
                category: "lips",
                type: "liquid_lipstick",
                color: "#990F21",
                hex: "#990F21",
                finish: "matte",
                price: 10.99
            },
            {
                id: "may_fitme_120",
                name: "Fit Me Matte + Poreless - 120",
                category: "face",
                type: "foundation",
                color: "#EACDAA",
                hex: "#EACDAA",
                finish: "natural",
                price: 8.99
            },
            {
                id: "may_cheek_heat_rose",
                name: "Cheek Heat Gel-Cream Blush - Rose Flush",
                category: "cheeks",
                type: "blush",
                color: "#EA8896",
                hex: "#EA8896",
                finish: "sheer",
                texture: "gel",
                alpha: 0.6,
                price: 7.99
            }
        ]
    },
    {
        id: "loreal",
        name: "L'Oréal Paris",
        products: [
            {
                id: "loreal_rouge_sig_105",
                name: "Rouge Signature - I Rule",
                category: "lips",
                type: "liquid_lipstick",
                color: "#A25C67",
                hex: "#A25C67",
                finish: "matte",
                price: 12.99
            },
            {
                id: "loreal_infallible_300",
                name: "Infallible 24H Fresh Wear - Amber",
                category: "face",
                type: "foundation",
                color: "#D6A374",
                hex: "#D6A374",
                price: 15.99
            }
        ]
    },
    {
        id: "fenty",
        name: "Fenty Beauty",
        products: [
            {
                id: "fenty_uncensored",
                name: "Stunna Lip Paint - Uncensored",
                category: "lips",
                type: "liquid_lipstick",
                color: "#A60D1A",
                hex: "#A60D1A",
                finish: "matte",
                price: 28.00
            },
            {
                id: "fenty_trophy_wife",
                name: "Killawatt Freestyle Highlighter - Trophy Wife",
                category: "face",
                type: "highlighter",
                color: "#E8C946",
                hex: "#E8C946",
                finish: "shimmer",
                price: 38.00
            }
        ]
    }
];

export const localBrands = [
    {
        id: "lakme",
        name: "Lakmé",
        origin: "Regional",
        products: [
            {
                id: "lakme_absolute_red",
                name: "Absolute Matte - Red Rush",
                category: "lips",
                type: "lipstick",
                color: "#C41E3A",
                hex: "#C41E3A",
                finish: "matte",
                price: 800,
                currency: "BDT"
            },
            {
                id: "lakme_eyeconic_kajal",
                name: "Eyeconic Kajal - Deep Black",
                category: "eyes",
                type: "eyeliner",
                color: "#000000",
                hex: "#000000",
                finish: "matte",
                price: 350,
                currency: "BDT"
            }
        ]
    },
    {
        id: "affaire",
        name: "Affaire Cosmetics",
        origin: "Local",
        products: [
            {
                id: "affaire_liquid_vintage",
                name: "Velvet Liquid - Vintage Rose",
                category: "lips",
                type: "liquid_lipstick",
                color: "#B06D7B",
                hex: "#B06D7B",
                finish: "matte",
                price: 950,
                currency: "BDT"
            }
        ]
    },
    {
        id: "golden_rose",
        name: "Golden Rose",
        origin: "Regional",
        products: [
            {
                id: "gr_velvet_matte_16",
                name: "Velvet Matte Lipstick - 16",
                category: "lips",
                type: "lipstick",
                color: "#9E6857",
                hex: "#9E6857",
                finish: "matte",
                price: 550,
                currency: "BDT"
            },
            {
                id: "gr_terracotta_blush",
                name: "Terracotta Blush-On - 03",
                category: "cheeks",
                type: "blush",
                color: "#D1867A",
                hex: "#D1867A",
                finish: "shimmer",
                price: 1200,
                currency: "BDT"
            }
        ]
    }
];

export const getAllProducts = () => {
    return [...internationalBrands.flatMap(b => b.products), ...localBrands.flatMap(b => b.products)];
};

export const getBrands = () => {
    return { international: internationalBrands, local: localBrands };
};
