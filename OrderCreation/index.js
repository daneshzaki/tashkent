//main class 
"use strict";

//import the required dependencies
const restify = require('restify');
const restifyPlugins = require('restify').plugins;
const restifyValidator = require('restify-validator');
const mongoose = require('mongoose');

const config = require('./config/dbConnection.js');

//we are using restify as the server fw
const server = restify.createServer();

//connect to mongo db (mlab dbaas) using mongoose
mongoose.connect(config.getMongoConnection());

//set up the parsers from restify plugins
const setupController = require('./controllers/setupController.js');

//business logic - CRUD methods
const orderController = require('./controllers/orderController.js');

setupController(server, restify, restifyPlugins, restifyValidator);
orderController(server);

//start the server
server.listen(process.env.PORT || 8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});