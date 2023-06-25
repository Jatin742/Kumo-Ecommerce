const express=require("express");
const Router=express.Router();
const {isAuthenticatedUser} = require("../Middlewares/auth");
const { processPayment, sendStripeApiKey } = require("../Controllers/paymentControllers");

Router.route("/payment/process").post(isAuthenticatedUser, processPayment);

Router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports=Router;