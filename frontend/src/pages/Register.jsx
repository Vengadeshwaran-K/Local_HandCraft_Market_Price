import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import { UserPlus, Mail, Lock, Phone, MapPin, User, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        role: 'ROLE_USER'
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });
        try {
            const response = await api.post('/users/register', formData);
            if (response.data.message === 'User Created Successfully') {
                setMessage({ type: 'success', text: 'Registration successful! Redirecting to login...' });
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setMessage({ type: 'error', text: response.data.message });
            }
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Registration failed. Try again later.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <motion.div
                className="glass-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ maxWidth: '600px' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Join Local Mart</h2>
                    <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>The best marketplace for locally sourced products</p>
                </div>

                {message.text && (
                    <div style={{
                        background: message.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        border: `1px solid ${message.type === 'success' ? '#10b981' : '#ef4444'}`,
                        padding: '12px', borderRadius: '8px', marginBottom: '20px',
                        color: message.type === 'success' ? '#10b981' : '#ef4444',
                        display: 'flex', alignItems: 'center', gap: '10px'
                    }}>
                        {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        <span>{message.text}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div className="input-group" style={{ gridColumn: 'span 2' }}>
                        <label>Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                            <input name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} style={{ paddingLeft: '45px' }} required />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                            <input name="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} style={{ paddingLeft: '45px' }} required />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Phone Number</label>
                        <div style={{ position: 'relative' }}>
                            <Phone size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                            <input name="phone" placeholder="9876543210" value={formData.phone} onChange={handleChange} style={{ paddingLeft: '45px' }} required />
                        </div>
                    </div>

                    <div className="input-group" style={{ gridColumn: 'span 2' }}>
                        <label>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                            <input name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} style={{ paddingLeft: '45px' }} required />
                        </div>
                    </div>

                    <div className="input-group" style={{ gridColumn: 'span 2' }}>
                        <label>Address</label>
                        <div style={{ position: 'relative' }}>
                            <MapPin size={18} style={{ position: 'absolute', left: '16px', top: '15px', color: 'var(--muted)' }} />
                            <textarea name="address" placeholder="Residential Address" value={formData.address} onChange={handleChange} style={{ paddingLeft: '45px', minHeight: '80px', resize: 'vertical' }} required />
                        </div>
                    </div>

                    <div className="input-group" style={{ gridColumn: 'span 2' }}>
                        <label>Account Role</label>
                        <select name="role" value={formData.role} onChange={handleChange}>
                            <option value="ROLE_USER">User (Buyer)</option>
                            <option value="ROLE_ADMIN">Admin (Seller/Manager)</option>
                        </select>
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading} style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                        {loading ? 'Creating account...' : <><UserPlus size={20} /> Register</>}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--muted)', fontSize: '0.9rem' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
