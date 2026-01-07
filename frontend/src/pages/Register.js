import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'seeker', fullName: '' });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData.email, formData.password, formData.role, formData.fullName);
      navigate('/dashboard');
    } catch (err) {
      alert('Registration failed. Email might already be taken.');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px' }}>
      <div className="card">
        <h2>Join JobPortal</h2>
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} required />
          <label>Email</label>
          <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          <label>Password</label>
          <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          <label>I am a:</label>
          <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
            <option value="seeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
          <button type="submit" style={{ width: '100%', marginTop: '1rem' }}>Register</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
