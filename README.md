# tashkent
Sample Node.js code that uses Rabbit MQ to implement choreography in Microservices 

<img src="https://4.bp.blogspot.com/-7MfGzg8k9cI/WhlCGElztAI/AAAAAAAABIM/vAmii5PitiA50D7UPSiqRIlmxp7ArZWFwCLcBGAs/s640/compensation.png"> </img>

<b>Demo MicroServices</b> 
 - Order Creation
 - Invoice Check
 - Stock Replenish
 - Order Shipment

Messages: "order created!", "stock replenished!" & "ship order!"
 
Input: Order creation by POST method call to Order Creation service

Process Flow: <br />
order create --> inventory check --> stock replenish (or) order shipment --> order delivery

Output: Order Shipped

This <a href="http://blog.pleb.in/2017/11/understanding-microservices.html">post</a> describes the high level flow and this <a href="http://blog.pleb.in/2017/11/compensation-logic-using-rabbitmq.html">post</a> describes the compensation logic.
