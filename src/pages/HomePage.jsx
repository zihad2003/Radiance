import Hero3D from '../components/landing/Hero3D';
import AIFeatureOverview from '../components/landing/AIFeatureOverview';
import HomeBentoHeader from '../components/landing/HomeBentoHeader';
import BrandSlider from '../components/landing/BrandSlider';
import Services from '../components/Services';
import ExcellenceSection from '../components/ExcellenceSection';
import BeautyStories from '../components/BeautyStories';
import FadeIn from '../components/ui/FadeIn';
import SEO from '../components/SEO'; // Added SEO import
import { Link } from 'react-router-dom';
import { Sparkles, Palette, ShoppingBag, Camera } from 'lucide-react';

const HomePage = ({ onBook }) => {
    return (
        <>
            <SEO
                title="Radiance Beauty Salon | AI Virtual Makeup & Hairstyling"
                description="Experience Bangladesh's first AI-powered virtual makeup try-on. Professional hairstyling, premium beauty services, and instant booking in Dhaka."
            />
            {/* Bento Architecture Header */}
            <HomeBentoHeader onBook={onBook} />

            {/* Brand Partners Section */}
            <FadeIn delay={0.1}>
                <BrandSlider />
            </FadeIn>

            {/* Services Preview */}
            <FadeIn>
                <Services onBook={onBook} />
            </FadeIn>

            {/* Excellence Section */}
            <FadeIn delay={0.2}>
                <ExcellenceSection />
            </FadeIn>

            {/* Quick Links Section */}
            {/* Quick Links Section - Dark Architecture */}
            <section className="py-24 bg-[#121110] relative">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <div className="text-center max-w-2xl mx-auto mb-20">
                            <h2 className="text-4xl md:text-5xl font-sans font-black text-white mb-6 uppercase tracking-tighter">
                                EXPLORE <span className="text-primary italic">RADIANCE</span>
                            </h2>
                            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] opacity-60">
                                Discover our AI-powered beauty experiences, stunning transformations, and premium products
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <FadeIn delay={0.1}>
                            <Link to="/virtual-try-on" className="bento-card p-10 block group">
                                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-black transition-all">
                                    <Camera size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tighter">Virtual Try-On</h3>
                                <p className="text-gray-500 text-[10px] leading-relaxed mb-8 uppercase tracking-widest font-bold">
                                    Try makeup looks in real-time with AI face tracking.
                                </p>
                                <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">
                                    Enter Studio →
                                </span>
                            </Link>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <Link to="/gallery" className="bento-card p-10 block group">
                                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-black transition-all">
                                    <Sparkles size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tighter">The Gallery</h3>
                                <p className="text-gray-500 text-[10px] leading-relaxed mb-8 uppercase tracking-widest font-bold">
                                    View stunning transformations from our elite clients.
                                </p>
                                <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">
                                    View Works →
                                </span>
                            </Link>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <Link to="/shop" className="bento-card p-10 block group">
                                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-black transition-all">
                                    <ShoppingBag size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tighter">Elite Boutique</h3>
                                <p className="text-gray-500 text-[10px] leading-relaxed mb-8 uppercase tracking-widest font-bold">
                                    Browse our curated collection of premium beauty products.
                                </p>
                                <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">
                                    Shop Now →
                                </span>
                            </Link>
                        </FadeIn>

                        <FadeIn delay={0.4}>
                            <Link to="/services" className="bento-card p-10 block group">
                                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-black transition-all">
                                    <Palette size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tighter">Services</h3>
                                <p className="text-gray-500 text-[10px] leading-relaxed mb-8 uppercase tracking-widest font-bold">
                                    Explore our full range of beauty and wellness services.
                                </p>
                                <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">
                                    Book Now →
                                </span>
                            </Link>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Beauty Stories */}
            <FadeIn>
                <BeautyStories />
            </FadeIn>
        </>
    );
};

export default HomePage;
