const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    
    productName: {
        type: String,
        required: [true, "Missing name"],
        minlength: [2, "Name must be at least 2 characters"],
        maxlength: [25, "Name max length is 25 characters"]
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Missing category"]
    },
    price: {
        type: Number,
        required: [true, "Missing price"],
        min: [0, "Price must be positive"],
        max: [10000, "Price can't exeed 10000"]
    },
    imageName: {
        type: String
    }

}, { versionKey: false, toJSON: { virtuals: true }, id: false });

ProductSchema.virtual("category", {
    ref: "CategoryModel", // Which model to create relation to?
    localField: "categoryId", // Which local filed connects to that relation.
    foreignField: "_id", // Which foreign filed connects to tha relation.
    justOne: true // category field should be one object and not array.
});

const ProductModel = mongoose.model("ProductModel", ProductSchema, "products");

module.exports = ProductModel;

