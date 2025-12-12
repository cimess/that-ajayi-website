const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Collection = require('../models/Collection');
const authenticate = require('../middleware/authenticate');

// Configure Cloudinary
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
// @access  Protected (Admin only)
router.post('/', authenticate, upload.single('image'), async (req, res) => {
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
// @access  Protected (Admin only)
router.delete('/:id', authenticate, async (req, res) => {
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

// @route   GET /api/collections/similar/:id
// @desc    Get similar collection items based on tags
// @access  Public
router.get('/similar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const targetCollection = await Collection.findById(id);

    if (!targetCollection) {
      return res.status(404).json({ msg: 'Collection not found' });
    }

    const tags = targetCollection.tags || [];

    // Find items with at least one matching tag, excluding the current item
    const similarCollections = await Collection.find({
      _id: { $ne: id },
      tags: { $in: tags }
    });

    // Sort by number of matching tags (descending)
    similarCollections.sort((a, b) => {
      const aMatches = a.tags.filter(tag => tags.includes(tag)).length;
      const bMatches = b.tags.filter(tag => tags.includes(tag)).length;
      return bMatches - aMatches;
    });

    res.json(similarCollections);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

