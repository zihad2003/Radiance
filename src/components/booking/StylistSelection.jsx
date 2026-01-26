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
        <div className="space-y-6">
            <div className="text-center">
                <h3 className="text-3xl font-serif text-charcoal mb-2">Choose Your Stylist</h3>
                <p className="text-gray-600">Select a preferred stylist or let us assign one</p>
            </div>

            {/* Any Available Stylist Option */}
            <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => handleStylistSelect('any')}
                className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${selectedStylist === 'any'
                        ? 'border-primary bg-primary/5 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white text-2xl">
                            ✨
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-charcoal">Any Available Stylist</h4>
                            <p className="text-sm text-gray-600">We'll assign the best stylist for you</p>
                            <div className="mt-2 inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                Save 5% - Recommended
                            </div>
                        </div>
                    </div>
                    {selectedStylist === 'any' && (
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <Check size={18} className="text-white" />
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Stylists Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stylistsDatabase.map((stylist, index) => {
                    const isSelected = selectedStylist === stylist.id;

                    return (
                        <motion.div
                            key={stylist.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
                            onClick={() => handleStylistSelect(stylist.id)}
                            className={`cursor-pointer rounded-2xl overflow-hidden border-2 transition-all ${isSelected
                                    ? 'border-primary shadow-lg shadow-primary/20'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            {/* Stylist Photo */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={stylist.image}
                                    alt={stylist.name}
                                    className="w-full h-full object-cover"
                                />
                                {isSelected && (
                                    <div className="absolute top-3 right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                        <Check size={18} className="text-white" />
                                    </div>
                                )}
                                {stylist.availability && (
                                    <div className="absolute bottom-3 left-3">
                                        <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                                            Available
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Stylist Info */}
                            <div className="p-5 bg-white">
                                <h4 className="font-bold text-lg text-charcoal mb-1">{stylist.name}</h4>
                                <p className="text-sm text-primary font-semibold mb-3">{stylist.title}</p>

                                {/* Rating */}
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex items-center gap-1">
                                        <Star size={16} className="fill-gold text-gold" />
                                        <span className="font-bold">{stylist.rating}</span>
                                    </div>
                                    <span className="text-sm text-gray-500">({stylist.reviews} reviews)</span>
                                </div>

                                {/* Experience */}
                                <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                                    <Award size={16} />
                                    <span>{stylist.experience} years experience</span>
                                </div>

                                {/* Specialties */}
                                <div className="mb-4">
                                    <div className="text-xs font-semibold text-gray-700 mb-2">Specialties:</div>
                                    <div className="flex flex-wrap gap-2">
                                        {stylist.specialties.map((specialty, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                            >
                                                {specialty}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Bio */}
                                <p className="text-xs text-gray-600 line-clamp-2 mb-4">{stylist.bio}</p>

                                {/* Select Button */}
                                <button
                                    className={`w-full py-3 rounded-xl font-semibold transition-all ${isSelected
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                                        }`}
                                >
                                    {isSelected ? 'Selected' : 'Select Stylist'}
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
