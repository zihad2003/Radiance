import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Calendar, TrendingUp, CheckCircle, XCircle, Clock, LogOut, Lock } from 'lucide-react';
import { getBookings, updateBookingStatus, saveBooking } from '../../utils/storage';
import GlassCard from '../ui/GlassCard';
import PinkButton from '../ui/PinkButton';

const AdminLogin = ({ onLogin }) => {
    const [pin, setPin] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pin === '1234') { // Simple mock PIN
            onLogin();
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-pearl/90 backdrop-blur-md">
            <GlassCard className="w-full max-w-sm p-8 text-center">
                <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-primary/10 rounded-full">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>
                </div>
                <h3 className="text-2xl font-serif font-bold text-charcoal mb-2">Staff Portal</h3>
                <p className="text-gray-500 mb-6 text-sm">Enter access PIN to load dashboard</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        className={`w-full text-center text-3xl tracking-[1em] font-bold py-3 rounded-xl border-2 mb-6 focus:outline-none ${error ? 'border-red-400 bg-red-50 text-red-500' : 'border-gray-200 focus:border-primary'}`}
                        maxLength={4}
                        placeholder="••••"
                        autoFocus
                    />
                    <PinkButton type="submit" className="w-full justify-center">Access Dashboard</PinkButton>
                </form>
            </GlassCard>
        </div>
    );
};

const Dashboard = ({ onClose }) => {
    const [bookings, setBookings] = useState([]);
    const [stats, setStats] = useState({ revenue: 0, customers: 0, pending: 0 });
    const [filter, setFilter] = useState('all');

    const loadData = async () => {
        const data = await getBookings();

        // If empty, seed mock data
        if (data.length === 0) {
            const mockData = [
                { id: 'Booking-001', details: { name: 'Sarah Khan', phone: '01711000000' }, services: [{ name: 'Bridal Makeover', price: 15000 }], date: new Date(), time: '10:00 AM', status: 'pending' },
                { id: 'Booking-002', details: { name: 'Nusrat Jahan', phone: '01711000001' }, services: [{ name: 'Hair Spa', price: 2500 }], date: new Date(Date.now() - 86400000), time: '2:00 PM', status: 'completed' }
            ];
            mockData.forEach(saveBooking);
            setBookings(mockData);
        } else {
            setBookings(data);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        // Calculate stats
        const revenue = bookings.reduce((acc, b) => b.status === 'completed' ? acc + (b.totalPaid || b.services?.reduce((sAcc, s) => sAcc + s.price, 0) || 0) : acc, 0);
        const pending = bookings.filter(b => b.status === 'pending').length;
        setStats({
            revenue,
            customers: new Set(bookings.map(b => b.details.phone)).size,
            pending
        });
    }, [bookings]);

    const handleStatus = async (id, status) => {
        await updateBookingStatus(id, status);
        const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
        setBookings(updated);
    };

    const filteredBookings = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

    return (
        <div className="fixed inset-0 z-50 bg-[#F9FAFB] overflow-y-auto">
            {/* Top Bar */}
            <div className="bg-white px-8 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-serif font-bold">R</div>
                    <span className="font-bold text-gray-800">Radiance Admin</span>
                </div>
                <button onClick={onClose} className="flex items-center text-gray-500 hover:text-red-500 gap-2 text-sm font-medium transition-colors">
                    <LogOut size={16} /> Logout
                </button>
            </div>

            <div className="max-w-7xl mx-auto p-8">

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Total Revenue</p>
                            <h3 className="text-2xl font-bold text-charcoal">৳ {stats.revenue.toLocaleString()}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Unique Clients</p>
                            <h3 className="text-2xl font-bold text-charcoal">{stats.customers}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Pending Requests</p>
                            <h3 className="text-2xl font-bold text-charcoal">{stats.pending}</h3>
                        </div>
                    </div>
                </div>

                {/* Bookings Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h4 className="font-bold text-lg text-charcoal">Recent Bookings</h4>
                        <div className="flex gap-2">
                            {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-3 py-1 rounded-full text-xs font-bold capitalize transition-colors ${filter === f ? 'bg-charcoal text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-400 font-bold tracking-wider">
                                <tr>
                                    <th className="px-6 py-3">Client</th>
                                    <th className="px-6 py-3">Service</th>
                                    <th className="px-6 py-3">Date & Time</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredBookings.length > 0 ? filteredBookings.map((b) => (
                                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-charcoal text-sm">{b.details.name}</p>
                                            <p className="text-xs text-gray-400">{b.details.phone}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                {b.services && b.services.map((s, i) => (
                                                    <span key={i} className="text-sm text-gray-600">{s.name}</span>
                                                ))}
                                                {b.details.homeService && <span className="text-[10px] text-primary font-bold">Home Service</span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-600">{new Date(b.date).toLocaleDateString()}</p>
                                            <p className="text-xs text-gray-400">{b.time}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase
                                                ${b.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                                                    b.status === 'confirmed' ? 'bg-blue-100 text-blue-600' :
                                                        b.status === 'completed' ? 'bg-green-100 text-green-600' :
                                                            'bg-red-100 text-red-600'}
                                            `}>
                                                {b.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {b.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleStatus(b.id, 'confirmed')}
                                                            className="p-1 rounded bg-green-50 text-green-600 hover:bg-green-100" title="Approve"
                                                        >
                                                            <CheckCircle size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatus(b.id, 'cancelled')}
                                                            className="p-1 rounded bg-red-50 text-red-600 hover:bg-red-100" title="Reject"
                                                        >
                                                            <XCircle size={18} />
                                                        </button>
                                                    </>
                                                )}
                                                {b.status === 'confirmed' && (
                                                    <button
                                                        onClick={() => handleStatus(b.id, 'completed')}
                                                        className="px-3 py-1 rounded-full bg-charcoal text-white text-xs font-bold hover:bg-primary transition-colors"
                                                    >
                                                        Mark Done
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-400 italic">No bookings found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { AdminLogin, Dashboard };
