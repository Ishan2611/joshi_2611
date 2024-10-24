import React, { useState } from 'react';
import './index.css';

const App = () => {
    const [items, setItems] = useState([{ name: '', quantity: '' }]);
    const [totalCost, setTotalCost] = useState(0);

    const handleChange = (index, event) => {
        const values = [...items];
        values[index][event.target.name] = event.target.value;
        setItems(values);
    };

    const handleAddFields = () => {
        setItems([...items, { name: '', quantity: '' }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:5000/api/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(items),
        });
        const data = await response.json();
        setTotalCost(data.totalCost);
    };

    return (
        <div className="app">
            <h1>Item Cost Calculator</h1>
            <form onSubmit={handleSubmit}>
                {items.map((item, index) => (
                    <div key={index} className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Item Name"
                            value={item.name}
                            onChange={event => handleChange(index, event)}
                            required
                        />
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Quantity"
                            value={item.quantity}
                            onChange={event => handleChange(index, event)}
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddFields}>
                    Add Item
                </button>
                <button type="submit">Calculate Total Cost</button>
            </form>
            <h2>Total Cost: ₹{totalCost}</h2>
        </div>
    );
};

export default App;
