const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const Agency = require('../models/Agency');

router.put('/update-client/:id', async (req, res) => {
  try {
    const updated = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Client not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/top-client', async (req, res) => {
  try {
    const topClient = await Client.find().sort({ totalBill: -1 }).limit(1).populate('agencyId');
    if (topClient.length === 0) return res.status(404).json({ error: 'No clients found' });

    const response = topClient.map(c => ({
      agencyName: c.agencyId.name,
      clientName: c.name,
      totalBill: c.totalBill
    }));

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;