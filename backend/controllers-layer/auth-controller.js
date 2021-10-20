const express = require("express");
const authLogic = require("../business-logic-layer/auth-logic");
const errorsHelper = require("../helpers/errors-helper");
const svgCaptcha = require("svg-captcha");
const cryptoHelper = require("../helpers/crypto-helper");
const verifyCaptcha = require("../middleware/verify-captcha");
const CustomerModel = require("../models/customer-model");
const router = express.Router();

router.get("/captcha", (req, res) => {
    const captcha = svgCaptcha.create(); // Creates a new CAPTCHA image + text
    const image = captcha.data;
    const text = captcha.text;
    const hashedText = cryptoHelper.hash(text);
    res.cookie("text", hashedText); // cookie רק בגלל שאנו רוצים לקבל בחזרה את הטקסט - שלחנו אותו ע"י
    res.type("svg").send(image);
});

router.post("/register", async (req, res) => {

    const user = new CustomerModel(req.body);
    const errors = user.validateSync();
    if (errors) { res.status(400).json(errors.message); }
    try {
        const addedUser = await authLogic.registerAsync(user);
        res.status(201).json(addedUser);
    }
    catch (err) {

        if (err.errors.customerId?.properties.type === "unique")
            res.status(500).send("ID already exists.");

        if (err.errors.email?.properties.type === "unique")
            res.status(500).send("Email already exists.");

        res.status(500).send(errorsHelper.getError(err));
    }
});

router.post("/login", async (req, res) => {
    try {
        const loggedInUser = await authLogic.loginAsync(req.body);
        if (!loggedInUser) return res.status(401).send("Incorrect email or password.");
        res.json(loggedInUser);
    }
    catch (err) {
        res.status(500).send(errorsHelper.getError(err));
    }
});

module.exports = router;