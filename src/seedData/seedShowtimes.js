// server/seedData/seedShowtimes.js
const mongoose = require('mongoose');
require('dotenv').config();
require('../db/mongoose');
const Showtime = require('../models/showtime');
const Movie = require('../models/movie');
const Cinema = require('../models/cinema');

const seedShowtimes = async () => {
  try {
    console.log('🕐 Starting to seed showtimes...');
    
    // Get all movies and cinemas
    const movies = await Movie.find({});
    const cinemas = await Cinema.find({});
    
    if (movies.length === 0 || cinemas.length === 0) {
      console.log('⚠️  Please seed movies and cinemas first!');
      process.exit(1);
    }
    
    console.log(`📽️  Found ${movies.length} movies`);
    console.log(`🎭 Found ${cinemas.length} cinemas`);
    
    // Clear existing showtimes
    await Showtime.deleteMany({});
    console.log('🗑️  Cleared existing showtimes');
    
    const showtimes = [];
    const times = ['10:00 AM', '01:00 PM', '04:00 PM', '07:00 PM', '10:00 PM'];
    
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30); // 30 days from now
    
    // Create showtimes for each movie in multiple cinemas
    for (const movie of movies) {
      // Get cinemas in cities where this language is popular
      let relevantCinemas = cinemas;
      
      // Telugu movies -> Hyderabad, Vijayawada cinemas
      if (movie.language === 'telugu') {
        relevantCinemas = cinemas.filter(c => 
          ['hyderabad', 'vijayawada', 'bangalore'].includes(c.city)
        );
      }
      // Hindi movies -> Mumbai, Delhi cinemas
      else if (movie.language === 'hindi') {
        relevantCinemas = cinemas.filter(c => 
          ['mumbai', 'delhi', 'bangalore'].includes(c.city)
        );
      }
      // Tamil movies -> Chennai cinemas
      else if (movie.language === 'tamil') {
        relevantCinemas = cinemas.filter(c => 
          ['chennai', 'bangalore'].includes(c.city)
        );
      }
      // English movies -> All major cities
      else if (movie.language === 'english') {
        relevantCinemas = cinemas.filter(c => 
          ['mumbai', 'delhi', 'bangalore', 'chennai', 'hyderabad'].includes(c.city)
        );
      }
      
      // Create 3-4 showtimes per movie in each relevant cinema
      const selectedCinemas = relevantCinemas.slice(0, 4); // 4 cinemas per movie
      
      for (const cinema of selectedCinemas) {
        // Select 3-4 random time slots
        const selectedTimes = times.slice(0, Math.floor(Math.random() * 2) + 3); // 3 or 4 times
        
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
    
    // Insert showtimes
    const insertedShowtimes = await Showtime.insertMany(showtimes);
    console.log(`✅ Successfully inserted ${insertedShowtimes.length} showtimes`);
    
    // Display summary
    console.log('\n📊 Showtimes Summary:');
    for (const movie of movies.slice(0, 5)) { // Show first 5 movies
      const count = showtimes.filter(s => s.movieId.equals(movie._id)).length;
      console.log(`- ${movie.title}: ${count} showtimes`);
    }
    console.log(`... and ${movies.length - 5} more movies`);
    
    console.log('\n🎉 Showtime seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding showtimes:', error);
    process.exit(1);
  }
};

seedShowtimes();