import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, Star } from 'lucide-react';
import { servicesDatabase, serviceCategories, calculateTotalDuration, calculateTotalPrice } from '../../data/servicesDatabase';
import Image from '../ui/Image';

const ServiceSelection = ({ bookingData, updateBookingData }) => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const selectedServices = bookingData.selectedServices || [];

    const filteredServices = selectedCategory === 'all'
        ? servicesDatabase
        : servicesDatabase.filter(s => s.category === selectedCategory);

    const toggleService = (serviceId) => {
        const isSelected = selectedServices.includes(serviceId);
        const newSelection = isSelected
            ? selectedServices.filter(id => id !== serviceId)
            : [...selectedServices, serviceId];

        updateBookingData('selectedServices', newSelection);
    };

    const totalPrice = calculateTotalPrice(selectedServices);
    const totalDuration = calculateTotalDuration(selectedServices);

    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours === 0) return `${mins} mins`;
        if (mins === 0) return `${hours} hr${hours > 1 ? 's' : ''}`;
        return `${hours} hr${hours > 1 ? 's' : ''} ${mins} mins`;
    };

    return (
        <div className="space-y-12 max-w-6xl mx-auto py-4">
            {/* Header */}
            <div className="text-center space-y-4">
                <h3 className="text-4xl md:text-5xl font-serif font-black text-charcoal">Select Your Services</h3>
                <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
                <p className="text-gray-400 font-medium pt-2">Choose one or more masterclass services for your transformation</p>
            </div>

            {/* Category Filter */}
            <div className="flex overflow-x-auto gap-3 pb-6 hide-scrollbar max-w-4xl mx-auto justify-center">
                {serviceCategories.map(category => (
                    <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center gap-3 px-6 py-3 rounded-2xl whitespace-nowrap transition-all duration-300 font-bold text-xs uppercase tracking-widest ${selectedCategory === category.id
                            ? 'bg-charcoal text-white shadow-xl shadow-charcoal/20 scale-105 border-charcoal'
                            : 'bg-white text-gray-400 hover:text-charcoal border border-gray-100 hover:border-gray-300'
                            }`}
                    >
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                    </button>
                ))}
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((service, index) => {
                    const isSelected = selectedServices.includes(service.id);

                    return (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => toggleService(service.id)}
                            className={`relative cursor-pointer rounded-3xl overflow-hidden border-2 transition-all duration-500 group ${isSelected
                                ? 'border-primary bg-white shadow-2xl shadow-primary/10 scale-[1.02]'
                                : 'border-transparent bg-gray-50/50 hover:bg-white hover:border-gray-200'
                                }`}
                        >
                            {/* Service Image */}
                            <div className="relative h-56 overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={service.name}
                                    category={service.category.toLowerCase() === 'facial' ? 'skincare' : service.category.toLowerCase()}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex gap-2">
                                    {service.popular && (
                                        <span className="px-4 py-2 bg-primary text-black text-[9px] font-black uppercase tracking-[0.2em] rounded-xl flex items-center gap-2 shadow-2xl shadow-primary/40 backdrop-blur-md">
                                            <Star size={12} className="fill-black" />
                                            Trending
                                        </span>
                                    )}
                                </div>

                                {/* Selection Checkmark */}
                                {isSelected && (
                                    <div className="absolute top-4 right-4 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-xl animate-in zoom-in-50 duration-300">
                                        <Check size={24} strokeWidth={3} />
                                    </div>
                                )}

                                {/* Category Badge */}
                                <div className="absolute bottom-4 left-4">
                                    <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">
                                        {service.category}
                                    </span>
                                    <h4 className="text-xl font-serif font-black text-white mt-1">
                                        {service.name}
                                    </h4>
                                </div>
                            </div>

                            {/* Service Info */}
                            <div className="p-6">
                                <p className="text-sm text-gray-400 font-medium mb-4 line-clamp-2 h-10">
                                    {service.description}
                                </p>

                                {/* Duration and Price */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                            <Clock size={16} />
                                        </div>
                                        <span className="text-xs font-bold">{formatDuration(service.duration)}</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-black text-charcoal">৳{service.price.toLocaleString()}</div>
                                    </div>
                                </div>

                                {/* Select Button */}
                                <button
                                    className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 ${isSelected
                                        ? 'bg-primary text-white shadow-xl shadow-primary/20'
                                        : 'bg-charcoal text-white hover:bg-black'
                                        }`}
                                >
                                    {isSelected ? 'Service Selected' : 'Choose Service'}
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Selection Summary */}
            {selectedServices.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="sticky bottom-4 z-20 bg-charcoal text-white p-6 rounded-3xl shadow-2xl border border-primary/20 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
                    <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-xl">
                                <Check size={32} strokeWidth={3} />
                            </div>
                            <div>
                                <div className="text-[10px] uppercase font-black tracking-widest text-primary mb-1">
                                    {selectedServices.length} Selected
                                </div>
                                <div className="text-3xl font-black">
                                    ৳{totalPrice.toLocaleString()}
                                </div>
                            </div>
                        </div>
                        <div className="text-right hidden sm:block">
                            <div className="text-[10px] uppercase font-black tracking-widest text-gray-400 mb-1">Time Investment</div>
                            <div className="text-xl font-bold font-mono">
                                {formatDuration(totalDuration)}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Empty State */}
            {selectedServices.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <div className="text-6xl mb-4">💆‍♀️</div>
                    <p className="text-lg">Select at least one service to continue</p>
                </div>
            )}
        </div>
    );
};

export default ServiceSelection;
