const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample articles data
const articles = [
  {
    id: 1,
    title: '5 Tips for Career Success',
    content: 'Here are five tips to help you succeed in your career...',
  },
  {
    id: 2,
    title: 'How to Write a Resume',
    content: 'Writing a great resume is essential for job hunting...',
  },
  {
    id: 3,
    title: 'The Importance of Networking',
    content: 'Networking can open doors to new opportunities...',
  },
];

// GET articles
app.get('/api/articles', (req, res) => {
  res.json(articles);
});

// POST inquiries
app.post('/api/inquiries', (req, res) => {
  const { name, email, message } = req.body;
  // Here you can add logic to handle the inquiry, like sending an email or saving to a database
  console.log('Inquiry received:', { name, email, message });
  res.status(201).send('Inquiry received successfully');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
