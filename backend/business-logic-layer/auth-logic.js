require("../data-access-layer/dal");
const cryptoHelper = require("../helpers/crypto-helper");
const jwtHelper = require("../helpers/jwt-helper");
const CustomerModel = require("../models/customer-model");

async function registerAsync(user) {

    // Hash password:
    user.password = cryptoHelper.hash(user.password);

    await user.save();

    // Generate new token:
    user.token = jwtHelper.getNewToken(user);
    return user;
}

async function loginAsync(credentials) {

    credentials.password = cryptoHelper.hash(credentials.password);

    const user = await CustomerModel.findOne({ "email": credentials.email, "password": credentials.password });
    if(!user) throw new Error("Incorrect email or password");
    // Generate new token:
    if (user) user.token = jwtHelper.getNewToken(user);
    delete user._id;
    return user;
}

module.exports = {
    registerAsync,
    loginAsync
};