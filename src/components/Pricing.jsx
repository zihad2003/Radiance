import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Star } from 'lucide-react';

const plans = [
    // --- SIGNATURE PACKAGES ---
    {
        category: "Signature",
        name: "Basic Glow",
        price: "5,000",
        features: ["Haircut & Blowdry", "Classic Manicure", "Eyebrow Threading", "Refreshment Drink"],
        popular: false,
        delay: 0
    },
    {
        category: "Signature",
        name: "Elite Radiance",
        price: "12,000",
        features: ["Premium Hair Color", "Spa Gel Pedicure", "Basic Facial", "Glass of Champagne", "Take-home Sample Kit"],
        popular: true,
        delay: 0.1
    },
    {
        category: "Signature",
        name: "Ultimate Luxury",
        price: "25,000",
        features: ["Full Body Massage", "Premium Facial", "Complete Makeover", "Exclusive Lounge Access", "Full Size Products"],
        popular: false,
        delay: 0.2
    },

    // --- BRIDAL COLLECTION ---
    {
        category: "Bridal",
        name: "Silver Bride",
        price: "15,000",
        features: ["HD Bridal Makeup", "Hair Styling", "Saree Draping", "Regular Facial (Pre-Event)"],
        popular: false,
        delay: 0
    },
    {
        category: "Bridal",
        name: "Gold Bride",
        price: "25,000",
        features: ["Airbrush Makeup", "Premium Hair Styling", "Jewelry Setting", "Gold Facial", "Trial Session"],
        popular: true,
        delay: 0.1
    },
    {
        category: "Bridal",
        name: "Diamond Royal",
        price: "45,000",
        features: ["Celebrity Artist", "Complete Pre-Bridal Spa", "Mehendi Art", "Mother of Bride Makeup", "Luxury Car Service"],
        popular: false,
        delay: 0.2
    },

    // --- SPA & WELLNESS ---
    {
        category: "Spa",
        name: "Stress Relief",
        price: "6,500",
        features: ["Swedish Massage (60m)", "Head Massage", "Steam Bath", "Herbal Tea"],
        popular: false,
        delay: 0
    },
    {
        category: "Spa",
        name: "Detox Day",
        price: "10,000",
        features: ["Body Scrub", "Clay Wrap", "Lymphatic Massage", "Organic Juice"],
        popular: false,
        delay: 0.1
    },
    {
        category: "Spa",
        name: "Couples Retreat",
        price: "18,000",
        features: ["Dual Masage Suite", "Rose Petal Bath", "Candlelit Ambience", "Wine & Chocolates"],
        popular: true,
        delay: 0.2
    },

    // --- SEASONAL SPECIALS ---
    {
        category: "Seasonal",
        name: "Summer Fresh",
        price: "4,000",
        features: ["De-tan Facial", "Cooling Mint Pedicure", "Hair Spa", "Sunscreen Application"],
        popular: false,
        delay: 0
    },
    {
        category: "Seasonal",
        name: "Winter Hydration",
        price: "5,500",
        features: ["Deep Moisturizing Facial", "Hot Stone Therapy", "Paraffin Hand Wax", "Hot Cocoa"],
        popular: true,
        delay: 0.1
    },
    {
        category: "Seasonal",
        name: "Eid Glow",
        price: "8,000",
        features: ["Party Makeup", "Volume Blowdry", "Henna Application", "Lash Extensions"],
        popular: false,
        delay: 0.2
    }
];

const PricingCard = ({ plan }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: plan.delay, duration: 0.6 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className={`relative p-8 rounded-3xl backdrop-blur-md border transition-all duration-300 flex flex-col ${plan.popular
                ? 'bg-white/10 border-gold/50 shadow-[0_0_30px_rgba(212,175,55,0.2)] z-10'
                : 'bg-white/5 border-white/20 shadow-xl'
                }`}
        >
            {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gold to-yellow-500 text-charcoal font-bold px-4 py-1 rounded-full text-sm tracking-widest uppercase flex items-center shadow-lg">
                    <Star size={12} className="mr-1 fill-charcoal" /> Most Popular
                </div>
            )}

            <h3 className={`text-2xl font-serif mb-2 ${plan.popular ? 'text-gold' : 'text-charcoal'}`}>
                {plan.name}
            </h3>
            <div className="mb-6 flex items-baseline">
                <span className="text-4xl font-bold text-charcoal">৳{plan.price}</span>
                <span className="text-charcoal/60 ml-2">/visit</span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-charcoal/80">
                        <span className="bg-green-100 text-green-600 rounded-full p-1 mr-3">
                            <Check size={12} />
                        </span>
                        {feature}
                    </li>
                ))}
            </ul>

            <button className={`w-full py-4 rounded-xl font-semibold tracking-wide transition-all duration-300 interactive ${plan.popular
                ? 'bg-gradient-to-r from-gold to-yellow-600 text-white shadow-lg hover:shadow-gold/50'
                : 'bg-white text-charcoal border border-charcoal/10 hover:bg-charcoal hover:text-white'
                }`}>
                Choose Plan
            </button>
        </motion.div>
    );
};

const Pricing = () => {
    const [activeTab, setActiveTab] = React.useState("Signature");
    const filteredPlans = plans.filter(p => p.category === activeTab);

    // Get unique categories
    const categories = ["Signature", "Bridal", "Spa", "Seasonal", "Group", "Pre-Bridal", "Wellness", "Express", "Student"];

    return (
        <section className="py-24 bg-gradient-to-b from-pearl to-white relative overflow-hidden">
            {/* Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-sans uppercase tracking-[0.3em] text-primary mb-4">Membership</h2>
                    <h3 className="text-4xl md:text-5xl font-serif text-charcoal mb-8">Exclusive Packages</h3>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap justify-center gap-4 mb-4">
                        {categories.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === tab
                                    ? 'bg-charcoal text-white shadow-lg scale-105'
                                    : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-charcoal'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                    {filteredPlans.map((plan) => (
                        <PricingCard key={plan.name} plan={plan} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
