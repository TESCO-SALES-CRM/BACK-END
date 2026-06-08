const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema(
  {
    title: String,
    date: String,        // 'YYYY-MM-DD'
    timeStart: String,   // '04:00 PM'
    timeEnd: String,     // '05:00 PM'
    manager: String,
    phone: String,
    location: String,
    status: { type: String, default: 'Waiting' },
    type: { type: String, default: 'Appointment' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', AppointmentSchema);
