import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Calendar, Package, Heart, Shield, LogOut,
    User, ShoppingBag, Clock, ChevronRight,
    ArrowRight, Star, Mail, Phone, MapPin,
    AlertCircle, CheckCircle2, Loader2, Image as ImageIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import FadeIn from '../components/ui/FadeIn';
import SEO from '../components/SEO';
import PageBentoHeader from '../components/ui/PageBentoHeader';

const AccountPage = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');

    // Queries
    const profile = useQuery(api.users.getProfileById, { userId: user?._id });
    const bookings = useQuery(api.bookings.getBookingsByUserId, { userId: user?._id });
    const orders = useQuery(api.orders.getOrdersByUserId, { userId: user?._id });

    const tabs = [
        { id: 'overview', label: 'Overview', icon: User },
        { id: 'appointments', label: 'Appointments', icon: Calendar },
        { id: 'orders', label: 'Order History', icon: Package },
        { id: 'looks', label: 'Saved Looks', icon: Heart },
    ];

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-32">
            <SEO title="My Account | Radiance Beauty" description="Manage your appointments, orders, and AI-saved beauty looks." />

            <div className="container mx-auto px-6">
                {/* Header Section */}
                <FadeIn>
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-16 p-10 bento-card border-primary/20 bg-gradient-to-br from-primary/10 to-transparent">
                        <div className="w-32 h-32 rounded-full border-4 border-primary/30 p-1 flex items-center justify-center relative group">
                            <div className="w-full h-full rounded-full bg-primary/20 flex items-center justify-center text-4xl font-serif text-primary">
                                {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-gold text-black text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-xl">
                                {user.level || 'Bronze'}
                            </div>
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-4xl md:text-5xl font-sans font-black uppercase tracking-tighter mb-2">
                                Welcome, <span className="text-primary italic">{user.name || 'Beautiful'}</span>
                            </h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                                <span className="flex items-center gap-2"><Mail size={12} className="text-primary" /> {user.email}</span>
                                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active Member</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-right">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-1">Radiance Points</p>
                                <p className="text-3xl font-black text-white">{user.points || 100}</p>
                            </div>
                            <div className="w-px h-12 bg-white/10" />
                            <div className="text-right">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-1">Total Visits</p>
                                <p className="text-3xl font-black text-white">{bookings?.length || 0}</p>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                <div className="grid lg:grid-cols-4 gap-12">
                    {/* Sidebar Tabs */}
                    <div className="lg:col-span-1 space-y-4">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full p-6 bento-card flex items-center gap-4 transition-all duration-500 ${activeTab === tab.id ? 'bg-primary text-black border-primary scale-105 shadow-xl' : 'bg-white/5 border-white/5 text-white hover:border-white/20'}`}
                            >
                                <tab.icon size={20} />
                                <span className="text-xs font-black uppercase tracking-widest">{tab.label}</span>
                                <ChevronRight size={16} className={`ml-auto transition-transform ${activeTab === tab.id ? 'rotate-90' : ''}`} />
                            </button>
                        ))}
                        <button
                            onClick={logout}
                            className="w-full p-6 bento-card bg-red-500/10 border-red-500/20 text-red-500 flex items-center gap-4 hover:bg-red-500 hover:text-white transition-all duration-500 mt-8"
                        >
                            <LogOut size={20} />
                            <span className="text-xs font-black uppercase tracking-widest">Sign Out</span>
                        </button>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 min-h-[600px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="h-full"
                            >
                                {activeTab === 'overview' && <OverviewPanel user={user} bookings={bookings} orders={orders} />}
                                {activeTab === 'appointments' && <AppointmentsPanel bookings={bookings} />}
                                {activeTab === 'orders' && <OrdersPanel orders={orders} />}
                                {activeTab === 'looks' && <LooksPanel looks={user.savedLooks} />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

const OverviewPanel = ({ user, bookings, orders }) => (
    <div className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
            <div className="bento-card p-10 bg-gradient-to-br from-indigo-500/10 to-transparent flex flex-col justify-between min-h-[250px]">
                <div>
                    <div className="bento-ribbon mb-6 text-indigo-400">
                        <Star size={12} fill="currentColor" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Membership Tier</span>
                    </div>
                    <h3 className="text-4xl font-serif text-white italic mb-4">{user.level || 'Bronze'}</h3>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                        Earn {500 - (user.points || 100)} more points to unlock <span className="text-white">Silver</span> status and exclusive rewards.
                    </p>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mt-6">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${((user.points || 100) / 500) * 100}%` }} />
                </div>
            </div>

            <div className="bento-card p-10 bg-gradient-to-br from-gold/10 to-transparent flex flex-col justify-between min-h-[250px]">
                <div>
                    <div className="bento-ribbon mb-6 text-gold">
                        <ShoppingBag size={12} fill="currentColor" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Investment Value</span>
                    </div>
                    <h3 className="text-4xl font-serif text-white italic mb-4">
                        ৳{orders?.reduce((acc, o) => acc + (o.total || 0), 0).toLocaleString() || '0'}
                    </h3>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                        Total spent in our luxury shop across {orders?.length || 0} orders.
                    </p>
                </div>
                <Link to="/shop" className="text-gold text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 hover:gap-4 transition-all">
                    Shop New Collection <ArrowRight size={14} />
                </Link>
            </div>
        </div>

        <div className="bento-card p-10 border-white/5">
            <h3 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                RECENT ACTIVITY
                <div className="flex-1 h-px bg-white/5" />
            </h3>
            <div className="space-y-6">
                {bookings?.slice(0, 3).map((booking, i) => (
                    <div key={i} className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                            <Calendar size={20} />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-black uppercase tracking-widest mb-1">{booking.service}</p>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{booking.date} @ {booking.time}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-white/5 rounded-full border border-white/10 text-gray-400">
                                {booking.status}
                            </span>
                        </div>
                    </div>
                ))}
                {!bookings?.length && (
                    <div className="text-center py-10 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                        No recent activity recorded yet.
                    </div>
                )}
            </div>
        </div>
    </div>
);

const AppointmentsPanel = ({ bookings }) => (
    <div className="bento-card p-10 border-white/5 h-full">
        <div className="flex justify-between items-center mb-12">
            <h3 className="text-2xl font-black uppercase tracking-tighter">Your Appointments</h3>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">{bookings?.length || 0} Total</span>
        </div>

        <div className="space-y-6">
            {bookings?.map((booking, i) => (
                <div key={i} className="group relative">
                    <div className="flex flex-col md:flex-row md:items-center gap-6 p-8 rounded-3xl bg-[#0F0F0F] border border-white/5 hover:border-primary/30 transition-all duration-500">
                        <div className="w-16 h-16 rounded-[2rem] bg-primary/10 flex flex-col items-center justify-center text-primary border border-primary/20">
                            <span className="text-[10px] font-black">{new Date(booking.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                            <span className="text-xl font-black">{new Date(booking.date).getDate()}</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-xl font-black uppercase tracking-tighter">{booking.service}</h4>
                                <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${booking.status === 'confirmed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
                                    booking.status === 'pending' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' :
                                        'bg-gray-500/10 border-gray-500/20 text-gray-500'
                                    }`}>
                                    {booking.status}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                                <span className="flex items-center gap-2"><Clock size={12} /> {booking.time}</span>
                                <span className="flex items-center gap-2"><MapPin size={12} /> {booking.customer.address}</span>
                                {booking.customer.homeService && <span className="text-primary">Home Service</span>}
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button className="p-4 bg-white/5 rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                <Clock size={20} />
                            </button>
                            <button className="flex items-center gap-3 px-6 py-4 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 hover:border-primary/50 transition-all group-hover:scale-105">
                                Modify <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {!bookings?.length && (
                <div className="flex flex-col items-center justify-center py-32 text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 opacity-30">
                        <Calendar size={32} />
                    </div>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-8">No appointments scheduled</p>
                    <Link to="/services" className="bg-white text-black px-12 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary transition-all">
                        Book a Service
                    </Link>
                </div>
            )}
        </div>
    </div>
);

const OrdersPanel = ({ orders }) => (
    <div className="bento-card p-10 border-white/5 h-full">
        <div className="flex justify-between items-center mb-12">
            <h3 className="text-2xl font-black uppercase tracking-tighter">Order History</h3>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">{orders?.length || 0} Orders</span>
        </div>

        <div className="space-y-6">
            {orders?.map((order, i) => (
                <div key={i} className="p-8 rounded-3xl bg-[#0F0F0F] border border-white/5 hover:border-indigo-500/30 transition-all duration-500">
                    <div className="flex flex-col md:flex-row justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <h4 className="text-lg font-black uppercase tracking-tighter">Order #{order.orderId}</h4>
                                <span className="text-[8px] font-black uppercase tracking-widest px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full">
                                    {order.status}
                                </span>
                            </div>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-6">Placed on {new Date(order.timestamp).toLocaleDateString()}</p>

                            <div className="flex -space-x-3 mb-2">
                                {order.items?.map((item, idx) => (
                                    <div key={idx} className="w-10 h-10 rounded-full border-2 border-[#0F0F0F] bg-gray-900 flex items-center justify-center overflow-hidden">
                                        <div className="text-[8px] font-bold text-gray-500">{idx + 1}</div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                                {order.items?.length} Items • <span className="text-white">৳{order.total.toLocaleString()}</span>
                            </p>
                        </div>
                        <div className="flex flex-col justify-between items-end gap-4">
                            <div className="text-right">
                                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1">Delivering to</p>
                                <p className="text-[10px] text-white font-black uppercase tracking-widest">{order.delivery.area}, {order.delivery.city}</p>
                            </div>
                            <button className="flex items-center gap-3 px-6 py-4 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 hover:border-indigo-500/50 transition-all">
                                Track Package <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {!orders?.length && (
                <div className="flex flex-col items-center justify-center py-32 text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 opacity-30">
                        <ShoppingBag size={32} />
                    </div>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-8">No order history found</p>
                    <Link to="/shop" className="bg-white text-black px-12 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary transition-all">
                        Browse Boutique
                    </Link>
                </div>
            )}
        </div>
    </div>
);

const LooksPanel = ({ looks }) => (
    <div className="bento-card p-10 border-white/5 h-full">
        <div className="flex justify-between items-center mb-12">
            <h3 className="text-2xl font-black uppercase tracking-tighter">Saved Looks</h3>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">{looks?.length || 0} Looks</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {looks?.map((look, i) => (
                <div key={i} className="group relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/5 bg-[#0F0F0F]">
                    <img src={look.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Saved Look" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                        <p className="text-[8px] text-primary font-black uppercase tracking-widest mb-1">{look.type}</p>
                        <p className="text-xs font-black uppercase tracking-tighter text-white mb-4">Synthetic Trial #{i + 1}</p>
                        <div className="flex gap-2">
                            <button className="flex-1 p-3 bg-white text-black rounded-xl text-[8px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                                Book This
                            </button>
                            <button className="p-3 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-red-500 transition-all border border-white/10">
                                <Heart size={14} fill="white" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {!looks?.length && (
                <div className="col-span-full flex flex-col items-center justify-center py-32 text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 opacity-30">
                        <ImageIcon size={32} />
                    </div>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-8">No saved looks yet</p>
                    <Link to="/ai-makeover" className="bg-white text-black px-12 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary transition-all">
                        Launch AI Studio
                    </Link>
                </div>
            )}
        </div>
    </div>
);

export default AccountPage;
