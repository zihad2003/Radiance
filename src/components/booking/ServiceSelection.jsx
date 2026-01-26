import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, TrendingUp, Star } from 'lucide-react';
import { servicesDatabase, serviceCategories, calculateTotalDuration, calculateTotalPrice } from '../../data/servicesDatabase';

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
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <h3 className="text-3xl font-serif text-charcoal mb-2">Select Your Services</h3>
                <p className="text-gray-600">Choose one or more services for your appointment</p>
            </div>

            {/* Category Filter */}
            <div className="flex overflow-x-auto gap-3 pb-4 hide-scrollbar">
                {serviceCategories.map(category => (
                    <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap transition-all ${selectedCategory === category.id
                                ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg scale-105'
                                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                            }`}
                    >
                        <span>{category.icon}</span>
                        <span className="font-semibold text-sm">{category.name}</span>
                    </button>
                ))}
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service, index) => {
                    const isSelected = selectedServices.includes(service.id);

                    return (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => toggleService(service.id)}
                            className={`relative cursor-pointer rounded-2xl overflow-hidden border-2 transition-all group ${isSelected
                                    ? 'border-primary shadow-lg shadow-primary/20 scale-[1.02]'
                                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                                }`}
                        >
                            {/* Service Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                {/* Badges */}
                                <div className="absolute top-3 left-3 flex gap-2">
                                    {service.popular && (
                                        <span className="px-3 py-1 bg-gold text-white text-xs font-bold rounded-full flex items-center gap-1">
                                            <Star size={12} className="fill-white" />
                                            Popular
                                        </span>
                                    )}
                                    {service.trending && (
                                        <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                                            <TrendingUp size={12} />
                                            Trending
                                        </span>
                                    )}
                                </div>

                                {/* Selection Checkmark */}
                                {isSelected && (
                                    <div className="absolute top-3 right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                        <Check size={18} className="text-white" />
                                    </div>
                                )}

                                {/* Category Badge */}
                                <div className="absolute bottom-3 left-3">
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-charcoal text-xs font-semibold rounded-full">
                                        {service.category}
                                    </span>
                                </div>
                            </div>

                            {/* Service Info */}
                            <div className="p-5 bg-white">
                                <h4 className="font-bold text-charcoal text-lg mb-2 line-clamp-1">
                                    {service.name}
                                </h4>

                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                    {service.description}
                                </p>

                                {/* Duration and Price */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <Clock size={16} />
                                        <span className="text-sm font-medium">{formatDuration(service.duration)}</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-charcoal">৳{service.price.toLocaleString()}</div>
                                    </div>
                                </div>

                                {/* What's Included */}
                                <div className="border-t border-gray-100 pt-4">
                                    <div className="text-xs font-semibold text-gray-700 mb-2">What's Included:</div>
                                    <ul className="space-y-1">
                                        {service.included.slice(0, 3).map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                                                <Check size={14} className="text-green-500 flex-shrink-0 mt-0.5" />
                                                <span className="line-clamp-1">{item}</span>
                                            </li>
                                        ))}
                                        {service.included.length > 3 && (
                                            <li className="text-xs text-primary font-semibold">
                                                +{service.included.length - 3} more
                                            </li>
                                        )}
                                    </ul>
                                </div>

                                {/* Select Button */}
                                <button
                                    className={`w-full mt-4 py-3 rounded-xl font-semibold transition-all ${isSelected
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                                        }`}
                                >
                                    {isSelected ? 'Selected' : 'Select Service'}
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
                    className="sticky bottom-0 bg-gradient-to-r from-primary to-accent text-white p-6 rounded-2xl shadow-2xl"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm opacity-90 mb-1">
                                {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} selected
                            </div>
                            <div className="text-2xl font-bold">
                                Total: ৳{totalPrice.toLocaleString()}
                            </div>
                            <div className="text-sm opacity-90 mt-1">
                                Estimated Duration: {formatDuration(totalDuration)}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm opacity-90 mb-2">Ready to continue?</div>
                            <div className="flex items-center gap-2 text-sm">
                                <Check size={16} />
                                Click "Next" to proceed
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
