const Order = require("../models/order.js");
const mongoose = require("mongoose");

const create_new_orders = (req, res, next) => {
  const nworder = new Order({
    _id: new mongoose.Types.ObjectId(),
    order_Name: req.body.order_Name,
    products: req.body.products,
    address: req.body.address,
    userName: req.body.userName,
  });

  nworder
    .save()
    .then((ordercreate) => {
      console.log("We have reached here");
      console.log(ordercreate);
      res.status(200).json({
        message: "Order is created",
        ordercreate,
      });
    })
    .catch((err) =>
      res.status(500).json({ message: "There is an error", err })
    );
};

const get_all_orders = (req, res, next) => {
  Order.find()
    .exec()
    .then((alorder) => {
      console.log("This is the result from get all orders");
      console.log(alorder);
      res.status(200).json({
        count: alorder.length,
        message: "All orders are listed:",
        alorder,
      });
    })
    .catch((err) =>
      res.status(500).json({ message: "There is an error", err })
    );
};

const get_single_order = (req, res, next) => {
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
      res.status(500).json({ message: "There is an error", err })
    );
};

const update_single_order = (req, res, nextt) => {
  const updateOps = {};
  const id = req.params.orderid;
  for (const [key, value] of Object.entries(req.body)) {
    updateOps[key] = value;
  }

  Order.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((output) => {
      res.status(200).json({
        message: "Order has been updated",
        output,
      });
    })
    .catch((err) =>
      res.status(500).json({ message: "There is an error", err })
    );
};

const delete_single_order = (req, res, next) => {
  Order.remove({ _id: req.params.orderid })
    .exec()
    .then((order) => {
      res.status(200).json({
        message: "Deleted the order",
      });
    })
    .catch((err) =>
      res.status(500).json({ message: "There is an error", err })
    );
};

module.exports = {
  create_new_orders,
  get_all_orders,
  get_single_order,
  update_single_order,
  delete_single_order,
};
