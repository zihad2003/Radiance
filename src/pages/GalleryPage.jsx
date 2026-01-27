import Gallery from '../components/Gallery';
import TransformationCompare from '../components/TransformationCompare';
import AITaggedGallery from '../components/AITaggedGallery';
import FadeIn from '../components/ui/FadeIn';
import { Camera, Star, TrendingUp } from 'lucide-react';

const GalleryPage = () => {
    return (
        <div className="min-h-screen bg-pearl pt-24">
            {/* Page Header */}
            <section className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-transparent">
                <div className="container mx-auto px-6 text-center">
                    <FadeIn>
                        <div className="inline-block px-6 py-2 bg-white rounded-full shadow-md mb-6">
                            <span className="text-primary font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                <Camera size={14} />
                                Transformation Gallery
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif italic mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                            Our Work Speaks
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Witness the stunning transformations we've created for our clients. Every face tells a story of confidence, beauty, and radiance.
                        </p>
                    </FadeIn>

                    {/* Stats */}
                    <FadeIn delay={0.2}>
                        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="text-4xl font-bold text-primary mb-2">5000+</div>
                                <p className="text-gray-500 font-medium">Happy Clients</p>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="text-4xl font-bold text-accent mb-2">4.9★</div>
                                <p className="text-gray-500 font-medium">Average Rating</p>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="text-4xl font-bold text-gold mb-2">98%</div>
                                <p className="text-gray-500 font-medium">Satisfaction Rate</p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* AI-Tagged Gallery - NEW! */}
            <FadeIn>
                <AITaggedGallery />
            </FadeIn>

            {/* Transformation Compare */}
            <FadeIn>
                <TransformationCompare />
            </FadeIn>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-primary via-accent to-gold text-white">
                <div className="container mx-auto px-6 text-center">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl font-serif italic mb-6">
                            Your Transformation Awaits
                        </h2>
                        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                            Join thousands of satisfied clients who've discovered their radiant self
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="bg-white text-primary px-12 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-pearl transition-all shadow-2xl hover:scale-105"
                            >
                                Book Now
                            </button>
                            <button
                                onClick={() => window.location.href = '/virtual-try-on'}
                                className="bg-transparent border-2 border-white text-white px-12 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-primary transition-all shadow-2xl hover:scale-105"
                            >
                                Try Virtual Makeup
                            </button>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
};

export default GalleryPage;
