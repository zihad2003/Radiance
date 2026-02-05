import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Check } from 'lucide-react';
import { stylistsDatabase } from '../../data/stylistsDatabase';

const StylistSelection = ({ bookingData, updateBookingData }) => {
    const selectedStylist = bookingData.selectedStylist;

    const handleStylistSelect = (stylistId) => {
        updateBookingData('selectedStylist', stylistId);
        // Apply 5% discount if "any stylist" is selected
        if (stylistId === 'any') {
            updateBookingData('discount', 0.05);
        } else {
            updateBookingData('discount', 0);
        }
    };

    return (
        <div className="space-y-12 max-w-5xl mx-auto py-4">
            <div className="text-center space-y-2">
                <h3 className="text-4xl font-serif font-black text-charcoal">Curated Artistry</h3>
                <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
                <p className="text-gray-400 font-medium pt-2">Select a specialist for your luxury transformation</p>
            </div>

            {/* Any Available Stylist Option */}
            <motion.div
                whileHover={{ scale: 1.01 }}
                onClick={() => handleStylistSelect('any')}
                className={`group cursor-pointer p-8 rounded-[2.5rem] border-2 transition-all relative overflow-hidden ${selectedStylist === 'any'
                    ? 'border-primary bg-white shadow-2xl shadow-primary/10'
                    : 'border-transparent bg-gray-50 hover:bg-white hover:border-gray-200'
                    }`}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
                <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-8">
                        <div className="w-20 h-20 bg-charcoal rounded-3xl flex items-center justify-center text-white text-3xl shadow-xl shadow-charcoal/20">
                            ✨
                        </div>
                        <div>
                            <div className="text-[10px] uppercase font-black tracking-[0.2em] text-primary mb-1">Recommended Option</div>
                            <h4 className="text-2xl font-serif font-black text-charcoal">Any Available Artisan</h4>
                            <p className="text-sm text-gray-400 font-medium">We'll assign the perfect professional for your schedule</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="text-[10px] font-black uppercase tracking-widest text-green-600 mb-1">Elite Benefit</div>
                            <div className="text-sm font-bold text-green-600 bg-green-50 px-4 py-2 rounded-xl">Save 5% Privilege</div>
                        </div>
                        {selectedStylist === 'any' && (
                            <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center">
                                <Check size={24} strokeWidth={3} />
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Stylists Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {stylistsDatabase.map((stylist, index) => {
                    const isSelected = selectedStylist === stylist.id;

                    return (
                        <motion.div
                            key={stylist.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleStylistSelect(stylist.id)}
                            className={`group cursor-pointer rounded-[3rem] overflow-hidden border-2 transition-all duration-500 ${isSelected
                                ? 'border-primary bg-white shadow-2xl shadow-primary/10 scale-[1.02]'
                                : 'border-transparent bg-gray-50/50 hover:bg-white hover:border-gray-200'
                                }`}
                        >
                            {/* Stylist Photo */}
                            <div className="relative h-80 overflow-hidden">
                                <img
                                    src={stylist.image}
                                    alt={stylist.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                {isSelected && (
                                    <div className="absolute top-6 right-6 w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-2xl animate-in zoom-in-50">
                                        <Check size={28} strokeWidth={3} />
                                    </div>
                                )}

                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stylist.title}</div>
                                    <h4 className="text-2xl font-serif font-black text-white">{stylist.name}</h4>
                                </div>
                            </div>

                            {/* Stylist Info */}
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                                            <Star size={14} className="fill-primary text-primary" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-black text-charcoal">{stylist.rating}</div>
                                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{stylist.reviews} Stories</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-black text-charcoal">{stylist.experience}YRS</div>
                                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Mastery</div>
                                    </div>
                                </div>

                                {/* Specialties */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {stylist.specialties.slice(0, 3).map((specialty, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-gray-100 text-charcoal text-[10px] font-black uppercase tracking-widest rounded-lg"
                                        >
                                            {specialty}
                                        </span>
                                    ))}
                                </div>

                                {/* Select Button */}
                                <button
                                    className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 ${isSelected
                                        ? 'bg-primary text-white shadow-xl shadow-primary/20'
                                        : 'bg-charcoal text-white hover:bg-black'
                                        }`}
                                >
                                    {isSelected ? 'Stylist Selected' : 'Choose Specialist'}
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default StylistSelection;
