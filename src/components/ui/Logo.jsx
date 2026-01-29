import { motion } from 'framer-motion';

const Logo = ({ size = "md", className = "" }) => {
    const sizes = {
        sm: "w-8 h-8 text-lg",
        md: "w-10 h-10 md:w-11 md:h-11 text-xl md:text-2xl",
        lg: "w-20 h-20 text-4xl md:text-5xl",
        xl: "w-32 h-32 text-6xl md:text-7xl"
    };

    return (
        <motion.div
            layout
            className={`relative ${sizes[size] || sizes.md} rounded-full flex items-center justify-center transition-all overflow-hidden ${className}`}
        >
            {/* Background Subtle Gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-primary/10 opacity-50" />

            {/* The Designed Letter */}
            <span className="relative z-10 font-serif italic font-black text-primary tracking-tighter select-none">
                R
            </span>

            {/* Subtle Glow */}
            <div className="absolute inset-0 bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </motion.div>
    );
};

export default Logo;
