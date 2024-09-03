// src/components/ContactForm.js
import React from 'react';

const ContactForm = () => {
    // Form handling logic
    return (
        <form className="contact-form">
            <h3>Raise a Issue</h3>
            <div>
                <label htmlFor="name">Name: </label><br></br>
                <input type="text" id="name" name="name" required />
            </div>
            <br></br>
            <div>
                <label htmlFor="email">Email: </label><br></br>
                <input type="email" id="email" name="email" required />
            </div>
            <br></br>
            <div>
                <label htmlFor="message">Message:</label><br></br>
                <textarea id="message" name="message" required></textarea>
            </div><br></br>
            <br></br>
            <button type="submit">Send</button>
        </form>
    );
};

export default ContactForm;
