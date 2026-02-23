const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');

// @route   GET api/hotels
// @desc    Get all hotels
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { city, minPrice, maxPrice } = req.query;
        let query = {};

        if (city) {
            query.city = new RegExp(city, 'i');
        }

        const hotels = await Hotel.find(query);
        res.json(hotels);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/hotels/:id
// @desc    Get hotel by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) return res.status(404).json({ msg: 'Hotel not found' });
        res.json(hotel);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Hotel not found' });
        res.status(500).send('Server Error');
    }
});

// @route   POST api/hotels
// @desc    Create a new hotel
// @access  Private (Admin only logic would go here)
router.post('/', async (req, res) => {
    const { name, city, address, description, imagePath, stars, photos } = req.body;
    try {
        const newHotel = new Hotel({
            name,
            city,
            address,
            description,
            imagePath,
            stars,
            photos
        });
        const hotel = await newHotel.save();
        res.json(hotel);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
