//contains helper functions - for success, failure
"use strict";

function _respond(res, next, status, data, http_code)
{
  let response =
  {
    'status': status,
    'data' : data
  }  

    //set the data type returned
    res.setHeader('content-type', 'application/json');
  
    //return success
    res.writeHead(http_code);
  
    //return the result 
    res.end(JSON.stringify(response));
      
    //call next function if any
    return next();
    
}

module.exports.success = function success(res, next, data){
  _respond(res, next, 'success', data, 200);
}

module.exports.failure = function failure(res, next, data, http_code){
  _respond(res, next, 'failure', data, http_code);
}

module.exports.publish = function(msgKey, msgPayload )
{
  const amqp = require('amqplib/callback_api');
  const AMQP_URL='amqp://triicwrz:ZndWbNcs8ELHkF8UAkiHl_oQfMdx5rxL@elephant.rmq.cloudamqp.com/triicwrz';
    
  amqp.connect(AMQP_URL, function(err, conn) {
      conn.createChannel(function(err, ch) {
        const exch = 'tashkentx';

        ch.assertExchange(exch, 'direct', {durable: true});
        ch.publish(exch, msgKey, Buffer.from(msgPayload));
        console.log(" [x] Sent '%s'", msgKey);  
        return '';        
      });
      //setTimeout(function() { conn.close(); process.exit(0) }, 500);
    });
}; 
