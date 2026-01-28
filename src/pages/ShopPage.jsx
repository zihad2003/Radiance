import Shop from '../components/Shop';
import FadeIn from '../components/ui/FadeIn';
import SEO from '../components/SEO';
import { ShoppingBag, Truck, Shield, Award } from 'lucide-react';

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

            {/* Newsletter Section */}
            <section className="py-20 bg-gradient-to-br from-charcoal to-gray-900 text-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <FadeIn>
                            <h2 className="text-4xl md:text-5xl font-serif italic mb-6">
                                Stay in the Glow
                            </h2>
                            <p className="text-xl mb-8 opacity-90">
                                Subscribe to our newsletter for exclusive deals, beauty tips, and new product launches
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-6 py-4 rounded-full text-charcoal focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <button className="bg-primary text-white px-12 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-accent transition-all shadow-2xl hover:scale-105">
                                    Subscribe
                                </button>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ShopPage;
