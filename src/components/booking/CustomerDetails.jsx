import React, { useEffect } from 'react';
import { User, Phone, Mail, MapPin, Home, Gift, MessageCircle, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Validation Schema
const bookingSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().regex(/^(\+880|880|0)?1[3-9]\d{8}$/, 'Invalid Bangladesh phone number (e.g. 01712345678)'),
    email: z.string().email('Invalid email').or(z.literal('')).optional(),
    address: z.string().min(5, 'Address must be detailed'),
    homeService: z.boolean(),
    specialRequests: z.string().optional(),
    referralCode: z.string().optional(),
    whatsappNotification: z.boolean()
});

const CustomerDetails = ({ bookingData, updateBookingData }) => {
    const defaultValues = bookingData.customerDetails;

    // Setup form
    const {
        register,
        watch,
        trigger,
        setValue,
        formState: { errors, isValid, touchedFields }
    } = useForm({
        resolver: zodResolver(bookingSchema),
        mode: 'onChange',
        defaultValues
    });

    // Watch all fields to sync with parent
    const formValues = watch();

    // Sync with parent state whenever form changes
    useEffect(() => {
        // We only want to update the parent if the values strictly changed to avoid loops,
        // but simple object spread is usually fine.
        // We need to loop through keys to update individually or update whole object if parent supports it.
        // The parent `updateBookingData` takes (field, value).
        // BUT `bookingData.customerDetails` is an object.
        // The parent `updateBookingData` handles `setBookingData(prev => ({...prev, [field]: value}))`.
        // If I call `updateBookingData('customerDetails', newDetails)`, it should work.

        // Let's verify existing usage: 
        // `handleChange` was: `updateBookingData('customerDetails', { ...details, [field]: value })`

        updateBookingData('customerDetails', formValues);

        // Also handle side effects like travel fee
        if (formValues.homeService !== defaultValues.homeService) {
            updateBookingData('travelFee', formValues.homeService ? 2000 : 0);
        }

    }, [JSON.stringify(formValues)]);

    // Check validity on mount/update to ensure 'Next' button state is correct in parent
    useEffect(() => {
        trigger();
    }, []);

    const ErrorParams = ({ field }) => (
        errors[field] ? (
            <div className="flex items-center gap-1 mt-1 text-red-500 text-xs font-medium animate-pulse">
                <AlertCircle size={12} />
                {errors[field]?.message}
            </div>
        ) : null
    );

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="text-center">
                <h3 className="text-3xl font-serif text-charcoal mb-2">Your Details</h3>
                <p className="text-gray-600">Please provide your contact information to proceed</p>
            </div>

            <div className="bg-white rounded-2xl p-6 space-y-6 border border-gray-100 shadow-sm">
                {/* Name */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <User size={18} className="text-primary" />
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register('name')}
                        type="text"
                        placeholder="Enter your full name"
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${errors.name ? 'border-red-300 focus:ring-red-200 bg-red-50' : 'border-gray-300 focus:ring-primary/20'
                            }`}
                    />
                    <ErrorParams field="name" />
                </div>

                {/* Phone */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Phone size={18} className="text-primary" />
                        Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register('phone')}
                        type="tel"
                        placeholder="017XXXXXXXX"
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${errors.phone ? 'border-red-300 focus:ring-red-200 bg-red-50' : 'border-gray-300 focus:ring-primary/20'
                            }`}
                    />
                    <ErrorParams field="phone" />
                    {!errors.phone && touchedFields.phone && (
                        <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                            <MessageCircle size={10} /> Valid number format
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Mail size={18} className="text-primary" />
                        Email Address
                    </label>
                    <input
                        {...register('email')}
                        type="email"
                        placeholder="your.email@example.com"
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-300 focus:ring-red-200 bg-red-50' : 'border-gray-300 focus:ring-primary/20'
                            }`}
                    />
                    <p className="text-xs text-gray-500 mt-1">Optional but recommended for booking receipt</p>
                    <ErrorParams field="email" />
                </div>

                {/* Address */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <MapPin size={18} className="text-primary" />
                        Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        {...register('address')}
                        placeholder="Enter your complete address"
                        rows="3"
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${errors.address ? 'border-red-300 focus:ring-red-200 bg-red-50' : 'border-gray-300 focus:ring-primary/20'
                            }`}
                    />
                    <ErrorParams field="address" />
                </div>

                {/* Home Service */}
                <div className={`border rounded-xl p-4 transition-colors ${formValues.homeService ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-200'}`}>
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            {...register('homeService')}
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
                            {formValues.homeService && (
                                <p className="text-sm font-semibold text-amber-700 mt-2 animate-in fade-in slide-in-from-top-1">
                                    Additional travel fee: ৳2,000
                                </p>
                            )}
                        </div>
                    </label>
                </div>

                {/* Special Requests */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <MessageCircle size={18} className="text-primary" />
                        Special Requests / Allergies
                    </label>
                    <textarea
                        {...register('specialRequests')}
                        placeholder="Any allergies, preferences, or special requirements..."
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>

                {/* Referral Code */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Gift size={18} className="text-primary" />
                        Referral Code
                    </label>
                    <input
                        {...register('referralCode')}
                        type="text"
                        placeholder="Enter referral code for discount"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>

                {/* WhatsApp Notification */}
                <div className={`border rounded-xl p-4 transition-colors ${formValues.whatsappNotification ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            {...register('whatsappNotification')}
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
