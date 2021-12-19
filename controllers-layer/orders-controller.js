"use strict";
const logic = require("../business-logic-layer/orders-logic");
const router = require("express").Router();
const errorsHandler = require("../helpers/errors-helper");
const OrderModel = require("../models/order-model");

router.get("/", async (req, res)=>{
    try {
        const orders = await logic.getAllOrdersAsync();
        res.json(orders);
    }
    catch (err) {
        res.status(500).json(errorsHandler.getError(err));
    }
});

router.post("/",async(req,res)=>{
    try {
        req.body.creditCard = +req.body.creditCard;
        req.body.finalPrice = +req.body.finalPrice;
        const order = new OrderModel(req.body);
        const errors = order.validateSync();
        if(errors)res.status(400).json(errors.message);
        const addedOrder = await logic.postOrderAsync(order);
        res.json(addedOrder);
    }
    catch(err){
        res.status(500).json(errorsHandler.getError(err));
    }
});











module.exports = router;