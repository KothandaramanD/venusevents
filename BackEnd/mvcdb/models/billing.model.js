const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventServiceSchema = new Schema(
  {
    orderid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    mobilenumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    eventname: { type: String, required: true },
    eventorganizer: { type: String },
    members: { type: Number, required: true },
    budgetrange: { type: String, required: true },
    ac: { type: Boolean, required: true },  // true = AC, false = Non-AC
    eventorganizercost: { type: Number, required: true },
    workercost: { type: Number, required: true },
    foodcost: { type: Number, required: true },
    currentcost: { type: Number, required: true },
    accost: { type: Number, required: true },
    decorationcost: { type: Number, required: true },
    travelcost: { type: Number, required: true },
    othercost: { type: Number, required: true },
    totalcost: { type: Number, required: true },
    gstcgst: { type: Number, required: true }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('billing', eventServiceSchema);
