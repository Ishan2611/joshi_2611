const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS for all requests

// Sample movie data
const movies = [
    { id: 1, title: "Inception", year: 2010, genre: "Sci-Fi" },
    { id: 2, title: "The Dark Knight", year: 2008, genre: "Action" },
    { id: 3, title: "Interstellar", year: 2014, genre: "Sci-Fi" },
    { id: 4, title: "Parasite", year: 2019, genre: "Thriller" },
    { id: 5, title: "The Shawshank Redemption", year: 1994, genre: "Drama" },
];

// API endpoint to get the list of movies
app.get('/api/movies', (req, res) => {
    res.json(movies);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
