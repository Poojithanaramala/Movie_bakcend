// server/seedData/seedMovies.js
const mongoose = require('mongoose');
require('dotenv').config();
require('../db/mongoose');
const Movie = require('../models/movie');

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
  {
    title: "rangasthalam",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500",
    language: "telugu",
    genre: "action, drama",
    director: "sukumar",
    cast: "ram charan, samantha, aadhi pinisetty",
    description: "a hearing-impaired man fights against the village president's corruption",
    duration: 179,
    releaseDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
  },
  {
    title: "jersey",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500",
    language: "telugu",
    genre: "sports, drama",
    director: "gowtam tinnanuri",
    cast: "nani, shraddha srinath",
    description: "a failed cricketer makes a comeback in his late 30s to fulfill his son's wish",
    duration: 157,
    releaseDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
  },

  // Hindi Movies
  {
    title: "3 idiots",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500",
    language: "hindi",
    genre: "comedy, drama",
    director: "rajkumar hirani",
    cast: "aamir khan, r madhavan, sharman joshi, kareena kapoor",
    description: "three engineering students navigate college life, friendship, and the pursuit of true passion",
    duration: 170,
    releaseDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
  },
  {
    title: "dangal",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500",
    language: "hindi",
    genre: "sports, drama, biography",
    director: "nitesh tiwari",
    cast: "aamir khan, fatima sana shaikh, sanya malhotra",
    description: "a former wrestler trains his daughters to become world-class wrestlers",
    duration: 161,
    releaseDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
  },
  {
    title: "zindagi na milegi dobara",
    image: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=500",
    language: "hindi",
    genre: "drama, comedy, adventure",
    director: "zoya akhtar",
    cast: "hrithik roshan, farhan akhtar, abhay deol, katrina kaif",
    description: "three friends on a bachelor trip discover life, love, and themselves",
    duration: 155,
    releaseDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
  },
  {
    title: "pk",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500",
    language: "hindi",
    genre: "comedy, drama, sci-fi",
    director: "rajkumar hirani",
    cast: "aamir khan, anushka sharma, sushant singh rajput",
    description: "an alien questions religious beliefs and superstitions in a satirical comedy",
    duration: 153,
    releaseDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
  },

  // Tamil Movies
  {
    title: "vikram",
    image: "https://images.unsplash.com/photo-1574267432644-f610dd5e9a5f?w=500",
    language: "tamil",
    genre: "action, thriller",
    director: "lokesh kanagaraj",
    cast: "kamal haasan, vijay sethupathi, fahadh faasil",
    description: "a special agent investigates a series of murders while dealing with masked killers",
    duration: 174,
    releaseDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
  },
  {
    title: "rocketry",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=500",
    language: "tamil",
    genre: "biography, drama",
    director: "r madhavan",
    cast: "r madhavan, simran, rajit kapur",
    description: "the life of isro scientist nambi narayanan who was falsely accused of espionage",
    duration: 157,
    releaseDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
  },

  // English Movies
  {
    title: "inception",
    image: "https://images.unsplash.com/photo-1571847140471-1d7766e825ea?w=500",
    language: "english",
    genre: "sci-fi, thriller, action",
    director: "christopher nolan",
    cast: "leonardo dicaprio, tom hardy, ellen page, cillian murphy",
    description: "a thief who enters dreams to steal secrets must plant an idea in someone's mind",
    duration: 148,
    releaseDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
  },
  {
    title: "interstellar",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=500",
    language: "english",
    genre: "sci-fi, drama, adventure",
    director: "christopher nolan",
    cast: "matthew mcconaughey, anne hathaway, jessica chastain",
    description: "a team of explorers travel through a wormhole in search of a new home for humanity",
    duration: 169,
    releaseDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
  },
  {
    title: "the dark knight",
    image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500",
    language: "english",
    genre: "action, crime, thriller",
    director: "christopher nolan",
    cast: "christian bale, heath ledger, aaron eckhart",
    description: "batman faces his greatest challenge yet in the form of the joker",
    duration: 152,
    releaseDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
  },
  {
    title: "avengers endgame",
    image: "https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?w=500",
    language: "english",
    genre: "action, adventure, sci-fi",
    director: "anthony russo, joe russo",
    cast: "robert downey jr, chris evans, scarlett johansson, chris hemsworth",
    description: "the avengers assemble once more to undo thanos's actions and restore balance",
    duration: 181,
    releaseDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
  },
  {
    title: "joker",
    image: "https://images.unsplash.com/photo-1599334953347-8dd0e90e7b5c?w=500",
    language: "english",
    genre: "crime, drama, thriller",
    director: "todd phillips",
    cast: "joaquin phoenix, robert de niro, zazie beetz",
    description: "a mentally troubled comedian descends into madness and becomes the joker",
    duration: 122,
    releaseDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
  },
];

const seedMovies = async () => {
  try {
    console.log('🎬 Starting to seed movies...');
    
    // Clear existing movies
    await Movie.deleteMany({});
    console.log('🗑️  Cleared existing movies');
    
    // Insert new movies
    const insertedMovies = await Movie.insertMany(movies);
    console.log(`✅ Successfully inserted ${insertedMovies.length} movies`);
    
    // Display summary
    console.log('\n📊 Movies Summary:');
    console.log(`- Telugu Movies: ${movies.filter(m => m.language === 'telugu').length}`);
    console.log(`- Hindi Movies: ${movies.filter(m => m.language === 'hindi').length}`);
    console.log(`- Tamil Movies: ${movies.filter(m => m.language === 'tamil').length}`);
    console.log(`- English Movies: ${movies.filter(m => m.language === 'english').length}`);
    
    console.log('\n🎉 Movie seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding movies:', error);
    process.exit(1);
  }
};

seedMovies();