const { response } = require('express');
const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_KEY = process.env.API_KEY;

router.get('/', (req, res) => {
    res.render("./../public/index.html");
});

router.post('/apiGetWeatherData', async (req, res) => {

    const base = `https://api.openweathermap.org/data/2.5/weather?lat=${req.body.lat}&lon=${req.body.lon}&appid=${API_KEY}`;

    const weatherData = await fetch(base);
    const weatherDataJson = await weatherData.json();
    // console.log(weatherDataJson);
    res.json(weatherDataJson);
});

router.post('/apiGetCityCoordinates', async (req, res) => {

    const base =`https://api.openweathermap.org/geo/1.0/direct?q=${req.body.city}&limit=1&appid=${API_KEY}`;

    const coordinatesData = await fetch(base);
    const coordinatesDataJson = await coordinatesData.json();
    console.log(coordinatesDataJson);
    res.json(coordinatesDataJson);
});

module.exports = router;