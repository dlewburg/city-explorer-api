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

app.get('/weather', (request, response, next) => {
  try{
    let {cityName} = request.query;
    let {lat} = request.query;
    let {lon} = request.query;
    
    let cityData = data.find(weather => weather.city_name.toLowerCase() ===  cityName.toLowerCase() && weather.lat === lat && weather.lon === lon); 
   
    let weatherInfo = cityData.data.map(day => new Forecast(day));
    
    response.status(200).send(weatherInfo);
  
  } catch (error) {
    next(error);
  }
})

/// **** Class to groom bulky data -- rebuild new object from data file

class Forecast {
  constructor(weatherObj){
    this.date = weatherObj.valid_date;
    this.description = weatherObj.weather.description;
  }
}

// BUILD AN ENDPOINT THAT WILL CALL OUT AN API
// app.get('/photos', async (request, response, next) => {
  
  // try {
    // Accept queries -> photos?cityName=Value
    // let keywordFromFrontEnd = request.query.searchQuery;
    // build url for axios
    //let url = `https:api.`

    // let photoResults = await axios.get(url);


    // groom data and sent it to front end 
    // let pictureSend = photoResults.data.results.map(pic => new Photo(pic));


    // response.status(200).send(pictureSend);

  // } catch (error) {
  //   next (error)
  // }

// });

//BUILD ANOTHER CLASS TO TRIM DOWN DATA

// class Photo {
//   constructor(pics){
//     this.src= pics.urls.regular;
//     this.alt= pics.alt_description;
//     this.username= pics.user.name;
//   }
// }



//catch all for any missed endpoints - lives at the bottom and serve as a 404 error
app.get('*', (request, response)=> {
  response.status(404).send('This route does not exist');
});

// **** ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS ****
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});