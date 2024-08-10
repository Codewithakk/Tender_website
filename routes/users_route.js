const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Tender = require('../models/tender.js');
const Bid = require('../models/bid.js');
const notificationService = require('./notification_route.js');

// Validate ObjectId function
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// View all available tenders
router.get('/tenders', async (req, res) => {
  try {
    const tenders = await Tender.find();
    if (tenders.length === 0) {
      return res.status(404).json({ message: 'No tenders available' });
    }
    res.json(tenders);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching tenders' });
  }
});

// Submit a quotation
router.post('/bids', async (req, res) => {
  try {
    const { tenderId, companyName, cost } = req.body;
    const tender = await Tender.findById(tenderId);
    if (!tender) return res.status(404).json({ error: 'Tender not found' });

    const now = new Date();
    const tenderEndTime = new Date(tender.endTime);
    const timeDifference = tenderEndTime - now;
    
    // Check if the bid is placed in the last 5 minutes
    if (timeDifference <= 5 * 60 * 1000) {
      // Extend the tender end time by the buffer time
      tender.endTime = new Date(tender.endTime.getTime() + (tender.bufferTime * 60 * 1000));
      await tender.save();
    }

    const bid = new Bid({ tenderId, companyName, cost, bidTime: now });
    await bid.save();
    res.status(201).json(bid);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get lowest quote for a tender
router.get('/tenders/:id/lowest-quote', async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid tender ID' });
  }

  try {
    const bids = await Bid.find({ tenderId: id }).sort({ cost: 1 }).limit(1);
    if (bids.length === 0) {
      return res.status(404).json({ message: 'No bids found for this tender' });
    }
    res.json(bids[0]);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the lowest quote' });
  }
});

// Get all bids submitted by a company
router.get('/bids/company/:companyName', async (req, res) => {
  const { companyName } = req.params;

  try {
    const bids = await Bid.find({ companyName });
    if (bids.length === 0) {
      return res.status(404).json({ message: 'No bids found for this company' });
    }
    res.json(bids);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching company bids' });
  }
});


router.put('/tenders/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const tender = await Tender.findById(id);
    if (!tender) return res.status(404).json({ error: 'Tender not found' });

    tender.status = status;
    await tender.save();

    // Notify users of the status change
    await notificationService.sendTenderStatusChangeNotification(id, status);

    res.status(200).json(tender);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
