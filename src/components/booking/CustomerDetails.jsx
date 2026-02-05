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
        <div className="space-y-10 max-w-2xl mx-auto py-4">
            <div className="text-center space-y-2">
                <h3 className="text-4xl font-serif font-black text-charcoal">Personal Details</h3>
                <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
                <p className="text-gray-400 font-medium pt-2">Tell us more about how we can reach you</p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Name */}
                <div className="group">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-focus-within:text-primary transition-colors block mb-2">
                        Your Full Name
                    </label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                        <input
                            {...register('name')}
                            type="text"
                            placeholder="John Doe"
                            className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all ${errors.name ? 'border-red-100 bg-red-50/30' : 'border-transparent focus:border-primary focus:bg-white focus:shadow-xl focus:shadow-primary/5'}`}
                        />
                    </div>
                    <ErrorParams field="name" />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Phone */}
                    <div className="group">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-focus-within:text-primary transition-colors block mb-2">
                            Contact Phone
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                            <input
                                {...register('phone')}
                                type="tel"
                                placeholder="017XXXXXXXX"
                                className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all ${errors.phone ? 'border-red-100 bg-red-50/30' : 'border-transparent focus:border-primary focus:bg-white focus:shadow-xl focus:shadow-primary/5'}`}
                            />
                        </div>
                        <ErrorParams field="phone" />
                    </div>

                    {/* Email */}
                    <div className="group">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-focus-within:text-primary transition-colors block mb-2">
                            Email (Optional)
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="name@luxury.com"
                                className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all ${errors.email ? 'border-red-100 bg-red-50/30' : 'border-transparent focus:border-primary focus:bg-white focus:shadow-xl focus:shadow-primary/5'}`}
                            />
                        </div>
                        <ErrorParams field="email" />
                    </div>
                </div>

                {/* Address */}
                <div className="group">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-focus-within:text-primary transition-colors block mb-2">
                        Detailed Address
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-4 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                        <textarea
                            {...register('address')}
                            placeholder="Apartment, Street, House Name..."
                            rows="3"
                            className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all resize-none ${errors.address ? 'border-red-100 bg-red-50/30' : 'border-transparent focus:border-primary focus:bg-white focus:shadow-xl focus:shadow-primary/5'}`}
                        />
                    </div>
                    <ErrorParams field="address" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Home Service Toggle */}
                    <label className={`relative flex items-center gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer group ${formValues.homeService ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
                        <input type="checkbox" {...register('homeService')} className="hidden" />
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${formValues.homeService ? 'bg-primary text-white rotate-12' : 'bg-gray-100 text-gray-400'}`}>
                            <Home size={22} />
                        </div>
                        <div className="flex-1">
                            <div className="font-bold text-charcoal">Home Service</div>
                            <div className="text-[10px] text-gray-400 uppercase font-black tracking-wider">At Your Location</div>
                        </div>
                        {formValues.homeService && <div className="absolute top-2 right-4 text-[10px] font-black text-primary">+৳2,000</div>}
                    </label>

                    {/* WhatsApp Notification Toggle */}
                    <label className={`relative flex items-center gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer group ${formValues.whatsappNotification ? 'border-green-500 bg-green-50/30' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
                        <input type="checkbox" {...register('whatsappNotification')} className="hidden" />
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${formValues.whatsappNotification ? 'bg-green-500 text-white shadow-lg shadow-green-200' : 'bg-gray-100 text-gray-400'}`}>
                            <MessageCircle size={22} />
                        </div>
                        <div className="flex-1">
                            <div className="font-bold text-charcoal">WhatsApp Alerts</div>
                            <div className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Instant Updates</div>
                        </div>
                    </label>
                </div>

                {/* Extras */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="group">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-focus-within:text-primary transition-colors block mb-2">
                            Special Requests
                        </label>
                        <input
                            {...register('specialRequests')}
                            className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none transition-all focus:border-primary focus:bg-white"
                            placeholder="Allergies, preferences..."
                        />
                    </div>
                    <div className="group">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-focus-within:text-primary transition-colors block mb-2">
                            Promo/Referral Code
                        </label>
                        <input
                            {...register('referralCode')}
                            className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none transition-all focus:border-primary focus:bg-white"
                            placeholder="REFR-XXXX"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-6 text-center opacity-40">
                <p className="text-[10px] font-black uppercase tracking-[3px]">Secure Checkout • Encrypted Data</p>
            </div>
        </div>
    );
};

export default CustomerDetails;
