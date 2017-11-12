//stubs for demo
"use strict";
const helpers = require('helperfunctions');
const amqp = require('amqplib/callback_api');
const AMQP_URL='amqp://triicwrz:ZndWbNcs8ELHkF8UAkiHl_oQfMdx5rxL@elephant.rmq.cloudamqp.com/triicwrz';

module.exports = function()
{
    // receive events 
    const qname = 'shipQ';
    const msgKey = 'ship order!';
    const ex = 'tashkentx';
    helpers.consume(ex, qname, msgKey, doProcess);

    function doProcess()
    {
        //set based on some check
        var nextSrvMsg = "order shipped!";
        
        console.log('Processing message... ');
        console.log('Checking inventory... ');
        helpers.publish(nextSrvMsg, nextSrvMsg);
        
    }

}