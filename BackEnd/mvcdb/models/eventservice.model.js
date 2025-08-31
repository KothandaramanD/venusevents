const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventServiceSchema = new Schema(
  {
    name: { type: String, required: true },
    mobilenumber: { type: String, required: true },
    email: { type: String, required: true }, // single string, not array
    address: { type: String, required: true },
    eventname: { type: String, required: true },
    eventorganizer: { type: String },
    members: { type: Number, required: true },
    budgetrange: { type: String, required: true },
    ac: { type: Boolean, required: true }, // true = AC, false = Non-AC
    message: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('eventservice', eventServiceSchema);
