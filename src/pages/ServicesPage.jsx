import Services from '../components/Services';
import Pricing from '../components/Pricing';
import FadeIn from '../components/ui/FadeIn';
import SkinHealthAnalyzer from '../components/SkinHealthAnalyzer';
import { Clock, Award, Heart, Shield } from 'lucide-react';

const ServicesPage = ({ onBook }) => {
    return (
        <div className="min-h-screen bg-pearl pt-24">
            {/* Page Header */}
            <section className="py-16 bg-gradient-to-br from-rose-50 via-pink-50 to-transparent">
                <div className="container mx-auto px-6 text-center">
                    <FadeIn>
                        <div className="inline-block px-6 py-2 bg-white rounded-full shadow-md mb-6">
                            <span className="text-primary font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                <Heart size={14} fill="currentColor" />
                                Premium Services
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif italic mb-6 bg-gradient-to-r from-primary via-accent to-rose-600 bg-clip-text text-transparent">
                            Our Services
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            From luxurious facials to stunning makeovers, we offer a comprehensive range of beauty and wellness services tailored to your needs
                        </p>
                    </FadeIn>

                    {/* Why Choose Us */}
                    <FadeIn delay={0.2}>
                        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-12">
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                    <Award className="text-primary" size={24} />
                                </div>
                                <h3 className="font-bold mb-2 text-sm">Expert Team</h3>
                                <p className="text-xs text-gray-500">
                                    Certified professionals with years of experience
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                    <Shield className="text-accent" size={24} />
                                </div>
                                <h3 className="font-bold mb-2 text-sm">Premium Products</h3>
                                <p className="text-xs text-gray-500">
                                    Only the finest, salon-grade products
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                    <Heart className="text-gold" size={24} />
                                </div>
                                <h3 className="font-bold mb-2 text-sm">Personalized Care</h3>
                                <p className="text-xs text-gray-500">
                                    Customized treatments for your unique needs
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                    <Clock className="text-rose-500" size={24} />
                                </div>
                                <h3 className="font-bold mb-2 text-sm">Flexible Hours</h3>
                                <p className="text-xs text-gray-500">
                                    Open 7 days a week for your convenience
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* AI Skin Analysis - NEW! */}
            <FadeIn>
                <SkinHealthAnalyzer />
            </FadeIn>

            {/* Services Grid */}
            <FadeIn>
                <Services onBook={onBook} />
            </FadeIn>

            {/* Pricing Section */}
            <FadeIn>
                <Pricing />
            </FadeIn>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-charcoal to-gray-900 text-white">
                <div className="container mx-auto px-6 text-center">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl font-serif italic mb-6">
                            Ready to Transform?
                        </h2>
                        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                            Book your appointment today and experience the Radiance difference
                        </p>
                        <button
                            onClick={() => onBook && onBook(null)}
                            className="bg-primary text-white px-12 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-accent transition-all shadow-2xl hover:scale-105"
                        >
                            Book Appointment
                        </button>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
