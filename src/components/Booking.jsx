import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, CheckCircle } from 'lucide-react';
import SmartBooking from './SmartBooking'; // Import the new component

const Booking = () => {
    return (
        <section className="py-24 bg-pearl relative min-h-screen flex items-center">
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
                        >
                            <SmartBooking />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Booking;
