// var http = require("http"); //require is to import library or package

// // var variableName = require("../index.js");

// var ImportedFromIndex = require("../index.js");

// console.log(ImportedFromIndex);

// const PORT = process.env.PORT || 4000;

// http
//   .createServer(function (req, res) {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     // res.write("This is coming from the new server we created");
//     res.end("This is coming from source folder");
//   })
//   .listen(PORT);

const express = require("express"); //returns an handler function in variable
//import express from "express" -------ES6 style of writing
const app = express(); //executing handler function

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const dbUrl = `${process.env.DB_URL}`;

//this is a promise
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb IS connected 🔥🔥🔥"))
  .catch((err) => console.log(err));

// import userRouter from "../api/routes/user.js" -------ES6 style of writing and importing user router
const userRouter = require("../api/routes/user.js");

const orderRouter = require("../api/routes/order.js");

const productRouter = require("../api/routes/products.js");

// import morgan from "morgan" -------ES6 style of writing
const morgan = require("morgan");
// import bodyParser from "body-parser" -------ES6 style of writing
const bodyParser = require("body-parser");

// import cors
const cors = require("cors");
const res = require("express/lib/response");

// app.use("/users", userRouter);

//configuring body parser (accepts body value from body and parses it into given JSON format like JSOn)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//configuring morgan (logger)
app.use(morgan("dev"));

// configuring cors
app.use(cors());

app.get("/", (req, res, next) => {
  res.json({ message: `This works` });
});

//Using User route--this is done after importing and configuring
app.use("/users", userRouter);

app.use("/order", orderRouter);

app.use("/product", productRouter);

// app.use(
//   (req, res, next) => {
//     console.log("first use all middleware run");
//     next();
//   },
//   (req, res, next) => {
//     console.log("second use all middleware run");
//     next();
//   }
// ); //runs middleware on every incoming request

// app.get("/", (req, res, next) => {
//   res.json({ message: "This works, thank you" }); //middleware part:this is url part matches with the path mentioned in url i.e /
// });

// app.post("/", (req, res, next) => {
//   res.json({ message: "This works on POST Request" }); //middleware part:this is url part matches with the path mentioned in url i.e /
// });

// app.get("/Vedansh", (req, res, next) => {
//   res.json({ message: "This works on different host" }); //middleware part:this is url part matches with the path mentioned in url i.e /
// });

// app.get("/Vedansh", (req, res, next) => {
//   res.json({ message: "This page is another middleware" }); //middleware part:this is url part matches with the path mentioned in url i.e /
// });  //on frontend this will work on localhost:4000/Vedansh

// export default app -------ES6 style of writing
module.exports = app;

// const tstFunction = async () => {
//   try {
//     let result = await mongoose.connect();
//   } catch (error) {
//     throw error;
//   }
// };
