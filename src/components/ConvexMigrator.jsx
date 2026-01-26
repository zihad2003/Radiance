import React, { useState } from 'react';
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { getAllProducts } from '../data/makeupBrands';
import { Database, CloudUpload, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

// --- COMPONENTS ---
// Reusing the logic from Shop.jsx pattern, but since this is a small component, we can inline the boundary or just export a wrapped version.

class MigratorErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        // Silent fail for migrator
    }
    render() {
        if (this.state.hasError) {
            return null; // Hide migrator if it fails
        }
        return this.props.children;
    }
}

const ConvexMigratorContent = () => {
    const [status, setStatus] = useState('idle'); // idle, syncing, success, error
    const [progress, setProgress] = useState(0);

    // Use null to skip Convex hooks until the API is explicitly defined by 'convex dev'
    const bulkAdd = useMutation(api?.products?.bulkAdd || null);
    const convexProducts = useQuery(api?.products?.list || null);

    const handleSync = async () => {
        setStatus('syncing');
        try {
            const localProducts = getAllProducts();
            const total = localProducts.length;

            // Sync in chunks of 50 to avoid timeout
            for (let i = 0; i < total; i += 50) {
                const chunk = localProducts.slice(i, i + 50);
                await bulkAdd({ products: chunk });
                setProgress(Math.round(((i + chunk.length) / total) * 100));
            }

            setStatus('success');
        } catch (err) {
            console.error("Sync failed:", err);
            setStatus('error');
        }
    };

    if (!convexProducts) return null;

    return (
        <div className="fixed bottom-24 right-10 z-[100]">
            <div className="bg-white/90 backdrop-blur-xl p-6 rounded-[2rem] shadow-3xl border border-gray-100 max-w-xs transition-all hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <Database size={20} />
                    </div>
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-charcoal">Convex Cloud</h4>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                            {convexProducts.length} Products in Cloud
                        </p>
                    </div>
                </div>

                {status === 'idle' && (
                    <button
                        onClick={handleSync}
                        className="w-full py-3 bg-charcoal text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary transition-all"
                    >
                        <CloudUpload size={14} /> Sync Local Data
                    </button>
                )}

                {status === 'syncing' && (
                    <div className="space-y-3">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                            <span className="text-primary italic animate-pulse">Synchronizing...</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                )}

                {status === 'success' && (
                    <div className="flex items-center gap-3 text-green-600 bg-green-50 p-3 rounded-xl">
                        <CheckCircle size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Sync Complete</span>
                    </div>
                )}

                {status === 'error' && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-red-600 bg-red-50 p-3 rounded-xl text-[10px] font-black uppercase tracking-widest">
                            <AlertCircle size={16} /> Error Syncing
                        </div>
                        <button onClick={handleSync} className="text-[9px] font-bold text-primary uppercase tracking-widest flex items-center gap-1 mx-auto">
                            <RefreshCw size={10} /> Try Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const ConvexMigrator = () => (
    <MigratorErrorBoundary>
        <ConvexMigratorContent />
    </MigratorErrorBoundary>
);

export default ConvexMigrator;
