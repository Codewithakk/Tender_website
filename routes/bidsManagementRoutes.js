const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Bid = require('../models/bid.js');
const Tender = require('../models/tender.js');

// Validate ObjectId function
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Get all bids with details and sorting
router.get('/bids', async (req, res) => {
  try {
    const bids = await Bid.find()
      .populate('tenderId', 'endTime') // Populate tenderId to get endTime
      .sort({ cost: 1 }); // Sort bids by cost in ascending order

    if (bids.length === 0) {
      return res.status(404).json({ message: 'No bids found' });
    }

    const bidDetails = bids.map(bid => {
      const now = new Date();
      const placedInLast5Minutes = (bid.tenderId.endTime - bid.bidTime <= 5 * 60 * 1000);
      
      return {
        companyName: bid.companyName,
        bidTime: bid.bidTime,
        cost: bid.cost,
        placedInLast5Minutes
      };
    });

    res.json(bidDetails);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching bids' });
  }
});

module.exports = router;
