/*

Hello Explorer, you have been selected to be part of an early beta for a new system.
If you encounter any issues with running, packager, and language server (autocomplete, code diagnostics),
please email devex@replit.com or post on ask.replit.com
You can always turn off Explorer from https://replit.com/account#roles

Thank you!

*/

//import React from "react";
//import express from "express";

// import express
const { default: axios } = require("axios");
const express = require("express");

// create our webserver app
const app = express();

// load our .env file
// don't forget to npm install dotenv
require("dotenv").config();

// import data
//const data = require("./data/weather.json");

// define the port
const cors = require("cors");
const port = process.env.PORT || 3002;
const weatherApi = process.env.WEATHERBIT_KEY;

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}
app.use(cors());
app.get("/", (request, response) => {
  response.send("Hello Everyone!");
});

app.get("/weather", async (request, response) => {
  try {
    const { lat, lon } = request.query;
    const weatherData = await axios.get(
      `https://api.weatherbit.io/v2.0/forecast/daily?key=${weatherApi}&days=7&lat=${lat}&lon=${lon}`
    );
    console.log(weatherData.data);
    // http://localhost:3002/weather?lat=47.60621&lon=-122.33207

    response.send(weatherData.data);
  } catch (error) {
    console.error(error);
    response.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
