// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

const App = () => {
    const [courses, setCourses] = useState([]);
    const [inquiry, setInquiry] = useState({ name: '', email: '', message: '' });
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

    const handleInquiryChange = (e) => {
        const { name, value } = e.target;
        setInquiry({ ...inquiry, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/inquiries', inquiry);
            setResponseMessage('Inquiry submitted successfully.');
            setInquiry({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Error submitting inquiry:', error);
        }
    };

    return (
        <div className="container">
            <h1>Online Course Catalog</h1>
            <div className="course-list">
                <h2>Available Courses</h2>
                <ul>
                    {courses.map(course => (
                        <li key={course.id}>
                            <h3>{course.title}</h3>
                            <p>{course.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="contact-form">
                <h2>Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={inquiry.name}
                        onChange={handleInquiryChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={inquiry.email}
                        onChange={handleInquiryChange}
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={inquiry.message}
                        onChange={handleInquiryChange}
                        required
                    />
                    <button type="submit">Submit Inquiry</button>
                </form>
                {responseMessage && <p>{responseMessage}</p>}
            </div>
        </div>
    );
};

export default App;
