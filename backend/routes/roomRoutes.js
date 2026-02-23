const express = require('express');
const router = express.Router();
const multer = require('multer');
const Room = require('../models/Room');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/;
  const mimetype = allowedFileTypes.test(file.mimetype);
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  if (mimetype && extname) return cb(null, true);
  cb('Error: File upload only supports the following filetypes - ' + allowedFileTypes);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// @route   GET api/rooms
// @desc    Get all rooms (optionally filter by hotel or type)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { hotel, type } = req.query;
    let query = {};
    if (hotel) query.hotel = hotel;
    if (type) query.type = new RegExp(type, 'i');

    const rooms = await Room.find(query).populate('hotel', 'name city');
    res.json(rooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/rooms/types
// @desc    Get all distinct room types
// @access  Public
router.get('/types', async (req, res) => {
  try {
    const types = await Room.distinct('type');
    res.json(types);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/rooms
// @desc    Create a new room
// @access  Public (for now)
router.post('/', upload.single('image'), async (req, res) => {
  const { title, description, price, amenities, type, hotel, guests, size } = req.body;
  const imagePath = req.file ? `uploads/${req.file.filename}` : req.body.imagePath || '';

  try {
    const newRoom = new Room({
      title,
      type: type || 'Standard',
      description,
      price,
      guests: guests || 2,
      size: size || 300,
      amenities: amenities ? (typeof amenities === 'string' ? amenities.split(',') : amenities) : [],
      imagePath,
      hotel
    });

    const room = await newRoom.save();
    res.json(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
