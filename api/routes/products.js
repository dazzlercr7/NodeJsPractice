const express = require("express");

const router = express.Router();

const {
  create_product,
  //   get_all_product,
  //   get_single_product,
  //   update_single_product,
  //   delete_single_product,
} = require("../controllers/products.js");

router.post("/", create_product);

// router.get("/", get_all_product);

// router.get("/:productId", get_single_product);

// router.patch("/:productId", update_single_product);

// router.delete("/:productId", delete_single_product);

module.exports = router;
