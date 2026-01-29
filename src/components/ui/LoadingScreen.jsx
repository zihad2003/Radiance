import { useState, useEffect } from 'react';
import Logo from './Logo';

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center z-[9999]">
            <div className="text-center">
                {/* Elegant Logo */}
                <div className="mb-8 flex flex-col items-center">
                    <Logo size="lg" className="mb-4" />
                    <p className="text-white/40 text-xs uppercase tracking-[0.3em] mt-3">AI Beauty Studio</p>
                </div>

                {/* Progress Bar */}
                <div className="w-48 h-[1px] bg-white/10 mx-auto relative overflow-hidden">
                    <div
                        className="absolute inset-y-0 left-0 bg-[#F5E6C8] transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Progress Percentage */}
                <p className="text-[#F5E6C8]/40 mt-3 text-[10px] font-mono">{progress}%</p>
            </div>
        </div>
    );
}
