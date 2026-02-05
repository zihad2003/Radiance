import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, MapPin, Phone, Mail, Check, Download, FileText, MessageCircle } from 'lucide-react';
import { getServiceById, calculateTotalPrice, calculateTotalDuration } from '../../data/servicesDatabase';
import { getStylistById } from '../../data/stylistsDatabase';
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContextBase';
import { logError, getErrorMessage } from '../../utils/errors';

const ReviewConfirmation = ({ bookingData, updateBookingData }) => {
    const { user } = useAuth();
    const createBooking = useMutation(api.bookings.createBooking);
    const toast = useToast();
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

        try {
            // Save to Database
            const bookingId = await createBooking({
                service: selectedServices.map(s => s.name).join(", "),
                date: bookingData.selectedDate,
                time: bookingData.selectedTime,
                customer: details,
                status: "pending",
                userId: user?._id
            });

            // Generate WhatsApp Message
            const whatsappMessage = `
*New Booking Request* 📅
-------------------
*Name:* ${details.name}
*Phone:* ${details.phone}
*Service:* ${selectedServices.map(s => s.name).join(", ")}
*Date:* ${bookingData.selectedDate} at ${bookingData.selectedTime}
*Stylist:* ${bookingData.selectedStylist === 'any' ? 'Any Available' : stylist?.name}
*Address:* ${details.address}
${details.specialRequests ? `*Special Requests:* ${details.specialRequests}` : ''}
${details.referralCode ? `*Referral Code:* ${details.referralCode}` : ''}
            `.trim();

            // Send WhatsApp (Auto-open)
            if (details.whatsappNotification) {
                window.open(`https://wa.me/8801712345678?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
            }

            setIsConfirmed(true);
            toast.success("Booking confirmed! We can't wait to see you. ✨");
        } catch (error) {
            logError(error, 'Booking Confirmation');
            toast.error(getErrorMessage(error));
        } finally {
            setIsConfirming(false);
        }
    };

    // ... logic same ...

    if (isConfirmed) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 px-4 max-w-2xl mx-auto"
            >
                <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-10 relative">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/30"
                    >
                        <Check size={48} strokeWidth={4} className="text-white" />
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.8, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 rounded-full border-2 border-primary"
                    />
                </div>

                <h3 className="text-5xl font-serif font-black text-charcoal mb-4">Masterpiece Set. ✨</h3>
                <p className="text-gray-400 font-medium mb-12 text-lg">Your appointment has been secured. Get ready to shine.</p>

                <div className="bg-charcoal text-white p-10 rounded-[3rem] shadow-3xl shadow-charcoal/30 relative overflow-hidden border border-primary/20">
                    <div className="absolute top-0 right-0 p-8 opacity-5"><Calendar size={180} /></div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">Booking Identifier</div>
                    <div className="text-5xl font-mono font-black tracking-tighter mb-6">RAD{Date.now().toString().slice(-6)}</div>

                    <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                        <div className="text-left">
                            <div className="text-[10px] uppercase font-black tracking-widest text-gray-400 mb-1">Date</div>
                            <div className="font-bold text-lg">{new Date(bookingData.selectedDate).toLocaleDateString()}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] uppercase font-black tracking-widest text-gray-400 mb-1">Time</div>
                            <div className="font-bold text-lg">{bookingData.selectedTime}</div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                    <button className="flex items-center justify-center gap-2 px-10 py-5 bg-charcoal text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl active:scale-95">
                        <Download size={18} />
                        Receipt
                    </button>
                    <button className="flex items-center justify-center gap-2 px-10 py-5 bg-white border-2 border-charcoal text-charcoal rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-gray-50 transition-all active:scale-95">
                        <Calendar size={18} />
                        Calendar
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="space-y-10 max-w-5xl mx-auto pb-20">
            <div className="text-center space-y-2">
                <h3 className="text-4xl font-serif font-black text-charcoal">Final Approval</h3>
                <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
                <p className="text-gray-400 font-medium pt-2">Verify your luxury experience details</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
                {/* Left Columns - Details */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Services */}
                    <div className="bg-white rounded-4xl p-8 border border-gray-100 shadow-xl shadow-gray-100/50">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Service Menu</h4>
                        <div className="space-y-4">
                            {selectedServices.map((service) => (
                                <div key={service.id} className="flex justify-between items-center group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-xl grayscale group-hover:grayscale-0 transition-all">
                                            {service.icon || '✨'}
                                        </div>
                                        <div>
                                            <div className="font-black text-charcoal">{service.name}</div>
                                            <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{formatDuration(service.duration)}</div>
                                        </div>
                                    </div>
                                    <div className="font-mono font-bold text-lg text-charcoal">৳{service.price.toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Appointment & Customer */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-charcoal text-white rounded-4xl p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5"><Calendar size={80} /></div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6">When</h4>
                            <div className="space-y-4 relative z-10">
                                <div className="text-2xl font-serif font-bold">
                                    {new Date(bookingData.selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </div>
                                <div className="text-4xl font-black text-primary">{bookingData.selectedTime}</div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-4xl p-8">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Guest</h4>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-xs font-bold text-gray-400">Name</div>
                                    <div className="font-black text-charcoal">{details.name}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-xs font-bold text-gray-400">Contact</div>
                                        <div className="font-black text-charcoal">{details.phone}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-400">Artisan</div>
                                        <div className="font-black text-charcoal">{bookingData.selectedStylist === 'any' ? 'Open' : stylist?.name}</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-gray-400">Destination</div>
                                    <div className="font-black text-charcoal line-clamp-1">{details.address}</div>
                                </div>
                                {(details.specialRequests || details.referralCode) && (
                                    <div className="pt-4 border-t border-gray-200 mt-4 space-y-3">
                                        {details.specialRequests && (
                                            <div>
                                                <div className="text-[8px] font-black uppercase tracking-widest text-primary mb-1">Special Requests</div>
                                                <div className="text-xs text-charcoal italic leading-relaxed">"{details.specialRequests}"</div>
                                            </div>
                                        )}
                                        {details.referralCode && (
                                            <div>
                                                <div className="text-[8px] font-black uppercase tracking-widest text-primary mb-1">Referral Applied</div>
                                                <div className="text-xs font-black text-charcoal">{details.referralCode}</div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Payment */}
                <div className="space-y-8">
                    <div className="bg-white rounded-4xl p-8 border border-gray-100 shadow-xl shadow-gray-100/50 sticky top-8">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8 text-center">Investment Summary</h4>

                        <div className="space-y-6">
                            <div className="flex justify-between text-sm font-bold text-gray-500">
                                <span>Subtotal</span>
                                <span>৳{subtotal.toLocaleString()}</span>
                            </div>
                            {travelFee > 0 && (
                                <div className="flex justify-between text-sm font-bold text-amber-600">
                                    <span>Home Service</span>
                                    <span>+৳{travelFee.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="h-px bg-gray-100" />
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-black uppercase tracking-widest text-charcoal">Total Amount</span>
                                <span className="text-4xl font-black text-primary">৳{total.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="mt-10 space-y-4">
                            <label className="flex gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    className="mt-1 w-5 h-5 accent-charcoal"
                                />
                                <span className="text-[10px] leading-relaxed text-gray-400 font-medium">
                                    I agree to the <span className="text-charcoal font-bold">Radiance Terms</span> & Cancellation Policy.
                                </span>
                            </label>

                            <button
                                onClick={handleConfirmBooking}
                                disabled={!agreedToTerms || isConfirming}
                                className="w-full py-5 bg-charcoal text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-black transition-all disabled:opacity-30 flex items-center justify-center gap-3 shadow-2xl shadow-charcoal/20"
                            >
                                {isConfirming ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>Secure Booking</>
                                )}
                            </button>

                            {details.whatsappNotification && (
                                <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-green-600 uppercase tracking-widest pt-2">
                                    <MessageCircle size={14} />
                                    WhatsApp Enabled
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewConfirmation;
