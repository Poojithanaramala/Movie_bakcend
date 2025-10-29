const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

// Validate MongoDB URL
if (!MONGO_URL) {
  console.error("❌ MONGO_URL is not defined in .env file");
  process.exit(1);
}

// Connection options
const options = {
  serverSelectionTimeoutMS: 10000, // Increased from 5000
  socketTimeoutMS: 45000,
  family: 4, // Force IPv4
};

console.log("🔄 Connecting to MongoDB...");
console.log("📍 Database:", MONGO_URL.split('@')[1].split('/')[1].split('?')[0]);

// Connect to MongoDB
mongoose
  .connect(MONGO_URL, options)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    console.error("\n🔧 Troubleshooting steps:");
    console.error("1. Check if your IP is whitelisted in MongoDB Atlas");
    console.error("   Go to: Network Access → Add IP Address → Allow Access from Anywhere");
    console.error("2. Verify MONGO_URL in .env file");
    console.error("3. Ensure MongoDB Atlas cluster is ACTIVE (not paused)");
    console.error("4. Check your internet connection");
    console.error("5. Wait 2-3 minutes if you just changed Atlas settings");
    process.exit(1);
  });

// Handle connection events
mongoose.connection.on("connected", () => {
  console.log("🔗 Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Mongoose connection error:", err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠️  Mongoose disconnected from MongoDB");
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("👋 Mongoose connection closed due to app termination");
  process.exit(0);
});

module.exports = mongoose;