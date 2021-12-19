"use strict";
const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const { isEmail } = require("validator");

const CustomerSchema = mongoose.Schema({
    customerId: {
        type: Number,
        unique: true,
        min: [100000, "Min 6 numbers."],
        max: [1000000000, "Max 10 numbers"],
        required: [true, "Missing id"]
    },
    firstName: {
        type: String,
        minlength: [2, "Min 2 characters"],
        maxlength: [30, "Max 30 characters"],
        required: [true, "Missing first name"]
    },
    lastName: {
        type: String,
        minlength: [2, "Min 2 characters"],
        maxlength: [30, "Max 30 characters"],
        required: [true, "Missing last name"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter an email"],
        lowercase: true,
        validate: [isEmail, "Please enter a valid email."],
    },
    password: {
        type: String,
        minlength: [6, "Min 6 characters"],
        maxlength: [500, "Max 500 characters"],
        required: [true, "Please enter a password"]
    },
    city: {
        type: String,
        minlength: [2, "Min 2 characters"],
        maxlength: [30, "Max 30 characters"],
        required: [true, "Please enter a city"]
    },
    street: {
        type: String,
        minlength: [2, "Min 2 characters"],
        maxlength: [30, "Max 30 characters"],
        required: [true, "Please enter a street"]
    },
    isAdmin: {
        type: Boolean,
        required: false,
    },
    token: {
        type: String,
        required: false
    }
}, { versionKey: false, toJSON: { virtuals: true }, id: false });

CustomerSchema.plugin(mongooseUniqueValidator);

const CustomerModel = mongoose.model("CustomerModel", CustomerSchema, "customers");

module.exports = CustomerModel;