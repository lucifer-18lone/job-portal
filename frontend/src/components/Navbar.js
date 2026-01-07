import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Briefcase } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'var(--primary)', fontWeight: 'bold' }}>
        <Briefcase size={24} />
        <span>JobPortal</span>
      </Link>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Find Jobs</Link>
        {user ? (
          <>
            <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard</Link>
            <button onClick={handleLogout} style={{ backgroundColor: 'transparent', color: 'var(--danger)', padding: 0 }}>Logout</button>
            <span style={{ fontSize: '0.8rem', color: 'var(--secondary)' }}>{user.email} ({user.role})</span>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link>
            <Link to="/register"><button>Sign Up</button></Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
