"use strict";
const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    name: String,
}, { versionKey: false, toJSON: { virtuals: true }, id: false });

CategorySchema.virtual("products", {
    ref: "ProductModel", // Model?
    localField: "_id", // relation's local field
    foreignField: "categoryId" // relation's foreign field
});

const CategoryModel = mongoose.model("CategoryModel", CategorySchema, "categories");

module.exports = CategoryModel;
