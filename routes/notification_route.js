const express = require('express');
const router = express.Router();
const Tender = require('../models/tender.js');
const { sendTenderStatusChangeNotification, notifyNewTenderPlaced } = require('../notification.js');

// Create tender
router.post('/create', async (req, res) => {
  try {
    const tender = new Tender(req.body);
    await tender.save();
    
    await notifyNewTenderPlaced();
    
    res.status(201).json(tender);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update tender
router.put('/update/:id', async (req, res) => {
  try {
    const { status } = req.body; // Assuming status is passed in the request body
    const tender = await Tender.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (tender) {
      await sendTenderStatusChangeNotification(tender._id, status);
      res.status(200).json(tender);
    } else {
      res.status(404).json({ error: 'Tender not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete tender
router.delete('/delete/:id', async (req, res) => {
  try {
    const tender = await Tender.findByIdAndDelete(req.params.id);
    
    if (tender) {
      res.status(200).json({ message: 'Tender deleted successfully' });
    } else {
      res.status(404).json({ error: 'Tender not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
