// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint to calculate interest
app.post('/api/calculate-interest', (req, res) => {
    const { principal, age, period } = req.body;

    // Simple interest calculation (for demonstration purposes)
    const interestRate = 0.05; // Assuming a fixed interest rate of 5%
    const interestEarned = (principal * interestRate * period).toFixed(2);

    res.json({ interestEarned });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
