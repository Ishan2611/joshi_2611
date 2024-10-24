// src/App.js
import React, { useState, useEffect } from 'react';
import './index.css';
import ContactList from './ContactList';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/contacts');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const addContact = async (e) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Please enter both name and phone number.");
      return;
    }

    const newContact = { name, phone };
    try {
      await fetch('http://localhost:5000/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      });
      setName('');
      setPhone('');
      fetchContacts(); // Refresh the contact list
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  return (
    <div className="app">
      <h1>Personal Phone Directory</h1>
      <form onSubmit={addContact}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit">Add Contact</button>
      </form>
      <ContactList contacts={contacts} />
    </div>
  );
};

export default App;
