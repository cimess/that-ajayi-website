const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST /api/bookings (Public)
const { sendEmail } = require('../utils/emailService');

// POST /api/bookings (Public)
router.post('/', async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();

        // Send Notification Email (Internal) - Only if enabled
        if (process.env.ENABLE_EMAIL === 'true') {
            try {
                await sendEmail({
                    to: process.env.ADMIN_EMAIL || 'admin@example.com',
                    subject: `New Booking: ${booking.eventType}`,
                    html: `
                        <h1>New Booking Received</h1>
                        <p><strong>Name:</strong> ${booking.clientName}</p>
                        <p><strong>Service:</strong> ${booking.eventType}</p>
                        <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
                        <p><strong>Email:</strong> ${booking.email}</p>
                    `,
                });
            } catch (emailError) {
                console.error('Email notification failed:', emailError);
                // Don't fail the request if email fails
            }
        }

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
