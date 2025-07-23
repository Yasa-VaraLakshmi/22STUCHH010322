// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let shortUrls = [];

// POST /api/shorten
app.post('/api/shorten', (req, res) => {
  const urls = req.body;

  const invalidEntries = urls.filter(
    (u) => !u.originalUrl || !u.validity || !u.shortcode
  );

  if (invalidEntries.length > 0) {
    return res.status(400).json({ message: 'Invalid input found', invalidEntries });
  }

  urls.forEach((entry) => {
    const exists = shortUrls.find((s) => s.shortcode === entry.shortcode);
    if (!exists) {
      shortUrls.push({
        originalUrl: entry.originalUrl,
        validity: entry.validity,
        shortcode: entry.shortcode,
        createdAt: new Date(),
        clicks: 0,
      });
    }
  });

  res.status(201).json({ message: 'URLs shortened successfully' });
});

// GET /api/stats
app.get('/api/stats', (req, res) => {
  res.json(shortUrls);
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
