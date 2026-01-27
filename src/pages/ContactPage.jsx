import ContactFooter from '../components/ContactFooter';
import FadeIn from '../components/ui/FadeIn';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-pearl pt-24">
            {/* Page Header */}
            <section className="py-16 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent">
                <div className="container mx-auto px-6 text-center">
                    <FadeIn>
                        <div className="inline-block px-6 py-2 bg-white rounded-full shadow-md mb-6">
                            <span className="text-primary font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                <Mail size={14} />
                                Get In Touch
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif italic mb-6 bg-gradient-to-r from-primary via-accent to-gold bg-clip-text text-transparent">
                            Contact Us
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We'd love to hear from you. Whether you have a question, feedback, or want to book an appointment, we're here to help.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        <FadeIn delay={0.1}>
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all">
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                    <MapPin className="text-primary" size={28} />
                                </div>
                                <h3 className="font-bold mb-2">Visit Us</h3>
                                <p className="text-sm text-gray-500">
                                    123 Beauty Street<br />
                                    Gulshan, Dhaka 1212<br />
                                    Bangladesh
                                </p>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all">
                                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                                    <Phone className="text-accent" size={28} />
                                </div>
                                <h3 className="font-bold mb-2">Call Us</h3>
                                <p className="text-sm text-gray-500">
                                    +880 1234-567890<br />
                                    +880 1234-567891<br />
                                    (9 AM - 9 PM)
                                </p>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all">
                                <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                                    <Mail className="text-gold" size={28} />
                                </div>
                                <h3 className="font-bold mb-2">Email Us</h3>
                                <p className="text-sm text-gray-500">
                                    info@radiance.salon<br />
                                    booking@radiance.salon<br />
                                    support@radiance.salon
                                </p>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.4}>
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all">
                                <div className="w-14 h-14 bg-rose-500/10 rounded-xl flex items-center justify-center mb-4">
                                    <Clock className="text-rose-500" size={28} />
                                </div>
                                <h3 className="font-bold mb-2">Opening Hours</h3>
                                <p className="text-sm text-gray-500">
                                    Mon - Sat: 9 AM - 9 PM<br />
                                    Sunday: 10 AM - 8 PM<br />
                                    Holidays: By Appointment
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <h2 className="text-4xl font-serif italic text-center mb-12">Find Us on the Map</h2>
                        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0977!2d90.4125!3d23.7808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ2JzUwLjkiTiA5MMKwMjQnNDUuMCJF!5e0!3m2!1sen!2sbd!4v1234567890"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Radiance Beauty Salon Location"
                            ></iframe>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Contact Form */}
            <FadeIn>
                <ContactFooter />
            </FadeIn>

            {/* FAQ Section */}
            <section className="py-20 bg-gradient-to-br from-charcoal to-gray-900 text-white">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl font-serif italic text-center mb-12">
                            Frequently Asked Questions
                        </h2>
                        <div className="max-w-3xl mx-auto space-y-6">
                            <details className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 group">
                                <summary className="font-bold cursor-pointer list-none flex items-center justify-between">
                                    <span>How do I book an appointment?</span>
                                    <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                                </summary>
                                <p className="mt-4 text-white/70 leading-relaxed">
                                    You can book an appointment through our website by clicking the "Book Now" button, calling us directly, or using our chatbot assistant. We recommend booking in advance to secure your preferred time slot.
                                </p>
                            </details>

                            <details className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 group">
                                <summary className="font-bold cursor-pointer list-none flex items-center justify-between">
                                    <span>What is your cancellation policy?</span>
                                    <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                                </summary>
                                <p className="mt-4 text-white/70 leading-relaxed">
                                    We require at least 24 hours notice for cancellations or rescheduling. Late cancellations may incur a fee. Please contact us as soon as possible if you need to change your appointment.
                                </p>
                            </details>

                            <details className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 group">
                                <summary className="font-bold cursor-pointer list-none flex items-center justify-between">
                                    <span>Do you offer bridal packages?</span>
                                    <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                                </summary>
                                <p className="mt-4 text-white/70 leading-relaxed">
                                    Yes! We offer comprehensive bridal packages including makeup trials, hair styling, skincare treatments, and on-location services. Contact us to discuss your special day requirements.
                                </p>
                            </details>

                            <details className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 group">
                                <summary className="font-bold cursor-pointer list-none flex items-center justify-between">
                                    <span>What payment methods do you accept?</span>
                                    <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                                </summary>
                                <p className="mt-4 text-white/70 leading-relaxed">
                                    We accept cash, all major credit/debit cards, bKash, Nagad, and Rocket. Payment is due at the time of service unless you have a pre-paid package.
                                </p>
                            </details>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
