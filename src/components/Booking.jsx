import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const timeSlots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

const Booking = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [step, setStep] = useState(1);
    const [isBooked, setIsBooked] = useState(false);

    const handleDateSelect = (day) => {
        setSelectedDate(day);
        setSelectedTime(null);
    };

    const handleBook = (e) => {
        e.preventDefault();
        setIsBooked(true);
        confetti({
            particleCount: 150,
            spread: 70,
            colors: ['#B76E79', '#D4AF37', '#FF6B9D'],
            origin: { y: 0.6 }
        });
    };

    return (
        <section className="py-24 bg-pearl relative min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    {/* Left: Info */}
                    <div className="lg:w-1/3">
                        <h2 className="text-sm font-sans uppercase tracking-[0.3em] text-primary mb-4">Appointments</h2>
                        <h3 className="text-4xl md:text-5xl font-serif text-charcoal mb-6">Secure Your Moment</h3>
                        <p className="text-charcoal/70 mb-8 leading-relaxed">
                            Our schedule fills up quickly. Select a date and time that works best for your transformation.
                            A deposit is required to hold your reservation.
                        </p>

                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-primary/10">
                            <h4 className="font-bold text-lg mb-4 flex items-center"><Clock className="mr-2 text-primary" size={20} /> Opening Hours</h4>
                            <ul className="space-y-2 text-sm text-charcoal/80">
                                <li className="flex justify-between"><span>Mon - Fri</span> <span>9:00 AM - 8:00 PM</span></li>
                                <li className="flex justify-between"><span>Saturday</span> <span>10:00 AM - 6:00 PM</span></li>
                                <li className="flex justify-between"><span>Sunday</span> <span>Closed</span></li>
                            </ul>
                        </div>
                    </div>

                    {/* Right: Interactive Widget */}
                    <div className="lg:w-2/3 w-full">
                        <motion.div
                            className="bg-white rounded-[2rem] shadow-2xl overflow-hidden relative min-h-[600px] flex flex-col"
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            {!isBooked ? (
                                <div className="p-8 md:p-12 flex-1 flex flex-col">
                                    {/* Date Selection */}
                                    <div className="mb-10">
                                        <h4 className="text-xl font-serif mb-6 flex items-center">
                                            <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 font-sans">1</span>
                                            Select Date <span className="text-sm font-sans text-charcoal/50 ml-auto italic">October 2024</span>
                                        </h4>
                                        <div className="grid grid-cols-7 gap-2 md:gap-4">
                                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                                                <div key={d} className="text-center text-xs font-bold text-charcoal/40 mb-2">{d}</div>
                                            ))}
                                            {days.map((day) => (
                                                <button
                                                    key={day}
                                                    onClick={() => handleDateSelect(day)}
                                                    className={`
                                                        aspect-square rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 relative
                                                        ${selectedDate === day
                                                            ? 'bg-primary text-white shadow-lg scale-110 z-10'
                                                            : 'hover:bg-primary/10 text-charcoal hover:scale-110'}
                                                    `}
                                                >
                                                    {day}
                                                    {selectedDate === day && (
                                                        <motion.div
                                                            layoutId="glow"
                                                            className="absolute inset-0 rounded-full bg-primary/30 blur-md -z-10"
                                                        />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Time and Form */}
                                    <AnimatePresence>
                                        {selectedDate && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                className="overflow-hidden"
                                            >
                                                <h4 className="text-xl font-serif mb-6 flex items-center mt-4">
                                                    <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 font-sans">2</span>
                                                    Select Time
                                                </h4>
                                                <div className="grid grid-cols-4 gap-4 mb-10">
                                                    {timeSlots.map((time) => (
                                                        <button
                                                            key={time}
                                                            onClick={() => setSelectedTime(time)}
                                                            className={`
                                                                py-3 rounded-xl text-sm font-semibold border transition-all duration-200
                                                                ${selectedTime === time
                                                                    ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20'
                                                                    : 'border-charcoal/10 hover:border-primary/50'}
                                                            `}
                                                        >
                                                            {time}
                                                        </button>
                                                    ))}
                                                </div>

                                                {selectedTime && (
                                                    <motion.form
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        onSubmit={handleBook}
                                                    >
                                                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                                                            <div>
                                                                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/60 mb-2">Name</label>
                                                                <input type="text" className="w-full bg-pearl p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Jane Doe" required />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/60 mb-2">Email</label>
                                                                <input type="email" className="w-full bg-pearl p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="jane@example.com" required />
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="submit"
                                                            className="w-full bg-charcoal text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-primary transition-colors duration-300 shadow-xl interactive"
                                                        >
                                                            Confirm Booking
                                                        </button>
                                                    </motion.form>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white p-12 text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
                                    >
                                        <CheckCircle className="w-12 h-12 text-green-600" />
                                    </motion.div>
                                    <h3 className="text-3xl font-serif font-bold text-charcoal mb-4">You're All Set!</h3>
                                    <p className="text-charcoal/60 mb-8 max-w-md">
                                        Your appointment for <strong className="text-primary">{selectedDate} October at {selectedTime}</strong> has been confirmed. A confirmation email is on its way.
                                    </p>
                                    <button
                                        onClick={() => { setIsBooked(false); setSelectedDate(null); setSelectedTime(null); }}
                                        className="text-primary hover:text-charcoal font-semibold underline decoration-2 underline-offset-4 transition-all"
                                    >
                                        Book Another
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Booking;
