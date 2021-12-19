"use strict";
const logic = require("../business-logic-layer/products-logic");
const CategoryModel = require("../models/category-model");
const router = require("express").Router();
const ProductModel = require("../models/product-model");
const errorsHelper = require("../helpers/errors-helper");
const verifyAdmin = require("../middleware/verify-admin");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const path = require("path");
const fs = require("fs");


router.get("/" , async (req, res) => {
    try {
        const products = await logic.getAllProductsAsync();
        res.json(products);
    }
    catch (err) {
        res.status(500).json(errorsHelper.getError(err));
    }
});

router.get("/categories/:_id",verifyLoggedIn , async (req, res) => {
    try {
        const categoryId = req.params._id;
        const category = await logic.getCategoryByIdAsync(categoryId);
        res.json(category);
    }
    catch (err) {
        res.status(500).json(errorsHelper.getError(err));
    }
});

router.get("/categories",verifyLoggedIn , async (req, res) => {
    try {
        const categories = await logic.getAllCategoriesAsync();
        res.json(categories);
    }
    catch (err) {
        res.status(500).json(errorsHelper.getError(err));
    }
});

router.post("/", verifyAdmin, async (req, res) => {
    try {

        const image = req.files && req.files.image ? req.files.image : null;
        if (!image) return res.status(400).send("Missing image.");

        const product = new ProductModel(req.body);
        const errors = product.validateSync();
        if (errors) res.status(400).json(errors.message);
        const addedProduct = await logic.addProductAsync(product, image);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(500).json(errorsHelper.getError(err));
    }
});

router.put("/:_id", [verifyLoggedIn, verifyAdmin], async (request, response) => {
    try {
        const _id = request.params._id;
        const product = new ProductModel(request.body);
        const errors = product.validateSync();
        if (errors) return response.status(400).send(errors);
        const updatedProduct = await logic.updateProductAsync(product,_id);
        response.json(updatedProduct);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));

    }
});

router.delete("/delete/:_id", verifyAdmin, async (req, res) => {

    try {
        const _id = req.params._id;
        await logic.deleteProductAsync(_id);
        res.sendStatus(204);
    }

    catch (err) {
        res.status(500).send(errorsHelper.getError(err));
    }

});

router.get("/images/:name", (request, response) => {
    try {
        const name = request.params.name;
        let absolutePath = path.join(__dirname, "..", "assets", "images", "products", name);
        if (!fs.existsSync(absolutePath)) {
            absolutePath = path.join(__dirname, "..", "assets", "images", "not-found.jpg");
        }
        response.sendFile(absolutePath);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});



module.exports = router;