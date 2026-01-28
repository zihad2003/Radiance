import { motion } from 'framer-motion';

const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-glow',
    secondary: 'bg-white text-primary-500 border-2 border-primary-500 hover:bg-primary-50',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
    ghost: 'text-primary-500 hover:bg-primary-50',
};

const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-12 py-5 text-xl',
};

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    disabled = false,
    className = '',
    ...props
}) {
    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            onClick={onClick}
            disabled={disabled}
            className={`
        ${variants[variant]} 
        ${sizes[size]} 
        rounded-full font-semibold transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
            {...props}
        >
            {children}
        </motion.button>
    );
}
