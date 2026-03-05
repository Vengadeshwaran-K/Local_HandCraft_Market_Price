import React, { useState, useEffect, useContext } from 'react';
import api from '../api/api';
import { AuthContext } from '../App';
import { ShoppingBag, Package, Calendar, Tag, CreditCard, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) return;
        const fetchMyOrders = async () => {
            try {
                const response = await api.get(`/orders/my?email=${user.email}`);
                setOrders(response.data);
            } catch (err) {
                setError('Failed to load your orders.');
            } finally {
                setLoading(false);
            }
        };
        fetchMyOrders();
    }, [user]);

    if (loading) return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Loading your orders...</div>;

    return (
        <div style={{ padding: '100px 40px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
                <Package size={40} color="var(--primary)" />
                <h1 style={{ fontSize: '2.5rem' }}>My Orders</h1>
            </div>

            {error && <div style={{ color: 'var(--danger)', marginBottom: '20px' }}>{error}</div>}

            {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px', background: 'var(--glass)', borderRadius: '20px' }}>
                    <ShoppingBag size={60} style={{ opacity: 0.2, marginBottom: '20px' }} />
                    <h3 style={{ color: 'var(--muted)' }}>No orders found. Start shopping!</h3>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.href = '/'}
                        className="btn-primary"
                        style={{ width: 'auto', marginTop: '20px', padding: '12px 30px' }}
                    >
                        Go to Shop
                    </motion.button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {orders.map((order, idx) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            style={{
                                background: 'var(--glass)',
                                padding: '25px',
                                borderRadius: '15px',
                                border: '1px solid var(--glass-border)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '5px', height: '100%', background: 'var(--primary)' }}></div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.4rem', marginBottom: '10px', color: 'var(--primary)' }}>{order.productName}</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', color: 'var(--muted)', fontSize: '0.9rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <Tag size={16} /> {order.category}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <Calendar size={16} /> {order.createdAt}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <CreditCard size={16} /> {order.paymentMethod}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ textAlign: 'right' }}>
                                    <div style={{
                                        padding: '5px 15px',
                                        borderRadius: '20px',
                                        background: order.status === 'DELIVERED' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                                        color: order.status === 'DELIVERED' ? '#10b981' : '#3b82f6',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        marginBottom: '10px',
                                        display: 'inline-block'
                                    }}>
                                        {order.status}
                                    </div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Qty: {order.quantity}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
