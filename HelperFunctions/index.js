//contains helper functions - for HTTP methods, RabbitMQ
"use strict";
const amqp = require('amqplib/callback_api');

//the mqConnection script just returns the AMQP URL - AMQP_URL can be given the value of your AMQP/RabbitMQ instance
const mqcon = require('./mqConnection');
const AMQP_URL= mqcon.getAMQPURL();

const ON_DEATH = require('death'); //for cleanup

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
  amqp.connect(AMQP_URL, function(err, conn) {
      conn.createChannel(function(err, ch) {
        const exch = 'tashkentx';

        ch.assertExchange(exch, 'direct', {durable: true});
        ch.publish(exch, msgKey, Buffer.from(msgPayload));
        console.log(" [x] Sent '%s'", msgKey);  
        return '';        
      });
          
      ON_DEATH(function(signal, err) {
        //clean up code 
        console.log('##cleaning up...');
        setTimeout(function() { conn.close(); process.exit(0) }, 500);
      })
          
    });

}; 

module.exports.consume = function(ex, qname, msgKey,invkFn )
{
  amqp.connect(AMQP_URL, function(err, conn) {
    conn.createChannel(function(err, ch) {            
      ch.assertExchange(ex, 'direct', {durable: true});
      ch.assertQueue(qname, {exclusive: false}, function(err, q) {
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
        ch.bindQueue(q.queue, ex, msgKey);
        ch.consume(q.queue, function(msg) {
          //call the function to be invoked on receipt of a message
          invkFn();
          
          ON_DEATH(function(signal, err) {
            //clean up code 
            console.log('##cleaning up...');
            setTimeout(function() { conn.close(); process.exit(0) }, 500);
          })
    
        }, {noAck: true});
      });
    });
  });  
}