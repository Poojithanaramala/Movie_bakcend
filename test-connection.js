const mongoose = require("mongoose");
const dns = require('dns');
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

console.log("🔍 Debugging MongoDB Connection...\n");
console.log("Connection String:", MONGO_URL.replace(/:[^:@]+@/, ':****@')); // Hide password

// Test DNS first
if (MONGO_URL.includes('mongodb+srv://')) {
  const hostname = MONGO_URL.split('@')[1].split('/')[0];
  console.log(`\n📡 Testing DNS resolution for: _mongodb._tcp.${hostname}`);
  
  dns.resolveSrv(`_mongodb._tcp.${hostname}`, (err, addresses) => {
    if (err) {
      console.error('❌ DNS resolution failed:', err.message);
      console.log('💡 Try using standard connection string instead of SRV\n');
    } else {
      console.log('✅ DNS resolution successful');
      console.log('Found servers:', addresses.map(a => `${a.name}:${a.port}`).join(', '), '\n');
    }
    attemptConnection();
  });
} else {
  attemptConnection();
}

function attemptConnection() {
  const options = {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  };

  console.log("🔌 Attempting MongoDB connection...\n");

  mongoose
    .connect(MONGO_URL, options)
    .then(() => {
      console.log("✅ MongoDB connected successfully!");
      console.log(`📊 Database: ${mongoose.connection.name}`);
      console.log(`🌐 Host: ${mongoose.connection.host}`);
      process.exit(0);
    })
    .catch((err) => {
      console.error("❌ Connection failed:", err.message);
      console.error("\n🔧 Troubleshooting checklist:");
      console.error("☐ IP 0.0.0.0/0 whitelisted in Atlas Network Access");
      console.error("☐ Cluster is Active (not paused)");
      console.error("☐ Database user credentials are correct");
      console.error("☐ Try standard connection string (not SRV)");
      console.error("☐ Check firewall/antivirus settings");
      console.error("☐ Try from different network (mobile hotspot)");
      process.exit(1);
    });
}