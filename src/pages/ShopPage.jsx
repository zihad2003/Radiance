import Shop from '../components/Shop';
import FadeIn from '../components/ui/FadeIn';
import SEO from '../components/SEO';
import { ArrowRight, Mail } from 'lucide-react';

const ShopPage = () => {
    return (
        <div className="min-h-screen bg-[#121110] pt-24">
            <SEO
                title="Shop Premium Beauty Products | Radiance Boutique"
                description="Discover our curated collection of luxury skincare, makeup, and haircare products. Authentic brands, fast delivery in Dhaka."
                keywords="buy makeup dhaka, online beauty shop bangladesh, skincare products, authentic cosmetics"
            />

            {/* Shop Component */}
            <FadeIn>
                <Shop />
            </FadeIn>

            {/* Newsletter Section - Bento Style */}
            <section className="py-20 relative">
                <div className="container mx-auto px-6">
                    <div className="bento-card p-12 md:p-20 relative overflow-hidden bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-white/5">
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="max-w-2xl text-center md:text-left">
                                <FadeIn>
                                    <div className="bento-ribbon mb-8 text-primary mx-auto md:mx-0 w-fit">
                                        <Mail size={14} fill="currentColor" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">The Inner Circle</span>
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-sans font-black text-white italic mb-6">
                                        STAY IN THE <span className="text-primary not-italic">GLOW</span>
                                    </h2>
                                    <p className="text-white/40 text-sm font-medium leading-relaxed max-w-lg mx-auto md:mx-0">
                                        Subscribe for exclusive access to new arrivals, expert beauty insights, and member-only privileges.
                                    </p>
                                </FadeIn>
                            </div>

                            <div className="w-full max-w-md">
                                <FadeIn delay={0.2}>
                                    <form className="flex flex-col gap-4">
                                        <input
                                            type="email"
                                            placeholder="ENTER YOUR EMAIL"
                                            className="w-full px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-xs font-black uppercase tracking-widest outline-none focus:border-primary/50 transition-all text-center md:text-left"
                                        />
                                        <button className="w-full bg-white text-black py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary transition-colors flex items-center justify-center gap-3 group">
                                            Subscribe <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </form>
                                </FadeIn>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ShopPage;
