//Contains the schema for an order that is created in Mlab - MongoDb as a Service using Mongoose
"use strict";
const mongoose = require('mongoose');

const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const OrderSchema = new Schema({
    id    : ObjectId,
    date     : String,
    type      : String,
    desc  : String,
    status  : String,
});

const OrderModel = mongoose.model('orders', OrderSchema);

module.exports = OrderModel;