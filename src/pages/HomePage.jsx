import HomeBentoHeader from '../components/landing/HomeBentoHeader';
import BrandSlider from '../components/landing/BrandSlider';
import Services from '../components/Services';
import ExcellenceSection from '../components/ExcellenceSection';
import BeautyStories from '../components/BeautyStories';
import FadeIn from '../components/ui/FadeIn';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { Sparkles, Palette, ShoppingBag, Camera, ArrowRight, BookOpen } from 'lucide-react';

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

            {/* Quick Links Section - Dark Architecture */}
            <section className="py-32 bg-[#121110] relative">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <div className="mb-20 flex flex-col md:flex-row items-end justify-between gap-8">
                            <div className="max-w-2xl">
                                <div className="bento-ribbon mb-6 text-primary w-fit">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">The Ecosystem</span>
                                </div>
                                <h2 className="text-5xl md:text-7xl font-sans font-black text-white uppercase tracking-tighter leading-[0.9]">
                                    EXPLORE <span className="text-primary italic font-serif">RADIANCE</span>
                                </h2>
                            </div>
                            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] max-w-sm text-right">
                                Discover our AI-powered beauty experiences, stunning transformations, and premium products
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <FadeIn delay={0.1}>
                            <Link to="/virtual-try-on" className="bento-card p-10 flex flex-col justify-between group h-full bg-[#0A0A0A] border border-white/5 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2">
                                <div>
                                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-black transition-all">
                                        <Camera size={24} />
                                    </div>
                                    <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">Virtual Try-On</h3>
                                    <p className="text-gray-500 text-[10px] leading-relaxed mb-8 uppercase tracking-widest font-bold">
                                        Try makeup looks in real-time with AI face tracking.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 group-hover:gap-4 transition-all">
                                    <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] group-hover:text-white transition-colors">Enter Studio</span>
                                    <ArrowRight size={14} className="text-primary group-hover:text-white transition-colors" />
                                </div>
                            </Link>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <Link to="/gallery" className="bento-card p-10 flex flex-col justify-between group h-full bg-[#0A0A0A] border border-white/5 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2">
                                <div>
                                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-black transition-all">
                                        <Sparkles size={24} />
                                    </div>
                                    <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">The Gallery</h3>
                                    <p className="text-gray-500 text-[10px] leading-relaxed mb-8 uppercase tracking-widest font-bold">
                                        View stunning transformations from our elite clients.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 group-hover:gap-4 transition-all">
                                    <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] group-hover:text-white transition-colors">View Works</span>
                                    <ArrowRight size={14} className="text-primary group-hover:text-white transition-colors" />
                                </div>
                            </Link>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <Link to="/shop" className="bento-card p-10 flex flex-col justify-between group h-full bg-[#0A0A0A] border border-white/5 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2">
                                <div>
                                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-black transition-all">
                                        <ShoppingBag size={24} />
                                    </div>
                                    <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">Elite Boutique</h3>
                                    <p className="text-gray-500 text-[10px] leading-relaxed mb-8 uppercase tracking-widest font-bold">
                                        Browse our curated collection of premium beauty products.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 group-hover:gap-4 transition-all">
                                    <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] group-hover:text-white transition-colors">Shop Now</span>
                                    <ArrowRight size={14} className="text-primary group-hover:text-white transition-colors" />
                                </div>
                            </Link>
                        </FadeIn>

                        <FadeIn delay={0.4}>
                            <Link to="/services" className="bento-card p-10 flex flex-col justify-between group h-full bg-[#0A0A0A] border border-white/5 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2">
                                <div>
                                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-black transition-all">
                                        <BookOpen size={24} />
                                    </div>
                                    <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">Services</h3>
                                    <p className="text-gray-500 text-[10px] leading-relaxed mb-8 uppercase tracking-widest font-bold">
                                        Explore our full range of beauty and wellness services.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 group-hover:gap-4 transition-all">
                                    <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] group-hover:text-white transition-colors">Book Now</span>
                                    <ArrowRight size={14} className="text-primary group-hover:text-white transition-colors" />
                                </div>
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
