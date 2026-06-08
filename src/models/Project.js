const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, // e.g. PRJ-901
    client: String,
    type: String,
    quote: String,
    team: String,
    status: { type: String, default: 'Project File Created' },
    files: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
