var mongoose = require("mongoose");

var ProductSchema = mongoose.Schema({
  name: String,
  price: Number,
  details: String,
  img: String,
});

var productModel = mongoose.model("Product", ProductSchema);

module.exports = productModel;
