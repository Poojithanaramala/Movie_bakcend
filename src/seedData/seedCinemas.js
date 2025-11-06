// server/seedData/seedCinemas.js
const mongoose = require('mongoose');
require('dotenv').config();
require('../db/mongoose');
const Cinema = require('../models/cinema');

// Helper function to generate seat layout
const generateSeats = (rows, seatsPerRow) => {
  const seats = [];
  const rowLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 1; j <= seatsPerRow; j++) {
      row.push({
        row: rowLetters[i],
        number: j,
        status: 'available'
      });
    }
    seats.push(row);
  }
  
  return seats;
};

const cinemas = [
  // Hyderabad Cinemas (Telugu)
  {
    name: "pvr cinemas prasads imax",
    ticketPrice: 350,
    city: "hyderabad",
    seats: generateSeats(8, 12),
    seatsAvailable: 96,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500"
  },
  {
    name: "inox gvk one mall",
    ticketPrice: 300,
    city: "hyderabad",
    seats: generateSeats(7, 10),
    seatsAvailable: 70,
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500"
  },
  {
    name: "asian gprs cinemas",
    ticketPrice: 250,
    city: "hyderabad",
    seats: generateSeats(6, 10),
    seatsAvailable: 60,
    image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500"
  },
  
  // Vijayawada Cinemas
  {
    name: "pvr vijayawada",
    ticketPrice: 280,
    city: "vijayawada",
    seats: generateSeats(7, 11),
    seatsAvailable: 77,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500"
  },
  {
    name: "asian cine square",
    ticketPrice: 200,
    city: "vijayawada",
    seats: generateSeats(6, 9),
    seatsAvailable: 54,
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500"
  },
  
  // Mumbai Cinemas (Hindi)
  {
    name: "pvr phoenix palladium",
    ticketPrice: 450,
    city: "mumbai",
    seats: generateSeats(9, 14),
    seatsAvailable: 126,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500"
  },
  {
    name: "inox megaplex inorbit",
    ticketPrice: 400,
    city: "mumbai",
    seats: generateSeats(8, 13),
    seatsAvailable: 104,
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500"
  },
  {
    name: "cinepolis fun republic",
    ticketPrice: 380,
    city: "mumbai",
    seats: generateSeats(8, 12),
    seatsAvailable: 96,
    image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500"
  },
  
  // Delhi Cinemas
  {
    name: "pvr saket",
    ticketPrice: 420,
    city: "delhi",
    seats: generateSeats(8, 13),
    seatsAvailable: 104,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500"
  },
  {
    name: "cinepolis dlf place",
    ticketPrice: 390,
    city: "delhi",
    seats: generateSeats(7, 12),
    seatsAvailable: 84,
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500"
  },
  
  // Chennai Cinemas (Tamil)
  {
    name: "pvr grand galada",
    ticketPrice: 320,
    city: "chennai",
    seats: generateSeats(8, 11),
    seatsAvailable: 88,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500"
  },
  {
    name: "rohini silver screens",
    ticketPrice: 280,
    city: "chennai",
    seats: generateSeats(7, 10),
    seatsAvailable: 70,
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500"
  },
  {
    name: "inox marina mall",
    ticketPrice: 300,
    city: "chennai",
    seats: generateSeats(7, 11),
    seatsAvailable: 77,
    image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500"
  },
  
  // Bangalore Cinemas
  {
    name: "pvr forum mall",
    ticketPrice: 380,
    city: "bangalore",
    seats: generateSeats(8, 12),
    seatsAvailable: 96,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500"
  },
  {
    name: "inox mantri square",
    ticketPrice: 350,
    city: "bangalore",
    seats: generateSeats(7, 11),
    seatsAvailable: 77,
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500"
  },
  {
    name: "cinepolis royal meenakshi",
    ticketPrice: 320,
    city: "bangalore",
    seats: generateSeats(7, 10),
    seatsAvailable: 70,
    image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500"
  },
];

const seedCinemas = async () => {
  try {
    console.log('🎭 Starting to seed cinemas...');
    
    // Clear existing cinemas
    await Cinema.deleteMany({});
    console.log('🗑️  Cleared existing cinemas');
    
    // Insert new cinemas
    const insertedCinemas = await Cinema.insertMany(cinemas);
    console.log(`✅ Successfully inserted ${insertedCinemas.length} cinemas`);
    
    // Display summary
    console.log('\n📊 Cinemas Summary by City:');
    const cities = [...new Set(cinemas.map(c => c.city))];
    cities.forEach(city => {
      const count = cinemas.filter(c => c.city === city).length;
      console.log(`- ${city}: ${count} cinemas`);
    });
    
    console.log('\n🎉 Cinema seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding cinemas:', error);
    process.exit(1);
  }
};

seedCinemas();