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
        //set based on some check
        var nextSrvMsg = "order shipped!";
        
        console.log('Processing message... ');
        console.log('Checking inventory... ');
        helpers.publish(nextSrvMsg, nextSrvMsg);
        
    }

}