const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

// Apply for a job (Seeker only)
router.post('/:jobId', auth('seeker'), async (req, res) => {
  try {
    const existing = await db.query(
      'SELECT * FROM applications WHERE job_id = $1 AND seeker_id = $2',
      [req.params.jobId, req.user.id]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Already applied' });
    }

    const application = await db.query(
      'INSERT INTO applications (job_id, seeker_id) VALUES ($1, $2) RETURNING *',
      [req.params.jobId, req.user.id]
    );
    res.json(application.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get seeker's applications
router.get('/my-applications', auth('seeker'), async (req, res) => {
  try {
    const apps = await db.query(
      'SELECT a.*, j.title, j.location, p.company_name FROM applications a JOIN jobs j ON a.job_id = j.id JOIN profiles p ON j.employer_id = p.user_id WHERE a.seeker_id = $1',
      [req.user.id]
    );
    res.json(apps.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update application status (Employer only)
router.patch('/:appId', auth('employer'), async (req, res) => {
  const { status } = req.body;
  try {
    const updated = await db.query(
      'UPDATE applications SET status = $1 WHERE id = $2 RETURNING *',
      [status, req.params.appId]
    );
    
    // Emit real-time notification via Socket.io handled in server.js
    const io = req.app.get('socketio');
    io.to(`user_${updated.rows[0].seeker_id}`).emit('status_change', {
      applicationId: req.params.appId,
      status: status
    });

    res.json(updated.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
