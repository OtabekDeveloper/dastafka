const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  name: String,
  tel: String,
  adress: String,
  lat : String,
  lng : String,
  order: [Object],
});

module.exports = mongoose.model("Order", orderSchema);
