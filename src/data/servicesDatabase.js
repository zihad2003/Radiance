// Comprehensive Services Database for Radiance Beauty Salon
// 22+ services across 8 categories with detailed information

export const servicesDatabase = [
    // BRIDAL SERVICES (5)
    {
        id: 'bridal_complete',
        name: 'Bridal Complete Package',
        category: 'Bridal',
        price: 25000,
        duration: 300, // minutes
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
        popular: true,
        trending: false,
        included: [
            'HD Airbrush Makeup',
            'Hair Styling & Setting',
            'Saree/Lehenga Draping',
            'Jewelry Setting',
            'Pre-Bridal Facial',
            'Touch-up Kit'
        ],
        description: 'Complete bridal transformation with premium products and expert styling'
    },
    {
        id: 'bridal_engagement',
        name: 'Bridal Engagement Makeup',
        category: 'Bridal',
        price: 12000,
        duration: 180,
        image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800',
        popular: true,
        trending: false,
        included: [
            'HD Makeup',
            'Hair Styling',
            'Draping Assistance',
            'False Lashes'
        ],
        description: 'Perfect look for your engagement ceremony'
    },
    {
        id: 'reception_makeup',
        name: 'Reception Makeup',
        category: 'Bridal',
        price: 15000,
        duration: 210,
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800',
        popular: false,
        trending: false,
        included: [
            'Airbrush Makeup',
            'Glamorous Hair Styling',
            'Draping',
            'Accessories Setting',
            'Touch-ups'
        ],
        description: 'Elegant and sophisticated look for wedding reception'
    },
    {
        id: 'holud_makeup',
        name: 'Holud/Mehendi Makeup',
        category: 'Bridal',
        price: 8000,
        duration: 150,
        image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800',
        popular: false,
        trending: false,
        included: [
            'Natural Glam Makeup',
            'Flower Jewelry Setting',
            'Hair Styling',
            'Yellow Theme Coordination'
        ],
        description: 'Traditional look for Holud ceremony'
    },
    {
        id: 'gaye_holud_package',
        name: 'Gaye Holud Full Package',
        category: 'Bridal',
        price: 18000,
        duration: 240,
        image: 'https://images.unsplash.com/photo-1522337360705-8763d84a783a?w=800',
        popular: false,
        trending: true,
        included: [
            'Bride Makeup & Styling',
            'Mother Makeup',
            'Flower Jewelry for 2',
            'Draping for 2',
            'Photography Coordination'
        ],
        description: 'Complete package for bride and mother'
    },

    // MAKEUP SERVICES (3)
    {
        id: 'party_glam',
        name: 'Party Glam Makeup',
        category: 'Makeup',
        price: 5500,
        duration: 120,
        image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800',
        popular: true,
        trending: false,
        included: [
            'Full Face Makeup',
            'Contouring & Highlighting',
            'False Lashes',
            'Hair Styling'
        ],
        description: 'Glamorous look for parties and events'
    },
    {
        id: 'office_casual',
        name: 'Office/Casual Makeup',
        category: 'Makeup',
        price: 3500,
        duration: 90,
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
        popular: true,
        trending: false,
        included: [
            'Natural Makeup',
            'Light Contouring',
            'Brow Shaping',
            'Quick Styling'
        ],
        description: 'Professional and subtle everyday look'
    },
    {
        id: 'photoshoot_makeup',
        name: 'Photoshoot Makeup',
        category: 'Makeup',
        price: 7000,
        duration: 150,
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800',
        popular: false,
        trending: true,
        included: [
            'HD Camera-Ready Makeup',
            'Contouring for Lights',
            'Multiple Look Changes',
            'Touch-up Service'
        ],
        description: 'Camera-ready makeup for professional shoots'
    },

    // HAIR SERVICES (5)
    {
        id: 'ladies_haircut',
        name: 'Ladies Haircut & Styling',
        category: 'Hair',
        price: 1500,
        duration: 60,
        image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800',
        popular: true,
        trending: false,
        included: [
            'Consultation',
            'Precision Cut',
            'Blow Dry',
            'Styling'
        ],
        description: 'Expert haircut tailored to your face shape'
    },
    {
        id: 'full_hair_color',
        name: 'Full Hair Coloring',
        category: 'Hair',
        price: 6000,
        duration: 180,
        image: 'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=800',
        popular: true,
        trending: false,
        included: [
            'Color Consultation',
            'Premium Color Products',
            'Full Application',
            'Treatment & Conditioning',
            'Blow Dry'
        ],
        description: 'Complete hair color transformation'
    },
    {
        id: 'hair_highlights',
        name: 'Hair Highlights',
        category: 'Hair',
        price: 4500,
        duration: 150,
        image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800',
        popular: false,
        trending: true,
        included: [
            'Highlight Placement',
            'Premium Products',
            'Toning',
            'Deep Conditioning'
        ],
        description: 'Dimensional highlights for natural depth'
    },
    {
        id: 'keratin_treatment',
        name: 'Keratin Treatment',
        category: 'Hair',
        price: 12000,
        duration: 240,
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
        popular: true,
        trending: false,
        included: [
            'Deep Cleansing',
            'Keratin Application',
            'Heat Sealing',
            'Aftercare Products',
            'Styling'
        ],
        description: 'Smooth, frizz-free hair for 3-6 months'
    },
    {
        id: 'brazilian_blowout',
        name: 'Brazilian Blowout',
        category: 'Hair',
        price: 15000,
        duration: 240,
        image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800',
        popular: false,
        trending: true,
        included: [
            'Premium Brazilian Formula',
            'Professional Application',
            'Heat Treatment',
            'Home Care Kit',
            'Luxury Blow Dry'
        ],
        description: 'Ultimate smoothing treatment'
    },

    // FACIAL SERVICES (4)
    {
        id: 'gold_facial',
        name: 'Gold Facial',
        category: 'Facial',
        price: 4000,
        duration: 90,
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800',
        popular: true,
        trending: false,
        included: [
            'Deep Cleansing',
            '24K Gold Mask',
            'Face Massage',
            'Moisturizing',
            'Sun Protection'
        ],
        description: 'Luxurious anti-aging gold treatment'
    },
    {
        id: 'diamond_facial',
        name: 'Diamond Facial',
        category: 'Facial',
        price: 5000,
        duration: 90,
        image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800',
        popular: true,
        trending: true,
        included: [
            'Diamond Scrub',
            'Microdermabrasion',
            'Serum Application',
            'Luxury Mask',
            'Hydration Therapy'
        ],
        description: 'Premium brightening and rejuvenation'
    },
    {
        id: 'fruit_facial',
        name: 'Fruit Facial',
        category: 'Facial',
        price: 2500,
        duration: 60,
        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800',
        popular: true,
        trending: false,
        included: [
            'Fruit Enzyme Cleanse',
            'Natural Scrub',
            'Fruit Mask',
            'Vitamin Boost',
            'Moisturizer'
        ],
        description: 'Natural fruit-based refreshing facial'
    },
    {
        id: 'deep_cleansing',
        name: 'Deep Cleansing Facial',
        category: 'Facial',
        price: 1800,
        duration: 60,
        image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=800',
        popular: false,
        trending: false,
        included: [
            'Double Cleansing',
            'Steam Treatment',
            'Blackhead Extraction',
            'Pore Minimizing Mask',
            'Toner & Moisturizer'
        ],
        description: 'Deep pore cleansing for clear skin'
    },

    // NAIL SERVICES (3)
    {
        id: 'mani_pedi_classic',
        name: 'Manicure & Pedicure Classic',
        category: 'Nails',
        price: 2000,
        duration: 90,
        image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800',
        popular: true,
        trending: false,
        included: [
            'Nail Shaping',
            'Cuticle Care',
            'Hand & Foot Massage',
            'Polish Application',
            'Paraffin Treatment'
        ],
        description: 'Complete hand and foot care'
    },
    {
        id: 'gel_extensions',
        name: 'Gel Nail Extensions',
        category: 'Nails',
        price: 3500,
        duration: 120,
        image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800',
        popular: true,
        trending: true,
        included: [
            'Nail Prep',
            'Gel Extension Application',
            'Shaping & Filing',
            'Base Color',
            'Top Coat'
        ],
        description: 'Long-lasting gel nail extensions'
    },
    {
        id: 'nail_art',
        name: 'Nail Art Design',
        category: 'Nails',
        price: 1500,
        duration: 60,
        image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800',
        popular: false,
        trending: true,
        included: [
            'Custom Design Consultation',
            'Artistic Application',
            'Embellishments',
            'Sealing & Protection'
        ],
        description: 'Creative nail art designs'
    },

    // WAXING SERVICES (2)
    {
        id: 'full_body_wax',
        name: 'Full Body Waxing',
        category: 'Waxing',
        price: 3000,
        duration: 120,
        image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800',
        popular: true,
        trending: false,
        included: [
            'Full Arms & Legs',
            'Underarms',
            'Bikini Line',
            'Soothing Lotion',
            'Post-Wax Care'
        ],
        description: 'Complete body hair removal'
    },
    {
        id: 'half_body_wax',
        name: 'Half Body Waxing',
        category: 'Waxing',
        price: 1800,
        duration: 60,
        image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800',
        popular: true,
        trending: false,
        included: [
            'Arms or Legs',
            'Underarms',
            'Upper Lip & Eyebrows',
            'Soothing Treatment'
        ],
        description: 'Half body waxing service'
    },

    // MEHENDI SERVICES (2)
    {
        id: 'bridal_mehendi',
        name: 'Bridal Mehendi Full',
        category: 'Mehendi',
        price: 10000,
        duration: 300,
        image: 'https://images.unsplash.com/photo-1610878722345-79c5eaf6a48c?w=800',
        popular: true,
        trending: false,
        included: [
            'Full Hands & Arms',
            'Full Feet & Legs',
            'Intricate Bridal Designs',
            'Premium Henna',
            'Aftercare Kit'
        ],
        description: 'Elaborate bridal mehendi design'
    },
    {
        id: 'simple_mehendi',
        name: 'Simple Mehendi',
        category: 'Mehendi',
        price: 1500,
        duration: 60,
        image: 'https://images.unsplash.com/photo-1598378294821-c9e0c9a66b7d?w=800',
        popular: true,
        trending: false,
        included: [
            'Hands Only',
            'Simple Patterns',
            'Quality Henna',
            'Quick Application'
        ],
        description: 'Simple and elegant mehendi'
    },

    // STYLING SERVICES (1)
    {
        id: 'saree_draping',
        name: 'Saree Draping',
        category: 'Styling',
        price: 800,
        duration: 30,
        image: 'https://images.unsplash.com/photo-1583391733981-5ead0c0c2c1e?w=800',
        popular: true,
        trending: false,
        included: [
            'Professional Draping',
            'Pin Setting',
            'Pleat Perfection',
            'Style Consultation'
        ],
        description: 'Expert saree draping service'
    },

    // TRAINING (1)
    {
        id: 'makeup_training',
        name: 'Professional Makeup Training',
        category: 'Training',
        price: 35000,
        duration: 1200, // 20 hours course
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800',
        popular: false,
        trending: true,
        included: [
            '20-Hour Comprehensive Course',
            'Hands-on Practice',
            'Product Knowledge',
            'Certificate',
            'Starter Kit',
            'Job Placement Assistance'
        ],
        description: 'Become a certified makeup artist'
    }
];

export const serviceCategories = [
    { id: 'all', name: 'All Services', icon: '🌟' },
    { id: 'Bridal', name: 'Bridal', icon: '👰' },
    { id: 'Makeup', name: 'Makeup', icon: '💄' },
    { id: 'Hair', name: 'Hair', icon: '💇' },
    { id: 'Facial', name: 'Facial', icon: '✨' },
    { id: 'Nails', name: 'Nails', icon: '💅' },
    { id: 'Waxing', name: 'Waxing', icon: '🌸' },
    { id: 'Mehendi', name: 'Mehendi', icon: '🎨' },
    { id: 'Styling', name: 'Styling', icon: '👗' },
    { id: 'Training', name: 'Training', icon: '📚' }
];

export const getServiceById = (id) => {
    return servicesDatabase.find(service => service.id === id);
};

export const getServicesByCategory = (category) => {
    if (category === 'all') return servicesDatabase;
    return servicesDatabase.filter(service => service.category === category);
};

export const calculateTotalDuration = (serviceIds) => {
    return serviceIds.reduce((total, id) => {
        const service = getServiceById(id);
        return total + (service?.duration || 0);
    }, 0);
};

export const calculateTotalPrice = (serviceIds) => {
    return serviceIds.reduce((total, id) => {
        const service = getServiceById(id);
        return total + (service?.price || 0);
    }, 0);
};
