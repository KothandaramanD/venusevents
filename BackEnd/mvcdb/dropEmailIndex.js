const mongoose = require('mongoose');
const EventService = require('./models/eventservice.model'); // Adjust the path if needed

async function dropEmailIndex() {
  try {
    await mongoose.connect('mongodb://localhost:27017/merncrud/eventservices');
    console.log("Connected to MongoDB");

    const result = await EventService.collection.dropIndex("email_1");
    console.log("Index dropped:", result);

    await mongoose.disconnect();
    console.log("Disconnected");
  } catch (err) {
    console.error("Error:", err.message);
    await mongoose.disconnect();
  }
}

dropEmailIndex();
