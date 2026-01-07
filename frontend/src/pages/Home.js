import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { MapPin, Clock, DollarSign, Search } from 'lucide-react';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ keyword: '', location: '', type: '' });
  const { user } = useContext(AuthContext);

  const fetchJobs = async () => {
    const params = new URLSearchParams(filters).toString();
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/jobs?${params}`);
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    if (!user) return alert('Please login to apply');
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/applications/${jobId}`);
      alert('Application submitted!');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to apply');
    }
  };

  return (
    <div className="container">
      <h1>Find Your Dream Job</h1>
      
      <div className="card" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <input 
          placeholder="Keyword (e.g. React)" 
          value={filters.keyword} 
          onChange={(e) => setFilters({...filters, keyword: e.target.value})}
          style={{ flex: 2 }}
        />
        <input 
          placeholder="Location" 
          value={filters.location} 
          onChange={(e) => setFilters({...filters, location: e.target.value})}
          style={{ flex: 1 }}
        />
        <select 
          value={filters.type} 
          onChange={(e) => setFilters({...filters, type: e.target.value})}
          style={{ flex: 1 }}
        >
          <option value="">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Remote">Remote</option>
          <option value="Contract">Contract</option>
        </select>
        <button onClick={fetchJobs}><Search size={20} /></button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        {jobs.map(job => (
          <div key={job.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>{job.title}</h3>
                <p style={{ color: 'var(--primary)', fontWeight: '600', margin: '0 0 1rem 0' }}>{job.company_name}</p>
              </div>
              {user?.role === 'seeker' && (
                <button onClick={() => handleApply(job.id)}>Apply Now</button>
              )}
            </div>
            <div style={{ display: 'flex', gap: '2rem', color: 'var(--secondary)', fontSize: '0.9rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={16}/> {job.location}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={16}/> {job.type}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><DollarSign size={16}/> {job.salary}</span>
            </div>
            <p style={{ marginTop: '1rem' }}>{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
