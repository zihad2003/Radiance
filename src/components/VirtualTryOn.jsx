import MakeupStudio from './makeup/MakeupStudio';
import { motion } from 'framer-motion';

const VirtualTryOn = () => {
    return (
        <section id="experience" className="relative min-h-screen bg-black">
            {/* This wrapper ensures it takes space in the main page if needed, 
                 but MakeupStudio is likely full screen or large. 
                 We'll just mount MakeupStudio directly. 
             */}
            <MakeupStudio />
        </section>
    );
};

export default VirtualTryOn;
