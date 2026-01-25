export const services = [
    // Bridal
    {
        id: 'bridal-complete',
        name: 'Bridal Complete Package',
        category: 'Bridal',
        price: 25000,
        duration: 300, // 5 hours
        description: 'The ultimate bridal experience including makeup, hair, styling, and pre-prep.',
        included: ['HD Bridal Makeup', 'Advanced Hairstyling', 'Saree Draping', 'Jewelry Setting', 'Lashes & Touch-up Kit'],
        image: '/assets/services/makeup.png',
        popular: true
    },
    {
        id: 'bridal-engagement',
        name: 'Bridal Engagement Makeup',
        category: 'Bridal',
        price: 12000,
        duration: 180,
        description: 'Soft yet glamorous look perfect for engagement ceremonies.',
        included: ['HD Makeup', 'Hairstyling', 'Saree/Dupatta Draping', 'False Lashes'],
        image: '/assets/services/makeup.png'
    },
    {
        id: 'bridal-reception',
        name: 'Reception Makeup',
        category: 'Bridal',
        price: 15000,
        duration: 210,
        description: 'Bold and elegant look designed for evening reception lights.',
        included: ['Long-wear Pro Makeup', 'Premium Hairstyling', 'Jewelry Setting', 'Touch-up Assistant'],
        image: '/assets/services/makeup.png',
        popular: true
    },

    // Makeup
    {
        id: 'makeup-party',
        name: 'Party Glam Makeup',
        category: 'Makeup',
        price: 5500,
        duration: 120,
        description: 'Stand out at any event with our signature party glam.',
        included: ['Consultation', 'Full Face Makeup', 'Basic Hairstyling', 'Lashes'],
        image: '/assets/services/makeup.png'
    },
    {
        id: 'makeup-casual',
        name: 'Office/Casual Makeup',
        category: 'Makeup',
        price: 3500,
        duration: 90,
        description: 'Polished, professional look for meetings or day events.',
        included: ['Natural Base', 'Subtle Eye Makeup', 'Blow Dry'],
        image: '/assets/services/makeup.png'
    },

    // Hair
    {
        id: 'hair-cut',
        name: 'Ladies Haircut & Styling',
        category: 'Hair',
        price: 1500,
        duration: 60,
        description: 'Precision cut tailored to your face shape and texture.',
        included: ['Consultation', 'Wash & Condition', 'Cut', 'Blow Dry Styling'],
        image: '/assets/services/hair.png'
    },
    {
        id: 'hair-color-full',
        name: 'Full Hair Coloring',
        category: 'Hair',
        price: 6000,
        duration: 180,
        description: 'Vibrant, long-lasting global color application.',
        included: ['Consultation', 'Global Color', 'Post-Color Treatment', 'Styling'],
        image: '/assets/services/hair.png'
    },
    {
        id: 'hair-highlights',
        name: 'Hair Highlights',
        category: 'Hair',
        price: 4500,
        duration: 150,
        description: 'Dimension and depth with expertly placed highlights.',
        included: ['Foil/Balayage Technique', 'Toning', 'Blow Dry'],
        image: '/assets/services/hair.png',
        popular: true
    },
    {
        id: 'hair-keratin',
        name: 'Keratin Treatment',
        category: 'Hair',
        price: 12000,
        duration: 240,
        description: 'Smooth, frizz-free hair for up to 4 months.',
        included: ['Deep Cleanse', 'Keratin Application', 'Heat Seal', 'Trim'],
        image: '/assets/services/hair.png'
    },
    {
        id: 'hair-rebounding',
        name: 'Brazilian Blowout',
        category: 'Hair',
        price: 15000,
        duration: 240,
        description: 'Ultimate smoothing treatment for radiant shine.',
        included: ['Treatment', 'Wash', 'Style'],
        image: '/assets/services/hair.png'
    },

    // Facial
    {
        id: 'facial-gold',
        name: 'Gold Facial',
        category: 'Facial',
        price: 4000,
        duration: 90,
        description: 'Luxurious 24k gold infusion for glowing, youthful skin.',
        included: ['Cleanse', 'Exfoliation', 'Gold Mask', 'Massage'],
        image: '/assets/services/skin.png',
        popular: true
    },
    {
        id: 'facial-diamond',
        name: 'Diamond Facial',
        category: 'Facial',
        price: 5000,
        duration: 90,
        description: 'Brightening and anti-aging treatment with diamond dust.',
        included: ['Microdermabrasion effect', 'Serum Infusion', 'Mask'],
        image: '/assets/services/skin.png'
    },
    {
        id: 'facial-fruit',
        name: 'Fruit Facial',
        category: 'Facial',
        price: 2500,
        duration: 60,
        description: 'Natural organic ingredients for fresh, hydrated skin.',
        included: ['Fruit Enzyme Peel', 'Massage', 'Pore Cleanse'],
        image: '/assets/services/skin.png'
    },
    {
        id: 'facial-cleanse',
        name: 'Deep Cleansing Facial',
        category: 'Facial',
        price: 1800,
        duration: 60,
        description: 'Essential maintenance for clear, balanced skin.',
        included: ['Steam', 'Extraction', 'Mask', 'Moisturize'],
        image: '/assets/services/skin.png'
    },

    // Nails
    {
        id: 'nails-classic',
        name: 'Manicure & Pedicure Classic',
        category: 'Nails',
        price: 2000,
        duration: 90,
        description: 'Complete care for hands and feet.',
        included: ['Soak', 'Cuticle Care', 'Massage', 'Polish'],
        image: '/assets/services/nails.png'
    },
    {
        id: 'nails-gel',
        name: 'Gel Nail Extensions',
        category: 'Nails',
        price: 3500,
        duration: 120,
        description: 'Long-lasting, durable, and shaped to perfection.',
        included: ['Extensions', 'Gel Application', 'Shape', 'Art (Basic)'],
        image: '/assets/services/nails.png',
        popular: true
    },
    {
        id: 'nails-art',
        name: 'Nail Art Design',
        category: 'Nails',
        price: 1500,
        duration: 60,
        description: 'Custom creative designs for your nails.',
        included: ['Design consultation', 'Intricate Art', 'Top Coat'],
        image: '/assets/services/nails.png'
    },

    // Waxing
    {
        id: 'waxing-full',
        name: 'Full Body Waxing',
        category: 'Waxing',
        price: 3000,
        duration: 120,
        description: 'Smooth, hair-free skin from head to toe.',
        included: ['Arms', 'Legs', 'Underarms', 'Back/Stomach'],
        image: '/assets/services/threading.png'
    },
    {
        id: 'waxing-half',
        name: 'Half Body Waxing',
        category: 'Waxing',
        price: 1800,
        duration: 60,
        description: 'Waxing on major areas of choice.',
        included: ['Arms', 'Legs', 'Underarms'],
        image: '/assets/services/threading.png'
    },

    // Mehendi
    {
        id: 'mehendi-bridal',
        name: 'Bridal Mehendi Full',
        category: 'Mehendi',
        price: 10000,
        duration: 300,
        description: 'Intricate traditional designs for hands and feet.',
        included: ['Both Hands (Elbow)', 'Feet (Ankles)', 'Custom Design'],
        image: '/assets/services/spa.png' // Using generic spa placeholder if no mehendi img
    },
    {
        id: 'mehendi-simple',
        name: 'Simple Mehendi',
        category: 'Mehendi',
        price: 1500,
        duration: 60,
        description: 'Minimalist designs for guests or casual events.',
        included: ['One Hand (Palm/Back)', 'Arabic/Modern Style'],
        image: '/assets/services/spa.png'
    },

    // Other
    {
        id: 'style-saree',
        name: 'Saree Draping',
        category: 'Styling',
        price: 800,
        duration: 30,
        description: 'Perfect pleats and pinning for any saree type.',
        included: ['Ironing', 'Draping', 'Pinning'],
        image: '/assets/services/hair.png'
    }
];

export const formattedPrice = (price) => new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT' }).format(price);
