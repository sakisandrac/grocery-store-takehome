import React, { useState } from 'react';
import './Navigation.css';
import logo from '../resources/logo.png';
import cartIcon from '../resources/cart.png';
import { FoodItem } from '../types';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
    setToggleCart: React.Dispatch<React.SetStateAction<boolean>>;

}

const Navigation = ({ setToggleCart }: NavigationProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;

    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    return (
        <nav className="nav-main">
            <img src={logo} alt="harvest hub logo" className="nav-logo" />
            <div className="nav-left">
                {currentPath !== '/checkout' && (
                    <div className="nav-cart-container">
                        <img
                            onClick={() => setToggleCart(prev => !prev)}
                            className="nav-cart"
                            src={cartIcon}
                            alt="cart icon"
                        />
                    </div>
                )}
                <div className="nav-menu-container">
                    <button className="nav-hamburger" onClick={toggleMenu}>
                        ☰
                    </button>
                    <ul className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
                        <li><Link className="nav-link" to="/" onClick={toggleMenu}>Home</Link></li>
                        <li><Link className="nav-link" to="/search" onClick={toggleMenu}>Search</Link></li>
                        <li><Link className="nav-link" to="/checkout" onClick={toggleMenu}>Checkout</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navigation