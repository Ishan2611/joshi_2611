const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/calculate', (req, res) => {
    const items = req.body;

    // Define prices for items in Indian Rupees (INR)
    const itemPrices = {
        "apple": 80, // price for apple
        "banana": 40, // price for banana
        "orange": 60, // price for orange
        "shirt": 1500, // price for shirt
        "pant": 2000   // price for pant
    };

    let totalCost = 0;

    // Calculate total cost
    items.forEach(item => {
        const price = itemPrices[item.name.toLowerCase()] || 0;
        const quantity = parseInt(item.quantity); // Convert quantity to integer
        totalCost += price * (quantity || 0); // Multiply price with quantity
    });

    res.json({ totalCost });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
