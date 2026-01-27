import Shop from '../components/Shop';
import FadeIn from '../components/ui/FadeIn';
import SEO from '../components/SEO';
import { ShoppingBag, Truck, Shield, Award } from 'lucide-react';

const ShopPage = () => {
    return (
        <div className="min-h-screen bg-pearl pt-24">
            <SEO
                title="Shop Premium Beauty Products | Radiance Boutique"
                description="Discover our curated collection of luxury skincare, makeup, and haircare products. Authentic brands, fast delivery in Dhaka."
                keywords="buy makeup dhaka, online beauty shop bangladesh, skincare products, authentic cosmetics"
            />
            {/* Page Header */}
            <section className="py-16 bg-gradient-to-br from-gold/10 via-yellow-50 to-transparent">
                <div className="container mx-auto px-6 text-center">
                    <FadeIn>
                        <div className="inline-block px-6 py-2 bg-white rounded-full shadow-md mb-6">
                            <span className="text-gold font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                <ShoppingBag size={14} />
                                Premium Beauty Products
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif italic mb-6 bg-gradient-to-r from-gold via-yellow-600 to-orange-600 bg-clip-text text-transparent">
                            Shop Radiance
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Discover our curated collection of premium beauty products, from luxury skincare to professional makeup essentials
                        </p>
                    </FadeIn>

                    {/* Benefits */}
                    <FadeIn delay={0.2}>
                        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-12">
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                    <Award className="text-gold" size={24} />
                                </div>
                                <h3 className="font-bold mb-2 text-sm">Authentic Products</h3>
                                <p className="text-xs text-gray-500">
                                    100% genuine, salon-grade products
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                    <Truck className="text-primary" size={24} />
                                </div>
                                <h3 className="font-bold mb-2 text-sm">Fast Delivery</h3>
                                <p className="text-xs text-gray-500">
                                    Free shipping on orders over 2000 BDT
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                    <Shield className="text-accent" size={24} />
                                </div>
                                <h3 className="font-bold mb-2 text-sm">Secure Payment</h3>
                                <p className="text-xs text-gray-500">
                                    Safe and encrypted transactions
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                    <ShoppingBag className="text-rose-500" size={24} />
                                </div>
                                <h3 className="font-bold mb-2 text-sm">Easy Returns</h3>
                                <p className="text-xs text-gray-500">
                                    7-day hassle-free return policy
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

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
