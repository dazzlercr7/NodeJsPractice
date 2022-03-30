const Product = require("../models/products.js");
const mongoose = require("mongoose");
const req = require("express/lib/request");
const res = require("express/lib/response");

const create_product = (req, res, next) => {
  Product.find({ productName: req.body.productName })
    .exec()
    .then((product) => {
      console.log(product);
      console.log("Product already Exist");
      if (product[0].productName === req.body.productName) {
        return res.status(409).json({
          message: "Product already Exist",
          product,
        });
      } else {
        const newProduct = new Product({
          _id: new mongoose.Types.ObjectId(),
          productName: req.body.productName,
          productCategory: req.body.productCategory,
          productPrice: req.body.productPrice,
        });

        newProduct.save().then((result) => {
          console.log("This is the result from saving the Product");
          console.log(result);
          res.status(200).json({
            message: "New product is created",
            result,
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: error,
      });
    });
};
// const get_all_product,
// const get_single_product,
// const update_single_product,
// const delete_single_product,

module.exports = { create_product };
