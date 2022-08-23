const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mulitipleFileSchema = new Schema(
  {
    name: String,
    category: String,
    subCategory: String,
    title: String,
    price: Number,
    count: {
      type: Number,
      default: 1,
    },
    active : {
      type: Boolean,
      default : true
    },
    quantity: {
      type: Number,
      default: 1,
    },
    files: [Object],
    id: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", mulitipleFileSchema);
