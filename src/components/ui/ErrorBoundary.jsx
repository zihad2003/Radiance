import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import GlassCard from './GlassCard';
import { trackEvent } from '../../utils/analytics';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });

        try {
            trackEvent('System', 'Crash', error.toString().substring(0, 100));
        } catch (e) {
            // Ignore analytics failures during crash
        }
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            // Check if we have a custom fallback in props
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-rose-50 p-6">
                    <GlassCard className="max-w-md w-full p-8 text-center !bg-white/90 shadow-2xl border-rose-200">
                        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle size={32} />
                        </div>
                        <h2 className="text-2xl font-serif text-charcoal mb-3">Something went wrong</h2>
                        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                            We encountered an unexpected error. Our team has been notified.
                            Please try refreshing the page.
                        </p>

                        {this.state.error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs font-mono text-left mb-6 overflow-auto max-h-32 border border-red-100">
                                {this.state.error.toString()}
                            </div>
                        )}

                        <button
                            onClick={this.handleRetry}
                            className="bg-primary text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs shadow-glow hover:bg-primary/80 transition-all flex items-center justify-center gap-2 w-full"
                        >
                            <RefreshCw size={14} />
                            Reload Application
                        </button>
                    </GlassCard>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
