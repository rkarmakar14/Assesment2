const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/auth');
const agencyRoutes = require('./src/routes/agency');
const clientRoutes = require('./src/routes/client');
const authMiddleware = require('./src/middleware/auth');

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api', authMiddleware, agencyRoutes);
app.use('/api', authMiddleware, clientRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
