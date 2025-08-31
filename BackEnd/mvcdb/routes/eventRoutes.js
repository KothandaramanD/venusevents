const express = require('express');
const multer = require('multer');
const path = require('path');
const Event = require('../models/Event');

const router = express.Router();

// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Add Event
router.post('/add', upload.single('eventphoto'), async (req, res) => {
  try {
    const newEvent = new Event({
      eventname: req.body.eventname,
      eventphoto: req.file.filename,
      eventdescription: req.body.eventdescription
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Display All Events
router.get('/all', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get One Event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Event
router.put('/update/:id', upload.single('eventphoto'), async (req, res) => {
  try {
    const updateData = {
      eventname: req.body.eventname,
      eventdescription: req.body.eventdescription
    };
    if (req.file) {
      updateData.eventphoto = req.file.filename;
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedEvent) return res.status(404).json({ message: "Not found" });
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Event
router.delete('/delete/:id', async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
