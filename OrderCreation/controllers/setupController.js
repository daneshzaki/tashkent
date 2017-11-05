//sets up parsers to parse input params
"use strict";
module.exports = function(server, restify, restifyPlugins, restifyValidator)
{
    
    //install restifyplugins separately through npm install restify restify plugins
    server.use(restifyPlugins.acceptParser(server.acceptable));
    server.use(restifyPlugins.bodyParser());
    server.use(restifyValidator);
    server.use(restifyPlugins.authorizationParser());
    
}