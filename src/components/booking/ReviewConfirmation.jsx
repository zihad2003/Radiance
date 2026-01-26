import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, MapPin, Phone, Mail, Check, Download, FileText } from 'lucide-react';
import { getServiceById, calculateTotalPrice, calculateTotalDuration } from '../../data/servicesDatabase';
import { getStylistById } from '../../data/stylistsDatabase';

const ReviewConfirmation = ({ bookingData, updateBookingData }) => {
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const selectedServices = bookingData.selectedServices.map(id => getServiceById(id)).filter(Boolean);
    const stylist = bookingData.selectedStylist === 'any' ? null : getStylistById(bookingData.selectedStylist);
    const details = bookingData.customerDetails;

    const subtotal = calculateTotalPrice(bookingData.selectedServices);
    const discount = subtotal * bookingData.discount;
    const travelFee = bookingData.travelFee || 0;
    const total = subtotal - discount + travelFee;
    const duration = calculateTotalDuration(bookingData.selectedServices);

    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours === 0) return `${mins} mins`;
        if (mins === 0) return `${hours} hr${hours > 1 ? 's' : ''}`;
        return `${hours} hr${hours > 1 ? 's' : ''} ${mins} mins`;
    };

    const handleConfirmBooking = async () => {
        setIsConfirming(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Generate booking ID
        const bookingId = `RAD${Date.now()}`;

        // In real app, send WhatsApp message here
        if (details.whatsappNotification) {
            console.log('Sending WhatsApp confirmation to:', details.phone);
        }

        setIsConfirmed(true);
        setIsConfirming(false);
    };

    // ... logic same ...

    if (isConfirmed) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 px-4"
            >
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    >
                        <Check size={48} className="text-green-600" />
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="absolute inset-0 rounded-full border-2 border-green-400"
                    />
                </div>
                <h3 className="text-4xl font-serif text-charcoal mb-4">You're All Set! ✨</h3>
                <p className="text-gray-600 mb-8 text-lg">Your appointment has been successfully booked.</p>

                <div className="bg-gradient-to-r from-primary to-accent text-white p-8 rounded-3xl max-w-sm mx-auto mb-10 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><Calendar size={120} /></div>
                    <div className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Booking Reference</div>
                    <div className="text-4xl font-mono font-bold tracking-wider mb-2">RAD{Date.now().toString().slice(-6)}</div>
                    <div className="h-px bg-white/20 my-4" />
                    <div className="flex justify-between items-center text-sm">
                        <span>{new Date(bookingData.selectedDate).toLocaleDateString()}</span>
                        <span>{bookingData.selectedTime}</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="flex items-center justify-center gap-2 px-8 py-4 bg-charcoal text-white rounded-xl font-bold hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl active:scale-95">
                        <Download size={20} />
                        Download Receipt
                    </button>
                    <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-charcoal text-charcoal rounded-xl font-bold hover:bg-gray-50 transition-all active:scale-95">
                        <Calendar size={20} />
                        Add to Calendar
                    </button>
                </div>

                <div className="mt-12 p-4 bg-green-50 rounded-xl max-w-lg mx-auto border border-green-100">
                    <p className="text-sm text-green-800 flex items-center justify-center gap-2">
                        <MessageCircle size={16} />
                        {details.whatsappNotification ? 'Authentication & Details sent via WhatsApp.' : 'Booking details sent to your email.'}
                    </p>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-20">
            {/* Same review content... */}
            <div className="text-center">
                <h3 className="text-3xl font-serif text-charcoal mb-2">Review Your Booking</h3>
                <p className="text-gray-600">Please review all details before confirming</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column - Services & Details */}
                <div className="space-y-6">
                    {/* Selected Services */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="font-bold text-lg text-charcoal mb-4">Selected Services</h4>
                        <div className="space-y-3">
                            {selectedServices.map((service) => (
                                <div key={service.id} className="flex justify-between items-start pb-3 border-b border-gray-100 last:border-0">
                                    <div className="flex-1">
                                        <div className="font-semibold text-charcoal">{service.name}</div>
                                        <div className="text-sm text-gray-500">{formatDuration(service.duration)}</div>
                                    </div>
                                    <div className="font-bold text-charcoal">৳{service.price.toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Date & Time */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="font-bold text-lg text-charcoal mb-4">Appointment Details</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Calendar className="text-primary" size={20} />
                                <div>
                                    <div className="text-sm text-gray-600">Date</div>
                                    <div className="font-semibold">
                                        {new Date(bookingData.selectedDate).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="text-primary" size={20} />
                                <div>
                                    <div className="text-sm text-gray-600">Time</div>
                                    <div className="font-semibold">{bookingData.selectedTime}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="text-primary" size={20} />
                                <div>
                                    <div className="text-sm text-gray-600">Duration</div>
                                    <div className="font-semibold">{formatDuration(duration)}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stylist */}
                    {stylist && (
                        <div className="bg-white rounded-2xl p-6 border border-gray-200">
                            <h4 className="font-bold text-lg text-charcoal mb-4">Your Stylist</h4>
                            <div className="flex items-center gap-4">
                                <img
                                    src={stylist.image}
                                    alt={stylist.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                    <div className="font-semibold text-charcoal">{stylist.name}</div>
                                    <div className="text-sm text-gray-600">{stylist.title}</div>
                                    <div className="text-sm text-primary">{stylist.experience} years exp.</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column - Customer Info & Payment */}
                <div className="space-y-6">
                    {/* Customer Details */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="font-bold text-lg text-charcoal mb-4">Customer Information</h4>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <User className="text-gray-400 flex-shrink-0 mt-1" size={18} />
                                <div>
                                    <div className="text-sm text-gray-600">Name</div>
                                    <div className="font-semibold">{details.name}</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="text-gray-400 flex-shrink-0 mt-1" size={18} />
                                <div>
                                    <div className="text-sm text-gray-600">Phone</div>
                                    <div className="font-semibold">{details.phone}</div>
                                </div>
                            </div>
                            {details.email && (
                                <div className="flex items-start gap-3">
                                    <Mail className="text-gray-400 flex-shrink-0 mt-1" size={18} />
                                    <div>
                                        <div className="text-sm text-gray-600">Email</div>
                                        <div className="font-semibold">{details.email}</div>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-start gap-3">
                                <MapPin className="text-gray-400 flex-shrink-0 mt-1" size={18} />
                                <div>
                                    <div className="text-sm text-gray-600">Address</div>
                                    <div className="font-semibold">{details.address}</div>
                                </div>
                            </div>
                            {details.homeService && (
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
                                    <div className="text-sm font-semibold text-amber-800">Home Service Requested</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="font-bold text-lg text-charcoal mb-4">Payment Summary</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between text-gray-700">
                                <span>Subtotal ({selectedServices.length} services)</span>
                                <span>৳{subtotal.toLocaleString()}</span>
                            </div>
                            {discount > 0 && (
                                <div className="flex justify-between text-green-600">
                                    <span>Discount (5%)</span>
                                    <span>-৳{discount.toLocaleString()}</span>
                                </div>
                            )}
                            {travelFee > 0 && (
                                <div className="flex justify-between text-gray-700">
                                    <span>Travel Fee</span>
                                    <span>৳{travelFee.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="border-t-2 border-gray-300 pt-3 flex justify-between items-center">
                                <span className="text-xl font-bold text-charcoal">Total</span>
                                <span className="text-3xl font-bold text-primary">৳{total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                className="mt-1 w-5 h-5 text-primary rounded focus:ring-primary"
                            />
                            <div className="text-sm text-gray-700">
                                I agree to the <a href="#" className="text-primary font-semibold hover:underline">Terms & Conditions</a> and <a href="#" className="text-primary font-semibold hover:underline">Cancellation Policy</a>
                            </div>
                        </label>
                    </div>

                    {/* Confirm Button */}
                    <button
                        onClick={handleConfirmBooking}
                        disabled={!agreedToTerms || isConfirming}
                        className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isConfirming ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Confirming...
                            </>
                        ) : (
                            <>
                                <Check size={24} />
                                Confirm & Book Appointment
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewConfirmation;
