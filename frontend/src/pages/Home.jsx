import React, { useState, useEffect, useContext } from 'react';
import api from '../api/api';
import { AuthContext } from '../App';
import { ShoppingCart, Tag, Package, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [orderForm, setOrderForm] = useState({ quantity: 1, paymentMethod: 'CASH' });
    const [message, setMessage] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                setProducts(response.data);
            } catch (err) {
                setError('Failed to load products. Make sure the backend is running.');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleBuyClick = (product) => {
        if (!user) {
            window.location.href = '/login';
            return;
        }
        setSelectedProduct(product);
        setMessage('');
    };

    const handleConfirmOrder = async (e) => {
        e.preventDefault();
        try {
            const orderData = {
                productName: selectedProduct.name,
                category: selectedProduct.category,
                quantity: orderForm.quantity,
                paymentMethod: orderForm.paymentMethod
            };
            const response = await api.post('/orders', orderData);
            setMessage(response.data.message);
            setTimeout(() => {
                setSelectedProduct(null);
                setMessage('');
            }, 2000);
        } catch (err) {
            setMessage('Order failed: ' + (err.response?.data?.message || 'Unauthorized'));
        }
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--muted)' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                <Package size={40} />
            </motion.div>
        </div>
    );

    return (
        <div className="grid">
            {error && (
                <div style={{ gridColumn: '1 / -1', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <AlertCircle />
                    <span>{error}</span>
                </div>
            )}

            {products.length === 0 && !error && (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '100px', color: 'var(--muted)' }}>
                    <Package size={60} style={{ opacity: 0.3, marginBottom: '20px' }} />
                    <h3>No products available yet.</h3>
                    {user?.role === 'ROLE_ADMIN' && <p>Go to Dashboard to add some!</p>}
                </div>
            )}

            {products.map((product, idx) => (
                <motion.div
                    key={product.id || idx}
                    className="product-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                >
                    <div style={{ height: '200px', background: `linear-gradient(45deg, #1e293b, #334155)`, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                        <Package size={60} style={{ opacity: 0.2 }} />
                        <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
                            <span className="tag" style={{ background: 'var(--primary)', color: 'white' }}>{product.category}</span>
                        </div>
                    </div>
                    <div className="product-info">
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>{product.name}</h3>
                        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '15px', minHeight: '40px' }}>{product.description}</p>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="price">${product.price}</span>
                            <span style={{ fontSize: '0.8rem', color: product.stock > 0 ? 'var(--success)' : 'var(--danger)' }}>
                                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                            </span>
                        </div>

                        <button
                            className="btn-primary"
                            style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
                            onClick={() => handleBuyClick(product)}
                            disabled={product.stock <= 0}
                        >
                            <ShoppingCart size={18} /> Buy Now
                        </button>
                    </div>
                </motion.div>
            ))}

            {/* Modal for Order */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}
                    >
                        <motion.div
                            className="glass-card"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                        >
                            <h2 style={{ marginBottom: '20px' }}>Confirm Purchase</h2>
                            <p style={{ marginBottom: '20px' }}>You are buying: <strong>{selectedProduct.name}</strong></p>

                            {message && (
                                <div style={{
                                    padding: '12px', borderRadius: '8px', marginBottom: '20px',
                                    background: message.includes('Success') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                    color: message.includes('Success') ? '#10b981' : '#ef4444',
                                    display: 'flex', alignItems: 'center', gap: '10px'
                                }}>
                                    {message.includes('Success') ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                                    <span>{message}</span>
                                </div>
                            )}

                            {!message && (
                                <form onSubmit={handleConfirmOrder}>
                                    <div className="input-group">
                                        <label>Quantity</label>
                                        <input
                                            type="number"
                                            min="1"
                                            max={selectedProduct.stock}
                                            value={orderForm.quantity}
                                            onChange={(e) => setOrderForm({ ...orderForm, quantity: parseInt(e.target.value) })}
                                            required
                                        />
                                    </div>

                                    <div className="input-group">
                                        <label>Payment Method</label>
                                        <select
                                            value={orderForm.paymentMethod}
                                            onChange={(e) => setOrderForm({ ...orderForm, paymentMethod: e.target.value })}
                                        >
                                            <option value="CASH">Cash on Delivery</option>
                                            <option value="BANK_TRANSFER">Bank Transfer</option>
                                            <option value="CARD">Credit Card</option>
                                            <option value="UPI">UPI</option>
                                        </select>
                                    </div>

                                    <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
                                        <button type="button" onClick={() => setSelectedProduct(null)} style={{ flex: 1, padding: '12px', background: 'var(--glass)', color: 'white' }}>Cancel</button>
                                        <button type="submit" className="btn-primary" style={{ flex: 2 }}>Confirm Order</button>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
};

export default Home;
