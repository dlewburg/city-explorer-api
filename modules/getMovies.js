'use strict';

const axios = require('axios');

let cache = {};

// Cache TODO : create a key for data to store
// Cache TODO: if the thing exists and within a valid timefram... send the data from cache
// Cache TODO: if it does not exist - call API and cache that return from the API

async function getMovies(request, response, next) {

  try {

    
    let { movieName } = request.query;
    let { cityName } = request.query;
    
    let key = `${cityName}-Movie`; 
    
    if(cache[key] && (Date.now() - cache[key].timestamp) < 60000) {
      console.log('Cache was hit!!!!!');

      response.status(200).send(cache[key].data);

      
    } else {

      console.log('Nothing in Cache');
      
      let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`
      let movieResults = await axios.get(url);
      let movieInfo = movieResults.data.results.map(movie => new Movie(movie));
      
      // BUILD IT INTO CACHE
      
      cache[key] = {
        data: movieInfo,
        timestamp: Date.now()
      };
      
      response.status(200).send(movieInfo);
    }

  } catch (error) {
    next(error)
  }
}

class Movie {
  constructor(flick) {
    this.title = flick.title;
    this.overview = flick.overview;
    this.average_votes = flick.vote_average;
    this.total_votes = flick.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500${flick.poster_path}`;
    this.popularity = flick.popularity;
    this.released_on = flick.release_date;
  }
}

module.exports = getMovies
