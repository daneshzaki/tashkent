//provides the db connect URLfor Mlab - MongoDb as a Service
"use strict";
module.exports = {

    getMongoConnection: function() {

        return 'mongodb://testuser:testpass@ds235065.mlab.com:35065/orders';

    }

}