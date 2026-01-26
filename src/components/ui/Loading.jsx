
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const Spinner = ({ size = 24, className = "", color = "text-primary" }) => {
    return (
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className={`inline-block ${color} ${className}`}
        >
            <Loader2 size={size} />
        </motion.div>
    );
};

export const Skeleton = ({ className = "w-full h-4", variant = "text" }) => {
    // variant: text, rectangular, circular

    const baseClasses = "bg-gray-200/50 animate-pulse";
    const radiusClasses = variant === 'circular' ? 'rounded-full' : 'rounded-md';

    return (
        <div className={`${baseClasses} ${radiusClasses} ${className}`} />
    );
};

export const LoadingOverlay = ({ text = "Loading...", progress }) => (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm transition-opacity">
        <Spinner size={48} className="mb-4" />
        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{text}</p>
        {progress !== undefined && (
            <div className="w-48 h-1 bg-gray-100 rounded-full mt-4 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-primary"
                />
            </div>
        )}
    </div>
);
