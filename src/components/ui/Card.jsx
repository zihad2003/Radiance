import { motion } from 'framer-motion';

export default function Card({ children, hover = true, className = '' }) {
    return (
        <motion.div
            whileHover={hover ? { y: -5, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' } : {}}
            className={`
        bg-white rounded-3xl shadow-soft overflow-hidden
        transition-all duration-300
        ${className}
      `}
        >
            {children}
        </motion.div>
    );
}
