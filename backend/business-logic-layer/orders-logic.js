require("../data-access-layer/dal");
const OrderModel = require("../models/order-model");


function getAllOrdersAsync(){
   return OrderModel.find().exec();
}

function postOrderAsync(order) {
    return order.save();
}



module.exports = { 
    getAllOrdersAsync,
    postOrderAsync
}