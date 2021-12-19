"use strict";
const logic = require("../business-logic-layer/carts-logic");
const CartItemsModel = require("../models/cart-items-model");
const router = require("express").Router();
const ProductModel = require("../models/product-model");
const errorsHelper = require("../helpers/errors-helper");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const CartModel = require("../models/cart-model");

//get all carts
router.get("/", async (req, res) => {
    try {
        const carts = await logic.getAllCartsAsync();
        res.json(carts);
    }
    catch (err) {
        res.status(500).json(errorsHelper.getError(err));
    }
});

//get all cart items by cart id
router.get("/cart-items/:cartId", async (req, res) => {
    try {
        // res.setHeader('Access-Control-Allow-Origin', '*');
        const cartId = req.params.cartId;
        const cartItems = await logic.getCartItemsByIdAsync(cartId);
        res.json(cartItems);
    }
    catch (err) {
        res.status(500).json(errorsHelper.getError(err));
    }
});

//get one cart
router.get("/:customerId", async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const cart = await logic.getCartByIdAsync(customerId);
        res.json(cart);
    }
    catch (err) {
        res.status(500).json(errorsHelper.getError(err));
    }
});

//post cart
router.post("/", async (req, res) => {
    try {
        const cart = new CartModel(req.body);
        const errors = cart.validateSync();
        if (errors) res.status(400).json(errors.message);
        const addedCart = await logic.openCartAsync(cart);
        res.json(addedCart);
    }
    catch (err) {
        res.status(500).json(errorsHelper.getError(err));
    }
});
//post cart item
router.post("/cart-items", verifyLoggedIn, async (req, res) => {
    try {
        const cartItem = new CartItemsModel(req.body);
        const errors = cartItem.validateSync();
        if (errors) res.status(400).json(errors.message);
        const addedProduct = await logic.addProductToCartAsync(cartItem);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(500).json(errorsHelper.getError(err));
    }
});

//delete cart item
router.delete("/cart-items/:cartItemId", verifyLoggedIn, async (req, res) => {
    try {
        const _id = req.params.cartItemId;
        await logic.deleteProductFromCartAsync(_id);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(500).json(errorsHelper.getError(err));
    }
});

//delete all cart items by cart id
router.delete("/cart-items/delete/:cartId", async (req, res) => {
    try {
        const cartId = req.params.cartId;
        await logic.deleteAllCartItemsAsync(cartId);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(500).json(errorsHelper.getError(err));
    }
});

//delete cart 
router.delete("/:_id", verifyLoggedIn, async (req, res) => {
    try {
        const _id = req.params._id;
        await logic.deleteCartAsync(_id);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(500).json(errorsHelper.getError(err));
    }
});

module.exports = router;