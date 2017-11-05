//stubs for demo
"use strict";
const amqp = require('amqplib/callback_api');
const AMQP_URL='amqp://triicwrz:ZndWbNcs8ELHkF8UAkiHl_oQfMdx5rxL@elephant.rmq.cloudamqp.com/triicwrz';

module.exports = function()
{
    // receive events 
    const qname = 'invQ';
    const msgKey = 'order created!';
    const ex = 'tashkentx';

    amqp.connect(AMQP_URL, function(err, conn) {
        conn.createChannel(function(err, ch) {            
            ch.assertExchange(ex, 'direct', {durable: true});
            ch.assertQueue(qname, {exclusive: false}, function(err, q) {
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            ch.bindQueue(q.queue, ex, msgKey);

            ch.consume(q.queue, function(msg) {
                console.log(" [x] Received %s", msg.content.toString() + ' ' + new Date().getTime());
                
                //do processing and post event to start next service
                doProcess();
        
            }, {noAck: true});
            });
        });
    });

    function doProcess()
    {
        //set based on some check
        var nextSrvMsg = "ship order!";
        
        console.log('Processing message... ');
        console.log('Checking inventory... ');

        amqp.connect(AMQP_URL, function(err, conn) {
            conn.createChannel(function(err, ch) {
              var exch = 'tashkentx';  
              ch.assertExchange(exch, 'direct', {durable: true});
              
              //buffer can take a payload
              ch.publish(exch, nextSrvMsg, Buffer.from(nextSrvMsg));
              console.log(" [x] Sent '%s'", nextSrvMsg);  
              return '';        
              });
    
            //setTimeout(function() { conn.close(); process.exit(0) }, 500);
    
          });
            
    }

}