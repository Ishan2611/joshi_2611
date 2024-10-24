// App.js
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBMI = async () => {
    if (!weight || !height) return;

    const response = await fetch('http://localhost:5000/calculate-bmi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ weight: parseFloat(weight), height: parseFloat(height) }),
    });

    const data = await response.json();
    setBmi(data.bmi);
    setCategory(data.category);
  };

  return (
    <div className="container">
      <h1>BMI Calculator</h1>
      <div className="input-group">
        <label htmlFor="weight">Weight (kg):</label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="height">Height (m):</label>
        <input
          type="number"
          id="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <button onClick={calculateBMI}>Calculate BMI</button>
      {bmi !== null && (
        <div className="result">
          <h2>Your BMI: {bmi.toFixed(2)}</h2>
          <h3>Category: {category}</h3>
        </div>
      )}
    </div>
  );
};

export default App;
