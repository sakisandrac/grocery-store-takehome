import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <p>© Harvest Hub 2024 </p>
            <div className="footer-link-container">
                <p className="footer-header">Our Address</p>
                <p>12345 Main st.</p>
                <p>City, ST 00000</p>
            </div>
            <div className="footer-link-container">
                <p className="footer-header">More Info</p>
                <p>Careers</p>
                <p>Our Mission</p>
            </div>
        </footer>
    )
}

export default Footer