"use strict";
require("../data-access-layer/dal");
const ProductModel = require("../models/product-model");
const CategoryModel = require("../models/category-model");
const path = require("path");


function getAllProductsAsync() {
    return ProductModel.find().exec();
}

function getCategoryByIdAsync(_id){
    return CategoryModel.findById(_id).populate("products").exec();
}

function getAllCategoriesAsync(){
    return CategoryModel.find().populate("products").exec();
}

async function addProductAsync(product , image){

    const extension = image.name.substr(image.name.lastIndexOf("."));
    product.imageName = product.productName + extension;
    const absolutePath = path.join(__dirname, "..", "assets", "images", "products", product.imageName);
    await image.mv(absolutePath);
    return product.save();
}

function deleteProductAsync(_id){
    return ProductModel.deleteOne({_id}).exec();
}

function updateProductAsync(product,_id){
    return ProductModel.findOneAndUpdate({_id},{
        productName:product.productName,
        price:product.price,
        categoryId:product.categoryId
    }).exec();
}





module.exports = {
    getAllProductsAsync,
    addProductAsync,
    deleteProductAsync,
    getCategoryByIdAsync,
    getAllCategoriesAsync,
    updateProductAsync
    
}