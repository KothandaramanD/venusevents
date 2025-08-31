const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  addOrganizer,
  getAllOrganizers,
  updateOrganizer,
  deleteOrganizer,
  getOrganizerById,

} = require('../controllers/organizerController');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Routes
router.post('/add', upload.single('organizerphoto'), addOrganizer);
router.get('/all', getAllOrganizers);
router.get('/:id', getOrganizerById);
router.put('/update/:id', upload.single('organizerphoto'), updateOrganizer);
router.delete('/delete/:id', deleteOrganizer);

module.exports = router;
