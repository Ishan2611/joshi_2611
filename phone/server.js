// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

let contacts = [];

// GET request to retrieve contacts
app.get('/api/contacts', (req, res) => {
  res.json(contacts);
});

// POST request to add new contacts
app.post('/api/contacts', (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required.' });
  }
  contacts.push({ name, phone });
  res.status(201).json({ message: 'Contact added successfully!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
