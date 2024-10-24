const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Salary calculation route
app.post('/calculate-salary', (req, res) => {
    const { salary } = req.body;
    if (salary < 0) {
        return res.status(400).json({ error: 'Salary must be a positive number.' });
    }

    // Simple deduction calculation (for example: 20% deduction)
    const deduction = salary * 0.2;  // Deduction logic can be adjusted as needed
    const netSalary = salary - deduction;

    res.json({ netSalary });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
