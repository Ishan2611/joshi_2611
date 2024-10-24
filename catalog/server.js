// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Sample course data
const courses = [
    { id: 1, title: 'Introduction to JavaScript', description: 'Learn the basics of JavaScript.' },
    { id: 2, title: 'React for Beginners', description: 'An introduction to React.js.' },
    { id: 3, title: 'Node.js and Express', description: 'Build web applications with Node.js.' }
];

// GET request to retrieve course information
app.get('/api/courses', (req, res) => {
    res.json(courses);
});

// POST request for inquiries
app.post('/api/inquiries', (req, res) => {
    const inquiry = req.body;
    // Here you would normally handle the inquiry (e.g., save to a database)
    console.log('Inquiry received:', inquiry);
    res.status(201).send('Inquiry submitted successfully.');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
