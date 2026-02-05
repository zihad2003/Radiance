import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import BookingWizard from './BookingWizard';

const Booking = ({ initialService }) => {
    return (
        <section className="py-24 bg-pearl relative min-h-screen flex items-center" id="booking">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Left: Info */}
                    <div className="lg:w-1/3">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-sm font-sans uppercase tracking-[0.3em] text-primary mb-4">Smart Booking</h2>
                            <h3 className="text-4xl md:text-5xl font-serif text-charcoal mb-6">Talk to Radiance AI</h3>
                            <p className="text-charcoal/70 mb-8 leading-relaxed">
                                Skip the forms. Just tell our AI assistant what you need, and we'll handle the schedule.
                                <br /><br />
                                <strong>Try saying:</strong><br />
                                <span className="italic">"Book a facial for Saturday at 2pm"</span>
                            </p>

                            <div className="bg-white p-6 rounded-2xl shadow-lg border border-primary/10">
                                <h4 className="font-bold text-lg mb-4 flex items-center"><Clock className="mr-2 text-primary" size={20} /> Instant Confirmation</h4>
                                <p className="text-sm text-charcoal/80 mb-4">
                                    Our AI seamlessly integrates with WhatsApp for instant booking confirmation in Dhaka.
                                </p>
                                <div className="flex items-center space-x-2 text-green-600 font-semibold text-sm">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <span>WhatsApp Enabled</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Interactive Widget */}
                    <div className="lg:w-2/3 w-full">
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-[2.5rem] p-12 shadow-2xl shadow-primary/5 border border-primary/10 text-center space-y-8 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                            <div className="relative z-10">
                                <h4 className="text-3xl font-serif font-black text-charcoal mb-4">Ready for your transformation?</h4>
                                <p className="text-gray-400 font-medium max-w-md mx-auto mb-10">
                                    Experience the future of beauty in Dhaka. Our artisans are ready to create your masterpiece.
                                </p>
                                <button
                                    onClick={() => window.dispatchEvent(new CustomEvent('open-booking', { detail: initialService }))}
                                    className="px-12 py-5 bg-charcoal text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-black transition-all shadow-2xl shadow-charcoal/20 active:scale-95"
                                >
                                    Begin Your Experience
                                </button>
                            </div>

                            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-gray-100 relative z-10">
                                <div>
                                    <div className="text-xl font-black text-charcoal">50+</div>
                                    <div className="text-[8px] font-black uppercase tracking-widest text-primary">Artisans</div>
                                </div>
                                <div>
                                    <div className="text-xl font-black text-charcoal">10k+</div>
                                    <div className="text-[8px] font-black uppercase tracking-widest text-primary">Styles</div>
                                </div>
                                <div>
                                    <div className="text-xl font-black text-charcoal">4.9/5</div>
                                    <div className="text-[8px] font-black uppercase tracking-widest text-primary">Rating</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Booking;
