// server/seedData/seedAll.js
const mongoose = require('mongoose');
require('dotenv').config();
require('../db/mongoose');

const Movie = require('../models/movie');
const Cinema = require('../models/cinema');
const Showtime = require('../models/showtime');

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

// Movies Data
const movies = [
  // Telugu Movies
  {
    title: "ninnu kori",
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=500",
    language: "telugu",
    genre: "romance, drama",
    director: "shiva nirvana",
    cast: "nani, nivetha thomas, aadhi pinisetty",
    description: "a romantic drama about love, sacrifice, and the complexity of relationships",
    duration: 125,
    releaseDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
  },
  {
    title: "baahubali 2",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500",
    language: "telugu",
    genre: "action, drama, fantasy",
    director: "s.s. rajamouli",
    cast: "prabhas, rana daggubati, anushka shetty",
    description: "the epic conclusion to the baahubali saga with stunning visuals and action",
    duration: 167,
    releaseDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
  },
  {
    title: "arjun reddy",
    image: "https://images.unsplash.com/photo-1574267432644-f610dd5e9a5f?w=500",
    language: "telugu",
    genre: "drama, romance",
    director: "sandeep reddy vanga",
    cast: "vijay deverakonda, shalini pandey",
    description: "a passionate love story of a short-tempered surgeon and his descent into self-destruction",
    duration: 182,
    releaseDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
  },
  {
    title: "pushpa",
    image: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=500",
    language: "telugu",
    genre: "action, thriller",
    director: "sukumar",
    cast: "allu arjun, rashmika mandanna, fahadh faasil",
    description: "the rise of a coolie in the red sandalwood smuggling syndicate",
    duration: 179,
    releaseDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
  },
  // Hindi Movies
  {
    title: "3 idiots",
    language: "hindi",
    genre: "comedy, drama",
    director: "rajkumar hirani",
    cast: "aamir khan, r madhavan, sharman joshi",
    description: "three engineering students navigate college life, friendship, and the pursuit of true passion",
    duration: 170,
    releaseDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
  },
  {
    title: "dangal",
    language: "hindi",
    genre: "sports, drama, biography",
    director: "nitesh tiwari",
    cast: "aamir khan, fatima sana shaikh",
    description: "a former wrestler trains his daughters to become world-class wrestlers",
    duration: 161,
    releaseDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
  },
  // English Movies
  {
    title: "inception",
    language: "english",
    genre: "sci-fi, thriller, action",
    director: "christopher nolan",
    cast: "leonardo dicaprio, tom hardy, ellen page",
    description: "a thief who enters dreams to steal secrets must plant an idea in someone's mind",
    duration: 148,
    releaseDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
  },
  {
    title: "the dark knight",
    language: "english",
    genre: "action, crime, thriller",
    director: "christopher nolan",
    cast: "christian bale, heath ledger, aaron eckhart",
    description: "batman faces his greatest challenge yet in the form of the joker",
    duration: 152,
    releaseDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
  },
];

// Cinemas Data
const cinemas = [
  // Hyderabad
  {
    name: "pvr cinemas prasads imax",
    ticketPrice: 350,
    city: "hyderabad",
    seats: generateSeats(8, 12),
    seatsAvailable: 96,
  },
  {
    name: "inox gvk one mall",
    ticketPrice: 300,
    city: "hyderabad",
    seats: generateSeats(7, 10),
    seatsAvailable: 70,
  },
  // Mumbai
  {
    name: "pvr phoenix palladium",
    ticketPrice: 450,
    city: "mumbai",
    seats: generateSeats(9, 14),
    seatsAvailable: 126,
  },
  {
    name: "inox megaplex inorbit",
    ticketPrice: 400,
    city: "mumbai",
    seats: generateSeats(8, 13),
    seatsAvailable: 104,
  },
  // Bangalore
  {
    name: "pvr forum mall",
    ticketPrice: 380,
    city: "bangalore",
    seats: generateSeats(8, 12),
    seatsAvailable: 96,
  },
];

const seedAll = async () => {
  try {
    console.log('🌱 Starting complete database seeding...\n');
    
    // 1. Clear all collections
    console.log('🗑️  Clearing existing data...');
    await Movie.deleteMany({});
    await Cinema.deleteMany({});
    await Showtime.deleteMany({});
    console.log('✅ Cleared all collections\n');
    
    // 2. Seed Movies
    console.log('🎬 Seeding movies...');
    const insertedMovies = await Movie.insertMany(movies);
    console.log(`✅ Inserted ${insertedMovies.length} movies\n`);
    
    // 3. Seed Cinemas
    console.log('🎭 Seeding cinemas...');
    const insertedCinemas = await Cinema.insertMany(cinemas);
    console.log(`✅ Inserted ${insertedCinemas.length} cinemas\n`);
    
    // 4. Seed Showtimes
    console.log('🕐 Seeding showtimes...');
    const showtimes = [];
    const times = ['10:00 AM', '01:00 PM', '04:00 PM', '07:00 PM', '10:00 PM'];
    
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);
    
    for (const movie of insertedMovies) {
      // Get relevant cinemas based on language
      let relevantCinemas = insertedCinemas;
      
      if (movie.language === 'telugu') {
        relevantCinemas = insertedCinemas.filter(c => ['hyderabad', 'bangalore'].includes(c.city));
      } else if (movie.language === 'hindi') {
        relevantCinemas = insertedCinemas.filter(c => ['mumbai', 'bangalore'].includes(c.city));
      } else if (movie.language === 'english') {
        relevantCinemas = insertedCinemas;
      }
      
      // Create showtimes for each cinema
      for (const cinema of relevantCinemas) {
        const selectedTimes = times.slice(0, 3); // 3 shows per day
        
        for (const time of selectedTimes) {
          showtimes.push({
            startAt: time,
            startDate: startDate,
            endDate: endDate,
            movieId: movie._id,
            cinemaId: cinema._id,
          });
        }
      }
    }
    
    const insertedShowtimes = await Showtime.insertMany(showtimes);
    console.log(`✅ Inserted ${insertedShowtimes.length} showtimes\n`);
    
    // 5. Summary
    console.log('📊 SEEDING SUMMARY:');
    console.log('═'.repeat(50));
    console.log(`🎬 Movies: ${insertedMovies.length}`);
    console.log(`   - Telugu: ${movies.filter(m => m.language === 'telugu').length}`);
    console.log(`   - Hindi: ${movies.filter(m => m.language === 'hindi').length}`);
    console.log(`   - English: ${movies.filter(m => m.language === 'english').length}`);
    console.log(`\n🎭 Cinemas: ${insertedCinemas.length}`);
    console.log(`   - Hyderabad: ${cinemas.filter(c => c.city === 'hyderabad').length}`);
    console.log(`   - Mumbai: ${cinemas.filter(c => c.city === 'mumbai').length}`);
    console.log(`   - Bangalore: ${cinemas.filter(c => c.city === 'bangalore').length}`);
    console.log(`\n🕐 Showtimes: ${insertedShowtimes.length}`);
    console.log('═'.repeat(50));
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('🚀 You can now start the server and test the application.\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();