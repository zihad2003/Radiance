import React from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Mail, MapPin, Home, Gift, MessageCircle } from 'lucide-react';

const CustomerDetails = ({ bookingData, updateBookingData }) => {
    const details = bookingData.customerDetails;

    const handleChange = (field, value) => {
        updateBookingData('customerDetails', {
            ...details,
            [field]: value
        });
    };

    const handleHomeServiceToggle = (checked) => {
        handleChange('homeService', checked);
        updateBookingData('travelFee', checked ? 2000 : 0);
    };

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="text-center">
                <h3 className="text-3xl font-serif text-charcoal mb-2">Your Details</h3>
                <p className="text-gray-600">Please provide your contact information</p>
            </div>

            <div className="bg-white rounded-2xl p-6 space-y-6">
                {/* Name */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <User size={18} />
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={details.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                        required
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Phone size={18} />
                        Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        value={details.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="+880 1XXX-XXXXXX"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                        required
                    />
                    <p className="text-xs text-gray-500 mt-1">We'll send booking confirmation via SMS</p>
                </div>

                {/* Email */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Mail size={18} />
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={details.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <p className="text-xs text-gray-500 mt-1">Optional but recommended for booking receipt</p>
                </div>

                {/* Address */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <MapPin size={18} />
                        Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={details.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        placeholder="Enter your complete address"
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                        required
                    />
                </div>

                {/* Home Service */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={details.homeService}
                            onChange={(e) => handleHomeServiceToggle(e.target.checked)}
                            className="mt-1 w-5 h-5 text-primary rounded focus:ring-primary"
                        />
                        <div className="flex-1">
                            <div className="flex items-center gap-2 font-semibold text-gray-800">
                                <Home size={18} />
                                Request Home Service
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                                Our stylist will come to your location (within Dhaka)
                            </p>
                            <p className="text-sm font-semibold text-amber-700 mt-2">
                                Additional travel fee: ৳2,000
                            </p>
                        </div>
                    </label>
                </div>

                {/* Special Requests */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <MessageCircle size={18} />
                        Special Requests / Allergies
                    </label>
                    <textarea
                        value={details.specialRequests}
                        onChange={(e) => handleChange('specialRequests', e.target.value)}
                        placeholder="Any allergies, preferences, or special requirements..."
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>

                {/* Referral Code */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Gift size={18} />
                        Referral Code
                    </label>
                    <input
                        type="text"
                        value={details.referralCode}
                        onChange={(e) => handleChange('referralCode', e.target.value)}
                        placeholder="Enter referral code for discount"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>

                {/* WhatsApp Notification */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={details.whatsappNotification}
                            onChange={(e) => handleChange('whatsappNotification', e.target.checked)}
                            className="mt-1 w-5 h-5 text-green-600 rounded focus:ring-green-500"
                        />
                        <div className="flex-1">
                            <div className="flex items-center gap-2 font-semibold text-gray-800">
                                <MessageCircle size={18} className="text-green-600" />
                                Send booking confirmation via WhatsApp
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                                Receive instant booking confirmation and reminders on WhatsApp
                            </p>
                        </div>
                    </label>
                </div>
            </div>

            {/* Privacy Notice */}
            <div className="text-center text-xs text-gray-500">
                <p>Your information is secure and will only be used for booking purposes.</p>
                <p className="mt-1">By continuing, you agree to our Terms & Conditions and Privacy Policy.</p>
            </div>
        </div>
    );
};

export default CustomerDetails;
