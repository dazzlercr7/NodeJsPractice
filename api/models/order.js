// const express = require("express");
const mongoose = require("mongoose");

const order_schema = mongoose.Schema({
  __id: mongoose.Schema.Types.ObjectId,
  oder_Name: {
    type: String,
    required: true,
  },
  products: { type: String },

  address: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  addedOn: {
    type: Number,
    required: true,
    default: new Date().getTime(),
  },
});

module.exports = mongoose.model("Order", order_schema);
