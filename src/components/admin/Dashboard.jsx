import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Calendar, TrendingUp, CheckCircle, XCircle, Clock, LogOut, Lock, Plus, Trash2, Edit, Search, Image as ImageIcon, Save } from 'lucide-react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import GlassCard from '../ui/GlassCard';
import PinkButton from '../ui/PinkButton';
import Logo from '../ui/Logo';

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


const ProductModal = ({ product, onSave, onClose }) => {
    const [formData, setFormData] = useState(product || {
        id: '', name: '', brand: '', category: 'makeup', type: 'lipstick',
        hex: '#000000', finish: 'matte', price: 0, priceUSD: 0,
        description: '', ingredients: [], skinType: ['all'], texture: 'cream',
        rating: 5, reviews: 0, inStock: true, architecture: {}, image: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) : value)
        }));
    };

    // Auto-format image URL if it's just an ID
    const handleImageBlur = () => {
        if (formData.image && !formData.image.startsWith('http')) {
            setFormData(prev => ({
                ...prev,
                image: `https://images.unsplash.com/${formData.image}?w=800&q=80`
            }));
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-serif font-bold text-charcoal">{product ? 'Edit Product' : 'Add New Product'}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><XCircle size={24} /></button>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Product Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Brand</label>
                        <input name="brand" value={formData.brand} onChange={handleChange} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Price (BDT)</label>
                        <input name="price" type="number" value={formData.price} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Image URL / ID</label>
                        <input name="image" value={formData.image} onChange={handleChange} onBlur={handleImageBlur} placeholder="Unsplash ID or Full URL" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary h-24" />
                    </div>

                    <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                        <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all">Cancel</button>
                        <PinkButton type="submit"><Save size={18} /> Save Product</PinkButton>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

const ItemModal = ({ type, item, onSave, onClose }) => {
    const [formData, setFormData] = useState(item || {
        name: '', image: '', brand: '', category: '', price: 0, description: '', id: `new_${Date.now()}`,
        // Extra fields for stylists
        role: '', bio: '', specialty: [], rating: 5, available: true,
        // Extra fields for products
        inStock: true, type: '', hex: '#000000', finish: 'matte'
    });

    const handleImageBlur = () => {
        if (formData.image && !formData.image.startsWith('http') && !formData.image.startsWith('data:')) {
            setFormData(prev => ({ ...prev, image: `https://images.unsplash.com/${formData.image}?w=800&q=80` }));
        }
    };

    const handleChange = (e) => {
        const { name, value, type: eType, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: eType === 'checkbox' ? checked : (eType === 'number' ? parseFloat(value) : value)
        }));
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
                <div className="mx-auto max-w-md">
                    <h3 className="text-2xl font-serif font-bold text-charcoal mb-6 text-center capitalize">{item ? 'Edit' : 'Add'} {type}</h3>
                    <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Name</label>
                            <input name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Image (ID or URL)</label>
                            <input name="image" value={formData.image} onChange={handleChange} onBlur={handleImageBlur} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
                        </div>
                        {type === 'product' && (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Brand</label>
                                    <input name="brand" value={formData.brand} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Price (BDT)</label>
                                    <input name="price" type="number" value={formData.price} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
                                </div>
                            </div>
                        )}
                        {type === 'stylist' && (
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Role</label>
                                <input name="role" value={formData.role} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
                            </div>
                        )}
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Description / Bio</label>
                            <textarea name={type === 'stylist' ? 'bio' : 'description'} value={type === 'stylist' ? formData.bio : formData.description} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl h-24" />
                        </div>
                        <div className="flex justify-end gap-3 pt-4">
                            <button type="button" onClick={onClose} className="px-6 py-2 text-gray-500 font-bold">Cancel</button>
                            <PinkButton type="submit">Save Changes</PinkButton>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

const Dashboard = ({ onClose }) => {
    const bookings = useQuery(api.bookings.getBookings) || [];
    const orders = useQuery(api.orders.listOrders) || [];
    const products = useQuery(api.products.list) || [];
    const services = useQuery(api.services.list) || [];
    const stylists = useQuery(api.stylists.list) || [];

    const upsertProduct = useMutation(api.products.addProduct);
    const deleteProduct = useMutation(api.products.deleteProduct);
    const upsertService = useMutation(api.services.addService);
    const deleteService = useMutation(api.services.deleteService);
    const upsertStylist = useMutation(api.stylists.addStylist);
    const deleteStylist = useMutation(api.stylists.deleteStylist);

    const [view, setView] = useState('bookings');
    const [filter, setFilter] = useState('all');
    const [modal, setModal] = useState({ open: false, type: '', item: null });

    const handleSave = async (data) => {
        if (modal.type === 'product') await upsertProduct(data);
        if (modal.type === 'service') await upsertService(data);
        if (modal.type === 'stylist') await upsertStylist(data);
        setModal({ open: false, type: '', item: null });
    };

    const handleDelete = async (item) => {
        if (!confirm(`Delete ${item.name}?`)) return;
        if (view === 'products') await deleteProduct({ id: item._id });
        if (view === 'services') await deleteService({ id: item._id });
        if (view === 'stylists') await deleteStylist({ id: item._id });
    };

    return (
        <div className="fixed inset-0 z-50 bg-[#F9FAFB] overflow-y-auto font-sans">
            <div className="bg-white px-8 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-6">
                    <Logo size="sm" />
                    <nav className="flex gap-2 bg-gray-100 p-1 rounded-xl">
                        {['bookings', 'orders', 'products', 'services', 'stylists', 'assets'].map(v => (
                            <button key={v} onClick={() => setView(v)} className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${view === v ? 'bg-white text-charcoal shadow-sm' : 'text-gray-500'}`}>{v}</button>
                        ))}
                    </nav>
                </div>
                <button onClick={onClose} className="text-gray-500 hover:text-red-500 flex items-center gap-2 text-sm">
                    <LogOut size={16} /> Logout
                </button>
            </div>

            <div className="max-w-7xl mx-auto p-8">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                        <h4 className="text-xl font-serif font-bold text-charcoal capitalize">{view} Management</h4>
                        {['products', 'services', 'stylists'].includes(view) && (
                            <button onClick={() => setModal({ open: true, type: view.slice(0, -1), item: null })} className="bg-primary text-black px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2">
                                <Plus size={18} /> Add {view.slice(0, -1)}
                            </button>
                        )}
                    </div>

                    <div className="p-4">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-[10px] uppercase font-black tracking-widest text-gray-400">
                                <tr>
                                    <th className="px-6 py-4">Identity</th>
                                    <th className="px-6 py-4">Details</th>
                                    <th className="px-6 py-4">Status/Price</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {(view === 'products' ? products : view === 'services' ? services : view === 'stylists' ? stylists : []).map(item => (
                                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-gray-100 overflow-hidden border border-gray-100 shrink-0">
                                                <img src={item.image || '/placeholder-product.jpg'} className="w-full h-full object-cover" alt="" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-charcoal">{item.name}</p>
                                                <p className="text-[10px] text-gray-400 font-mono">{item.id}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-600 line-clamp-1">{item.role || item.category || item.description}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.price ? <span className="font-bold text-sm">৳{item.price.toLocaleString()}</span> :
                                                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${item.available !== false ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                                    {item.available !== false ? 'Active' : 'Inactive'}
                                                </span>}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => setModal({ open: true, type: view.slice(0, -1), item: item })} className="p-2 text-gray-400 hover:text-blue-500"><Edit size={18} /></button>
                                                <button onClick={() => handleDelete(item)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {/* Render Bookings/Orders similar to previous implementation but refactored */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {modal.open && <ItemModal type={modal.type} item={modal.item} onSave={handleSave} onClose={() => setModal({ open: false, type: '', item: null })} />}
        </div>
    );
};

export { AdminLogin, Dashboard };
