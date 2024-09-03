// src/pages/Contact.js
import React from 'react';
// import Footer from '../components/Footer';
import ContactPage from '../components/ContactPage';
import BarNav from '../components/BarNav';

const Contact = () => {
    return (
        <div className="contact">
            < BarNav/>
            <div className="content">
                <ContactPage />
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default Contact;
