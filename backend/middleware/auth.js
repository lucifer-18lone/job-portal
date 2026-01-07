const jwt = require('jsonwebtoken');

const auth = (roleRequired) => {
  return (req, res, next) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roleRequired && req.user.role !== roleRequired) {
        return res.status(403).json({ error: 'Access denied: insufficient permissions' });
      }

      next();
    } catch (err) {
      res.status(401).json({ error: 'Token is not valid' });
    }
  };
};

module.exports = auth;
