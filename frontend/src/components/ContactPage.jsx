// src/components/ContactPage.js
import React from 'react';
import ContactForm from './ContactForm';
// import Map from './Map';

const ContactPage = () => {
    return (
        <div className="contact-page"><br></br>
        <br></br>
        <br></br>
        <br></br>
            <h2><b>Contact Us </b></h2>
            <p>
                For any inquiries or support, please feel free to contact
                us using the information below.
            </p>
            <div className="contact-details">
                <p>Email: Greenify@gmail.com</p>
                <p>Phone: +91 7218123779</p>
                <p>Address: Sunbeam Infotech, Hinjewadi Phase 2, Pune </p>
            </div>
            <ContactForm />
            {/* <Map /> */}
        </div>
    );
};

export default ContactPage;
