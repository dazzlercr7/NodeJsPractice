const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  productName: { type: String, required: true },
  productCategory: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productImage: mongoose.Schema.Types.Mixed,
  addedOn: { type: Number, required: true, default: new Date().getTime() },
  users: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Products", productSchema);
