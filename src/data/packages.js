export const PACKAGES = [
    // --- BRIDAL COLLECTIONS (1-5) ---
    {
        id: "bridal_basic",
        category: "Bridal",
        tier: "Basic",
        name: "Radiance Basic Bride",
        price: 18000,
        duration: "3 hours",
        rating: "4.8/5",
        reviewCount: 94,
        shortDesc: "Ideal for Intimate weddings & registry ceremonies.",
        features: [
            "HD Bridal Makeup",
            "Hairstyling (One Style)",
            "Saree Draping (One Style)",
            "Basic Jewelry Setting",
            "Makeup Touch-up Kit"
        ],
        stylistLevel: "Junior Stylist",
        theme: "from-pink-100 to-pink-200 text-pink-900 border-pink-300",
        badge: "bg-pink-500 text-white"
    },
    {
        id: "bridal_signature",
        category: "Bridal",
        tier: "Signature",
        name: "Radiance Signature Bride",
        price: 28000,
        duration: "4 hours",
        rating: "4.9/5",
        reviewCount: 156,
        isPopular: true,
        shortDesc: "Our most chosen package for traditional weddings.",
        features: [
            "Everything in Basic, PLUS:",
            "<b>Airbrush Makeup Option</b>",
            "Pre-bridal Facial (1 session)",
            "Advanced Hairstyling (Updos/Braids)",
            "Mehndi Design (Hands, Basic)",
            "Makeup Trial Session",
            "MAC & Huda Beauty Products"
        ],
        stylistLevel: "Senior Stylist",
        theme: "from-rose-100 to-rose-300 text-rose-950 border-rose-400",
        badge: "bg-rose-500 text-white"
    },
    {
        id: "bridal_premium",
        category: "Bridal",
        tier: "Premium",
        name: "Radiance Premium Bride",
        price: 45000,
        duration: "5 hours",
        rating: "5.0/5",
        reviewCount: 82,
        shortDesc: "Grand wedding specialized care with master artists.",
        features: [
            "Everything in Signature, PLUS:",
            "<b>Full Pre-bridal Package (Waxing/Cleanup)</b>",
            "2 Hairstyle Changes",
            "Deeper Mehndi (Hands & Feet)",
            "Dedicated Touch-up Assistant",
            "Charlotte Tilbury & Tom Ford Kits",
            "Designer Lash Application"
        ],
        stylistLevel: "Master Stylist",
        theme: "from-purple-100 to-purple-300 text-purple-950 border-purple-400",
        badge: "bg-purple-600 text-white"
    },
    {
        id: "bridal_platinum",
        category: "Bridal",
        tier: "Platinum",
        name: "Radiance Platinum Bride",
        price: 65000,
        duration: "8 hours",
        rating: "5.0/5",
        reviewCount: 45,
        shortDesc: "Luxury celebrity-style service at your doorstep.",
        features: [
            "Everything in Premium, PLUS:",
            "<b>3-Day Pre-bridal Intensive</b>",
            "Makeup for 2 Events (Same Day)",
            "<b>On-Location Venue Service</b>",
            "3 Bridal Party Makeups (50% Off)",
            "Pro Eyelash Extensions",
            "Teeth Whitening Treatment",
            "Personalized Skincare Box"
        ],
        stylistLevel: "Celebrity Stylist",
        theme: "from-amber-100 to-gold-200 text-amber-950 border-gold-400",
        badge: "bg-gold text-charcoal"
    },
    {
        id: "bridal_royale",
        category: "Bridal",
        tier: "Royale",
        name: "Radiance Royale Bride",
        price: 95000,
        duration: "Weekend Coverage",
        rating: "5.0/5",
        reviewCount: 28,
        isBestValue: true,
        shortDesc: "The ultimate ultra-luxury wedding experience.",
        features: [
            "Everything in Platinum, PLUS:",
            "<b>4 Event Coverage (Holud to Reception)</b>",
            "Dedicated Team (2 Stylists + Asst)",
            "24/7 Wedding Week Support",
            "8 Bridal Party Makeups Included",
            "Groom Grooming Package",
            "Drone Delivery Touch-up Kit",
            "Anniversary Session Gift"
        ],
        stylistLevel: "Master Celeb Team",
        theme: "from-indigo-900 via-purple-900 to-pink-900 text-white border-white/20",
        badge: "bg-gradient-to-r from-gold via-white to-gold text-charcoal"
    },

    // --- PARTY/EVENT COLLECTIONS (6-8) ---
    {
        id: "party_glam",
        category: "Party",
        tier: "Basic",
        name: "Glam Night Out",
        price: 6500,
        duration: "1.5 hours",
        rating: "4.7/5",
        reviewCount: 210,
        shortDesc: "Perfect for parties, dates, and club nights.",
        features: [
            "Full Face Glam Makeup",
            "Hairstyling (Blow-dry/Curls)",
            "False Lashes Included",
            "Long-wear Setting Spray"
        ],
        stylistLevel: "Standard Colorist",
        theme: "from-gray-50 to-gray-100 text-charcoal border-gray-200"
    },
    {
        id: "party_redcarpet",
        category: "Party",
        tier: "Premium",
        name: "Red Carpet Ready",
        price: 12000,
        duration: "2.5 hours",
        rating: "4.9/5",
        reviewCount: 112,
        shortDesc: "High-profile events and gala ready.",
        features: [
            "Everything in Glam, PLUS:",
            "<b>Airbrush Application</b>",
            "Advanced Contouring",
            "Hair Extensions Clipping",
            "Luxury Manicure",
            "Designer 3D Lashes"
        ],
        stylistLevel: "Senior Artistry",
        theme: "from-red-50 to-red-100 text-red-900 border-red-200"
    },
    {
        id: "party_photo",
        category: "Party",
        tier: "Platinum",
        name: "Photoshoot Pro",
        price: 15000,
        duration: "3+ hours",
        rating: "5.0/5",
        reviewCount: 67,
        shortDesc: "Camera-ready HD artistry for professionals.",
        features: [
            "3 Different Makeup Looks",
            "3 Hairstyle Transitions",
            "On-Set Touch-ups Included",
            "Direct Photo Collaboration",
            "Glare-Free HD Foundation"
        ],
        stylistLevel: "Visual Director",
        theme: "from-blue-50 to-blue-100 text-blue-900 border-blue-200"
    },

    // --- MONTHLY PLANS (9-10, 25) ---
    {
        id: "monthly_basic",
        category: "Monthly Plans",
        tier: "Standard",
        name: "Beauty Basics Monthly",
        price: 5500,
        duration: "per month",
        rating: "4.8/5",
        reviewCount: 340,
        shortDesc: "Your monthly maintenance ritual.",
        features: [
            "1 Facial Treatment",
            "1 Deep Cleanup",
            "1 Manicure & Pedicure",
            "20% Off Extra Services"
        ],
        stylistLevel: "Spa Specialist",
        theme: "from-green-50 to-green-100 text-green-900 border-green-200"
    },
    {
        id: "monthly_glow",
        category: "Monthly Plans",
        tier: "Elite",
        name: "Glow Getter Monthly",
        price: 9000,
        duration: "per month",
        rating: "4.9/5",
        reviewCount: 198,
        isPopular: true,
        shortDesc: "The ultimate elite monthly membership.",
        features: [
            "Everything in Basics, PLUS:",
            "1 Hair Treatment (Spa/Keratin)",
            "1 Full Body Waxing",
            "1 Makeup Session",
            "30% Off Extra Services",
            "Priority VIP Booking"
        ],
        stylistLevel: "VIP Concierge",
        theme: "from-cyan-50 to-cyan-100 text-cyan-900 border-cyan-200"
    },
    {
        id: "monthly_quarterly",
        category: "Monthly Plans",
        tier: "Signature",
        name: "Quarterly Glow Up",
        price: 18000,
        duration: "Pay once for 3 months",
        rating: "5.0/5",
        reviewCount: 42,
        shortDesc: "Convenience meets luxury with our 90-day cycle.",
        features: [
            "1 Facial per month (Rotating)",
            "1 Waxing session per month",
            "1 Mani or Pedi per month",
            "25% Off Additional Services",
            "Birthday Month Special Gift"
        ],
        stylistLevel: "Dedicated Manager",
        theme: "from-emerald-50 to-emerald-100 text-emerald-900 border-emerald-200"
    },

    // --- GROUP PACKAGES (13-17) ---
    {
        id: "group_squad",
        category: "Group",
        tier: "Squad",
        name: "Bridesmaids Squad",
        price: 20000,
        duration: "4 People",
        rating: "4.9/5",
        reviewCount: 127,
        shortDesc: "Save ৳2,000 per person vs individual booking.",
        features: [
            "Party Makeup for 4",
            "Hairstyling for 4",
            "False Lashes for 4",
            "Matching Lip Theme",
            "Champagne/Mocktails Included",
            "Coordinated Color Palette"
        ],
        stylistLevel: "Senior Team",
        theme: "from-pink-50 to-rose-100 text-rose-900 border-rose-200",
        badge: "bg-rose-400 text-white"
    },
    {
        id: "group_bond",
        category: "Group",
        tier: "Family",
        name: "Mother-Daughter Day",
        price: 12000,
        duration: "2 People",
        rating: "5.0/5",
        reviewCount: 88,
        shortDesc: "A timeless bonding experience for two.",
        features: [
            "Facial Treatment Each",
            "Manicure & Pedicure Each",
            "Light Glow Makeup Each",
            "Complimentary High Tea",
            "Private Bonding Suite"
        ],
        stylistLevel: "Master Therapist",
        theme: "from-violet-50 to-violet-100 text-violet-900 border-violet-200"
    },
    {
        id: "group_teen",
        category: "Group",
        tier: "Youth",
        name: "Teen Party Pack",
        price: 15000,
        duration: "5 Teens",
        rating: "4.8/5",
        reviewCount: 110,
        shortDesc: "Age-appropriate glam for the next generation.",
        features: [
            "Natural Sparkle Makeup",
            "Fun Braids & Space Buns",
            "Artistic Nail Art",
            "Temporary Hair Glitter",
            "Music Playlist & Photo Booth",
            "Luxury Goodie Bags"
        ],
        stylistLevel: "Youth Expert",
        theme: "from-sky-50 to-sky-100 text-sky-900 border-sky-200"
    },
    {
        id: "group_corp",
        category: "Group",
        tier: "Corporate",
        name: "Corporate Glam Team",
        price: 35000,
        duration: "10 People",
        rating: "4.7/5",
        reviewCount: 34,
        shortDesc: "Professional polish for high-stakes events.",
        features: [
            "Quick Pro Makeup (30m each)",
            "Polished Hairstyling",
            "On-Location Office Service",
            "Touch-up Kits for All",
            "Group Cohesion Styling"
        ],
        stylistLevel: "Production Team",
        theme: "from-slate-50 to-slate-100 text-slate-900 border-slate-200"
    },
    {
        id: "group_bestie",
        category: "Group",
        tier: "Bestie",
        name: "Bestie Makeover Day",
        price: 8000,
        duration: "2 People",
        rating: "5.0/5",
        reviewCount: 204,
        shortDesc: "Social media ready content creation day.",
        features: [
            "Full Face Glam for 2",
            "Hairstyling for 2",
            "Mini Professional Photoshoot",
            "Edited Before/After High-Res",
            "Matching Accessories"
        ],
        stylistLevel: "Content Director",
        theme: "from-yellow-50 to-yellow-100 text-yellow-900 border-yellow-200"
    },

    // --- PRE-BRIDAL PREP (18-20) ---
    {
        id: "prep_month",
        category: "Pre-Bridal Prep",
        tier: "Elite",
        name: "1-Month Bridal Prep",
        price: 25000,
        duration: "4 Weeks / 4 Sessions",
        rating: "5.0/5",
        reviewCount: 145,
        shortDesc: "Scientific approach to bridal radiance.",
        features: [
            "Week 1: Cleansing + Body Wax",
            "Week 2: Brightening + Mani/Pedi",
            "Week 3: Gold Facial + Hair Spa",
            "Week 4: Diamond Facial + Finale",
            "Skincare & Diet Consultation",
            "Makeup Trial Included"
        ],
        stylistLevel: "Dermal Expert",
        theme: "from-blue-900 to-indigo-900 text-white border-white/10",
        badge: "bg-indigo-500 text-white"
    },
    {
        id: "prep_two_week",
        category: "Pre-Bridal Prep",
        tier: "Intensive",
        name: "2-Week Intensive Prep",
        price: 15000,
        duration: "2 Sessions",
        rating: "4.9/5",
        reviewCount: 92,
        shortDesc: "Accelerated results for tight schedules.",
        features: [
            "2 Targeted Facials",
            "Full Body Waxing",
            "Deep Hair conditioning",
            "Advanced Mani/Pedi",
            "Detailed Threading"
        ],
        stylistLevel: "Senior Aesthetician",
        theme: "from-blue-50 to-blue-200 text-blue-900 border-blue-300"
    },
    {
        id: "prep_express",
        category: "Pre-Bridal Prep",
        tier: "Express",
        name: "3-Day Express Prep",
        price: 8000,
        duration: "3 Days Out",
        rating: "4.7/5",
        reviewCount: 68,
        shortDesc: "Emergency revival before the big day.",
        features: [
            "Day 1: Facial + Waxing",
            "Day 2: Hair Spa + Threading",
            "Day 3: Cleanup + Mani/Pedi"
        ],
        stylistLevel: "Aesthetician",
        theme: "from-slate-50 to-slate-200 text-slate-800 border-slate-300"
    },

    // --- SEASONAL SPECIALS (21-24) ---
    {
        id: "seasonal_boishakh",
        category: "Seasonal Specials",
        tier: "Tradition",
        name: "Pohela Boishakh Special",
        price: 5000,
        duration: "Mid-April Only",
        rating: "4.9/5",
        reviewCount: 310,
        shortDesc: "Celebrate the Bengali New Year in style.",
        features: [
            "Traditional Red/White Makeup",
            "Floral Bun Styling",
            "Bindi & Alta Application",
            "Traditional Saree Draping"
        ],
        stylistLevel: "Cultural Specialist",
        theme: "from-red-50 to-orange-100 text-red-900 border-red-200",
        badge: "bg-red-600 text-white"
    },
    {
        id: "seasonal_eid",
        category: "Seasonal Specials",
        tier: "Festive",
        name: "Eid Glam Package",
        price: 6500,
        duration: "Eid Week",
        rating: "5.0/5",
        reviewCount: 520,
        shortDesc: "Bestseller for both Eids.",
        features: [
            "Festive HD Makeup",
            "Hijab/Hair Styling",
            "Simple Mehndi Design",
            "Festive Nail Art",
            "Volume Hair Blowout"
        ],
        stylistLevel: "Senior Artist",
        theme: "from-green-50 to-emerald-100 text-emerald-900 border-emerald-200",
        badge: "bg-emerald-600 text-white"
    },
    {
        id: "seasonal_vday",
        category: "Seasonal Specials",
        tier: "Romance",
        name: "Valentine's Romance",
        price: 7000,
        duration: "Feb 1-14",
        rating: "5.0/5",
        reviewCount: 156,
        shortDesc: "Couple's discount: ৳12,000 for two.",
        features: [
            "Soft Romantic Makeup",
            "Signature Curls",
            "Rose-Themed Detailing",
            "Complimentary Rose Gift"
        ],
        stylistLevel: "Senior Artist",
        theme: "from-pink-50 to-red-100 text-red-900 border-red-200"
    },
    {
        id: "seasonal_newyear",
        category: "Seasonal Specials",
        tier: "Eve",
        name: "New Year Party Ready",
        price: 8000,
        duration: "Dec 25 - Jan 1",
        rating: "4.8/5",
        reviewCount: 240,
        shortDesc: "Late night slots until midnight.",
        features: [
            "Glitter & Shimmer Artistry",
            "Party Volume Hairstyle",
            "Mini Champagne/Mocktail",
            "New Year Photo Props"
        ],
        stylistLevel: "Senior Artist",
        theme: "from-purple-50 to-indigo-100 text-indigo-900 border-indigo-200"
    },

    // --- WELLNESS SERIES (26-27, 11-12 remapped) ---
    {
        id: "wellness_skin",
        category: "Wellness Series",
        tier: "Medical",
        name: "Skin Revival Series",
        price: 12000,
        duration: "4 Sessions / 2 Months",
        rating: "5.0/5",
        reviewCount: 52,
        shortDesc: "Targeted clinical skincare results.",
        features: [
            "Session 1: Deep Cleansing",
            "Session 2: Brightening",
            "Session 3: Firming/Anti-aging",
            "Session 4: Hydration Glow",
            "Home Care Products Included"
        ],
        stylistLevel: "Dermal Lead",
        theme: "from-teal-50 to-teal-100 text-teal-900 border-teal-200"
    },
    {
        id: "wellness_hair",
        category: "Wellness Series",
        tier: "Restorative",
        name: "Hair Rescue Package",
        price: 15000,
        duration: "5 Sessions",
        rating: "4.9/5",
        reviewCount: 38,
        shortDesc: "Intensive program for damaged hair.",
        features: [
            "2 Protein Treatments",
            "2 Moisture/Oil Infusions",
            "1 Scalp Detox",
            "Precision Trim & Shape",
            "At-home Rescue Kit"
        ],
        stylistLevel: "Trichologist Asst",
        theme: "from-amber-50 to-orange-100 text-orange-900 border-orange-200"
    },
    {
        id: "special_grad",
        category: "Special",
        tier: "Event",
        name: "Graduation Glam",
        price: 4000,
        duration: "1 hour",
        rating: "4.6/5",
        reviewCount: 420,
        shortDesc: "Look your best on your big academic day.",
        features: [
            "Natural HD Makeup",
            "Simple Hair/Curls",
            "Saree/Gown Draping"
        ],
        stylistLevel: "Junior Artistry",
        theme: "from-indigo-50 to-indigo-100 text-indigo-900 border-indigo-200"
    },
    {
        id: "special_bday",
        category: "Special",
        tier: "Celebrate",
        name: "Birthday Queen",
        price: 8000,
        duration: "2 hours",
        rating: "4.9/5",
        reviewCount: 225,
        shortDesc: "It's your day! Get the royal birthday treatment.",
        features: [
            "Glamorous Artistry",
            "Party Updo/Volume",
            "Detailed Nail Art",
            "Complimentary Sash & Crown"
        ],
        stylistLevel: "Senior Specialist",
        theme: "from-fuchsia-50 to-fuchsia-100 text-fuchsia-900 border-fuchsia-200"
    }
];

export const ADDONS = [
    { id: "airbrush", name: "Airbrush Makeup Upgrade", price: 3000 },
    { id: "lashes_indiv", name: "Individual False Lashes", price: 500 },
    { id: "lashes_ext", name: "Lash Extensions (Full Set)", price: 4000 },
    { id: "contour", name: "Advanced Contouring", price: 1000 },
    { id: "gems", name: "Face Gems/Rhinestones", price: 800 },
    { id: "temp_color", name: "Temporary Hair Color", price: 2000 },
    { id: "clip_in", name: "Clip-in Hair Extensions", price: 1500 },
    { id: "halo_braid", name: "Halo/Crown Braid", price: 2000 },
    { id: "finger_waves", name: "Finger Waves Styling", price: 1800 },
    { id: "vintage", name: "Vintage/Retro Styling", price: 2500 },
    { id: "body_shimmer", name: "Body Shimmer Application", price: 1000 },
    { id: "spray_tan", name: "Spray Tan Session", price: 3500 },
    { id: "teeth_white", name: "Professional Teeth Whitening", price: 4000 },
    { id: "brow_tint", name: "Eyebrow Tinting", price: 600 },
    { id: "lash_tint", name: "Eyelash Tinting", price: 800 },
    { id: "piercing_ear", name: "Ear Piercing", price: 1200 },
    { id: "piercing_nose", name: "Nose Piercing", price: 1500 },
    { id: "bindi", name: "Custom Bindi Design", price: 300 },
    { id: "alta", name: "Alta Decoration", price: 500 },
    { id: "touchup_custom", name: "Personalized Touch-up Kit", price: 2000 }
];

export const COMPARISON_DATA = [
    { feature: "HD Makeup", basic: true, signature: true, premium: true, platinum: true, royale: true },
    { feature: "Airbrush Makeup", basic: false, signature: "Option", premium: true, platinum: true, royale: true },
    { feature: "Hairstyling", basic: "1 Style", signature: "1 Style", premium: "2 Styles", platinum: "2 Styles", royale: "4 Styles" },
    { feature: "Pre-bridal Facial", basic: false, signature: "1 Session", premium: "1 Session", platinum: "3 Sessions", royale: "7 Sessions" },
    { feature: "Mehndi", basic: false, signature: "Basic", premium: "Full", platinum: "Full", royale: "Full" },
    { feature: "Makeup Trial", basic: false, signature: true, premium: true, platinum: true, royale: true },
    { feature: "On-Location", basic: false, signature: false, premium: false, platinum: true, royale: true },
    { feature: "No. of Events", basic: "1", signature: "1", premium: "1", platinum: "2", royale: "4" },
    { feature: "Stylist Level", basic: "Junior", signature: "Senior", premium: "Master", platinum: "Celebrity", royale: "Elite Team" }
];
