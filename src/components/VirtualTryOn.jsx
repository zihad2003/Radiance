import { Suspense, lazy } from 'react';
import { RefreshCw } from 'lucide-react';
const MakeupStudio = lazy(() => import('./makeup/MakeupStudio'));

const VirtualTryOn = () => {
    return (
        <section id="experience" className="relative min-h-screen bg-black">
            <Suspense fallback={
                <div className="flex h-screen w-full items-center justify-center bg-black text-rose-50">
                    <div className="flex flex-col items-center animate-pulse">
                        <RefreshCw className="w-12 h-12 text-primary animate-spin mb-4" />
                        <p className="font-serif text-xl">Loading Studio...</p>
                    </div>
                </div>
            }>
                <MakeupStudio />
            </Suspense>
        </section>
    );
};

export default VirtualTryOn;
