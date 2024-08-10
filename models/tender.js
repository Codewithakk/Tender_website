const mongoose = require('mongoose');

const TenderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  bufferTime: { type: Number, required: true } // Buffer time in minutes
});

module.exports = mongoose.model('Tender', TenderSchema);
