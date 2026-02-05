import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ChevronRight, ChevronLeft } from 'lucide-react';
import ServiceSelection from './booking/ServiceSelection';
import DateTimeSelection from './booking/DateTimeSelection';
import StylistSelection from './booking/StylistSelection';
import CustomerDetails from './booking/CustomerDetails';
import ReviewConfirmation from './booking/ReviewConfirmation';
import { useAuth } from '../context/AuthContext';

const BookingWizard = ({ isOpen, onClose, initialService = null }) => {
    const { user } = useAuth();
    const [currentStep, setCurrentStep] = useState(1);
    const [bookingData, setBookingData] = useState({
        selectedServices: initialService ? [initialService] : [],
        selectedDate: null,
        selectedTime: null,
        selectedStylist: null,
        customerDetails: {
            name: '',
            phone: '',
            email: '',
            address: '',
            homeService: false,
            specialRequests: '',
            referralCode: '',
            whatsappNotification: true
        },
        discount: 0,
        travelFee: 0
    });

    useEffect(() => {
        if (user) {
            setBookingData(prev => ({
                ...prev,
                customerDetails: {
                    ...prev.customerDetails,
                    name: user.name || '',
                    email: user.email || '',
                    phone: user.phone || ''
                }
            }));
        }
    }, [user, isOpen]);

    const steps = [
        { number: 1, title: 'Select Services', icon: '🛍️', component: ServiceSelection },
        { number: 2, title: 'Date & Time', icon: '📅', component: DateTimeSelection },
        { number: 3, title: 'Choose Stylist', icon: '👩‍🎨', component: StylistSelection },
        { number: 4, title: 'Your Details', icon: '📝', component: CustomerDetails },
        { number: 5, title: 'Review & Confirm', icon: '✅', component: ReviewConfirmation }
    ];

    const updateBookingData = (field, value) => {
        setBookingData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const goToNextStep = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    };

    const goToPreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return bookingData.selectedServices.length > 0;
            case 2:
                return bookingData.selectedDate && bookingData.selectedTime;
            case 3:
                return bookingData.selectedStylist !== null;
            case 4:
                return bookingData.customerDetails.name &&
                    bookingData.customerDetails.phone &&
                    bookingData.customerDetails.address;
            case 5:
                return true;
            default:
                return false;
        }
    };

    const CurrentStepComponent = steps[currentStep - 1].component;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-[2000] flex items-center justify-center p-0 md:p-10 overflow-hidden">
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 30 }}
                className="bg-white rounded-none md:rounded-[3rem] w-full h-full md:max-h-[85vh] md:max-w-7xl overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10"
                role="dialog"
                aria-modal="true"
                aria-labelledby="booking-wizard-title"
            >
                {/* Header */}
                <div className="bg-charcoal p-8 md:p-14 text-white relative border-b border-white/5 overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-primary-500),transparent)] opacity-15" />
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />

                    <div className="absolute top-6 left-8 md:left-14 text-[9px] font-black text-primary/40 uppercase tracking-[0.5em] pointer-events-none">
                        Progress Architecture • Step {currentStep} of 5
                    </div>

                    <div className="flex justify-between items-end relative z-10 w-full mt-4">
                        <div>
                            <h2 id="booking-wizard-title" className="text-4xl md:text-6xl font-serif font-black text-white flex items-center gap-4 leading-tight">
                                Radiance <span className="text-primary italic font-light">Atelier</span>
                            </h2>
                            <p className="text-gray-400 font-bold tracking-[0.3em] uppercase text-[10px] mt-3">Bespoke Beauty Experience • Dhaka Excellence</p>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-14 h-14 bg-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center hover:bg-white/10 hover:border-white/20 border border-white/10 transition-all group shadow-2xl"
                            aria-label="Exit Wizard"
                        >
                            <X size={28} className="group-hover:rotate-90 transition-transform duration-500" />
                        </button>
                    </div>
                </div>

                {/* Progress Indicator */}
                <div className="bg-white px-10 py-8 border-b border-gray-50">
                    <div className="flex items-center justify-between max-w-5xl mx-auto relative">
                        {/* Connecting Line */}
                        <div className="absolute top-7 left-0 right-0 h-px bg-gray-100 -z-0" />

                        {steps.map((step, index) => (
                            <React.Fragment key={step.number}>
                                <div className="flex flex-col items-center relative z-10 group flex-1">
                                    <div
                                        aria-current={currentStep === step.number ? "step" : undefined}
                                        className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all duration-700 ${currentStep > step.number
                                            ? 'bg-primary text-white shadow-xl shadow-primary/30 border-transparent rotate-[360deg]'
                                            : currentStep === step.number
                                                ? 'bg-charcoal text-white scale-110 shadow-2xl border-transparent'
                                                : 'bg-white text-gray-300 border-2 border-gray-100 group-hover:border-gray-300'
                                            }`}
                                    >
                                        {currentStep > step.number ? <Check size={24} strokeWidth={3} /> : <span className="opacity-80 scale-125">{step.icon}</span>}
                                    </div>
                                    <div className="mt-4 text-center">
                                        <div className={`text-[9px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${currentStep >= step.number ? 'text-charcoal' : 'text-gray-300'}`}>
                                            {step.title}
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 overflow-y-auto bg-white/50">
                    <div className="p-8 lg:p-12">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                            >
                                <CurrentStepComponent
                                    bookingData={bookingData}
                                    updateBookingData={updateBookingData}
                                    onNext={goToNextStep}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Navigation Footer */}
                <div className="border-t border-gray-100 p-8 bg-white backdrop-blur-md">
                    <div className="flex justify-between items-center max-w-5xl mx-auto">
                        <button
                            onClick={goToPreviousStep}
                            disabled={currentStep === 1}
                            className="group flex items-center gap-3 px-8 py-4 bg-white border-2 border-charcoal text-charcoal rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-charcoal hover:text-white transition-all disabled:opacity-10 disabled:grayscale shadow-sm active:scale-95"
                        >
                            <ChevronLeft size={16} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
                            Return
                        </button>

                        <div className="hidden lg:flex items-center gap-4">
                            {steps.map(s => (
                                <div key={s.number} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${currentStep === s.number ? 'bg-primary w-8' : 'bg-gray-200'}`} />
                            ))}
                            <span className="ml-4 text-[10px] font-black uppercase tracking-widest text-charcoal/40">Step {currentStep} of 5</span>
                        </div>

                        {currentStep < 5 ? (
                            <button
                                onClick={goToNextStep}
                                disabled={!canProceed()}
                                className="group flex items-center gap-3 px-12 py-4 bg-charcoal text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-black transition-all disabled:opacity-20 shadow-2xl shadow-charcoal/20 active:scale-95"
                            >
                                Proceed
                                <ChevronRight size={16} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        ) : (
                            <div className="w-[140px]" />
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default BookingWizard;
