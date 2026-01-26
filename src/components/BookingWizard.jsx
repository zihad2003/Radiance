import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ChevronRight, ChevronLeft } from 'lucide-react';
import ServiceSelection from './booking/ServiceSelection';
import DateTimeSelection from './booking/DateTimeSelection';
import StylistSelection from './booking/StylistSelection';
import CustomerDetails from './booking/CustomerDetails';
import ReviewConfirmation from './booking/ReviewConfirmation';

const BookingWizard = ({ isOpen, onClose, initialService = null }) => {
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col"
                role="dialog"
                aria-modal="true"
                aria-labelledby="booking-wizard-title"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-accent p-6 text-white relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white"
                        aria-label="Close Booking Wizard"
                    >
                        <X size={20} />
                    </button>

                    <h2 id="booking-wizard-title" className="text-3xl font-serif mb-2">Book Your Appointment</h2>
                    <p className="text-white/80">Step {currentStep} of 5</p>
                </div>

                {/* Progress Indicator */}
                <div className="bg-gray-50 px-6 py-4">
                    <div className="flex items-center justify-between max-w-4xl mx-auto">
                        {steps.map((step, index) => (
                            <React.Fragment key={step.number}>
                                <div className="flex flex-col items-center flex-1">
                                    <div
                                        aria-current={currentStep === step.number ? "step" : undefined}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${currentStep > step.number
                                            ? 'bg-green-500 text-white'
                                            : currentStep === step.number
                                                ? 'bg-gradient-to-r from-primary to-accent text-white scale-110 shadow-lg'
                                                : 'bg-gray-200 text-gray-400'
                                            }`}
                                    >
                                        {currentStep > step.number ? <Check size={24} /> : step.icon}
                                    </div>
                                    <div className="text-xs mt-2 text-center hidden md:block">
                                        <div className={`font-semibold ${currentStep >= step.number ? 'text-charcoal' : 'text-gray-400'}`}>
                                            {step.title}
                                        </div>
                                    </div>
                                </div>
                                {index < steps.length - 1 && (
                                    <div
                                        className={`flex-1 h-1 mx-2 rounded transition-all ${currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                                            }`}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <CurrentStepComponent
                                bookingData={bookingData}
                                updateBookingData={updateBookingData}
                                onNext={goToNextStep}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Footer */}
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                    <div className="flex justify-between items-center max-w-4xl mx-auto">
                        <button
                            onClick={goToPreviousStep}
                            disabled={currentStep === 1}
                            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={20} />
                            Previous
                        </button>

                        <div className="text-center">
                            <div className="text-sm text-gray-600">Step {currentStep} of 5</div>
                            <div className="text-xs text-gray-500 mt-1">{steps[currentStep - 1].title}</div>
                        </div>

                        {currentStep < 5 && (
                            <button
                                onClick={goToNextStep}
                                disabled={!canProceed()}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                                <ChevronRight size={20} />
                            </button>
                        )}
                        {/* Final step confirmation is handled inside the component */}
                        {currentStep === 5 && <div className="w-[100px]" />}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default BookingWizard;
