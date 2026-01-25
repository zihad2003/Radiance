import { motion } from 'framer-motion';

const GlassCard = ({ children, className = "", hover = false }) => {
    return (
        <motion.div
            className={`glass-card rounded-2xl p-6 ${className}`}
            whileHover={hover ? { scale: 1.02, boxShadow: "0 10px 40px rgba(183, 110, 121, 0.2)" } : {}}
            transition={{ type: "spring", stiffness: 300 }}
        >
            {children}
        </motion.div>
    );
};

export default GlassCard;
