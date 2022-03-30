const Order = require("../models/order.js");
const mongoose = require("mongoose");

const create_new_orders = (res, req, next) => {
  const neworder = new Order({
    _id: new mongoose.Types.ObjectId(),
    order_Name: req.body.first_name,
    products: req.body.products,
    address: req.body.address,
    userName: req.body.userName,
  });
  neworder
    .save()
    .then((ordercreate) => {
      console.log(ordercreate);
      res.status(200).json({
        message: "Order is created",
        ordercreate,
      });
    })
    .catch((err) =>
      res.status(500).json({ message: "There is an error", error })
    );
};

const get_all_orders = (res, req, next) => {
  Order.find()
    .exec()
    .then((allorder) => {
      res.status(200).json({
        message: "All orders are listed:",
        allorder,
      });
    })
    .catch((err) =>
      res.status(500).json({ message: "There is an error", error })
    );
};

const get_single_order = (res, req, next) => {
  Order.find({ orderid: req.params.orderid })
    .exec()
    .then((order) => {
      console.log(order);
      res.status(200).json({
        message: "Got order details successful",
        order,
      });
    })
    .catch((err) =>
      res.status(500).json({ message: "There is an error", error })
    );
};

const update_single_order = (res, req, next) => {
  const updateOps = {};
  const id = req.params.orderid;
  for (const [key, value] of Object.entries(req.body)) {
    updateOps[key] = value;
  }

  Order.patch({ _id: id }, { $set: updateOps })
    .exec()
    .then((output) => {
      res.status(200).json({
        message: "Order has been updated",
        output,
      });
    })
    .catch((err) =>
      res.status(500).json({ message: "There is an error", error })
    );
};

const delete_single_order = (res, req, next) => {
  Order.delete({ orderid: req.params.orderid })
    .exec()
    .then((order) => {
      res.status(200).json({
        message: "Deleted the order",
      });
    })
    .catch((err) =>
      res.status(500).json({ message: "There is an error", error })
    );
};

module.exports = {
  create_new_orders,
  get_all_orders,
  get_single_order,
  update_single_order,
  delete_single_order,
};
