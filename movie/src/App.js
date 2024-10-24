import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MovieCard from './MovieCard'; 
import MovieDetail from './MovieDetail'; // Import the MovieDetail component

function App() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch('http://localhost:5000/api/movies');
            const data = await response.json();
            setMovies(data);
        };

        fetchMovies();
    }, []);

    return (
        <Router>
            <div className="app">
                <h1>Movie List</h1>
                <div className="movie-list">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
                <Routes>
                    <Route path="/movies/:id" element={<MovieDetail movies={movies} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
