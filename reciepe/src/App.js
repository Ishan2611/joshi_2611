// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';

function App() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/recipes')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Fetched recipes:', data); // Log the fetched recipes
                setRecipes(data);
            })
            .catch((error) => console.error('Error fetching recipes:', error));
    }, []);

    return (
        <Router>
            <div className="App">
                <h1>Recipe Showcase</h1>
                <h2>Popular Dishes</h2>
                <ul>
                    {recipes.map((recipe) => (
                        <li key={recipe.id}>
                            <Link to={`/recipes/${recipe.id}`}>
                                {recipe.title}
                            </Link>
                            <p>{recipe.description}</p>
                        </li>
                    ))}
                </ul>

                <Routes>
                    {recipes.map((recipe) => (
                        <Route key={recipe.id} path={`/recipes/${recipe.id}`} element={<RecipeDetail recipe={recipe} />} />
                    ))}
                </Routes>
            </div>
        </Router>
    );
}

function RecipeDetail({ recipe }) {
    return (
        <div className="recipe-detail">
            <h3>{recipe.title}</h3>
            <h4>Ingredients:</h4>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h4>Instructions:</h4>
            <p>{recipe.instructions}</p>
        </div>
    );
}

export default App;
