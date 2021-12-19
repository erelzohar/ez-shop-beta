"use strict";
global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookie = require("cookie-parser");
const expressRateLimit = require("express-rate-limit");
const sanitize = require("./middleware/sanitize");
const productsController = require("./controllers-layer/products-controller");
const cartsController = require("./controllers-layer/carts-controller");
const authController = require("./controllers-layer/auth-controller");
const ordersController = require("./controllers-layer/orders-controller");
const path = require("path");
const server = express();

server.options("*",cors());
server.use(cors());

// DOS Attack protection:
server.use("/api", expressRateLimit({
    windowMs: 1000, // 1 second
    max: 20, // limit each IP to 5 requests per windowMs
    message: "Are You a Hacker?"
}));

// Enable cookies: 
server.use(cookie());

server.use(express.json());

// XSS attack protection:
server.use(sanitize);

server.use(fileUpload());

server.use("/api/products", productsController);
server.use("/api/carts", cartsController);
server.use("/api/auth", authController);
server.use("/api/orders", ordersController);

if (process.env.NODE_ENV === "production") {

    server.use(express.static(path.join(__dirname, "/frontend/dist/frontend")));
    server.get("*", (request, response) => {
        response.sendFile(path.join(__dirname, "frontend","dist","frontend", "index.html"));
    });
}

const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Listening to ${port}...`));