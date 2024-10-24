import React from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

function MovieDetail({ movies }) {
    const { id } = useParams(); // Get the movie ID from the URL
    const movie = movies.find((m) => m.id === parseInt(id)); // Find the movie by ID

    if (!movie) {
        return <h2>Movie not found!</h2>; // Handle case where movie is not found
    }

    return (
        <div className="movie-detail">
            <h2>{movie.title}</h2>
            <p><strong>Year:</strong> {movie.year}</p>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Description:</strong> {/* Add a description if available */} This is a detailed description of the movie.</p>
            <a href="/">Back to Movie List</a>
        </div>
    );
}

export default MovieDetail;
