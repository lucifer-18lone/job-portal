const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

// Get all jobs with filters
router.get('/', async (req, res) => {
  const { location, type, keyword } = req.query;
  let query = 'SELECT jobs.*, profiles.company_name FROM jobs JOIN profiles ON jobs.employer_id = profiles.user_id WHERE 1=1';
  let params = [];
  let paramCount = 1;

  if (location) {
    query += ` AND location ILIKE $${paramCount++}`;
    params.push(`%${location}%`);
  }
  if (type) {
    query += ` AND type = $${paramCount++}`;
    params.push(type);
  }
  if (keyword) {
    query += ` AND (title ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
    params.push(`%${keyword}%`);
    paramCount++;
  }

  try {
    const jobs = await db.query(query, params);
    res.json(jobs.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create job (Employer only)
router.post('/', auth('employer'), async (req, res) => {
  const { title, description, location, type, salary, qualifications } = req.body;
  try {
    const newJob = await db.query(
      'INSERT INTO jobs (employer_id, title, description, location, type, salary, qualifications) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [req.user.id, title, description, location, type, salary, qualifications]
    );
    res.status(201).json(newJob.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
