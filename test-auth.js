const mongoose = require('mongoose');
require('dotenv').config();

const testConfigs = [
  // Test 1: Original
  {
    url: process.env.MONGO_URL,
    name: 'Original connection string'
  },
  // Test 2: Without appName
  {
    url: process.env.MONGO_URL.replace('&appName=Movie', ''),
    name: 'Without appName parameter'
  },
  // Test 3: With authSource
  {
    url: process.env.MONGO_URL.replace('?', '?authSource=admin&'),
    name: 'With explicit authSource=admin'
  },
  // Test 4: Minimal parameters
  {
    url: `mongodb+srv://admin:${process.env.MONGO_URL.split(':')[2].split('@')[0]}@movie.q3qwefi.mongodb.net/moviestore`,
    name: 'Minimal connection string'
  }
];

async function testAll() {
  console.log('🧪 Testing multiple connection configurations...\n');
  
  for (let i = 0; i < testConfigs.length; i++) {
    const config = testConfigs[i];
    console.log(`Test ${i + 1}: ${config.name}`);
    console.log(config.url.replace(/:[^:@]+@/, ':****@'));
    
    try {
      await mongoose.connect(config.url, {
        serverSelectionTimeoutMS: 8000,
        socketTimeoutMS: 45000,
      });
      
      console.log('✅✅✅ SUCCESS!\n');
      console.log(`Database: ${mongoose.connection.name}`);
      console.log(`Host: ${mongoose.connection.host}\n`);
      
      await mongoose.disconnect();
      console.log('🎉 Connection working! Use this configuration.\n');
      console.log('Update your .env with:');
      console.log(`MONGO_URL=${config.url}\n`);
      process.exit(0);
      
    } catch (err) {
      console.log(`❌ Failed: ${err.message}\n`);
      await mongoose.disconnect();
    }
  }
  
  console.log('❌ All tests failed. The issue is definitely Atlas configuration.');
  console.log('\n🔧 Final checklist:');
  console.log('1. Wait 5 FULL minutes after changing Atlas settings');
  console.log('2. Verify cluster shows ACTIVE (not paused)');
  console.log('3. Try accessing Atlas from a different browser/incognito');
  console.log('4. Check if you have multiple Atlas organizations/projects');
  process.exit(1);
}

testAll();