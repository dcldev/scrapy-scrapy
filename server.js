// Dependencies
const express = require("express");
const mongoose = require("mongoose"); //Mongo object modelling 
// const request = require("request"); //Makes http calls
const axios = require("axios"); //Makes https calls
const cheerio = require("cheerio"); //Scraper

// Require all models
const db = require("./models");

// Port configuration for local/Heroku
const PORT = process.env.PORT || process.argv[2] || 8080;

// Initialize Express
const app = express();

// Use body-parser for handling form submissions
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));
// Controllers
const router = require("./controllers/api.js");

app.use(router);
// Connect to the Mongo DB
const MONGODB_PINK_URI = process.env.MONGOLAB_PINK_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_PINK_URI, { useNewUrlParser: true });

// Start the server
app.listen(PORT, function () {
    console.log(`This application is running on port: ${PORT}`);
});