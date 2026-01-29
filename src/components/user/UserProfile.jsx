import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Award, Shield, ShoppingBag, Calendar, LogOut, ChevronRight, Star } from 'lucide-react';
import { useRewards } from '../../context/RewardsContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ isOpen, onClose, onOpenAdmin }) => {
    const { points, level, getNextLevel, levels } = useRewards();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleNavigate = (tab) => {
        navigate('/account');
        onClose();
    };

    const currentLevelData = levels.find(l => l.name === (user?.level || level));
    const nextLevelData = getNextLevel();
    const progressToNext = nextLevelData
        ? (((user?.points || points) - currentLevelData.min) / (nextLevelData.min - currentLevelData.min)) * 100
        : 100;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-end">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative w-full max-w-md h-full bg-pearl shadow-4xl flex flex-col overflow-hidden"
            >
                {/* Header */}
                <div className="relative h-48 bg-charcoal flex flex-col items-center justify-center p-8 text-center">
                    <div className="absolute top-6 right-6">
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>

                    <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center mb-4 overflow-hidden shadow-2xl">
                        <User className="text-primary w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white uppercase tracking-widest">{user?.name || "Radiance Guest"}</h3>
                    <p className="text-primary/70 text-[10px] font-black tracking-[0.2em] uppercase">{user?.level || level} Member</p>
                    <p className="text-white/30 text-[9px] mt-1 italic">{user?.email}</p>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    {/* Rewards Card */}
                    <div className="mb-10">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Loyalty Points</p>
                                <h4 className="text-3xl font-black text-charcoal">{(user?.points || points).toLocaleString()} <span className="text-xs text-gray-400 font-medium tracking-normal">pts</span></h4>
                            </div>
                            <div className="text-right">
                                <span
                                    className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest"
                                    style={{ backgroundColor: `${currentLevelData.color}20`, color: currentLevelData.color }}
                                >
                                    {user?.level || level} Status
                                </span>
                            </div>
                        </div>

                        {nextLevelData && (
                            <div className="space-y-2">
                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progressToNext}%` }}
                                        className="h-full bg-primary"
                                    />
                                </div>
                                <p className="text-[9px] text-gray-400 font-medium">
                                    {(nextLevelData.min - (user?.points || points)).toLocaleString()} points until <span className="font-black text-charcoal">{nextLevelData.name}</span>
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4 mb-8">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Your Radiance History</p>

                        <button
                            onClick={() => handleNavigate('appointments')}
                            className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-primary/30 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-charcoal">
                                    <Calendar size={18} />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-charcoal">My Bookings</p>
                                    <p className="text-[10px] text-gray-400">View upcoming & past services</p>
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-gray-300 group-hover:text-primary transition-colors" />
                        </button>

                        <button
                            onClick={() => handleNavigate('orders')}
                            className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-primary/30 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-charcoal">
                                    <ShoppingBag size={18} />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-charcoal">Order History</p>
                                    <p className="text-[10px] text-gray-400">Track your boutique purchases</p>
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-gray-300 group-hover:text-primary transition-colors" />
                        </button>

                        <button
                            onClick={() => handleNavigate('looks')}
                            className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-primary/30 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-charcoal">
                                    <Star size={18} />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-charcoal">Saved Looks</p>
                                    <p className="text-[10px] text-gray-400">Your AI makeovers & try-ons</p>
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-gray-300 group-hover:text-primary transition-colors" />
                        </button>
                    </div>

                    <button
                        onClick={() => {
                            logout();
                            onClose();
                        }}
                        className="w-full py-4 bg-red-50 border border-red-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-400 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 mb-4"
                    >
                        <LogOut size={14} /> Sign Out of Account
                    </button>

                    <button
                        onClick={() => {
                            onClose();
                            if (onOpenAdmin) onOpenAdmin();
                        }}
                        className="w-full py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-charcoal hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                        <Shield size={14} /> Staff Access Portal
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default UserProfile;
