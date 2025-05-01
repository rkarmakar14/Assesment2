const express = require('express');
const router = express.Router();
const Agency = require('../models/Agency');
const Client = require('../models/Client');

router.post('/create-agency-client', async (req, res) => {
    try {
      const { agency, client } = req.body;
  
      const newAgency = new Agency(agency);
      const savedAgency = await newAgency.save();
  
      const newClient = new Client({ ...client, agencyId: savedAgency._id });
      await newClient.save();
  
      res.status(201).json({ message: 'Agency and Client created successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  module.exports = router;