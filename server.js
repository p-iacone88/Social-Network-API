// import express library
const express = require('express');
// import database connection configuration
const db = require('./config/connection');
//import routes module
const routes = require('./routes');
// define port 
const PORT = process.env.PORT || 3001;
// create an instance of Express app
const app = express();
// Middleware to parse incoming requests 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// use imported routes in app
app.use(routes);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});