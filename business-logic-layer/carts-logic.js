"use strict";
require("../data-access-layer/dal");
const CartModel = require("../models/cart-model");
const CartItemsModel = require("../models/cart-items-model");


function getCartByIdAsync(customerId) {
    return CartModel.find({ customerId }).populate("cartItems").exec();
}

function openCartAsync(cart) {
    return cart.save();
}

function deleteCartAsync(_id) {
    return CartModel.deleteOne({ _id }).exec();
}

function getAllCartsAsync() {
    return CartModel.find().populate("cartItems").exec();
}

function getCartItemsByIdAsync(cartId) {
    return CartItemsModel.find({ cartId }).exec();
}

function addProductToCartAsync(cartItem) {
    return cartItem.save();
}

function deleteProductFromCartAsync(_id) {
    return CartItemsModel.deleteOne({ _id }).exec();
}

function deleteAllCartItemsAsync(cartId) {
    return CartItemsModel.deleteMany({ cartId }).exec();
}

module.exports = {
    getAllCartsAsync,
    getCartByIdAsync,
    addProductToCartAsync,
    deleteProductFromCartAsync,
    openCartAsync,
    deleteCartAsync,
    getCartItemsByIdAsync,
    deleteAllCartItemsAsync
}