const express = require('express');
const app = express();
const path = require('path');

// Serve static files from public directory
app.use(express.static('public'));

// Route for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for other pages
app.get('/:page', (req, res) => {
  const page = req.params.page;
  if (['rating', 'results', 'user_info'].includes(page)) {
    res.sendFile(path.join(__dirname, 'public', `${page}.html`));
  } else {
    res.status(404).send('Page not found');
  }
});

module.exports = app;