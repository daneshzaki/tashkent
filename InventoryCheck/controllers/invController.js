//stubs for demo
"use strict";
const helpers = require('helperfunctions');

module.exports = function()
{
    // receive events 
    var qname = 'invQ';
    var msgKey = 'order created!';
    const ex = 'tashkentx';
    helpers.consume(ex, qname, msgKey, doProcess);

    function doProcess()
    {
        //uncomment for testing failure - should be part of an exception block
        //helpers.publish('order process error', 'inventory unavailable');
        //return;
        
        //set based on some check
        var nextSrvMsg = 'ship order!';           

        //some fake check
        var curTime = new Date().getTime();
        console.log('Processing message... '+curTime);  
        if(curTime %2 == 0)
        {
            nextSrvMsg = 'stock replenish!';
        }
        
        console.log('Inventory updated successfully');
        helpers.publish(nextSrvMsg, nextSrvMsg);
            
    }

    //compensation logic
    //listen on a queue for failure messages
    qname = 'invCompQ';

    //failure : order process error
    msgKey = 'order process error';    
    helpers.consume(ex, qname, msgKey, compensate);    

    //on receipt of failure message, execute compensation logic     
    function compensate()
    {
        console.log('Received failure message... ');
        console.log('Compensating... '); 
        console.log('Resetting inventory...');           
        console.log('Inventory reset successfully');
    }

    

}