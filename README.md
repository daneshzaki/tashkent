# tashkent
Sample Node.js code that uses Rabbit MQ to implement choreography in Microservices 
http://blog.pleb.in

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

