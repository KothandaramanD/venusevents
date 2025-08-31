const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventname: {
    type: String,
    required: true
  },
  eventphoto: {
    type: String, // path to the uploaded image
    required: true
  },
  eventdescription: {
    type: String, // path to the uploaded image
    required: true
  }
});

module.exports = mongoose.model('Event', eventSchema);
