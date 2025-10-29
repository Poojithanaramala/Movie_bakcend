const express = require('express');
const path = require('path');

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.join(__dirname, '../.env') });
}

// Verify critical environment variables
if (!process.env.MONGO_URL) {
  console.error('❌ FATAL ERROR: MONGO_URL is not defined in .env file');
  console.error('📍 Expected .env location:', path.join(__dirname, '../.env'));
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.warn('⚠️  WARNING: JWT_SECRET not found, using default (INSECURE)');
}

console.log('✅ Environment variables loaded');
console.log('📍 JWT Secret:', process.env.JWT_SECRET ? 'Configured' : 'Using default');

// Connect to database
require('./db/mongoose');

// Routes
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const cinemaRouter = require('./routes/cinema');
const showtimeRouter = require('./routes/showtime');
const reservationRouter = require('./routes/reservation');
const invitationsRouter = require('./routes/invitations');

const app = express();
app.disable('x-powered-by');
const port = process.env.PORT || 8080;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../client/build')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// CORS middleware
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-Access-Token, XKey, Authorization'
  );
  next();
});

app.use(express.json());

// 🔥 REQUEST LOGGING MIDDLEWARE - Add this before your routes
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const ip = req.ip || req.connection.remoteAddress;

  // Get the original send function
  const originalSend = res.send;

  // Override res.send to capture response
  res.send = function(data) {
    res.send = originalSend; // Restore original function
    
    // Log the response
    const statusCode = res.statusCode;
    const statusEmoji = statusCode < 300 ? '✅' : statusCode < 400 ? '🔄' : statusCode < 500 ? '⚠️' : '❌';
    
    console.log('\n' + '═'.repeat(80));
    console.log(`${statusEmoji} ${method} ${url}`);
    console.log('─'.repeat(80));
    console.log(`📅 Time: ${timestamp}`);
    console.log(`🌐 IP: ${ip}`);
    console.log(`📊 Status: ${statusCode}`);
    
    // Log request body for POST, PUT, PATCH
    if (['POST', 'PUT', 'PATCH'].includes(method) && req.body && Object.keys(req.body).length > 0) {
      console.log(`📥 Request Body:`);
      // Hide sensitive data
      const sanitizedBody = { ...req.body };
      if (sanitizedBody.password) sanitizedBody.password = '***HIDDEN***';
      if (sanitizedBody.token) sanitizedBody.token = '***HIDDEN***';
      console.log(JSON.stringify(sanitizedBody, null, 2));
    }
    
    // Log query parameters
    if (Object.keys(req.query).length > 0) {
      console.log(`🔍 Query Params:`, req.query);
    }
    
    // Log route parameters
    if (Object.keys(req.params).length > 0) {
      console.log(`🎯 Route Params:`, req.params);
    }
    
    // Log response for successful requests (optional - can be verbose)
    if (statusCode >= 200 && statusCode < 300 && url.includes('/api/')) {
      try {
        const responseData = typeof data === 'string' ? JSON.parse(data) : data;
        console.log(`📤 Response Preview:`, JSON.stringify(responseData, null, 2).substring(0, 200) + '...');
      } catch (e) {
        // Response is not JSON
      }
    }
    
    console.log('═'.repeat(80) + '\n');
    
    return originalSend.call(this, data);
  };

  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: require('mongoose').connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// API Routes
app.use(userRouter);
app.use(movieRouter);
app.use(cinemaRouter);
app.use(showtimeRouter);
app.use(reservationRouter);
app.use(invitationsRouter);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../../client/build/index.html');
  if (require('fs').existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Frontend not built. Run: cd client && npm run build');
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('\n' + '🔴'.repeat(40));
  console.error('❌ ERROR OCCURRED:');
  console.error('─'.repeat(80));
  console.error(`📍 URL: ${req.method} ${req.url}`);
  console.error(`⚠️  Message: ${err.message}`);
  console.error(`📚 Stack: ${err.stack}`);
  console.error('🔴'.repeat(40) + '\n');
  
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal server error'
    }
  });
});

app.listen(port, () => {
  console.log('═══════════════════════════════════════════════');
  console.log('🚀 MovieStore Server Started Successfully!');
  console.log('═══════════════════════════════════════════════');
  console.log(`📡 Server running on: http://localhost:${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 Health check: http://localhost:${port}/api/health`);
  console.log('═══════════════════════════════════════════════\n');
  console.log('📝 API Request Logging: ENABLED');
  console.log('🔍 Watching for incoming requests...\n');
});