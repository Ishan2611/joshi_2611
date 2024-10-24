// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample recipe data
const recipes = [
    {
        id: 1,
        title: 'Spaghetti Carbonara',
        description: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.',
        ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan cheese', 'Black pepper'],
        instructions: '1. Cook spaghetti. 2. Fry pancetta. 3. Mix eggs and cheese. 4. Combine everything.'
    },
    {
        id: 2,
        title: 'Chicken Curry',
        description: 'A spicy and flavorful dish made with chicken and a blend of spices.',
        ingredients: ['Chicken', 'Curry powder', 'Coconut milk', 'Onion', 'Garlic'],
        instructions: '1. Sauté onion and garlic. 2. Add chicken. 3. Stir in curry powder. 4. Pour coconut milk and simmer.'
    },
    {
        id: 3,
        title: 'Vegetable Stir Fry',
        description: 'A quick and healthy dish with mixed vegetables and soy sauce.',
        ingredients: ['Broccoli', 'Bell peppers', 'Carrots', 'Soy sauce', 'Garlic'],
        instructions: '1. Heat oil. 2. Add garlic. 3. Stir fry vegetables. 4. Add soy sauce and serve.'
    },
];

// GET route to retrieve recipes
app.get('/api/recipes', (req, res) => {
    res.json(recipes);
});

// GET route to retrieve a single recipe by ID
app.get('/api/recipes/:id', (req, res) => {
    const recipe = recipes.find(r => r.id === parseInt(req.params.id));
    if (recipe) {
        res.json(recipe);
    } else {
        res.status(404).json({ message: 'Recipe not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
