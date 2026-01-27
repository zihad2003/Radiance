import Team from '../components/Team';
import ExcellenceSection from '../components/ExcellenceSection';
import FadeIn from '../components/ui/FadeIn';
import { Users, Award, Heart, Target } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-pearl pt-24">
            {/* Page Header */}
            <section className="py-16 bg-gradient-to-br from-rose-50 via-pink-50 to-transparent">
                <div className="container mx-auto px-6 text-center">
                    <FadeIn>
                        <div className="inline-block px-6 py-2 bg-white rounded-full shadow-md mb-6">
                            <span className="text-primary font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                <Heart size={14} fill="currentColor" />
                                About Radiance
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif italic mb-6 bg-gradient-to-r from-primary via-accent to-rose-600 bg-clip-text text-transparent">
                            Where Beauty Meets Excellence
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Founded with a passion for beauty and a commitment to excellence, Radiance Beauty Salon has been transforming lives through the art of beauty for over a decade
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        <FadeIn>
                            <div className="relative">
                                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800"
                                        alt="Radiance Salon Interior"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-primary to-accent rounded-3xl -z-10"></div>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <div>
                                <h2 className="text-4xl font-serif italic mb-6">Our Story</h2>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Radiance Beauty Salon was born from a simple vision: to create a sanctuary where every woman can discover and celebrate her unique beauty. What started as a small boutique salon has grown into a premier destination for beauty and wellness.
                                </p>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Today, we combine traditional beauty techniques with cutting-edge AI technology to offer an unparalleled experience. Our team of expert stylists, makeup artists, and skincare specialists are dedicated to helping you look and feel your absolute best.
                                </p>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <div className="text-3xl font-bold text-primary mb-1">10+</div>
                                        <p className="text-sm text-gray-500">Years of Excellence</p>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-accent mb-1">5000+</div>
                                        <p className="text-sm text-gray-500">Happy Clients</p>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-gold mb-1">15+</div>
                                        <p className="text-sm text-gray-500">Expert Stylists</p>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-rose-500 mb-1">50+</div>
                                        <p className="text-sm text-gray-500">Premium Services</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl font-serif italic text-center mb-4">
                            Our Values
                        </h2>
                        <p className="text-center text-gray-500 mb-16 max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </FadeIn>

                    <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        <FadeIn delay={0.1}>
                            <div className="text-center">
                                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                    <Award className="text-primary" size={36} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Excellence</h3>
                                <p className="text-gray-500 text-sm">
                                    We strive for perfection in every service, every time
                                </p>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <div className="text-center">
                                <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                    <Heart className="text-accent" size={36} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Care</h3>
                                <p className="text-gray-500 text-sm">
                                    Your comfort and satisfaction are our top priorities
                                </p>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gold/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                    <Target className="text-gold" size={36} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Innovation</h3>
                                <p className="text-gray-500 text-sm">
                                    Embracing the latest technology and techniques
                                </p>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.4}>
                            <div className="text-center">
                                <div className="w-20 h-20 bg-rose-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                    <Users className="text-rose-500" size={36} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Community</h3>
                                <p className="text-gray-500 text-sm">
                                    Building lasting relationships with our clients
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Excellence Section */}
            <FadeIn>
                <ExcellenceSection />
            </FadeIn>

            {/* Team Section */}
            <FadeIn>
                <Team />
            </FadeIn>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-primary via-accent to-gold text-white">
                <div className="container mx-auto px-6 text-center">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl font-serif italic mb-6">
                            Join the Radiance Family
                        </h2>
                        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                            Experience the difference that passion, expertise, and care can make
                        </p>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="bg-white text-primary px-12 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-pearl transition-all shadow-2xl hover:scale-105"
                        >
                            Book Your Visit
                        </button>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
