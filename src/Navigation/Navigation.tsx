import React from 'react';
import './Navigation.css';
import logo from '../resources/logo.png';
import cartIcon from '../resources/cart.png';
import { FoodItem } from '../types';

interface NavigationProps {
    setToggleCart: React.Dispatch<React.SetStateAction<boolean>>;

}

const Navigation = ({ setToggleCart }: NavigationProps) => {
    return (
        <nav className="nav-main">
            <img src={logo} alt="harvest hub logo" className="nav-logo" />
            <div className="nav-left">
                <ul className="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <div className="nav-cart-container">
                    <img onClick={() => setToggleCart(prev => !prev)} className="nav-cart" src={cartIcon} alt="cart icon" />
                </div>
            </div>
        </nav>

    )
}

export default Navigation