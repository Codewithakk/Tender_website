// models/Bid.js
const mongoose = require('mongoose');

// Define the schema for Bid
const BidSchema = new mongoose.Schema({
  tenderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tender', required: true },
  companyName: { type: String, required: true },
  cost: { type: Number, required: true },
  bidTime: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected'], // Possible status values
    default: 'pending' // Default status
  }
});

module.exports = mongoose.model('Bid', BidSchema);
