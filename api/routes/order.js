const express = require("express");
const router = express.Router("router");

const {
  create_new_orders,
  get_all_orders,
  get_single_order,
  update_single_order,
  delete_single_order,
} = require("../controllers/order.js");

router.post("/", create_new_orders);

router.get("/", get_all_orders);

router.get("/:orderid", get_single_order);

router.patch("/:orderid", update_single_order);

router.delete("/:orderid", delete_single_order);

module.exports = router;
