//stubs for demo
"use strict";
const helpers = require('helperfunctions');

module.exports = function()
{
    // receive events 
    const qname = 'stockQ';
    const msgKey = 'stock replenish!';
    const ex = 'tashkentx';
    helpers.consume(ex, qname, msgKey, doProcess);

    function doProcess()
    {
        //uncomment for testing failure - should be part of an exception block
        helpers.publish('order process error', 'stock not replenished');
        return;
        
        //set based on some check
        var nextSrvMsg = "ship order!";
        
        console.log('Processing message... ');
        console.log('Stock replenishment complete... ');
        helpers.publish(nextSrvMsg, nextSrvMsg);
        
            
    }

}