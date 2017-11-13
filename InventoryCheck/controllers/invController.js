//stubs for demo
"use strict";
const helpers = require('helperfunctions');

module.exports = function()
{
    // receive events 
    const qname = 'invQ';
    const msgKey = 'order created!';
    const ex = 'tashkentx';
    helpers.consume(ex, qname, msgKey, doProcess);

    function doProcess()
    {
        //set based on some check
        var nextSrvMsg = 'ship order!';
        
        //some fake check
        if(new Date().getDay() != 0)
        {
            nextSrvMsg = 'stock replenish!';
        }
        console.log('Processing message... ');
        console.log('Checking inventory...done ');
        helpers.publish(nextSrvMsg, nextSrvMsg);
            
    }

}