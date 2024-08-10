const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Tender = require('../models/tender.js');

// Validate ObjectId function
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Create a new tender
router.post('/create', async (req, res) => {
  const { name, description, startTime, endTime, bufferTime } = req.body;

  try {
    // Create a new tender with the provided details
    const tender = new Tender({ name, description, startTime, endTime, bufferTime });
    await tender.save();
    res.status(201).json(tender);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all tenders
router.get('/tenders', async (req, res) => {
  try {
    // Retrieve all tenders from the database
    const tenders = await Tender.find();
    if (tenders.length === 0) {
      return res.status(404).json({ message: 'No tenders available' });
    }
    res.json(tenders);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching tenders' });
  }
});

// Get a specific tender by ID
router.get('/tenders/:id', async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid tender ID' });
  }

  try {
    const tender = await Tender.findById(id);
    if (!tender) {
      return res.status(404).json({ error: 'Tender not found' });
    }
    res.json(tender);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the tender' });
  }
});

// Update a specific tender by ID
router.put('/tenders/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, startTime, endTime, bufferTime } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid tender ID' });
  }

  try {
    const updatedTender = await Tender.findByIdAndUpdate(
      id,
      { name, description, startTime, endTime, bufferTime },
      { new: true }
    );
    if (!updatedTender) {
      return res.status(404).json({ error: 'Tender not found' });
    }
    res.json(updatedTender);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a specific tender by ID
router.delete('/tenders/:id', async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid tender ID' });
  }

  try {
    const deletedTender = await Tender.findByIdAndDelete(id);
    if (!deletedTender) {
      return res.status(404).json({ error: 'Tender not found' });
    }
    res.json({ message: 'Tender deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the tender' });
  }
});

module.exports = router;
