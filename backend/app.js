const express = require("express");
const dotenv=require("dotenv").config();
const app = express();
const errorMiddleware = require("./Middlewares/error");
const cookieParser=require("cookie-parser");
const morgan=require("morgan");
const bodyParser=require("body-parser");
const fileUpload=require("express-fileupload");
const cors=require('cors');

app.use(cors({
    origin: true,
    credentials: true,
  }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const user = require("./Routes/userRoute");
const product=require("./Routes/productRoute");
const order=require("./Routes/orderRoute");
const payment=require("./Routes/paymentRoute");

app.use("/api/v1", user);
app.use("/api/v1",product);
app.use("/api/v1",order);
app.use("/api/v1",payment);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;