import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, AlertCircle } from 'lucide-react';

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
        <div className="space-y-8">
            <div className="text-center">
                <h3 className="text-3xl font-serif text-charcoal mb-2">Select Date & Time</h3>
                <p className="text-gray-600">Choose your preferred appointment slot</p>
            </div>

            {/* Salon Hours Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                    <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                    <div className="text-sm text-blue-900">
                        <div className="font-semibold mb-1">Salon Working Hours:</div>
                        <div>Monday - Thursday & Saturday: 10:00 AM - 8:00 PM</div>
                        <div>Friday: 10:00 AM - 12:00 PM, 4:00 PM - 8:00 PM (Prayer break)</div>
                        <div className="text-red-600 font-semibold mt-1">Closed on Sundays</div>
                    </div>
                </div>
            </div>

            {/* Calendar */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Calendar className="text-primary" size={24} />
                    <h4 className="text-xl font-bold text-charcoal">Select Date</h4>
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                            {day}
                        </div>
                    ))}

                    {dates.map((date, index) => {
                        const isDisabled = isDateDisabled(date);
                        const isSelected = selectedDate === date.toISOString().split('T')[0];
                        const isPast = date < new Date().setHours(0, 0, 0, 0);
                        const availability = getDateAvailability();

                        return (
                            <motion.button
                                key={index}
                                whileHover={!isDisabled && !isPast ? { scale: 1.05 } : {}}
                                whileTap={!isDisabled && !isPast ? { scale: 0.95 } : {}}
                                onClick={() => !isDisabled && !isPast && handleDateSelect(date)}
                                disabled={isDisabled || isPast}
                                className={`aspect-square rounded-xl p-2 text-sm font-semibold transition-all ${isSelected
                                        ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                                        : isDisabled || isPast
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : availability === 'available'
                                                ? 'bg-green-50 text-green-700 border-2 border-green-200 hover:border-green-400'
                                                : availability === 'limited'
                                                    ? 'bg-yellow-50 text-yellow-700 border-2 border-yellow-200 hover:border-yellow-400'
                                                    : 'bg-red-50 text-red-700 border-2 border-red-200 cursor-not-allowed'
                                    }`}
                            >
                                <div>{date.getDate()}</div>
                                {index < 7 && (
                                    <div className="text-xs opacity-70">
                                        {date.toLocaleDateString('en-US', { month: 'short' })}
                                    </div>
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-4 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-200 rounded"></div>
                        <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-200 rounded"></div>
                        <span>Limited</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-200 rounded"></div>
                        <span>Fully Booked</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-200 rounded"></div>
                        <span>Closed</span>
                    </div>
                </div>
            </div>

            {/* Time Slots */}
            {selectedDate && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Clock className="text-primary" size={24} />
                        <h4 className="text-xl font-bold text-charcoal">Select Time</h4>
                    </div>

                    <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                        {timeSlots.map((time) => {
                            const availability = getSlotAvailability();
                            const isSelected = selectedTime === time;
                            const isBooked = availability.status === 'booked';

                            return (
                                <motion.button
                                    key={time}
                                    whileHover={!isBooked ? { scale: 1.05 } : {}}
                                    whileTap={!isBooked ? { scale: 0.95 } : {}}
                                    onClick={() => !isBooked && handleTimeSelect(time)}
                                    disabled={isBooked}
                                    className={`p-3 rounded-xl text-sm font-semibold transition-all ${isSelected
                                            ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                                            : isBooked
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : availability.status === 'limited'
                                                    ? 'bg-yellow-50 text-yellow-700 border-2 border-yellow-300 hover:border-yellow-500'
                                                    : 'bg-green-50 text-green-700 border-2 border-green-300 hover:border-green-500'
                                        }`}
                                >
                                    <div>{time}</div>
                                    {!isSelected && (
                                        <div className="text-xs mt-1 opacity-80">{availability.label}</div>
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>
            )}

            {/* Selection Summary */}
            {selectedDate && selectedTime && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6"
                >
                    <div className="text-center">
                        <div className="text-sm text-gray-600 mb-2">Your appointment is scheduled for:</div>
                        <div className="text-2xl font-bold text-charcoal">
                            {new Date(selectedDate).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                        <div className="text-xl font-semibold text-primary mt-2">
                            at {selectedTime}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default DateTimeSelection;
