import React, { useState, useEffect, useContext } from 'react';
import api from '../api/api';
import { AuthContext } from '../App';
import { LayoutDashboard, Plus, Trash2, Edit2, Package, Save, X, AlertCircle, ShoppingCart, Users, Check, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', category: 'Handicrafts', price: 0, stock: 0 });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [activeTab, setActiveTab] = useState('inventory');

    useEffect(() => {
        if (user?.role !== 'ROLE_ADMIN') return;
        const fetchData = async () => {
            try {
                const [pRes, oRes, uRes] = await Promise.all([
                    api.get('/products'),
                    api.get('/orders'),
                    api.get('/users/allUsers')
                ]);
                setProducts(pRes.data);
                setOrders(oRes.data);
                setUsersList(uRes.data);
            } catch (err) {
                console.error('Failed to fetch admin data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await api.post('/products', newProduct);
            setMessage('Product added successfully!');
            setIsAdding(false);
            setNewProduct({ name: '', description: '', category: 'Handicrafts', price: 0, stock: 0 });
            const res = await api.get('/products');
            setProducts(res.data);
        } catch (err) {
            setMessage('Failed to add product');
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await api.delete(`/products/${id}`);
            setProducts(products.filter(p => p.id !== id));
            setMessage('Product deleted');
        } catch (err) {
            setMessage('Delete failed');
        }
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            await api.put('/products', editingProduct);
            setMessage('Product updated!');
            setEditingProduct(null);
            const res = await api.get('/products');
            setProducts(res.data);
        } catch (err) {
            setMessage('Update failed');
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await api.delete(`/users/${id}`);
            setUsersList(usersList.filter(u => u.id !== id));
            setMessage('User deleted');
        } catch (err) {
            setMessage('Failed to delete user');
        }
    };

    const handleDeleteOrder = async (id) => {
        if (!window.confirm('Delete this order record?')) return;
        try {
            await api.delete(`/orders/${id}`);
            setOrders(orders.filter(o => o.id !== id));
            setMessage('Order deleted');
        } catch (err) {
            setMessage('Failed to delete order');
        }
    };

    if (user?.role !== 'ROLE_ADMIN') return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--danger)' }}>
            <AlertCircle size={40} />
            <span style={{ marginLeft: '10px', fontSize: '1.5rem' }}>Access Denied. Admins Only.</span>
        </div>
    );

    if (loading) return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Loading Admin Console...</div>;

    return (
        <div style={{ padding: '100px 40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h1 style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <LayoutDashboard size={40} color="var(--primary)" />
                    Admin Console
                </h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => setActiveTab('inventory')} className={`btn-primary ${activeTab === 'inventory' ? '' : 'btn-outline'}`} style={{ width: 'auto' }}>Inventory</button>
                    <button onClick={() => setActiveTab('orders')} className={`btn-primary ${activeTab === 'orders' ? '' : 'btn-outline'}`} style={{ width: 'auto' }}>Orders</button>
                    <button onClick={() => setActiveTab('users')} className={`btn-primary ${activeTab === 'users' ? '' : 'btn-outline'}`} style={{ width: 'auto' }}>Users</button>
                </div>
            </div>

            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    style={{ background: 'var(--glass)', padding: '15px', borderRadius: '8px', marginBottom: '30px', borderLeft: '5px solid var(--primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                    {message}
                    <X size={18} style={{ cursor: 'pointer' }} onClick={() => setMessage('')} />
                </motion.div>
            )}

            <AnimatePresence mode="wait">
                {activeTab === 'inventory' && (
                    <motion.section key="inventory" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Package color="var(--secondary)" /> Inventory Management</h2>
                            <button onClick={() => setIsAdding(true)} className="btn-primary" style={{ width: 'auto', padding: '8px 20px' }}><Plus size={18} /> Add Product</button>
                        </div>
                        <div className="glass-card" style={{ padding: '0', overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
                                <thead style={{ background: 'rgba(255,255,255,0.05)' }}>
                                    <tr>
                                        <th style={{ padding: '15px', textAlign: 'left' }}>Product</th>
                                        <th style={{ padding: '15px', textAlign: 'left' }}>Category</th>
                                        <th style={{ padding: '15px', textAlign: 'left' }}>Price</th>
                                        <th style={{ padding: '15px', textAlign: 'left' }}>Stock</th>
                                        <th style={{ padding: '15px', textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(p => (
                                        <tr key={p.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                            <td style={{ padding: '15px' }}><strong>{p.name}</strong></td>
                                            <td style={{ padding: '15px' }}>{p.category}</td>
                                            <td style={{ padding: '15px', color: 'var(--accent)' }}>${p.price}</td>
                                            <td style={{ padding: '15px' }}>{p.stock}</td>
                                            <td style={{ padding: '15px', textAlign: 'right' }}>
                                                <button onClick={() => setEditingProduct(p)} style={{ background: 'var(--primary)', padding: '6px', borderRadius: '4px', marginRight: '5px' }}><Edit2 size={16} /></button>
                                                <button onClick={() => handleDeleteProduct(p.id)} style={{ background: 'var(--danger)', padding: '6px', borderRadius: '4px' }}><Trash2 size={16} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.section>
                )}

                {activeTab === 'orders' && (
                    <motion.section key="orders" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                        <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><ShoppingCart color="var(--accent)" /> Order Management</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                            {orders.map(o => (
                                <div key={o.id} className="glass-card" style={{ padding: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                        <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>ORD #{o.id}</span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{o.createdAt}</span>
                                    </div>
                                    <h3 style={{ marginBottom: '5px' }}>{o.productName}</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '15px' }}>Customer: {o.userEmail}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                        <span>Qty: {o.quantity}</span>
                                        <span style={{ padding: '4px 10px', borderRadius: '4px', background: 'var(--glass)', fontSize: '0.8rem', color: 'var(--accent)' }}>{o.status}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button onClick={() => handleDeleteOrder(o.id)} style={{ background: 'var(--danger)', padding: '8px', borderRadius: '6px', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                                            <Trash2 size={16} /> Delete Order
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {activeTab === 'users' && (
                    <motion.section key="users" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                        <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><Users color="var(--primary)" /> User Accounts</h2>
                        <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
                                <thead style={{ background: 'rgba(255,255,255,0.05)' }}>
                                    <tr>
                                        <th style={{ padding: '15px', textAlign: 'left' }}>User</th>
                                        <th style={{ padding: '15px', textAlign: 'left' }}>Email</th>
                                        <th style={{ padding: '15px', textAlign: 'left' }}>Role</th>
                                        <th style={{ padding: '15px', textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersList.map(u => (
                                        <tr key={u.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                            <td style={{ padding: '15px' }}>{u.name}</td>
                                            <td style={{ padding: '15px' }}>{u.email}</td>
                                            <td style={{ padding: '15px' }}><span className="tag">{u.role || 'ROLE_USER'}</span></td>
                                            <td style={{ padding: '15px', textAlign: 'right' }}>
                                                <button onClick={() => handleDeleteUser(u.id)} disabled={u.email === user.email} style={{ background: 'var(--danger)', padding: '6px', borderRadius: '4px', opacity: u.email === user.email ? 0.5 : 1 }}><Trash2 size={16} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Modals for Add/Edit Product */}
            <AnimatePresence>
                {(isAdding || editingProduct) && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 3000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <motion.div
                            className="glass-card"
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                        >
                            <h2 style={{ marginBottom: '30px' }}>{isAdding ? 'Add New Product' : 'Edit Product'}</h2>
                            <form onSubmit={isAdding ? handleAddProduct : handleUpdateProduct}>
                                <div className="input-group">
                                    <label>Product Name</label>
                                    <input value={isAdding ? newProduct.name : editingProduct.name} onChange={(e) => isAdding ? setNewProduct({ ...newProduct, name: e.target.value }) : setEditingProduct({ ...editingProduct, name: e.target.value })} required />
                                </div>
                                <div className="input-group">
                                    <label>Description</label>
                                    <textarea value={isAdding ? newProduct.description : editingProduct.description} onChange={(e) => isAdding ? setNewProduct({ ...newProduct, description: e.target.value }) : setEditingProduct({ ...editingProduct, description: e.target.value })} required />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                    <div className="input-group">
                                        <label>Price ($)</label>
                                        <input type="number" value={isAdding ? newProduct.price : editingProduct.price} onChange={(e) => isAdding ? setNewProduct({ ...newProduct, price: parseInt(e.target.value) }) : setEditingProduct({ ...editingProduct, price: parseInt(e.target.value) })} required />
                                    </div>
                                    <div className="input-group">
                                        <label>Stock</label>
                                        <input type="number" value={isAdding ? newProduct.stock : editingProduct.stock} onChange={(e) => isAdding ? setNewProduct({ ...newProduct, stock: parseInt(e.target.value) }) : setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })} required />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label>Category</label>
                                    <input value={isAdding ? newProduct.category : editingProduct.category} onChange={(e) => isAdding ? setNewProduct({ ...newProduct, category: e.target.value }) : setEditingProduct({ ...editingProduct, category: e.target.value })} required />
                                </div>

                                <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
                                    <button type="button" onClick={() => { setIsAdding(false); setEditingProduct(null); }} className="btn-primary" style={{ flex: 1, background: 'var(--glass)' }}><X size={18} /> Cancel</button>
                                    <button type="submit" className="btn-primary" style={{ flex: 2 }}><Save size={18} /> {isAdding ? 'Save Product' : 'Update Product'}</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
