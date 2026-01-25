import { motion } from 'framer-motion';

const PinkButton = ({ children, onClick, className = "", icon: Icon, ...props }) => {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(183, 110, 121, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className={`
                bg-gradient-to-r from-[#B76E79] to-[#D68C9A] 
                text-white font-bold uppercase tracking-widest text-xs py-4 px-8 rounded-full 
                shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2
                ${className}
            `}
            {...props}
        >
            {Icon && <Icon size={18} />}
            {children}
        </motion.button>
    );
};

export default PinkButton;
