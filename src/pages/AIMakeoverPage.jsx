import React from 'react';
import AIPresetGenerator from '../components/AIPresetGenerator';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

const AIMakeoverPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-20"
        >
            <SEO
                title="AI Makeover Generator | Radiance Beauty"
                description="Generate personalized makeup looks instantly with AI. Select your vibe and get a custom makeover in seconds."
            />
            <AIPresetGenerator />
        </motion.div>
    );
};

export default AIMakeoverPage;
