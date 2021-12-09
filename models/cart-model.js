const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({

    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Missing customer."]
    },
    creationDate: {
        type: String,
        required: [true, "Missing date."]
    }

}, { versionKey: false, toJSON: { virtuals: true }, id: false });

CartSchema.virtual("cartItems",{
    ref: "CartItemsModel", // Model?
    localField: "_id", // relation's local field
    foreignField: "cartId" // relation's foreign field
});

const CartModel = mongoose.model("CartModel", CartSchema, "carts");

module.exports = CartModel;