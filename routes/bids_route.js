// // const express = require('express');
// // const router = express.Router();
// // const Bid = require('../models/bid.js');
// // const Tender = require('../models/tender.js');

// // // Validate ObjectId function
// // const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// // // Get all bids for a tender
// // router.get('/tenders/:id/bids', async (req, res) => {
// //   const { id } = req.params;

// //   if (!isValidObjectId(id)) {
// //     return res.status(400).json({ error: 'Invalid tender ID' });
// //   }

// //   try {
// //     const tender = await Tender.findById(id);
// //     if (!tender) {
// //       return res.status(404).json({ error: 'Tender not found' });
// //     }

// //     const bids = await Bid.find({ tenderId: id }).sort({ cost: 1 });
// //     if (bids.length === 0) {
// //       return res.status(404).json({ message: 'No bids found for this tender' });
// //     }

// //     // Flag bids placed in the last 5 minutes
// //     const now = new Date();
// //     const bidDetails = bids.map(bid => ({
// //       companyName: bid.companyName,
// //       bidTime: bid.bidTime,
// //       cost: bid.cost,
// //       placedInLast5Minutes: (tender.endTime - bid.bidTime <= 5 * 60 * 1000)
// //     }));

// //     res.json(bidDetails);
// //   } catch (error) {
// //     res.status(500).json({ error: 'An error occurred while fetching bids' });
// //   }
// // });


// // module.exports = router;


// // routes/bids.js
// const express = require('express');
// const router = express.Router();
// const Bid = require('../models/bid.js');

// // Get all bids
// router.get('/', async (req, res) => {
//   try {
//     const bids = await Bid.find().populate('tenderId');
//     res.status(200).json(bids);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get a specific bid
// router.get('/:id', async (req, res) => {
//   try {
//     const bid = await Bid.findById(req.params.id).populate('tenderId');
//     if (bid) {
//       res.status(200).json(bid);
//     } else {
//       res.status(404).json({ error: 'Bid not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Create a new bid
// router.post('/', async (req, res) => {
//   try {
//     const bid = new Bid(req.body);
//     await bid.save();
//     res.status(201).json(bid);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Update a bid
// router.put('/:id', async (req, res) => {
//   try {
//     const bid = await Bid.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (bid) {
//       res.status(200).json(bid);
//     } else {
//       res.status(404).json({ error: 'Bid not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Delete a bid
// router.delete('/:id', async (req, res) => {
//   try {
//     const bid = await Bid.findByIdAndDelete(req.params.id);
//     if (bid) {
//       res.status(200).json({ message: 'Bid deleted successfully' });
//     } else {
//       res.status(404).json({ error: 'Bid not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // / Update the status of a bid
// router.put('/bids/:id/status', async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   if (!['pending', 'accepted', 'rejected'].includes(status)) {
//     return res.status(400).json({ error: 'Invalid status' });
//   }

//   try {
//     const bid = await Bid.findById(id);
//     if (!bid) {
//       return res.status(404).json({ error: 'Bid not found' });
//     }

//     bid.status = status;
//     await bid.save();

//     res.json(bid);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// module.exports = router;


const express = require('express');
const router = express.Router();
const Bid = require('../models/bid.js');
const Tender = require('../models/tender.js');
const mongoose = require('mongoose');

// Validate ObjectId function
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Get all bids
router.get('/', async (req, res) => {
  try {
    const bids = await Bid.find().populate('tenderId');
    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific bid
router.get('/:id', async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id).populate('tenderId');
    if (bid) {
      res.status(200).json(bid);
    } else {
      res.status(404).json({ error: 'Bid not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new bid
router.post('/', async (req, res) => {
  try {
    const bid = new Bid(req.body);
    await bid.save();
    res.status(201).json(bid);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a bid
router.put('/:id', async (req, res) => {
  try {
    const bid = await Bid.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (bid) {
      res.status(200).json(bid);
    } else {
      res.status(404).json({ error: 'Bid not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a bid
router.delete('/:id', async (req, res) => {
  try {
    const bid = await Bid.findByIdAndDelete(req.params.id);
    if (bid) {
      res.status(200).json({ message: 'Bid deleted successfully' });
    } else {
      res.status(404).json({ error: 'Bid not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update the status of a bid
router.put('/bids/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pending', 'accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const bid = await Bid.findById(id);
    if (!bid) {
      return res.status(404).json({ error: 'Bid not found' });
    }

    bid.status = status;
    await bid.save();

    res.json(bid);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
