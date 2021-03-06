// Imports
const express = require('express')
const fetch = require('node-fetch')
var favicon = require('serve-favicon')
var path = require('path')
const app = express()
app.use(favicon(path.join(__dirname,'public','img','favicon.ico')));
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Static Files
app.use(express.static('public'));
// Set View's
app.set('views', './views');
app.set('view engine', 'ejs');

// Navigation
app.get('', (req, res) => {
    res.render('index')
})
app.listen(process.env.PORT || 5000)


// Grabs Air quality info from TFL api
app.get('/airquality', async (req, res) => {
  const airQualityUrl = 'https://api.tfl.gov.uk/AirQuality/'
  const airQualityResponse = await fetch(airQualityUrl);
  const airJson = await airQualityResponse.json();
  res.json(airJson);
})

// Grabs weather info
app.get('/weather', async (req, res) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=${process.env.WEATHER_API_KEY}`
  const weatherResponse = await fetch(weatherUrl);
  const weatherJson = await weatherResponse.json();
  res.json(weatherJson);
})

// Grabs cycling info from Google API
app.get('/cycling-directions/:from/:to', async (req, res) => {
  const from = req.params.from
  const to = req.params.to
  const Url = `https://maps.googleapis.com/maps/api/directions/json?origin=${from}&destination=${to}&mode=bicycling&key=${process.env.GOOGLE_API_KEY}`
  const dirResponse = await fetch(Url);
  const dirJson = await dirResponse.json();
  res.json(dirJson);
})

// Grabs Tube directions from Google API
app.get('/transit-directions/:from/:to', async (req, res) => {
  const from = req.params.from
  const to = req.params.to
  const Url = `https://maps.googleapis.com/maps/api/directions/json?origin=${from}&destination=${to}&mode=transit&key=${process.env.GOOGLE_API_KEY}`
  const dirResponse = await fetch(Url);
  const dirJson = await dirResponse.json();
  res.json(dirJson);
})
