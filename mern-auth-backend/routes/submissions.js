const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');
const term_multers = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Determine resource type based on mimetype
    const isVideo = file.mimetype.startsWith('video');
    return {
      folder: 'eko-couture/submissions',
      resource_type: isVideo ? 'video' : 'image',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'mp4', 'mov', 'avi'],
    };
  },
});

const upload = term_multers({ storage: storage });

// POST /api/submissions (Public)
router.post('/', upload.single('media'), async (req, res) => {
    try {
        const { brandName, contactEmail, description } = req.body;

        let mediaUrl = '';
        let mediaType = 'image';

        if (req.file) {
            mediaUrl = req.file.path;
            mediaType = req.file.mimetype.startsWith('video') ? 'video' : 'image';
        }

        const submission = new Submission({
            brandName,
            contactEmail,
            description,
            mediaUrl,
            mediaType
        });

        await submission.save();

        // Send Notification Email (Internal)
        await sendEmail({
            to: process.env.ADMIN_EMAIL || 'admin@example.com',
            subject: `New Item Submission: ${brandName}`,
            html: `
                <h1>New Submission Received</h1>
                <p><strong>Brand:</strong> ${brandName}</p>
                <p><strong>Contact:</strong> ${contactEmail}</p>
                <p><strong>Description:</strong> ${description}</p>
                <p><strong>Media:</strong> <a href="${mediaUrl}">View Media</a></p>
            `,
        });

        res.status(201).json(submission);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET /api/submissions (Protected)
router.get('/', async (req, res) => {
    try {
        const submissions = await Submission.find().sort({ createdAt: -1 });
        res.json(submissions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PATCH /api/submissions/:id (Protected)
router.patch('/:id', async (req, res) => {
    try {
        const submission = await Submission.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(submission);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
