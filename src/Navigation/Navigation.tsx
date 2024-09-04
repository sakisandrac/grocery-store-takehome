import React from 'react';
import './Navigation.css';
import logo from '../resources/logo.png';
import cartIcon from '../resources/cart.png';

const Navigation = () => {
    return (
        <nav className="nav-main">
            <img src={logo} alt="harvest hub logo" className="nav-logo" />
            <div>
                <ul className="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <div className="nav-cart-container">
                    <img className="nav-cart" src={cartIcon} alt="cart icon" />
                </div>
            </div>
        </nav>

    )
}

export default Navigation