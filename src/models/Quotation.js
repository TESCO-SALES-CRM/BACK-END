const mongoose = require('mongoose');

const QuotationSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, // e.g. QT-5001
    leadId: String,
    client: String,
    project: String,
    amount: String,
    gst: String,
    approvalStatus: { type: String, default: 'Pending' },
    quotationStatus: { type: String, default: 'In Preparation' },
    revision: { type: String, default: 'Rev 0' },
    fileName: { type: String, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quotation', QuotationSchema);
