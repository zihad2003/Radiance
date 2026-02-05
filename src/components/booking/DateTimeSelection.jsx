import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';

const DateTimeSelection = ({ bookingData, updateBookingData }) => {
    const [selectedDate, setSelectedDate] = useState(bookingData.selectedDate);
    const [selectedTime, setSelectedTime] = useState(bookingData.selectedTime);

    // Generate next 60 days
    const generateDates = () => {
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 60; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    // Generate time slots
    const generateTimeSlots = () => {
        const slots = [];
        const isFriday = selectedDate && new Date(selectedDate).getDay() === 5;

        if (isFriday) {
            // Friday special hours
            for (let hour = 10; hour < 12; hour++) {
                for (let min = 0; min < 60; min += 30) {
                    slots.push(`${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`);
                }
            }
            for (let hour = 16; hour < 20; hour++) {
                for (let min = 0; min < 60; min += 30) {
                    slots.push(`${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`);
                }
            }
        } else {
            // Regular hours: 10 AM - 8 PM
            for (let hour = 10; hour < 20; hour++) {
                for (let min = 0; min < 60; min += 30) {
                    slots.push(`${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`);
                }
            }
        }
        return slots;
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date.toISOString().split('T')[0]);
        updateBookingData('selectedDate', date.toISOString().split('T')[0]);
        setSelectedTime(null);
        updateBookingData('selectedTime', null);
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
        updateBookingData('selectedTime', time);
    };

    const isDateDisabled = (date) => {
        const day = date.getDay();
        return day === 0; // Disable Sundays
    };

    const getDateAvailability = () => {
        // Simulate availability (in real app, fetch from backend)
        const random = Math.random();
        if (random > 0.7) return 'available';
        if (random > 0.4) return 'limited';
        return 'booked';
    };

    const getSlotAvailability = () => {
        const random = Math.random();
        if (random > 0.6) return { status: 'available', label: 'Available' };
        if (random > 0.3) return { status: 'limited', label: '2 slots left' };
        return { status: 'booked', label: 'Fully Booked' };
    };

    const dates = generateDates();
    const timeSlots = selectedDate ? generateTimeSlots() : [];

    return (
        <div className="space-y-12 max-w-5xl mx-auto py-4">
            <div className="text-center space-y-2">
                <h3 className="text-4xl font-serif font-black text-charcoal">Reserve Your Moment</h3>
                <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
                <p className="text-gray-400 font-medium pt-2">Select a date and time that fits your lifestyle</p>
            </div>

            {/* Salon Hours Recap */}
            <div className="bg-charcoal text-white rounded-[2rem] p-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
                <div className="relative z-10 grid md:grid-cols-3 gap-8">
                    <div className="space-y-1">
                        <div className="text-[10px] uppercase font-black tracking-widest text-primary">Luxury Hours</div>
                        <div className="font-bold">Mon - Thu: 10AM - 8PM</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-[10px] uppercase font-black tracking-widest text-primary">Special Service</div>
                        <div className="font-bold">Fri: 10AM-12PM, 4PM-8PM</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-[10px] uppercase font-black tracking-widest text-red-400">Rest Day</div>
                        <div className="font-bold">Sun: Closed for Sanctuary</div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
                {/* Calendar Side */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-primary shadow-sm">
                            <Calendar size={24} />
                        </div>
                        <h4 className="text-2xl font-serif font-black text-charcoal text-left">Calendar</h4>
                    </div>

                    <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-xl shadow-gray-100/50">
                        <div className="grid grid-cols-7 gap-1 mb-4">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                                <div key={day} className="text-center text-[10px] font-black text-gray-300 py-2">
                                    {day}
                                </div>
                            ))}

                            {dates.slice(0, 35).map((date, index) => {
                                const isDisabled = isDateDisabled(date);
                                const isSelected = selectedDate === date.toISOString().split('T')[0];
                                const isPast = date < new Date().setHours(0, 0, 0, 0);

                                return (
                                    <button
                                        key={index}
                                        onClick={() => !isDisabled && !isPast && handleDateSelect(date)}
                                        disabled={isDisabled || isPast}
                                        className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-bold transition-all relative ${isSelected
                                            ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-110 z-10'
                                            : isDisabled || isPast
                                                ? 'opacity-10 cursor-not-allowed grayscale'
                                                : 'text-charcoal hover:bg-gray-50'
                                            }`}
                                    >
                                        {date.getDate()}
                                        {isSelected && <motion.div layoutId="cal-ring" className="absolute inset-0 rounded-xl border-2 border-white/30" />}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex justify-center gap-8 pt-4 border-t border-gray-50">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Selected</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-gray-100" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Available</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Time Center */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-primary shadow-sm">
                            <Clock size={24} />
                        </div>
                        <h4 className="text-2xl font-serif font-black text-charcoal text-left">Time Slots</h4>
                    </div>

                    {!selectedDate ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                                <Calendar size={24} className="text-gray-300" />
                            </div>
                            <p className="text-gray-400 font-bold text-sm tracking-wide uppercase">Select a date first</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                            {timeSlots.map((time) => {
                                const availability = getSlotAvailability();
                                const isSelected = selectedTime === time;
                                const isBooked = availability.status === 'booked';

                                return (
                                    <button
                                        key={time}
                                        onClick={() => !isBooked && handleTimeSelect(time)}
                                        disabled={isBooked}
                                        className={`py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${isSelected
                                            ? 'bg-charcoal text-white shadow-xl shadow-charcoal/20 scale-105'
                                            : isBooked
                                                ? 'bg-gray-100 text-gray-200 cursor-not-allowed opacity-30 grayscale'
                                                : 'bg-white border-2 border-transparent text-gray-400 hover:border-primary/30 hover:text-charcoal hover:bg-gray-50'
                                            }`}
                                    >
                                        {time}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Selection Status */}
            <AnimatePresence>
                {selectedDate && selectedTime && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        className="bg-charcoal text-white p-8 rounded-[2.5rem] shadow-3xl shadow-charcoal/20 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
                        <div className="flex items-center justify-between relative z-10">
                            <div>
                                <div className="text-[10px] uppercase font-black tracking-widest text-primary mb-2">Final Schedule</div>
                                <div className="text-3xl font-serif font-bold italic">
                                    {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} at {selectedTime}
                                </div>
                            </div>
                            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                                <Check size={32} className="text-primary" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DateTimeSelection;
