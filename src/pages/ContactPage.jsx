import ContactFooter from '../components/ContactFooter';
import FadeIn from '../components/ui/FadeIn';
import PageBentoHeader from '../components/ui/PageBentoHeader';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-[#121110] text-white">
            <PageBentoHeader
                title={<>ETHEREAL<br /><span className="text-primary">CONNECTION</span></>}
                badge="The Concierge"
                description="Our specialists are ready to curate your beauty journey. Reach out for bespoke consultations and priority inquiries."
                image="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200"
                stats={[
                    { label: "Gulshan Studios", value: "HQ", description: "123 Beauty Street, Gulshan, Dhaka 1212." },
                    { label: "Response Time", value: "<1hr", description: "Elite support for all digital inquiries." },
                    { label: "Phone Line", value: "24/7", description: "Concierge booking available around the clock." }
                ]}
            />

            {/* Contact Info Bento */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {[
                            { icon: MapPin, title: "Location", desc: "Gulshan, Dhaka 1212", sub: "Visit HQ" },
                            { icon: Phone, title: "Phone", desc: "+880 1234-567890", sub: "Priority Line" },
                            { icon: Mail, title: "Email", desc: "info@radiance.salon", sub: "Official Inquiry" },
                            { icon: Clock, title: "Hours", desc: "9 AM - 9 PM Daily", sub: "Boutique Hours" }
                        ].map((item, idx) => (
                            <FadeIn key={idx} delay={idx * 0.1}>
                                <div className="bento-card p-10 h-full group">
                                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-black transition-all">
                                        <item.icon size={24} />
                                    </div>
                                    <span className="text-[9px] text-primary font-black uppercase tracking-[0.3em] mb-4 block">{item.sub}</span>
                                    <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tighter">{item.title}</h3>
                                    <p className="text-gray-500 text-[10px] leading-relaxed uppercase tracking-widest font-bold">
                                        {item.desc}
                                    </p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map Section - Themed */}
            <section className="py-24 bg-[#1A1A1A] border-y border-white/5">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-sans font-black text-white mb-4 uppercase tracking-tighter">
                                FIND THE <span className="text-primary italic">STUUDIO</span>
                            </h2>
                        </div>
                        <div className="max-w-7xl mx-auto rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl grayscale group hover:grayscale-0 transition-all duration-1000">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0977!2d90.4125!3d23.7808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ2JzUwLjkiTiA5MMKwMjQnNDUuMCJF!5e0!3m2!1sen!2sbd!4v1234567890"
                                width="100%"
                                height="550"
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
            <div className="container mx-auto px-6 py-24">
                <FadeIn>
                    <ContactFooter />
                </FadeIn>
            </div>

            {/* FAQ Section - Midnight Architecture */}
            <section className="py-24 bg-[#0A0A0A] text-white">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <h2 className="text-5xl md:text-7xl font-sans font-black text-center mb-20 uppercase tracking-tighter">
                            THE <span className="text-primary">KNOWLEDGE</span> BASE
                        </h2>
                        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
                            {[
                                { q: "How do I book?", a: "Book via our AI Boutique, the Virtual Studio, or our 24/7 concierge line." },
                                { q: "Cancellation?", a: "24-hour notice required for clinical grade scheduling adjustments." },
                                { q: "Bridal Packages?", a: "We offer bespoke cinematic bridal packages including full AI trials." },
                                { q: "Payment?", a: "All major credit cards, bKash, and digital assets accepted." }
                            ].map((faq, idx) => (
                                <div key={idx} className="bento-card p-10 border border-white/5">
                                    <h3 className="text-xl font-bold mb-6 text-white uppercase tracking-tighter flex gap-3">
                                        <span className="text-primary">0{idx + 1}</span> {faq.q}
                                    </h3>
                                    <p className="text-gray-500 text-[10px] leading-relaxed uppercase tracking-widest font-bold opacity-80">
                                        {faq.a}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
