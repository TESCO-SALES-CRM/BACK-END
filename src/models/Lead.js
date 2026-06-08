const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema(
  {
    timestamp: String,
    message: String,
    remark: String
  },
  { _id: false }
);

const LeadSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, // e.g. LD-1029
    type: { type: String, default: 'new leads' },
    date: String,
    name: String,
    projectType: String,
    phone: String,
    source: String,
    budget: String,
    status: String,
    manager: String,
    followUp: String,
    priority: String,
    notes: String,
    appointmentLocation: String,
    appointmentRemark: String,
    history: [HistorySchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', LeadSchema);
