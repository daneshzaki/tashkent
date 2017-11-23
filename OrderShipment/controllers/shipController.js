//stubs for demo
"use strict";
const helpers = require('helperfunctions');

module.exports = function()
{
    // receive events 
    const qname = 'shipQ';
    const msgKey = 'ship order!';
    const ex = 'tashkentx';
    helpers.consume(ex, qname, msgKey, doProcess);

    function doProcess()
    {
        //uncomment for testing failure - should be part of an exception block
        helpers.publish('order process error', 'order not shipped');
        return;
        
        //set based on some check
        var nextSrvMsg = "order shipped!";
        
        console.log('Processing message... ');
        console.log('Checking inventory... ');
        helpers.publish(nextSrvMsg, nextSrvMsg);
        
    }

}