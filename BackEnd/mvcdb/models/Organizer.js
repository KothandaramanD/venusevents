const mongoose = require('mongoose');

const organizerSchema = new mongoose.Schema({
  organizer: { type: String, required: true },
  eventname: { type: String, required: true },
  organizerphoto: { type: String, required: true }, // File path
  organizerdescription: { type: String, required: true }
});

module.exports = mongoose.model('Organizer', organizerSchema);
