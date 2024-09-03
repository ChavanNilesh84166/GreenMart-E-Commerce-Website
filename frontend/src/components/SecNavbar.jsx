// src/components/SecondaryNavbar.js
import React from 'react';

const SecondaryNavbar = () => {
    return (
        <nav className="secondary-navbar topnav   " style={{marginTop:"18px",width:"100vw ",overflow:"hidden ", display:"flex"}}>

            <button className="nav-button">Fridge</button>
            <button className="nav-button">Refrigerator</button>
            <button className="nav-button">Oven</button>
            <button className="nav-button">Iron</button>
            <button className="nav-button">Microwave</button>
            <button className="nav-button">Washing Machine</button>
            <button className="nav-button">Air Conditioner</button>
            <button className="nav-button">Television</button>
            <button className="nav-button">Mobile</button>
            <button className="nav-button">Laptop</button>
            <button className="nav-button">Tablet</button>

            
        </nav>
    );
};

export default SecondaryNavbar;
