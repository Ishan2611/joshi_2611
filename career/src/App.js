import React, { useEffect, useState } from 'react';
import './index.css';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/articles');
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inquiry = { name, email, message };
    
    try {
      const response = await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiry),
      });
      if (response.ok) {
        setFeedback('Your message has been sent!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setFeedback('Error sending message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setFeedback('Error sending message. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Career Guidance Blog</h1>
      <h2>Articles</h2>
      <div className="articles">
        {articles.map((article) => (
          <div key={article.id} className="article">
            <h3>{article.title}</h3>
            <p>{article.content}</p>
          </div>
        ))}
      </div>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <input 
          type="text" 
          placeholder="Your Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Your Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Your Message" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          required 
        />
        <button type="submit">Send</button>
      </form>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default App;
