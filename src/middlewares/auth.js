const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Get JWT secret from environment or use fallback
const JWT_SECRET = process.env.JWT_SECRET || 'mySecret';

if (!process.env.JWT_SECRET) {
  console.warn('⚠️  WARNING: Using default JWT secret. Set JWT_SECRET in .env for production!');
}

const simple = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      return res.status(401).send({ error: 'No authorization header provided.' });
    }
    
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });
    
    if (!user) {
      throw new Error('User not found or token invalid');
    }
    
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    console.error('Authentication error:', e.message);
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

const enhance = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      return res.status(401).send({ error: 'No authorization header provided.' });
    }
    
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    if (user.role !== 'superadmin') {
      return res.status(403).send({ 
        error: 'Access denied. Superadmin privileges required.' 
      });
    }
    
    req.token = token;
    req.user = user;
    console.log('✅ Authenticated as superadmin:', req.user.username);
    next();
  } catch (e) {
    console.error('Admin authentication error:', e.message);
    res.status(401).send({ error: 'Please authenticate as superadmin.' });
  }
};

module.exports = { simple, enhance };