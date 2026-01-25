import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services, formattedPrice } from '../../data/services';
import { stylists } from '../../data/stylists';
import { Check, ChevronRight, ChevronLeft, Calendar as CalendarIcon, Clock, User, Scissors, Star, ShieldCheck, MapPin } from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Steps
const steps = [
    { id: 1, title: 'Service', icon: Scissors },
    { id: 2, title: 'Date & Time', icon: CalendarIcon },
    { id: 3, title: 'Stylist', icon: User },
    { id: 4, title: 'Details', icon: MapPin },
    { id: 5, title: 'Confirm', icon: Check }
];

const BookingWizard = ({ initialService }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selection, setSelection] = useState({
        services: initialService ? services.filter(s => s.name === initialService) : [],
        date: new Date(),
        time: null,
        stylist: null,
        details: { name: '', phone: '', email: '', address: '', notes: '', homeService: false }
    });

    const totalCost = selection.services.reduce((acc, s) => acc + s.price, 0) + (selection.details.homeService ? 2000 : 0);
    const totalDuration = selection.services.reduce((acc, s) => acc + s.duration, 0); // minutes

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const handleServiceToggle = (service) => {
        setSelection(prev => {
            const exists = prev.services.find(s => s.id === service.id);
            if (exists) return { ...prev, services: prev.services.filter(s => s.id !== service.id) };
            return { ...prev, services: [...prev.services, service] };
        });
    };

    const handleConfirm = () => {
        const text = `*New Booking Request*
-------------------
*Services:* ${selection.services.map(s => s.name).join(', ')}
*Date:* ${selection.date.toDateString()}
*Time:* ${selection.time}
*Stylist:* ${selection.stylist?.name || 'Any'}
*Total:* ${formattedPrice(totalCost)}

*Client Details:*
Name: ${selection.details.name}
Phone: ${selection.details.phone}
Address: ${selection.details.address || 'N/A'}
Notes: ${selection.details.notes}
        `;
        window.open(`https://wa.me/8801700000000?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden min-h-[600px] flex flex-col border border-primary/10">
            {/* Header / Progress */}
            <div className="bg-neutral-50 px-8 py-6 border-b border-gray-100">
                <div className="flex justify-between items-center relative">
                    {/* Progress Bar Background */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-0 rounded-full" />

                    {/* Progress Bar Fill */}
                    <motion.div
                        className="absolute top-1/2 left-0 h-1 bg-primary -z-0 rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: `${(currentStep - 1) / (steps.length - 1) * 100}%` }}
                    />

                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        const isActive = i + 1 === currentStep;
                        const isCompleted = i + 1 < currentStep;

                        return (
                            <div key={step.id} className="relative z-10 flex flex-col items-center">
                                <motion.div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${isActive || isCompleted ? 'bg-primary border-primary text-white' : 'bg-white border-gray-300 text-gray-400'}`}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <Icon size={18} />
                                </motion.div>
                                <span className={`text-[10px] mt-2 uppercase tracking-wider font-semibold ${isActive ? 'text-primary' : 'text-gray-400'}`}>
                                    {step.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 overflow-y-auto max-h-[600px] scrollbar-hide">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {currentStep === 1 && (
                            <StepServices
                                services={services}
                                selected={selection.services}
                                onToggle={handleServiceToggle}
                            />
                        )}
                        {currentStep === 2 && (
                            <StepDateTime
                                date={selection.date}
                                time={selection.time}
                                onChange={(d) => setSelection(p => ({ ...p, date: d }))}
                                onTimeChange={(t) => setSelection(p => ({ ...p, time: t }))}
                            />
                        )}
                        {currentStep === 3 && (
                            <StepStylist
                                currentStylist={selection.stylist}
                                onSelect={(s) => setSelection(p => ({ ...p, stylist: s }))}
                            />
                        )}
                        {currentStep === 4 && (
                            <StepDetails
                                details={selection.details}
                                onChange={(d) => setSelection(p => ({ ...p, details: d }))}
                            />
                        )}
                        {currentStep === 5 && (
                            <StepReview
                                selection={selection}
                                totalCost={totalCost}
                                onConfirm={handleConfirm}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Footer / Controls */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <div className="text-sm">
                    {selection.services.length > 0 && (
                        <span className="font-bold text-charcoal">
                            Total: {formattedPrice(totalCost)} <span className="text-gray-400 font-normal">({totalDuration / 60} hrs)</span>
                        </span>
                    )}
                </div>
                <div className="flex gap-4">
                    {currentStep > 1 && (
                        <button
                            onClick={prevStep}
                            className="px-6 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors font-medium"
                        >
                            Back
                        </button>
                    )}
                    {currentStep < 5 ? (
                        <button
                            onClick={nextStep}
                            disabled={currentStep === 1 && selection.services.length === 0 || currentStep === 2 && !selection.time}
                            className="px-8 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        >
                            Next <ChevronRight size={16} className="ml-2" />
                        </button>
                    ) : (
                        <button
                            onClick={handleConfirm}
                            className="px-8 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors shadow-lg flex items-center animate-pulse"
                        >
                            Confirm Booking <Check size={16} className="ml-2" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Sub-Components (Internal for now, could act as separate files) ---

const StepServices = ({ services, selected, onToggle }) => {
    const categories = [...new Set(services.map(s => s.category))];
    const [filter, setFilter] = useState('All');

    const filteredServices = filter === 'All' ? services : services.filter(s => s.category === filter);

    return (
        <div>
            <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
                <button
                    onClick={() => setFilter('All')}
                    className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap border transition-all ${filter === 'All' ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200 text-gray-600 hover:border-primary'}`}
                >
                    All Services
                </button>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap border transition-all ${filter === cat ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200 text-gray-600 hover:border-primary'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredServices.map(service => {
                    const isSelected = selected.find(s => s.id === service.id);
                    return (
                        <div
                            key={service.id}
                            onClick={() => onToggle(service)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex gap-4 items-start relative overflow-hidden group hover:shadow-md ${isSelected ? 'border-primary bg-primary/5' : 'border-transparent bg-white shadow-sm hover:border-primary/30'}`}
                        >
                            <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-gray-800">{service.name}</h4>
                                    {isSelected && <div className="bg-primary text-white p-1 rounded-full"><Check size={12} /></div>}
                                </div>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{service.description}</p>
                                <div className="mt-3 flex justify-between items-center">
                                    <span className="font-bold text-primary">{formattedPrice(service.price)}</span>
                                    <span className="text-xs text-gray-400 flex items-center"><Clock size={10} className="mr-1" /> {service.duration}m</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const StepDateTime = ({ date, time, onChange, onTimeChange }) => {
    // Generate time slots 10 AM - 8 PM
    const slots = [];
    for (let i = 10; i <= 20; i++) {
        slots.push(`${i > 12 ? i - 12 : i}:00 ${i >= 12 ? 'PM' : 'AM'}`);
        if (i !== 20) slots.push(`${i > 12 ? i - 12 : i}:30 ${i >= 12 ? 'PM' : 'AM'}`);
    }

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
                <h3 className="font-serif text-xl mb-4 text-charcoal">Select Date</h3>
                <div className="calendar-wrapper p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <Calendar
                        onChange={onChange}
                        value={date}
                        tileDisabled={({ date }) => date.getDay() === 0} // Sunday closed
                        minDate={new Date()}
                        className="w-full border-none font-sans"
                    />
                </div>
                <div className="mt-4 flex gap-4 text-xs text-gray-500">
                    <div className="flex items-center"><div className="w-3 h-3 bg-red-100 rounded-full mr-2" /> Closed</div>
                    <div className="flex items-center"><div className="w-3 h-3 bg-yellow-100 rounded-full mr-2" /> Limited</div>
                    <div className="flex items-center"><div className="w-3 h-3 bg-green-100 rounded-full mr-2" /> Available</div>
                </div>
            </div>
            <div className="md:w-1/2">
                <h3 className="font-serif text-xl mb-4 text-charcoal">Select Time</h3>
                <div className="grid grid-cols-3 gap-3">
                    {slots.map(slot => (
                        <button
                            key={slot}
                            onClick={() => onTimeChange(slot)}
                            className={`py-2 px-1 rounded-lg text-sm font-medium transition-all ${time === slot ? 'bg-primary text-white shadow-md scale-105' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'}`}
                        >
                            {slot}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const StepStylist = ({ currentStylist, onSelect }) => {
    return (
        <div>
            <div
                onClick={() => onSelect(null)}
                className={`p-4 rounded-xl border-2 mb-6 cursor-pointer flex items-center justify-between ${!currentStylist ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-primary/50'}`}
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        <User size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold">Any Available Stylist</h4>
                        <p className="text-sm text-green-600">Get 5% Discount</p>
                    </div>
                </div>
                {!currentStylist && <Check className="text-primary" />}
            </div>

            <h3 className="font-serif text-xl mb-4 text-charcoal">Choose a Specialist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stylists.map(stylist => (
                    <div
                        key={stylist.id}
                        onClick={() => stylist.available && onSelect(stylist)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex gap-4 relative ${currentStylist?.id === stylist.id ? 'border-primary bg-primary/5' : 'border-gray-100 bg-white hover:border-primary/30'} ${!stylist.available ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                    >
                        <img src={stylist.image} alt={stylist.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
                        <div>
                            <div className="flex items-center gap-2">
                                <h4 className="font-bold">{stylist.name}</h4>
                                <div className="flex items-center text-yellow-500 text-xs">
                                    <Star size={10} fill="currentColor" /> {stylist.rating}
                                </div>
                            </div>
                            <p className="text-xs text-primary font-medium uppercase tracking-wide mb-1">{stylist.title}</p>
                            <p className="text-xs text-gray-500">Exp: {stylist.experience}</p>

                            {!stylist.available && <span className="absolute top-4 right-4 text-xs font-bold text-red-500">Booked</span>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const StepDetails = ({ details, onChange }) => {
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        onChange({ ...details, [name]: type === 'checkbox' ? checked : value });
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={details.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-gray-50"
                        placeholder="e.g. Nusrat Jahan"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={details.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-gray-50"
                        placeholder="+880 1XXX XXXXXX"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
                <input
                    type="email"
                    name="email"
                    value={details.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-gray-50"
                    placeholder="you@example.com"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests / Allergies</label>
                <textarea
                    name="notes"
                    value={details.notes}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-gray-50"
                    placeholder="Any specific instructions or preferences..."
                ></textarea>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                <div>
                    <h5 className="font-bold text-gray-800">Home Service Required?</h5>
                    <p className="text-xs text-gray-500">Professional stylist at your doorstep (+৳2,000)</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="homeService" checked={details.homeService} onChange={handleChange} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
            </div>

            {details.homeService && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                    <input
                        type="text"
                        name="address"
                        value={details.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-gray-50"
                        placeholder="House, Road, Area, Dhaka"
                    />
                </motion.div>
            )}
        </div>
    );
};

const StepReview = ({ selection, totalCost, onConfirm }) => {
    return (
        <div className="max-w-xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-6">
                <h3 className="font-serif text-xl border-b border-gray-200 pb-4 mb-4 text-center">Booking Summary</h3>

                <div className="space-y-4">
                    <div className="flex justify-between items-start">
                        <span className="text-gray-500">Service(s)</span>
                        <div className="text-right">
                            {selection.services.map(s => (
                                <div key={s.id} className="font-medium">{s.name}</div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Date & Time</span>
                        <span className="font-medium">{selection.date.toDateString()} at {selection.time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Stylist</span>
                        <div className="flex items-center">
                            {selection.stylist ? (
                                <>
                                    <img src={selection.stylist.image} className="w-6 h-6 rounded-full mr-2" />
                                    <span className="font-medium">{selection.stylist.name}</span>
                                </>
                            ) : (
                                <span className="font-medium italic">Any Available (5% Off applied)</span>
                            )}
                        </div>
                    </div>
                    {selection.details.homeService && (
                        <div className="flex justify-between items-center text-primary">
                            <span className="font-medium">Home Service Fee</span>
                            <span className="font-bold">৳2,000</span>
                        </div>
                    )}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">Total Estimate</span>
                    <span className="text-3xl font-serif font-bold text-primary">{formattedPrice(totalCost)}</span>
                </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100 text-sm text-green-800">
                <ShieldCheck className="flex-shrink-0 mt-0.5" size={18} />
                <p>
                    By confirming, you agree to our booking policy. An automated WhatsApp message will be generated. Please send it to confirm your reservation.
                </p>
            </div>
        </div>
    );
};

export default BookingWizard;
