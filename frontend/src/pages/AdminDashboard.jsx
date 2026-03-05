import React, { useState, useEffect, useContext } from 'react';
import api from '../api/api';
import { AuthContext } from '../App';
import { LayoutDashboard, Plus, Trash2, Edit2, Package, Save, X, AlertCircle, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', category: 'Handicrafts', price: 0, stock: 0 });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user?.role !== 'ROLE_ADMIN') return;
        const fetchData = async () => {
            try {
                const [pRes, oRes] = await Promise.all([
                    api.get('/products'),
                    api.get('/orders')
                ]);
                setProducts(pRes.data);
                setOrders(oRes.data);
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
            // Refresh
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
            setMessage('Delete failed: ' + (err.response?.data?.message || 'Unauthorized'));
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
                    Admin Dashboard
                </h1>
                <button
                    onClick={() => setIsAdding(true)}
                    className="btn-primary"
                    style={{ width: 'auto', padding: '12px 24px', display: 'flex', gap: '8px' }}
                >
                    <Plus size={20} /> Add New Product
                </button>
            </div>

            {message && <div style={{ background: 'var(--glass)', padding: '15px', borderRadius: '8px', marginBottom: '30px', borderLeft: '5px solid var(--primary)' }}>{message}</div>}

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '40px' }}>
                {/* Product Management */}
                <section>
                    <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><Package color="var(--secondary)" /> Inventory Management</h2>
                    <div style={{ background: 'var(--card)', borderRadius: '15px', padding: '10px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                                    <th style={{ padding: '15px' }}>Product</th>
                                    <th style={{ padding: '15px' }}>Category</th>
                                    <th style={{ padding: '15px' }}>Price</th>
                                    <th style={{ padding: '15px' }}>Stock</th>
                                    <th style={{ padding: '15px' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                        <td style={{ padding: '15px' }}><strong>{p.name}</strong></td>
                                        <td style={{ padding: '15px' }}>{p.category}</td>
                                        <td style={{ padding: '15px', color: 'var(--accent)' }}>${p.price}</td>
                                        <td style={{ padding: '15px' }}>{p.stock}</td>
                                        <td style={{ padding: '15px', display: 'flex', gap: '10px' }}>
                                            <button onClick={() => setEditingProduct(p)} style={{ background: 'var(--primary)', padding: '6px', borderRadius: '4px' }}><Edit2 size={16} /></button>
                                            <button onClick={() => handleDeleteProduct(p.id)} style={{ background: 'var(--danger)', padding: '6px', borderRadius: '4px' }}><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Orders Overview */}
                <section>
                    <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><ShoppingCart color="var(--accent)" /> Recent Orders</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {orders.map(o => (
                            <div key={o.id} style={{ background: 'var(--glass)', padding: '15px', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <strong>{o.productName}</strong>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{o.createdAt}</span>
                                </div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--muted)', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Qty: {o.quantity}</span>
                                    <span style={{ color: 'var(--success)' }}>{o.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Modals for Add/Edit */}
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
