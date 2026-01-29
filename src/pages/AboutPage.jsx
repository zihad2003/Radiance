import Team from '../components/Team';
import ExcellenceSection from '../components/ExcellenceSection';
import FadeIn from '../components/ui/FadeIn';
import PageBentoHeader from '../components/ui/PageBentoHeader';
import { Users, Award, Heart, Target, Sparkles } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-[#121110] text-white selection:bg-primary selection:text-black">
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
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <FadeIn>
                            <div className="bento-card p-4 bg-[#0A0A0A] border border-white/5 rotate-2 hover:rotate-0 transition-transform duration-700">
                                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden relative group">
                                    <img
                                        src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=800"
                                        alt="Radiance Salon Interior"
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                    <div className="absolute bottom-8 left-8">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Sparkles size={14} className="text-primary" />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-white/80">Est. 2014</span>
                                        </div>
                                        <p className="text-xl font-serif italic text-white">The First Studio</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <div>
                                <div className="bento-ribbon mb-6 text-primary w-fit">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">The Narrative</span>
                                </div>
                                <h2 className="text-5xl md:text-7xl font-sans font-black uppercase tracking-tighter mb-8 text-white leading-[0.9]">
                                    Driven by <span className="text-primary italic font-serif">Vision</span>
                                </h2>
                                <p className="text-gray-400 mb-8 leading-relaxed font-bold uppercase tracking-widest text-[11px] opacity-80 text-justify">
                                    Radiance Beauty Salon was born from a simple vision: to create a sanctuary where every woman can discover and celebrate her unique beauty. What started as a small boutique salon has grown into a premier destination, merging heritage with high-tech.
                                </p>
                                <p className="text-gray-400 mb-12 leading-relaxed font-bold uppercase tracking-widest text-[11px] opacity-80 text-justify">
                                    Today, we combine traditional beauty techniques with cutting-edge AI technology to offer an unparalleled experience. Our team of expert stylists, makeup artists, and skincare specialists are dedicated to helping you look and feel your absolute best.
                                </p>

                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        { label: "Awards Won", value: "12" },
                                        { label: "Expert Artists", value: "15+" },
                                        { label: "Service Menu", value: "50+" },
                                        { label: "Global Brands", value: "30+" }
                                    ].map((stat, idx) => (
                                        <div key={stat.label} className="bento-card p-8 bg-[#0A0A0A] border border-white/5 group hover:border-primary/20 transition-colors">
                                            <div className="text-4xl font-sans font-black text-white group-hover:text-primary mb-2 tracking-tighter transition-colors">{stat.value}</div>
                                            <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em]">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Our Values - Bento Grid */}
            <section className="py-24 bg-[#1A1A1A] border-y border-white/5 relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <FadeIn>
                        <div className="mb-20 flex flex-col md:flex-row items-end justify-between gap-8">
                            <div className="max-w-2xl">
                                <h2 className="text-4xl md:text-5xl font-sans font-black text-white uppercase tracking-tighter leading-none">
                                    OUR CORE <span className="text-primary italic font-serif">PILLARS</span>
                                </h2>
                            </div>
                            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] opacity-60 max-w-sm text-right">
                                The principles that guide every brushstroke and algorithm at Radiance.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { icon: Award, title: "Excellence", desc: "We strive for perfection in every service, every time." },
                            { icon: Heart, title: "Empathy", desc: "Your comfort and satisfaction are our top priorities." },
                            { icon: Target, title: "Innovation", desc: "Embracing the latest technology and techniques." },
                            { icon: Users, title: "Community", desc: "Building lasting relationships with our clients." }
                        ].map((val, idx) => (
                            <FadeIn key={idx} delay={idx * 0.1}>
                                <div className="bento-card p-10 h-full group bg-[#0A0A0A] border border-white/5 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2">
                                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-black transition-all">
                                        <val.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">{val.title}</h3>
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
                <div className="py-12 bg-[#121110]">
                    <ExcellenceSection />
                </div>
            </FadeIn>

            {/* Team Selection */}
            <div className="container mx-auto px-6 mb-32">
                <FadeIn>
                    <div className="mb-20">
                        <div className="bento-ribbon mb-6 text-primary w-fit">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">The Curators</span>
                        </div>
                        <h2 className="text-5xl font-sans font-black uppercase tracking-tighter text-white">Meet the <span className="text-primary italic font-serif">Artisans</span></h2>
                    </div>
                    <Team />
                </FadeIn>
            </div>

            {/* CTA Section */}
            <section className="py-32 bg-[#0A0A0A] border-t border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-primary/5 blur-3xl opacity-20 pointer-events-none" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <FadeIn>
                        <h2 className="text-5xl md:text-8xl font-sans font-black text-white mb-12 uppercase tracking-tighter leading-[0.8]">
                            Join the <span className="text-primary italic font-serif">Legacy</span>
                        </h2>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="bg-white text-black px-16 py-6 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all shadow-glow hover:scale-105"
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
