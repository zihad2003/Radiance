import { useState } from 'react';
import { paymentMethods } from '../../data/paymentMethods';
import { initiateBkashPayment } from '../../services/payment/bkash';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Banknote, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const PaymentGateway = ({ totalAmount, onSuccess, onError }) => {
    const [selectedMethod, setSelectedMethod] = useState('bkash');
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success, error

    const handlePayment = async () => {
        setIsProcessing(true);
        setPaymentStatus('processing');

        try {
            if (selectedMethod === 'bkash') {
                const result = await initiateBkashPayment(totalAmount, 'ORD-' + Date.now());
                console.log("Payment Result:", result);
                setPaymentStatus('success');
                setTimeout(() => onSuccess(result), 1500);
            } else if (selectedMethod === 'cod') {
                // Simulate network request
                setTimeout(() => {
                    setPaymentStatus('success');
                    onSuccess({ method: 'cod', status: 'pending_delivery' });
                }, 1000);
            } else {
                // Mock card payment
                setTimeout(() => {
                    setPaymentStatus('success');
                    onSuccess({ method: 'card', transactionId: 'TXN-' + Date.now() });
                }, 2000);
            }
        } catch (error) {
            console.error("Payment Error:", error);
            setPaymentStatus('error');
            onError(error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-6 font-serif">Select Payment Method</h3>

            <div className="space-y-3 mb-8">
                {paymentMethods.map(method => (
                    <div
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedMethod === method.id ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}
                    >
                        <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${selectedMethod === method.id ? 'border-primary' : 'border-gray-300'}`}>
                            {selectedMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                        </div>

                        {method.logo ? (
                            <img src={method.logo} alt={method.name} className="h-8 object-contain mr-3" />
                        ) : (
                            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-gray-600">
                                {method.id === 'card' ? <CreditCard size={18} /> : <Banknote size={18} />}
                            </div>
                        )}

                        <span className="font-medium text-gray-700">{method.name}</span>
                        {method.id === 'bkash' && <span className="ml-auto text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full font-bold">Fastest</span>}
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-100">
                <span className="text-gray-500">Total Amount</span>
                <span className="text-2xl font-bold text-primary">৳ {totalAmount.toLocaleString()}</span>
            </div>

            <button
                onClick={handlePayment}
                disabled={isProcessing || paymentStatus === 'success'}
                className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-lg flex items-center justify-center
                    ${paymentStatus === 'success'
                        ? 'bg-green-500 text-white'
                        : paymentStatus === 'error'
                            ? 'bg-red-500 text-white'
                            : 'bg-charcoal text-white hover:bg-primary'
                    }
                `}
            >
                {isProcessing ? (
                    <><Loader className="animate-spin mr-2" /> Processing...</>
                ) : paymentStatus === 'success' ? (
                    <><CheckCircle className="mr-2" /> Payment Successful</>
                ) : paymentStatus === 'error' ? (
                    <><AlertCircle className="mr-2" /> Retry Payment</>
                ) : (
                    `Pay Now`
                )}
            </button>

            <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center">
                <Loader size={10} className="mr-1" /> Secured by SSLCommerz
            </p>
        </div>
    );
};

export default PaymentGateway;
