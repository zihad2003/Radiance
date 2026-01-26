import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Services', href: '#services' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'Experience', href: '#experience' }, // Virtual Try-On
        { name: 'Team', href: '#team' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
            className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-500 ${isScrolled
                ? 'py-3 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.05)]'
                : 'py-8 bg-transparent'
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="font-serif text-2xl font-bold tracking-widest text-charcoal outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1" aria-label="Radiance Home">
                    RADIANCE<span className="text-primary">.</span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-12" role="menubar">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            role="menuitem"
                            className="text-sm uppercase tracking-widest hover:text-primary transition-colors relative group outline-none focus-visible:text-primary"
                        >
                            {link.name}
                            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                    <button className="bg-primary text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all hover:scale-105 active:scale-95 shimmer interactive outline-none focus-visible:ring-4 focus-visible:ring-primary/30">
                        Book Now
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden interactive p-2 rounded-lg outline-none focus-visible:bg-gray-100"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
                    aria-expanded={mobileMenuOpen}
                    aria-controls="mobile-menu"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden absolute top-full left-0 w-full bg-pearl/95 backdrop-blur-xl border-t border-white/20 overflow-hidden"
                    >
                        <div className="flex flex-col items-center justify-center h-full space-y-8 pb-20">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-2xl font-serif text-charcoal hover:text-primary"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <button className="bg-primary text-white px-10 py-4 rounded-full text-lg mt-8 shimmer interactive">
                                Book Appointment
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
