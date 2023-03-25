'use strict';

const axios = require('axios');

let cache = {};

async function getWeather(request, response, next) {
  try {
    let { cityName } = request.query;
    let { lat } = request.query;
    let { lon } = request.query;
    let { liveWeather } = request.query;

    let key = `${lat}-Forecast`;

    if (cache[key] && (Date.now() - cache[key].timestamp) < 7.884e+9) {

      response.status(200).send(cache[key].data);

    } else {

      let weatherInfoUrl = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=7&units=I`

      let axiosWeatherInfo = await axios.get(weatherInfoUrl);
      let weatherInfo = axiosWeatherInfo.data.data.map(day => new Forecast(day));

      cache[key] = {
        data: weatherInfo,
        timestamp: Date.now()
      };

      response.status(200).send(weatherInfo);
    }

  } catch (error) {
    next(error);
  }

}

class Forecast {
  constructor(weatherObj) {
    this.date = weatherObj.valid_date;
    this.description = weatherObj.weather.description;
    this.max_temp = weatherObj.max_temp;
    this.min_temp = weatherObj.min_temp;

  }
}

module.exports = getWeather;
