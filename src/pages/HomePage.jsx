import Hero3D from '../components/landing/Hero3D';
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
            {/* Hero Section */}
            <Hero3D />

            {/* Services Preview */}
            <FadeIn>
                <Services onBook={onBook} />
            </FadeIn>

            {/* Excellence Section */}
            <FadeIn delay={0.2}>
                <ExcellenceSection />
            </FadeIn>

            {/* Quick Links Section */}
            <section className="py-20 bg-gradient-to-b from-white to-pearl">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl font-serif italic text-center mb-4">
                            Explore Radiance
                        </h2>
                        <p className="text-center text-gray-500 mb-16 max-w-2xl mx-auto">
                            Discover our AI-powered beauty experiences, stunning transformations, and premium products
                        </p>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FadeIn delay={0.1}>
                            <Link to="/virtual-try-on" className="group">
                                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <Camera className="text-white" size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">Virtual Try-On</h3>
                                    <p className="text-gray-500 text-sm mb-4">
                                        Try makeup looks in real-time with AI-powered virtual try-on
                                    </p>
                                    <span className="text-primary font-semibold text-sm group-hover:underline">
                                        Try Now →
                                    </span>
                                </div>
                            </Link>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <Link to="/gallery" className="group">
                                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <Sparkles className="text-white" size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">Gallery</h3>
                                    <p className="text-gray-500 text-sm mb-4">
                                        View stunning before & after transformations from our clients
                                    </p>
                                    <span className="text-primary font-semibold text-sm group-hover:underline">
                                        View Gallery →
                                    </span>
                                </div>
                            </Link>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <Link to="/shop" className="group">
                                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                                    <div className="w-16 h-16 bg-gradient-to-br from-gold to-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <ShoppingBag className="text-white" size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">Shop Products</h3>
                                    <p className="text-gray-500 text-sm mb-4">
                                        Browse our curated collection of premium beauty products
                                    </p>
                                    <span className="text-primary font-semibold text-sm group-hover:underline">
                                        Shop Now →
                                    </span>
                                </div>
                            </Link>
                        </FadeIn>

                        <FadeIn delay={0.4}>
                            <Link to="/services" className="group">
                                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                                    <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <Palette className="text-white" size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">All Services</h3>
                                    <p className="text-gray-500 text-sm mb-4">
                                        Explore our full range of beauty and wellness services
                                    </p>
                                    <span className="text-primary font-semibold text-sm group-hover:underline">
                                        View Services →
                                    </span>
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
