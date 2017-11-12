//CRUD methods to insert, get, update and delete order(s)
//interacts with Mlab - MongoDb as a Service using ReviewModel
"use strict";
const restifyClient = require('restify-clients');
const helpers = require('helperfunctions');
const OrderModel = require('../models/orderModel.js');

module.exports = function(server)
{
    //return all orders
    server.get("/", function(req, res, next) {
        OrderModel.find({}, function (err, orders) {
            if(err)
            {
                return helpers.failure(res, next, 'Error getting orders from database',500);
            }
            
            helpers.success(res, next, orders);
          });        
        
    });
    
    //return a order
    server.get("/order/:id", function(req, res, next) {
        
        //error check
        req.assert('id', 'id is required and should be numeric').notEmpty();
        let errors = req.validationErrors();
        if(errors)
        {
            return helpers.failure(res, next, errors[0], 400);
        }

        OrderModel.findOne({_id: req.params.id}, function (err, order) {
            if(err)
            {
                return helpers.failure(res, next, 'Error getting order from database',500);
            }

            if(order === null)
            {
                return helpers.failure(res, next, 'The specified order does not exist in the database',404);
            }
            
            helpers.success(res, next, order);
          });        
        
    });
        
    //insert an order
    server.post("/order", function(req, res, next) {

        //error check
        req.assert('date', 'Date is required').notEmpty();
        req.assert('type', 'Type must be either online or store').notEmpty().isIn(['online', 'store']);
        req.assert('desc', 'Description is required and must be valid').notEmpty();
        req.assert('status', 'Status must be either open or closed').notEmpty().isIn(['open', 'closed']);
        
        let errors = req.validationErrors();

        if(errors)
        {
            return helpers.failure(res, next, errors, 400);
        }
        
        //get order info from input
        let order = new OrderModel();
        order.date = req.params.date;
        order.type = req.params.type;
        order.desc = req.params.desc;
        order.status = req.params.status;
        
        //insert in db
        order.save(function(err){
            if(err)
            {
                return helpers.failure(res, next, 'Error saving order to database',500);
            }
        });

        helpers.success(res, next, order);
        
        //call inventory check         
        console.log("Order created successfully");
        helpers.publish('order created!', 'order created!');

    });
    
  
}