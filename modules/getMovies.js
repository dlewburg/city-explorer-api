'use strict';

const axios = require('axios');

async function getMovies (request, response, next) {

  try {
    //     // Accept queries -> photos?cityName=Value
    let { movieName } = request.query;
    let { cityName } = request.query;


    //     // build url for axios

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`

    let movieResults = await axios.get(url);

    // console.log(movieResults.data);
    let movieInfo = movieResults.data.results.map(movie => new Movie(movie));
    // console.log('LOOK HERE!!!:', movieInfo);

    response.status(200).send(movieInfo);

  } catch (error) {
    next(error)
  }

}

class Movie {
  constructor(flick){
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
