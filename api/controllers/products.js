const Product = require("../models/products.js");
const mongoose = require("mongoose");

const create_product = (req, res, next) => {
  Product.find({ productName: req.body.productName })
    .exec()
    .then((product) => {
      console.log(product);
      console.log("Product already Exist");
      if (product.length >= 1) {
        //if (product[0].productName === req.body.productName)
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

const get_all_product = (req, res, next) => {
  Product.find()
    .exec()
    .then((products) => {
      console.log("This is the result from get allproducts");
      console.log(products);
      res.status(200).json({
        count: products.length,
        message: "Got all products",
        all_products: products.map((val) => {
          return {
            val,
            resuest: {
              type: "GET",
              url: `http://localhost:4000/product/${val._id}`,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

// const get_single_product,
const get_single_product = (req, res, next) => {
  const pdtId = req.params.productId;
  Product.find({
    _id: pdtId,
  })
    .exec()
    .then((prod) => {
      if (prod.length >= 1) {
        console.log("This is the result from get single product");
        console.log(prod);
        res.status(200).json({
          message: "Product successfully got",
          prod,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error occured",
        err,
      });
    });
};

// const update_single_product,

const update_single_product = (req, res, next) => {
  const prodtId = req.params.productId;
  const updateOps = {};

  for (const [key, value] of Object.entries(req.body)) {
    updateOps[key] = value;
  }

  Product.update({ _id: prodtId }, { $set: updateOps })
    .exec()
    .then((updateProduct) => {
      console.log("This is the result from updating products");
      console.log(updateProduct);
      res.status(200).json({
        message: "Product successfully updated",
        updateProduct,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error occured",
        err,
      });
    });
};

// const delete_single_product,

const delete_single_product = (req, res, next) => {
  const prodId = req.params.productId;
  Product.remove({
    _id: prodId,
  })
    .exec()
    .then((result) => {
      console.log("This is the result from deleting a single products");
      console.log(result);
      res.status(200).json({
        message: "Product deleted successfully",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error occured",
        err,
      });
    });
};

module.exports = {
  create_product,
  get_all_product,
  get_single_product,
  update_single_product,
  delete_single_product,
};
