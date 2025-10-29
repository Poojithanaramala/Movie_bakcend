const net = require('net');
const dns = require('dns');

const hostname = 'movie.q3qwefi.mongodb.net';

console.log('🔍 Testing new cluster connectivity...\n');

// Test DNS
dns.resolveSrv(`_mongodb._tcp.${hostname}`, (err, addresses) => {
  if (err) {
    console.error('❌ DNS failed:', err.message);
  } else {
    console.log('✅ DNS resolved:', addresses.length, 'servers');
    
    // Test TCP connectivity to first server
    const server = addresses[0].name;
    console.log(`\n🔌 Testing TCP to ${server}:27017...`);
    
    const socket = new net.Socket();
    socket.setTimeout(5000);
    
    socket.on('connect', () => {
      console.log('✅ Port 27017 is REACHABLE!');
      console.log('👉 Network is fine, issue is likely Atlas configuration\n');
      socket.destroy();
      testMongoose();
    });
    
    socket.on('timeout', () => {
      console.log('❌ Connection TIMEOUT');
      console.log('👉 Firewall or ISP blocking port 27017\n');
      socket.destroy();
    });
    
    socket.on('error', (err) => {
      console.log('❌ Connection ERROR:', err.message);
      socket.destroy();
    });
    
    socket.connect(27017, server);
  }
});

function testMongoose() {
  const mongoose = require('mongoose');
  require('dotenv').config();
  
  console.log('🧪 Testing Mongoose connection...\n');
  
  mongoose.connect(process.env.MONGO_URL, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log('✅✅✅ SUCCESS! MongoDB connected!');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Mongoose failed:', err.message);
    console.log('\n📋 Checklist:');
    console.log('  ☐ Waited 3 minutes after adding IP whitelist?');
    console.log('  ☐ IP shows ACTIVE (green) in Network Access?');
    console.log('  ☐ User "admin" exists in Database Access?');
    console.log('  ☐ Cluster shows ACTIVE status?');
    process.exit(1);
  });
}


