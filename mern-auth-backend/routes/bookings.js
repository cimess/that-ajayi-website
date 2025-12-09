const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST /api/bookings (Public)
router.post('/', async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).json(booking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET /api/bookings (Protected)
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PATCH /api/bookings/:id (Protected)
router.patch('/:id', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(booking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
