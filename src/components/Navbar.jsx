import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'Virtual Try-On', href: '/virtual-try-on' },
        { name: 'AI Makeover', href: '/ai-makeover' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Shop', href: '/shop' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
            className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-500 ${isScrolled
                ? 'py-3 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
                : 'py-8 bg-transparent'
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link
                    to="/"
                    className="font-serif text-2xl font-bold tracking-widest text-white outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg p-1"
                    aria-label="Radiance Home"
                >
                    RADIANCE<span className="text-gold">.</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-8" role="menubar">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            role="menuitem"
                            className={`text-xs uppercase tracking-widest hover:text-gold transition-colors relative group outline-none focus-visible:text-gold text-white/80 ${isActive(link.href) ? 'text-gold font-bold' : ''
                                }`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-2 left-0 h-0.5 bg-gold transition-all duration-300 ${isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                                }`} />
                        </Link>
                    ))}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="bg-gold text-black px-8 py-3 rounded-full hover:bg-white transition-all hover:scale-105 active:scale-95 shimmer interactive outline-none focus-visible:ring-4 focus-visible:ring-gold/30 text-xs uppercase tracking-widest font-bold"
                    >
                        Book Now
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden interactive p-2 rounded-lg outline-none focus-visible:bg-white/10 text-white"
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
                        id="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden absolute top-full left-0 w-full bg-[#050505] backdrop-blur-xl border-t border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col items-center justify-center h-full space-y-6 pb-20">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className={`text-2xl font-serif hover:text-gold transition-colors ${isActive(link.href) ? 'text-gold font-bold' : 'text-white'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <button
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="bg-gold text-black px-10 py-4 rounded-full text-lg mt-8 shimmer interactive"
                            >
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
