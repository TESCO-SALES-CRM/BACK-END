const express = require('express');
const router = express.Router();
const loginRoutes = require('./login');

router.get('/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));
router.use('/auth', loginRoutes);

module.exports = router;
