// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// BMI Calculation Endpoint
app.post('/calculate-bmi', (req, res) => {
  const { weight, height } = req.body;
  if (weight <= 0 || height <= 0) {
    return res.status(400).json({ error: 'Invalid weight or height' });
  }

  const bmi = weight / (height * height);
  let category = '';

  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = 'Normal weight';
  } else if (bmi >= 25 && bmi < 29.9) {
    category = 'Overweight';
  } else {
    category = 'Obesity';
  }

  res.json({ bmi, category });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
