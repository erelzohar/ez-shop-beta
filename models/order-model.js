"use strict";
const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    cartId: mongoose.Schema.Types.ObjectId,
    customerId: mongoose.Schema.Types.ObjectId,
    finalPrice:{
        type: Number,
        required:[true,"final price required"]
    },
    city:{
        type : String,
        required:[true,"city required"]
    
    },
    street:{
        type :String,
        required:[true,"street required"]
    
    },
    dateToDeliver:{
        type : String,
        required:[true,"dateToDeliver required"]
    
    },
    orderDate:{
        type :String,
        required:[true,"orderDate required"]
    
    },
    creditCard: {
        type: Number,
        min:100000000000,
        max: 100000000000000000000
    }


}, { versionKey: false, toJSON: { virtuals: true }, id: false });

const OrderModel = mongoose.model("OrderModel", OrderSchema, "orders");

module.exports = OrderModel;