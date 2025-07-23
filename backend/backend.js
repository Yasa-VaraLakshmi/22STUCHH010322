// Express.js Backend for URL Shortener

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(bodyParser.json());

// Logger middleware
app.use((req, res, next) => {
  const log = `${new Date().toISOString()} - ${req.method} ${req.path}\n`;
  fs.appendFileSync(path.join(__dirname, 'access.log'), log);
  next();
});

// In-memory store (use DB in production)
let urls = [];

// POST /api/shorten
app.post('/api/shorten', (req, res) => {
  const urlList = req.body;

  if (!Array.isArray(urlList)) {
    return res.status(400).json({ error: 'Expected an array of URLs' });
  }

  const shortened = [];

  for (const item of urlList) {
    const { originalUrl, shortcode, validity } = item;

    if (!originalUrl || !shortcode || !validity) {
      return res.status(400).json({ error: 'Missing fields in some items' });
    }

    const alreadyExists = urls.find((u) => u.shortcode === shortcode);
    if (alreadyExists) {
      return res.status(409).json({ error: `Shortcode '${shortcode}' already exists.` });
    }

    const shortUrl = `http://localhost:${PORT}/${shortcode}`;
    urls.push({ originalUrl, shortcode, shortUrl, validity, clickCount: 0 });
    shortened.push({ originalUrl, shortUrl });
  }

  res.json(shortened);
});

// GET /api/stats
app.get('/api/stats', (req, res) => {
  const stats = urls.map(({ originalUrl, shortUrl, clickCount }) => ({
    originalUrl,
    shortUrl,
    clickCount,
  }));

  res.json(stats);
});

// Redirection endpoint
app.get('/:shortcode', (req, res) => {
  const { shortcode } = req.params;
  const entry = urls.find((u) => u.shortcode === shortcode);

  if (!entry) {
    return res.status(404).send('Short URL not found');
  }

  entry.clickCount++;
  res.redirect(entry.originalUrl);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
