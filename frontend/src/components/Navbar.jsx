import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { ShoppingBag, LogOut, User, LayoutDashboard, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="nav">
            <Link to="/" className="nav-brand">LOCAL MART</Link>

            <div className="nav-links">
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', color: 'inherit' }}>
                    <ShoppingBag size={20} />
                    <span>Shop</span>
                </Link>

                {user ? (
                    <>
                        {user.role === 'ROLE_ADMIN' && (
                            <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', color: 'inherit' }}>
                                <LayoutDashboard size={20} />
                                <span>Dashboard</span>
                            </Link>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{user.email}</span>
                            <button
                                onClick={handleLogout}
                                style={{ background: 'var(--danger)', color: 'white', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '5px' }}
                            >
                                <LogOut size={18} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', color: 'inherit' }}>
                            <LogIn size={20} />
                            <span>Login</span>
                        </Link>
                        <Link to="/register" style={{ display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', color: 'inherit' }}>
                            <UserPlus size={20} />
                            <span>Register</span>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
