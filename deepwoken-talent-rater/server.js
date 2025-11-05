const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/user_info.html', (req, res) => {
  res.sendFile(__dirname + '/public/user_info.html');
});

app.get('/rating.html', (req, res) => {
  res.sendFile(__dirname + '/public/rating.html');
});

app.get('/results.html', (req, res) => {
  res.sendFile(__dirname + '/public/results.html');
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Deepwoken Talent Rater is running!' });
});

// Export for Vercel
module.exports = app;