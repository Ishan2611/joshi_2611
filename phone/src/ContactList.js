// src/ContactList.js
import React from 'react';

const ContactList = ({ contacts }) => {
  return (
    <ul>
      {contacts.map((contact, index) => (
        <li key={index}>
          {contact.name}: {contact.phone}
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
