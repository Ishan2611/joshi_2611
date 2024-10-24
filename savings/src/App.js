// App.js
import React, { useState } from 'react';
import './index.css';

const App = () => {
    const [principal, setPrincipal] = useState('');
    const [age, setAge] = useState('');
    const [period, setPeriod] = useState('');
    const [interestEarned, setInterestEarned] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/calculate-interest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ principal, age, period }),
        });

        const data = await response.json();
        setInterestEarned(data.interestEarned);
    };

    return (
        <div className="container">
            <h1>Savings Interest Calculator</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Principal Amount (₹): </label>
                    <input 
                        type="number" 
                        value={principal} 
                        onChange={(e) => setPrincipal(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Age: </label>
                    <input 
                        type="number" 
                        value={age} 
                        onChange={(e) => setAge(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Investment Period (Years): </label>
                    <input 
                        type="number" 
                        value={period} 
                        onChange={(e) => setPeriod(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Calculate Interest</button>
            </form>
            {interestEarned !== null && (
                <h2>Interest Earned: ₹{interestEarned}</h2>
            )}
        </div>
    );
};

export default App;
