import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ShoppingBag, User } from 'lucide-react';
import { useShopStore } from '../store/useShopStore';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { getCartCount, setCartOpen } = useShopStore();
    const { isAuthenticated } = useAuth();

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
        { name: 'Shop', href: '/shop' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-[100] flex justify-center transition-all duration-700 ${isScrolled ? 'pt-4 px-4' : 'pt-6 px-6 md:px-12'
                }`}
        >
            <motion.div
                layout
                className={`flex items-center justify-between rounded-full transition-all duration-500 overflow-hidden ${isScrolled
                    ? 'w-full max-w-5xl bg-black/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] px-6 py-2'
                    : 'w-full container bg-black/20 backdrop-blur-md border border-white/10 shadow-xl px-6 py-2.5'
                    }`}
            >
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-4 group shrink-0">
                    <motion.div
                        layout
                        className="relative w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden bg-transparent border border-white/10 group-hover:border-primary/50 transition-all shadow-2xl"
                    >
                        <img
                            src="/logo.png"
                            alt="Radiance Logo"
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                    </motion.div>
                    <motion.span
                        layout
                        className="font-outfit text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors hidden xl:block"
                    >
                        RADIANCE<span className="text-primary">.</span>
                    </motion.span>
                </Link>

                <div className="hidden lg:flex items-center bg-white/5 backdrop-blur-md border border-white/5 rounded-full px-1 py-1 mx-4 relative">
                    {navLinks.map((link) => (
                        <motion.div
                            key={link.name}
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 0 }}
                            className="relative z-10"
                        >
                            <Link
                                to={link.href}
                                className={`px-3.5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all relative block whitespace-nowrap ${isActive(link.href) ? 'text-black' : 'text-white/50 hover:text-white'
                                    }`}
                            >
                                {isActive(link.href) && (
                                    <motion.div
                                        layoutId="navIndicator"
                                        className="absolute inset-0 bg-primary rounded-full -z-10"
                                        transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                                    />
                                )}
                                {link.name}
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="hidden lg:flex items-center gap-2">
                    <motion.button
                        whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,1)', color: 'rgba(0,0,0,1)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/shop')}
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white/50 transition-all font-bold"
                        title="Search Products"
                    >
                        <Search size={16} />
                    </motion.button>
                    <motion.button
                        whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,1)', color: 'rgba(0,0,0,1)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCartOpen(true)}
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white/50 transition-all relative font-bold"
                        title="View Bag"
                    >
                        <ShoppingBag size={16} />
                        {getCartCount() > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-black text-[8px] font-black rounded-full flex items-center justify-center border border-black shadow-lg">
                                {getCartCount()}
                            </span>
                        )}
                    </motion.button>
                    <motion.button
                        whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,1)', color: 'rgba(0,0,0,1)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            if (isAuthenticated) {
                                window.dispatchEvent(new CustomEvent('open-profile'));
                            } else {
                                navigate('/auth');
                            }
                        }}
                        className={`w-10 h-10 rounded-full border border-white/5 flex items-center justify-center transition-all font-bold ${isAuthenticated ? 'bg-primary text-black' : 'bg-white/5 text-white/50'}`}
                        title={isAuthenticated ? "My Account" : "Sign In"}
                    >
                        <User size={16} />
                    </motion.button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </motion.div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="lg:hidden absolute top-full left-6 right-6 mt-4 bg-[#0D0D0D]/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-50 overflow-hidden"
                    >
                        <div className="flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className={`text-xs font-black uppercase tracking-widest p-4 rounded-2xl transition-all ${isActive(link.href)
                                        ? 'bg-primary text-black'
                                        : 'text-white/50 hover:bg-white/5'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="grid grid-cols-3 gap-4 mt-4 border-t border-white/5 pt-6">
                                <button
                                    onClick={() => { navigate('/shop'); setMobileMenuOpen(false); }}
                                    className="flex flex-col items-center gap-2 text-white/40 hover:text-white transition-colors"
                                >
                                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center"><Search size={20} /></div>
                                </button>
                                <button
                                    onClick={() => { setCartOpen(true); setMobileMenuOpen(false); }}
                                    className="flex flex-col items-center gap-2 text-white/40 hover:text-white transition-colors relative"
                                >
                                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                                        <ShoppingBag size={20} />
                                        {getCartCount() > 0 && (
                                            <span className="absolute top-0 right-0 w-5 h-5 bg-primary text-black text-[10px] font-black rounded-full flex items-center justify-center border border-black shadow-lg">
                                                {getCartCount()}
                                            </span>
                                        )}
                                    </div>
                                </button>
                                <button
                                    onClick={() => {
                                        if (isAuthenticated) {
                                            window.dispatchEvent(new CustomEvent('open-profile'));
                                        } else {
                                            navigate('/auth');
                                        }
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`flex flex-col items-center gap-2 transition-colors ${isAuthenticated ? 'text-primary' : 'text-white/40'}`}
                                >
                                    <div className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center ${isAuthenticated ? 'bg-primary/10 border-primary/20' : ''}`}><User size={20} /></div>
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
