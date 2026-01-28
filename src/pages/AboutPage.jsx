import Team from '../components/Team';
import ExcellenceSection from '../components/ExcellenceSection';
import FadeIn from '../components/ui/FadeIn';
import PageBentoHeader from '../components/ui/PageBentoHeader';
import { Users, Award, Heart, Target } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-[#121110] text-white">
            <PageBentoHeader
                title={<>HERITAGE OF <br /><span className="text-primary">RADIANCE</span></>}
                badge="The Genesis"
                description="More than a salon, Radiance is a testament to the harmony of traditional South Asian beauty and futuristic AI precision."
                image="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200"
                stats={[
                    { label: "Longevity", value: "10+", description: "Years of setting beauty benchmarks in Dhaka." },
                    { label: "Community", value: "15k+", description: "Stories of transformation and empowerment." },
                    { label: "Innovation", value: "468", description: "Point face-mesh AI tracking technology." }
                ]}
            />

            {/* Our Story - Architecture Refactor */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
                        <FadeIn>
                            <div className="bento-card p-4">
                                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800"
                                        alt="Radiance Salon Interior"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <div>
                                <h2 className="text-4xl md:text-6xl font-sans font-black uppercase tracking-tighter mb-8 text-white">Our Story</h2>
                                <p className="text-gray-400 mb-6 leading-relaxed font-bold uppercase tracking-widest text-[11px] opacity-80">
                                    Radiance Beauty Salon was born from a simple vision: to create a sanctuary where every woman can discover and celebrate her unique beauty. What started as a small boutique salon has grown into a premier destination for beauty and wellness.
                                </p>
                                <p className="text-gray-400 mb-12 leading-relaxed font-bold uppercase tracking-widest text-[11px] opacity-80">
                                    Today, we combine traditional beauty techniques with cutting-edge AI technology to offer an unparalleled experience. Our team of expert stylists, makeup artists, and skincare specialists are dedicated to helping you look and feel your absolute best.
                                </p>

                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        { label: "Awards Won", value: "12" },
                                        { label: "Expert Artists", value: "15+" },
                                        { label: "Service Menu", value: "50+" },
                                        { label: "Global Brands", value: "30+" }
                                    ].map(stat => (
                                        <div key={stat.label} className="bg-white/5 border border-white/5 p-6 rounded-2xl">
                                            <div className="text-3xl font-sans font-black text-primary mb-1 tracking-tighter">{stat.value}</div>
                                            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Our Values - Bento Grid */}
            <section className="py-24 bg-[#1A1A1A] border-y border-white/5">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <div className="text-center mb-20 px-6">
                            <h2 className="text-4xl md:text-5xl font-sans font-black text-white mb-4 uppercase tracking-tighter">
                                OUR CORE <span className="text-primary italic">PILLARS</span>
                            </h2>
                            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] opacity-60 max-w-xl mx-auto">
                                The principles that guide every brushstroke and algorithm at Radiance.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {[
                            { icon: Award, title: "Excellence", desc: "We strive for perfection in every service, every time." },
                            { icon: Heart, title: "Empathy", desc: "Your comfort and satisfaction are our top priorities." },
                            { icon: Target, title: "Innovation", desc: "Embracing the latest technology and techniques." },
                            { icon: Users, title: "Community", desc: "Building lasting relationships with our clients." }
                        ].map((val, idx) => (
                            <FadeIn key={idx} delay={idx * 0.1}>
                                <div className="bento-card p-10 h-full group">
                                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-black transition-all">
                                        <val.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tighter">{val.title}</h3>
                                    <p className="text-gray-500 text-[10px] leading-relaxed uppercase tracking-widest font-bold">
                                        {val.desc}
                                    </p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Excellence Selection */}
            <FadeIn>
                <div className="py-24 text-white">
                    <ExcellenceSection />
                </div>
            </FadeIn>

            {/* Team Selection */}
            <div className="container mx-auto px-6 mb-24">
                <FadeIn>
                    <div className="mb-16">
                        <h2 className="text-4xl font-sans font-black uppercase tracking-tighter mb-4 text-white">The Curators</h2>
                        <div className="h-1 w-20 bg-primary"></div>
                    </div>
                    <Team />
                </FadeIn>
            </div>

            {/* CTA Section */}
            <section className="py-24 bg-[#0A0A0A]">
                <div className="container mx-auto px-6 text-center">
                    <FadeIn>
                        <h2 className="text-5xl md:text-7xl font-sans font-black text-white mb-8 uppercase tracking-tighter">
                            Join the <span className="text-primary">Legacy</span>
                        </h2>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="bg-white text-black px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all shadow-2xl"
                        >
                            Reserve Your Visit
                        </button>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
