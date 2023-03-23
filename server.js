'use strict';

// *** Requires ** (similar to import but for the backend)
const express = require('express');
require('dotenv').config(); //new npm install dotenv to run port .env file
const cors = require('cors');
const axios = require('axios');


//Create something to represent server - call express after bringing it in to create server *** app === server ***
const app = express();

//** MIDDLEWARE - CORS ****
app.use(cors());

// JSON FILE
let data = require('./data/data.json')

// *** Port for server to run on; try not to hard code
const PORT = process.env.PORT || 3002; //to bring in .env file

//get app to run on server,  use listen method ***app.listen(PORT,callback function)
app.listen(PORT, () => console.log(`We are running on port ${PORT}`));


// *** ENDPOINTS *** and order of these matter so put catch all wild card on the bottom
//default--BASE-- gives proof of life
//has two arguments where 1st is a string, 2nd arg is callback that will execute when endpoint is hit; 
//callback takes two arg (request, and response)
app.get('/', (request, response) => {
  response.status(200).send('Welcome to my first server!');
})

app.get('/weather', async (request, response, next) => {

  try {
    let { cityName } = request.query;
    let { lat } = request.query;
    let { lon } = request.query;
    let { liveWeather } = request.query;

    // let cityData = data.find(weather => weather.city_name.toLowerCase() ===  cityName.toLowerCase() || weather.lat === lat && weather.lon === lon); 

    let weatherInfoUrl = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=7&units=I`

    let axiosWeatherInfo = await axios.get(weatherInfoUrl);


    // console.log(axiosWeatherInfo.data.data);

    let weatherInfo = axiosWeatherInfo.data.data.map(day => new Forecast(day));
    // console.log('HERE:', weatherInfo);

    response.status(200).send(weatherInfo);

  } catch (error) {
    next(error);
  }
})

class Forecast {
  constructor(weatherObj) {
    this.date = weatherObj.valid_date;
    this.description = weatherObj.weather.description;
    this.max_temp = weatherObj.max_temp;
    this.min_temp = weatherObj.min_temp;

  }
}

// BUILD AN ENDPOINT THAT WILL CALL OUT AN API
app.get('/movies', async (request, response, next) => {

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

});

//BUILD ANOTHER CLASS TO TRIM DOWN DATA

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



//catch all for any missed endpoints - lives at the bottom and serve as a 404 error
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

// **** ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS ****
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});