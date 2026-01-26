import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Smartphone, Building2, Truck, CheckCircle2, XCircle, Clock, ArrowLeft } from 'lucide-react';

const PaymentGateway = ({ cart, total, onClose, onSuccess }) => {
    const [step, setStep] = useState('method'); // method, details, processing, success, failed
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [formData, setFormData] = useState({
        // Personal Info
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',

        // Payment specific
        bkashNumber: '',
        nagadNumber: '',
        cardNumber: '',
        cardExpiry: '',
        cardCVV: '',
        cardName: '',
        bankName: '',
        accountNumber: '',
        transactionId: ''
    });

    const paymentMethods = [
        {
            id: 'bkash',
            name: 'bKash',
            icon: '📱',
            color: 'from-pink-500 to-pink-600',
            description: 'Pay with bKash mobile wallet',
            fee: 0,
            popular: true
        },
        {
            id: 'nagad',
            name: 'Nagad',
            icon: '💳',
            color: 'from-orange-500 to-red-600',
            description: 'Pay with Nagad mobile wallet',
            fee: 0,
            popular: true
        },
        {
            id: 'card',
            name: 'Credit/Debit Card',
            icon: '💳',
            color: 'from-blue-500 to-blue-600',
            description: 'Visa, Mastercard, Amex (SSL Commerz)',
            fee: total * 0.02, // 2% processing fee
            popular: false
        },
        {
            id: 'bank',
            name: 'Bank Transfer',
            icon: '🏦',
            color: 'from-green-500 to-green-600',
            description: 'Direct bank transfer',
            fee: 0,
            popular: false
        },
        {
            id: 'cod',
            name: 'Cash on Delivery',
            icon: '💵',
            color: 'from-gray-600 to-gray-700',
            description: 'Pay when you receive',
            fee: 50, // Flat delivery fee
            popular: false
        }
    ];

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        // Basic validation
        if (!formData.name || !formData.email || !formData.phone || !formData.address) {
            alert('Please fill in all required fields');
            return false;
        }

        // Method-specific validation
        if (selectedMethod === 'bkash' && !formData.bkashNumber) {
            alert('Please enter your bKash number');
            return false;
        }
        if (selectedMethod === 'nagad' && !formData.nagadNumber) {
            alert('Please enter your Nagad number');
            return false;
        }
        if (selectedMethod === 'card') {
            if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCVV || !formData.cardName) {
                alert('Please fill in all card details');
                return false;
            }
        }
        if (selectedMethod === 'bank' && !formData.accountNumber) {
            alert('Please enter your account number');
            return false;
        }

        return true;
    };

    const processPayment = async () => {
        if (!validateForm()) return;

        setStep('processing');

        // Simulate payment processing
        setTimeout(() => {
            // Simulate 90% success rate
            const success = Math.random() > 0.1;

            if (success) {
                const orderId = `RAD${Date.now()}`;
                setStep('success');

                // Call success callback with order details
                if (onSuccess) {
                    onSuccess({
                        orderId,
                        method: selectedMethod,
                        total: total + (paymentMethods.find(m => m.id === selectedMethod)?.fee || 0),
                        items: cart,
                        customer: {
                            name: formData.name,
                            email: formData.email,
                            phone: formData.phone,
                            address: formData.address
                        },
                        timestamp: new Date().toISOString()
                    });
                }
            } else {
                setStep('failed');
            }
        }, 3000);
    };

    const selectedMethodData = paymentMethods.find(m => m.id === selectedMethod);
    const finalTotal = total + (selectedMethodData?.fee || 0);

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6 overflow-y-auto">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center z-10">
                    <div>
                        <h2 className="text-2xl font-serif text-charcoal">Secure Checkout</h2>
                        <p className="text-sm text-gray-500">Complete your purchase safely</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                    >
                        <XCircle size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <AnimatePresence mode="wait">
                        {/* Step 1: Payment Method Selection */}
                        {step === 'method' && (
                            <motion.div
                                key="method"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <h3 className="text-xl font-bold mb-6">Select Payment Method</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    {paymentMethods.map(method => (
                                        <button
                                            key={method.id}
                                            onClick={() => setSelectedMethod(method.id)}
                                            className={`relative p-6 rounded-2xl border-2 transition-all text-left ${selectedMethod === method.id
                                                    ? 'border-primary bg-primary/5 shadow-lg'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            {method.popular && (
                                                <span className="absolute top-3 right-3 px-2 py-1 bg-gold text-white text-xs rounded-full font-bold">
                                                    Popular
                                                </span>
                                            )}

                                            <div className="flex items-start gap-4">
                                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center text-2xl`}>
                                                    {method.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-charcoal mb-1">{method.name}</h4>
                                                    <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                                                    {method.fee > 0 && (
                                                        <p className="text-xs text-gray-500">
                                                            {method.id === 'card' ? `+${(method.fee / total * 100).toFixed(1)}% fee` : `+৳${method.fee} fee`}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => selectedMethod && setStep('details')}
                                    disabled={!selectedMethod}
                                    className="w-full py-4 bg-charcoal text-white rounded-xl font-bold hover:bg-primary transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    Continue to Payment Details
                                </button>
                            </motion.div>
                        )}

                        {/* Step 2: Payment Details */}
                        {step === 'details' && (
                            <motion.div
                                key="details"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <button
                                    onClick={() => setStep('method')}
                                    className="flex items-center gap-2 text-gray-600 hover:text-charcoal mb-6"
                                >
                                    <ArrowLeft size={20} />
                                    Back to payment methods
                                </button>

                                <h3 className="text-xl font-bold mb-6">Payment & Delivery Details</h3>

                                <div className="space-y-6">
                                    {/* Personal Information */}
                                    <div>
                                        <h4 className="font-bold mb-4">Personal Information</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Full Name *"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                required
                                            />
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email Address *"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                required
                                            />
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="Phone Number *"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                required
                                            />
                                            <input
                                                type="text"
                                                name="city"
                                                placeholder="City"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>
                                        <textarea
                                            name="address"
                                            placeholder="Delivery Address *"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className="w-full mt-4 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            required
                                        />
                                    </div>

                                    {/* Payment Method Specific Fields */}
                                    {selectedMethod === 'bkash' && (
                                        <div>
                                            <h4 className="font-bold mb-4">bKash Payment</h4>
                                            <input
                                                type="tel"
                                                name="bkashNumber"
                                                placeholder="bKash Number (01XXXXXXXXX)"
                                                value={formData.bkashNumber}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                            <p className="text-sm text-gray-600 mt-2">
                                                Send ৳{finalTotal} to <strong>01712-345678</strong> and enter your bKash number
                                            </p>
                                        </div>
                                    )}

                                    {selectedMethod === 'nagad' && (
                                        <div>
                                            <h4 className="font-bold mb-4">Nagad Payment</h4>
                                            <input
                                                type="tel"
                                                name="nagadNumber"
                                                placeholder="Nagad Number (01XXXXXXXXX)"
                                                value={formData.nagadNumber}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                            <p className="text-sm text-gray-600 mt-2">
                                                Send ৳{finalTotal} to <strong>01812-345678</strong> and enter your Nagad number
                                            </p>
                                        </div>
                                    )}

                                    {selectedMethod === 'card' && (
                                        <div>
                                            <h4 className="font-bold mb-4">Card Details (SSL Commerz)</h4>
                                            <div className="space-y-4">
                                                <input
                                                    type="text"
                                                    name="cardName"
                                                    placeholder="Cardholder Name"
                                                    value={formData.cardName}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                />
                                                <input
                                                    type="text"
                                                    name="cardNumber"
                                                    placeholder="Card Number"
                                                    value={formData.cardNumber}
                                                    onChange={handleInputChange}
                                                    maxLength="16"
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <input
                                                        type="text"
                                                        name="cardExpiry"
                                                        placeholder="MM/YY"
                                                        value={formData.cardExpiry}
                                                        onChange={handleInputChange}
                                                        maxLength="5"
                                                        className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                    />
                                                    <input
                                                        type="text"
                                                        name="cardCVV"
                                                        placeholder="CVV"
                                                        value={formData.cardCVV}
                                                        onChange={handleInputChange}
                                                        maxLength="3"
                                                        className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {selectedMethod === 'bank' && (
                                        <div>
                                            <h4 className="font-bold mb-4">Bank Transfer Details</h4>
                                            <div className="bg-gray-50 p-4 rounded-xl mb-4">
                                                <p className="text-sm text-gray-700 mb-2"><strong>Bank:</strong> Dutch-Bangla Bank</p>
                                                <p className="text-sm text-gray-700 mb-2"><strong>Account Name:</strong> Radiance Beauty Salon</p>
                                                <p className="text-sm text-gray-700 mb-2"><strong>Account Number:</strong> 1234567890</p>
                                                <p className="text-sm text-gray-700"><strong>Branch:</strong> Gulshan, Dhaka</p>
                                            </div>
                                            <input
                                                type="text"
                                                name="transactionId"
                                                placeholder="Transaction ID / Reference Number"
                                                value={formData.transactionId}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>
                                    )}

                                    {selectedMethod === 'cod' && (
                                        <div className="bg-amber-50 p-4 rounded-xl">
                                            <p className="text-sm text-gray-700">
                                                <strong>Cash on Delivery:</strong> Pay ৳{finalTotal} when you receive your order.
                                                A delivery fee of ৳50 applies.
                                            </p>
                                        </div>
                                    )}

                                    {/* Order Summary */}
                                    <div className="bg-gray-50 p-6 rounded-xl">
                                        <h4 className="font-bold mb-4">Order Summary</h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Subtotal ({cart.length} items)</span>
                                                <span>৳{total.toFixed(2)}</span>
                                            </div>
                                            {selectedMethodData?.fee > 0 && (
                                                <div className="flex justify-between text-sm">
                                                    <span>Processing Fee</span>
                                                    <span>৳{selectedMethodData.fee.toFixed(2)}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                                                <span>Total</span>
                                                <span>৳{finalTotal.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={processPayment}
                                    className="w-full mt-6 py-4 bg-charcoal text-white rounded-xl font-bold hover:bg-primary transition-colors"
                                >
                                    Complete Payment - ৳{finalTotal.toFixed(2)}
                                </button>
                            </motion.div>
                        )}

                        {/* Step 3: Processing */}
                        {step === 'processing' && (
                            <motion.div
                                key="processing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                                <h3 className="text-2xl font-bold mb-2">Processing Payment...</h3>
                                <p className="text-gray-600">Please wait while we confirm your payment</p>
                            </motion.div>
                        )}

                        {/* Step 4: Success */}
                        {step === 'success' && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 size={48} className="text-green-600" />
                                </div>
                                <h3 className="text-3xl font-bold mb-2">Payment Successful!</h3>
                                <p className="text-gray-600 mb-8">Your order has been confirmed</p>
                                <div className="bg-gray-50 p-6 rounded-xl max-w-md mx-auto mb-6">
                                    <p className="text-sm text-gray-600 mb-2">Order ID</p>
                                    <p className="text-2xl font-mono font-bold">RAD{Date.now()}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="px-8 py-3 bg-charcoal text-white rounded-xl font-bold hover:bg-primary transition-colors"
                                >
                                    Continue Shopping
                                </button>
                            </motion.div>
                        )}

                        {/* Step 5: Failed */}
                        {step === 'failed' && (
                            <motion.div
                                key="failed"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <XCircle size={48} className="text-red-600" />
                                </div>
                                <h3 className="text-3xl font-bold mb-2">Payment Failed</h3>
                                <p className="text-gray-600 mb-8">There was an issue processing your payment</p>
                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={() => setStep('details')}
                                        className="px-8 py-3 bg-charcoal text-white rounded-xl font-bold hover:bg-primary transition-colors"
                                    >
                                        Try Again
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="px-8 py-3 bg-gray-200 text-charcoal rounded-xl font-bold hover:bg-gray-300 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default PaymentGateway;
