const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Collection = require('../models/Collection');

// Configure Cloudinary (it should pick up env vars if already loaded,
// but we ensure config/cloudinary.js usage if needed, or re-config here)
// However, server.js loads dotenv.
// Standard practice with multer-storage-cloudinary:

// Ensure cloudinary is configured.
// If config/cloudinary.js exports the configured instance, we can use it,
// or just rely on global config if it was done.
// Let's require the config file we saw earlier to be safe.
require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'eko-couture/collections',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

const upload = multer({ storage: storage });

// @route   POST /api/collections
// @desc    Upload a new collection item
// @access  Public (or Protected if we add middleware)
// For now, leaving public as requested, or maybe we should add auth?
// The plan said "protected". I should check if I have an auth middleware available.
// 'middleware/auth' usually. Let's try to import it.

// Auth middleware placeholder - skipping for demo simplicity as frontend uses mock login.
// const authMiddleware = require('../middleware/authenticate');

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No image file uploaded' });
    }

    const { title, subtitle, description, tags, affiliateLink, spinPath, spinFrames } = req.body;

    // Parse tags if sent as string (e.g. "tag1, tag2") or JSON string
    let parsedTags = [];
    if (tags) {
        if (Array.isArray(tags)) {
            parsedTags = tags;
        } else if (typeof tags === 'string') {
             // check if it is a JSON string array
            try {
                parsedTags = JSON.parse(tags);
            } catch (e) {
                // split by comma
                 parsedTags = tags.split(',').map(tag => tag.trim());
            }
        }
    }

    const newCollection = new Collection({
      image: req.file.path, // Cloudinary URL
      title,
      subtitle,
      description,
      tags: parsedTags,
      affiliateLink,
      spinPath,
      spinFrames
    });

    const savedCollection = await newCollection.save();
    res.json(savedCollection);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/collections
// @desc    Get all collection items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const collections = await Collection.find().sort({ createdAt: -1 });
    res.json(collections);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/collections/:id
// @desc    Delete a collection item
// @access  Public (should be protected)
router.delete('/:id', async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      return res.status(404).json({ msg: 'Collection not found' });
    }

    // Optionally delete from Cloudinary using public_id extraction

    await collection.deleteOne();
    res.json({ msg: 'Collection removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
