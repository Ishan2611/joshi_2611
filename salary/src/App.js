import React, { useState } from 'react';
import './index.css';

function App() {
    const [salary, setSalary] = useState('');
    const [netSalary, setNetSalary] = useState(null);
    const [error, setError] = useState('');

    const calculateNetSalary = async (e) => {
        e.preventDefault();
        setError('');
        if (!salary || isNaN(salary)) {
            setError('Please enter a valid salary.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/calculate-salary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ salary: parseFloat(salary) }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setNetSalary(data.netSalary);
        } catch (error) {
            setError('Error calculating net salary: ' + error.message);
        }
    };

    return (
        <div className="container">
            <h1>Quick Salary Estimator</h1>
            <form onSubmit={calculateNetSalary}>
                <label htmlFor="salary">Basic Salary (INR):</label>
                <input
                    type="number"
                    id="salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    required
                />
                <button type="submit">Calculate</button>
            </form>
            {error && <p className="error">{error}</p>}
            {netSalary !== null && (
                <div className="result">
                    <h2>Estimated Net Salary: ₹{netSalary.toFixed(2)}</h2>
                </div>
            )}
        </div>
    );
}

export default App;
