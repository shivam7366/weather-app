const request = require("request");

const forecast = (lattitude, Longatuide, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=61a54cc3c5468e7c8681483bc20e82a1&query=${lattitude},${Longatuide}&units=m`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect", undefined);
    } else if (response.body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(undefined, {
        forecastData: `Temprerature is ${response.body.current.temperature} and it feels like ${response.body.current.feelslike}`,
      });
    }
  });
};

module.exports = forecast;
