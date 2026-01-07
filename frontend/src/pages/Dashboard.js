import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [newJob, setNewJob] = useState({ title: '', location: '', type: 'Full-time', description: '', salary: '' });

  const fetchData = async () => {
    const url = user.role === 'seeker' 
      ? `${process.env.REACT_APP_API_URL}/api/applications/my-applications`
      : `${process.env.REACT_APP_API_URL}/api/jobs?employer_id=${user.id}`;
    const res = await axios.get(url);
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/jobs`, newJob);
      setNewJob({ title: '', location: '', type: 'Full-time', description: '', salary: '' });
      fetchData();
      alert('Job posted successfully!');
    } catch (err) {
      alert('Failed to post job');
    }
  };

  return (
    <div className="container">
      <h1>{user.role === 'seeker' ? 'My Applications' : 'Employer Dashboard'}</h1>

      {user.role === 'employer' && (
        <div className="card">
          <h3>Post a New Job</h3>
          <form onSubmit={handleCreateJob}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input placeholder="Job Title" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} required />
              <input placeholder="Location" value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} required />
              <input placeholder="Salary" value={newJob.salary} onChange={e => setNewJob({...newJob, salary: e.target.value})} />
              <select value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value})}>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <textarea placeholder="Job Description" rows="4" value={newJob.description} onChange={e => setNewJob({...newJob, description: e.target.value})} required />
            <button type="submit">Post Job</button>
          </form>
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <h3>{user.role === 'seeker' ? 'Applied Jobs' : 'Your Listings'}</h3>
        {data.length === 0 ? <p>No records found.</p> : (
          data.map(item => (
            <div key={item.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: 0 }}>{user.role === 'seeker' ? item.title : item.title}</h4>
                  <p style={{ margin: '0.5rem 0', color: 'var(--secondary)' }}>{item.company_name || item.location}</p>
                </div>
                {user.role === 'seeker' && (
                  <span className={`badge badge-${item.status}`}>{item.status.toUpperCase()}</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
