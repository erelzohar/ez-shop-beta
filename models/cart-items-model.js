"use strict";
const mongoose = require("mongoose");

const CartItemsSchema = mongoose.Schema({

    productId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"Missing product id."]
    },
    productName:{
        type:String,
        required:[true,"Missing product name"]
    },
    amount:{
        type:Number,
        min:0,
        required:[true,"Missing amount."]
    },
    price:{
        type:Number,
        min:0,
        required:[true,"Missing price."]

    },
    cartId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"Missing cart Id."]

    }

},{ versionKey: false, toJSON: { virtuals: true }, id: false });

const CartItemsModel = mongoose.model("CartItemsModel",CartItemsSchema,"cartItems");

module.exports = CartItemsModel;