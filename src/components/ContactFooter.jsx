import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Linkedin, Send, ArrowRight } from 'lucide-react';

const ContactFooter = () => {
    return (
        <>
            {/* Contact Section */}
            <section id="contact" className="py-24 bg-[#050505] relative">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Map & Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="lg:w-1/2"
                        >
                            <h2 className="text-sm font-sans uppercase tracking-[0.3em] text-gold mb-4">Visit Us</h2>
                            <h3 className="text-4xl md:text-5xl font-serif text-white mb-8">Sanctuary Location</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
                                    <MapPin className="text-gold mb-4 group-hover:scale-110 transition-transform" size={24} />
                                    <h4 className="font-serif text-lg mb-2 text-white">Address</h4>
                                    <p className="text-white/60 text-sm">House 15, Road 103, <br />Gulshan 2, Dhaka 1212</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
                                    <Phone className="text-gold mb-4 group-hover:scale-110 transition-transform" size={24} />
                                    <h4 className="font-serif text-lg mb-2 text-white">Phone</h4>
                                    <p className="text-white/60 text-sm">+880 1711-234567<br />+880 1819-876543</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
                                    <Mail className="text-gold mb-4 group-hover:scale-110 transition-transform" size={24} />
                                    <h4 className="font-serif text-lg mb-2 text-white">Email</h4>
                                    <p className="text-white/60 text-sm">concierge@radiance.com<br />press@radiance.com</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
                                    <Clock className="text-gold mb-4 group-hover:scale-110 transition-transform" size={24} />
                                    <h4 className="font-serif text-lg mb-2 text-white">Hours</h4>
                                    <p className="text-white/60 text-sm">Mon-Fri: 9am - 8pm<br />Sat: 10am - 6pm</p>
                                </div>
                            </div>

                            <div className="h-[300px] w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white/5">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0874457713433!2d90.41144131543187!3d23.794895884567484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70c534063df%3A0x7d25e01bd6a6669!2sGulshan%202%20Circle%2C%20Dhaka%201212!5e0!3m2!1sen!2sbd!4v1644837543210!5m2!1sen!2sbd"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="filter grayscale contrast-125 opacity-80 hover:opacity-100 transition-all duration-700 invert"
                                ></iframe>
                            </div>
                        </motion.div>

                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="lg:w-1/2"
                        >
                            <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2rem] shadow-xl backdrop-blur-sm">
                                <h3 className="text-3xl font-serif mb-6 text-white">Send a Message</h3>
                                <form className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">First Name</label>
                                            <input type="text" className="w-full bg-black/20 text-white p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all border border-white/10 focus:border-gold/20" placeholder="Jane" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Last Name</label>
                                            <input type="text" className="w-full bg-black/20 text-white p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all border border-white/10 focus:border-gold/20" placeholder="Doe" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Email Address</label>
                                        <input type="email" className="w-full bg-black/20 text-white p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all border border-white/10 focus:border-gold/20" placeholder="jane@example.com" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Subject</label>
                                        <select className="w-full bg-black/20 text-white p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all border border-white/10 focus:border-gold/20">
                                            <option className="bg-black">General Inquiry</option>
                                            <option className="bg-black">Feedback</option>
                                            <option className="bg-black">Partnership</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Message</label>
                                        <textarea rows="4" className="w-full bg-black/20 text-white p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all border border-white/10 focus:border-gold/20" placeholder="How can we help you?"></textarea>
                                    </div>
                                    <button className="w-full bg-[#F5E6C8] text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300 shadow-lg interactive flex items-center justify-center">
                                        Send Message <Send className="ml-2 w-4 h-4" />
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#020202] text-white pt-20 pb-10 rounded-t-[3rem] mt-[-2rem] relative z-20 border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        {/* Column 1: Brand */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-serif font-bold tracking-widest text-white">
                                RADIANCE<span className="text-gold">.</span>
                            </h3>
                            <p className="text-white/60 leading-relaxed max-w-xs">
                                Redefining beauty through innovation and luxury. Step into the future of self-care.
                            </p>
                            <div className="flex space-x-4">
                                {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                                    <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-charcoal transition-all duration-300 group">
                                        <Icon size={18} className="group-hover:rotate-12 transition-transform" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Column 2: Quick Links */}
                        <div>
                            <h4 className="font-serif text-lg mb-6 text-gold">Explore</h4>
                            <ul className="space-y-4">
                                {['Services', 'Portfolio', 'Virtual Try-On', 'Our Team', 'Pricing'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center group">
                                            <span className="w-0 group-hover:w-2 h-0.5 bg-gold mr-0 group-hover:mr-2 transition-all duration-300"></span>
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Utility */}
                        <div>
                            <h4 className="font-serif text-lg mb-6 text-gold">Legal</h4>
                            <ul className="space-y-4">
                                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Careers', 'Sitemap'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-white/70 hover:text-white transition-colors">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 4: Newsletter */}
                        <div>
                            <h4 className="font-serif text-lg mb-6 text-gold">Stay Updated</h4>
                            <p className="text-white/60 mb-4 text-sm">Join our exclusive list for beauty tips and VIP offers.</p>
                            <form className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-white/10 border border-white/20 rounded-full py-3 px-4 focus:outline-none focus:border-gold transition-colors text-white placeholder:text-white/40"
                                />
                                <button className="absolute right-1 top-1 bg-gold text-charcoal w-10 h-10 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                                    <ArrowRight size={18} />
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
                        <p>&copy; {new Date().getFullYear()} Radiance Salon. All rights reserved.</p>
                        <div className="flex gap-4 items-center">
                            <p className="mt-2 md:mt-0">Designed with ❤️ for the Future.</p>
                            <button onClick={() => window.dispatchEvent(new CustomEvent('open-admin'))} className="text-xs hover:text-gold transition-colors">Staff Portal</button>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default ContactFooter;
