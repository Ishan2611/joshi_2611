import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './App.css';

function MovieCard({ movie }) {
    return (
        <div className="movie-card">
            <h2>{movie.title}</h2>
            <p>{movie.year}</p>
            <p>{movie.genre}</p>
            <Link to={`/movies/${movie.id}`}>View Details</Link> {/* Link for navigation */}
        </div>
    );
}

export default MovieCard;
