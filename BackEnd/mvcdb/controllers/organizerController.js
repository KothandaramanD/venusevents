const Organizer = require('../models/Organizer');
const fs = require('fs');
const path = require('path');

// Get Organizer by ID
exports.getOrganizerById = async (req, res) => {
  try {
    const organizer = await Organizer.findById(req.params.id);
    if (!organizer) return res.status(404).json({ error: 'Organizer not found' });
    res.json(organizer);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Add Organizer
exports.addOrganizer = async (req, res) => {
  try {
    const { organizer, eventname, organizerdescription } = req.body;
    const organizerphoto = req.file.filename;

    const newOrganizer = new Organizer({
      organizer,
      eventname,
      organizerphoto,
      organizerdescription
    });

    await newOrganizer.save();
    res.status(201).json(newOrganizer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Organizers
exports.getAllOrganizers = async (req, res) => {
  try {
    const organizers = await Organizer.find();
    res.json(organizers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Organizer
exports.updateOrganizer = async (req, res) => {
  try {
    const organizer = await Organizer.findById(req.params.id);
    if (!organizer) return res.status(404).json({ message: 'Not found' });

    if (req.file) {
      fs.unlinkSync(path.join(__dirname, '..', 'uploads', organizer.organizerphoto));
      organizer.organizerphoto = req.file.filename;
    }

    organizer.organizer = req.body.organizer || organizer.organizer;
    organizer.eventname = req.body.eventname || organizer.eventname;
    organizer.organizerdescription = req.body.organizerdescription || organizer.organizerdescription;

    await organizer.save();
    res.json(organizer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Organizer
exports.deleteOrganizer = async (req, res) => {
  try {
    const organizer = await Organizer.findById(req.params.id);
    if (!organizer) return res.status(404).json({ message: 'Not found' });

    fs.unlinkSync(path.join(__dirname, '..', 'uploads', organizer.organizerphoto));
    await organizer.deleteOne();
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
