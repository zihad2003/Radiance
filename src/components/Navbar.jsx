import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ShoppingBag, User } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'Virtual Try-On', href: '/virtual-try-on' },
        { name: 'AI Makeover', href: '/ai-makeover' },
        { name: 'Gallery', href: '/gallery' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-6 md:px-12 pt-6`}
        >
            <div className={`container mx-auto px-6 py-3 rounded-full flex items-center justify-between transition-all duration-500 ${isScrolled
                ? 'bg-black/60 backdrop-blur-2xl border border-white/10 shadow-2xl'
                : 'bg-transparent'
                }`}>
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-black font-black">R</div>
                    <span className="font-outfit text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">RADIANCE<span className="text-primary">.</span></span>
                </Link>

                {/* Desktop Centered Pill Menu */}
                <div className="hidden lg:flex items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-1 py-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${isActive(link.href)
                                ? 'bg-primary text-black'
                                : 'text-white/60 hover:text-white'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="hidden lg:flex items-center gap-3">
                    <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-black transition-all">
                        <Search size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-black transition-all">
                        <ShoppingBag size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-black transition-all">
                        <User size={18} />
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden absolute top-full left-6 right-6 mt-4 bg-[#0D0D0D] backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 shadow-2xl z-50 overflow-hidden"
                    >
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className={`text-sm font-black uppercase tracking-widest p-4 rounded-2xl transition-all ${isActive(link.href)
                                        ? 'bg-primary text-black'
                                        : 'text-white/60 hover:bg-white/5'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="grid grid-cols-3 gap-4 mt-4 border-t border-white/5 pt-6">
                                <button className="flex flex-col items-center gap-2 text-white/40">
                                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center"><Search size={20} /></div>
                                </button>
                                <button className="flex flex-col items-center gap-2 text-white/40">
                                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center"><ShoppingBag size={20} /></div>
                                </button>
                                <button className="flex flex-col items-center gap-2 text-white/40">
                                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center"><User size={20} /></div>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
