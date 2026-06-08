const router = require('express').Router();
const Lead = require('../models/Lead');

// GET /api/leads — all leads
router.get('/', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: 1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/leads — create one lead
router.post('/', async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST /api/leads/bulk — upsert leads (sync from frontend state)
router.post('/bulk', async (req, res) => {
  try {
    const leads = req.body;
    if (!Array.isArray(leads)) return res.status(400).json({ message: 'Expected an array' });
    const ops = leads.map(l => ({
      updateOne: {
        filter: { id: l.id },
        update: { $set: l },
        upsert: true
      }
    }));
    if (ops.length) await Lead.bulkWrite(ops);
    res.json({ success: true, count: leads.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/leads/:id — update one lead (by LD-xxxx id)
router.put('/:id', async (req, res) => {
  try {
    const lead = await Lead.findOneAndUpdate({ id: req.params.id }, { $set: req.body }, { new: true });
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/leads — clear all leads (admin/reset)
router.delete('/', async (req, res) => {
  try {
    await Lead.deleteMany({});
    res.json({ success: true, message: 'All leads cleared' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/leads/:id — delete one lead
router.delete('/:id', async (req, res) => {
  try {
    const lead = await Lead.findOneAndDelete({ id: req.params.id });
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
